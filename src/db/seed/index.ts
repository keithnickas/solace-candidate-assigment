import db from "..";
import { advocates } from "../schema";
import { advocateData } from "./advocates";

async function seedDb() {
  console.log("Seeding database with advocate data...");
  await Promise.all(
    advocateData.map(async (advocate) => {
      console.log("Inserting advocate:", advocate.firstName, advocate.lastName);
      await db.insert(advocates).values(advocate);
    })
  );

  await db.select().from(advocates).then((rows) => {
    console.log("Current advocates in database:", rows.length);
  });
  console.log("Database seeding completed.");

  process.exit(0);
}

seedDb();
