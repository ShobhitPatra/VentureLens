// import { analyzeStartup } from "@/lib/prompt";
// import { NextResponse } from "next/server";
// import { ConvexHttpClient } from "convex/browser";
// import { api } from "@/convex/_generated/api";

// const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
// export async function POST(req: Request) {
//   try {
//     const { crawlData, userEmail, url } = await req.json();

//     if (!crawlData) {
//       return NextResponse.json(
//         { error: "No content provided for analysis" },
//         { status: 400 }
//       );
//     }
//     if (!userEmail) {
//       return NextResponse.json(
//         { error: "User email required" },
//         { status: 400 }
//       );
//     }

//     const content = crawlData;
//     const analysis = await analyzeStartup(content);

//     if (!analysis) {
//       return NextResponse.json(
//         { error: "Error analyzing response form llm" },
//         { status: 400 }
//       );
//     }

//     const reportId = await convex.mutation(api.reports.createReport, {
//       userEmail: userEmail,
//       originalUrl: url,
//       reportData: JSON.stringify(analysis),
//     });

//     if (!reportId) {
//       return NextResponse.json(
//         { error: "error inserting report in db" },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(analysis);
//   } catch (error) {
//     console.error("Analysis API Error:", error);
//     return NextResponse.json(
//       {
//         error: "Analysis failed",
//         message: error,
//       },
//       { status: 500 }
//     );
//   }
// }

import { analyzeStartup } from "@/lib/prompt";
import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

// Increase timeout for this route
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
  try {
    const { crawlData, userEmail, url } = await req.json();

    // Validation
    if (!crawlData) {
      return NextResponse.json(
        { error: "No content provided for analysis" },
        { status: 400 }
      );
    }

    if (!userEmail) {
      return NextResponse.json(
        { error: "User email required" },
        { status: 400 }
      );
    }

    // Analyze with Gemini
    console.log("Starting analysis...");
    const analysis = await analyzeStartup(crawlData);

    if (!analysis) {
      return NextResponse.json(
        { error: "Failed to analyze content. Please try again." },
        { status: 500 }
      );
    }

    console.log("Analysis complete, saving to database...");

    // Save to Convex with timeout protection
    let reportId = null;
    try {
      // Add timeout to Convex mutation
      const convexPromise = convex.mutation(api.reports.createReport, {
        userEmail: userEmail,
        originalUrl: url,
        reportData: JSON.stringify(analysis),
      });

      // Race against a timeout
      reportId = await Promise.race([
        convexPromise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Convex timeout")), 10000)
        ),
      ]);

      console.log("Report saved with ID:", reportId);
    } catch (convexError) {
      // Log but don't fail the request
      console.error("Convex save error (non-fatal):", convexError);
      console.warn("Returning analysis without saving to DB");

      // Return analysis anyway with a warning
      return NextResponse.json({
        ...analysis,
        warning: "Analysis completed but could not be saved to database",
        reportId: null,
      });
    }

    // Success with report ID
    return NextResponse.json({
      ...analysis,
      reportId,
    });
  } catch (error) {
    console.error("Analysis API Error:", error);

    // Provide detailed error message
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        error: "Analysis failed",
        message: errorMessage,
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}
