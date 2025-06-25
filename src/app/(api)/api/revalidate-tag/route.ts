import { TOP_10_REQUEST_TAG } from "@/constants/api";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export function GET() {
  revalidateTag(TOP_10_REQUEST_TAG);

  return NextResponse.json({
    status: "success",
    TOP_10_REQUEST_TAG,
  });
}
