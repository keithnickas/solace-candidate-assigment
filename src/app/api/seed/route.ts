import Error from "next/error";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { ApiError } from "next/dist/server/api-utils";

export async function POST() {
  try {
  const records = await db.insert(advocates).values(advocateData).returning();
  return Response.json({ advocates: records });
  } catch (error: Error | unknown) {
    console.error(error);
    throw new ApiError(500, "Failed to seed advocates");
  }
}
