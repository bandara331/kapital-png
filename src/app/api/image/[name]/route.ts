import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  const { name } = await params;
  
  let filePath = "";
  if (name === "mission") {
    filePath = "C:/Users/Sasmitha Thejan/.gemini/antigravity-ide/brain/a9caec5b-b8be-4723-af87-37a26f00658a/png_mission_1790877291925.png";
  } else if (name === "vision") {
    filePath = "C:/Users/Sasmitha Thejan/.gemini/antigravity-ide/brain/a9caec5b-b8be-4723-af87-37a26f00658a/png_vision_1790877314553.png";
  } else {
    return new NextResponse("Not Found", { status: 404 });
  }

  try {
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    return new NextResponse("Error reading image", { status: 500 });
  }
}
