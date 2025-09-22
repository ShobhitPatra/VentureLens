import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!process.env.FIRECRAWL_API_KEY) {
      return NextResponse.json(
        { error: "FIRECRAWL API KEY MISSING" },
        { status: 400 }
      );
    }
    console.log(url);
    if (!url) {
      return NextResponse.json({ message: "INVALID URL" }, { status: 400 });
    }
    const response = await fetch(`https://api.firecrawl.dev/v1/crawl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}`,
      },
      body: JSON.stringify({
        url,
        limit: 10,
        maxDepth: 3,
        scrapeOptions: {
          formats: ["markdown"],
        },
      }),
    });
    if (!response.ok) {
      return NextResponse.json(
        { error: "ERROR GETTING CRAWL ID " },
        { status: response.status }
      );
    }
    const data = await response.json();
    const crawl_id = data.id;
    return NextResponse.json({ crawl_id });
  } catch (error) {
    console.log(`ERROR IN api/crawl POST ROUTE  ,error :${error}`);
    NextResponse.json({ message: "INTERVAL SERVER ERROR" }, { status: 500 });
  }
}
