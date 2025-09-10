import { Advocates } from "../types/advocates-types";

export async function getAdvocates(): Promise<Advocates> {
  try {
    const advocates = await fetch("/api/advocates");
    const advocateData = await advocates.json();
    return advocateData.data;
  } catch (error) {
    console.error("Error fetching advocates:", error);
    return [];
  }
}
