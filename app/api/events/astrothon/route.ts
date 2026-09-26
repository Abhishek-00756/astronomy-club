import { NextResponse } from "next/server";
import { readdir } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export async function GET() {
  const directory = path.join(process.cwd(), "public", "events", "astrothon");

  try {
    const files = await readdir(directory);
    const images = files
      .filter((file) => imageExtensions.has(path.extname(file).toLowerCase()))
      .sort(() => Math.random() - 0.5)
      .slice(0, 12)
      .map((file) => `/events/astrothon/${encodeURIComponent(file)}`);

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] }, { status: 200 });
  }
}
