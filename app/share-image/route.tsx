import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };


export async function GET() {
  const logo = await readFile(join(process.cwd(), "public/images/original-site/logo.png"));
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#ffffff" }}>
      <img src={`data:image/png;base64,${logo.toString("base64")}`} alt="" width={800} height={531} style={{ objectFit: "contain" }} />
    </div>,
    size,
  );
}
