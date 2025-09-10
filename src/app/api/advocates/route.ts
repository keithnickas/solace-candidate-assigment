import db from "../../../db";
import { advocates } from "../../../db/schema";
import { ApiError } from "../../utils/error-handling";

/**
 * @returns {Promise<Response>} A JSON response containing all advocates from the database.
 */ 
export async function GET() {
  try {
    const data = await db.select().from(advocates);
    return Response.json({ data });
  } catch (error: Error | unknown) {
    console.error(error);
    throw new ApiError("Failed to fetch advocates");
  }
}
