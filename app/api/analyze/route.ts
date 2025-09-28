import { analyzeStartup } from "@/lib/prompt";
import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export async function POST(req: Request) {
  try {
    const { crawlData, userEmail, url } = await req.json();

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

    const content = crawlData;
    const analysis = await analyzeStartup(content);

    if (!analysis) {
      return NextResponse.json(
        { error: "Error analyzing response form llm" },
        { status: 400 }
      );
    }

    const reportId = await convex.mutation(api.reports.createReport, {
      userEmail: userEmail,
      originalUrl: url,
      reportData: JSON.stringify(analysis),
    });

    if (!reportId) {
      return NextResponse.json(
        { error: "error inserting report in db" },
        { status: 400 }
      );
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis API Error:", error);
    return NextResponse.json(
      {
        error: "Analysis failed",
        message: error,
      },
      { status: 500 }
    );
  }
}
