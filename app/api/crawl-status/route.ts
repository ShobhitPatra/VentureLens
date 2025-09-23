import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const crawl_id = searchParams.get("crawl_id");
    if (!crawl_id) {
      NextResponse.json(
        {
          error: "crawl_id missing",
        },
        { status: 400 }
      );
    }
    const res = await fetch(`https://api.firecrawl.dev/v1/crawl/${crawl_id}`, {
      headers: { Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}` },
    });
    const data = await res.json();
    return NextResponse.json({
      status: data.status,
      document: data.data ?? [],
    });
  } catch (error) {
    console.log(`ERROR IN api/crawl-satus/ POST ROUTE  ,error :${error}`);
    NextResponse.json({ message: "INTERVAL SERVER ERROR" }, { status: 500 });
  }
}
