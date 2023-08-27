import express, { Router, Request, Response } from "express";
import fs from "fs";
import csvParser from "csv-parser";
import path from "path";
import calculateDistances from "./helpers/calculate-distance";

const router: Router = express.Router();

// Handle the root route with a simple "Hello, Express!" message
router.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express!");
});

// Handle the '/search' route for searching in CSV file
router.get("/search", (req: Request, res: Response) => {
  const searchText = req.query.text?.toString() || "";

  const csvFilePath = path.join(__dirname, "worldcities.csv");

  const results: any[] = [];
  let count = 0;

  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on("data", (row) => {
      if (
        row.city.toLowerCase().includes(searchText.toLowerCase()) &&
        count < 10
      ) {
        results.push(row);
        count++;
      }
    })
    .on("end", () => {
      res.json(results);
    });
});

router.post("/distance-matrix", async (req: Request, res: Response) => {
  const latitudes: number[] = req.body.latitudes;
  const longitudes: number[] = req.body.longitudes;
  const unit: string = req?.body?.unit || "imperial";
  const distances = await calculateDistances(latitudes, longitudes, unit);
  res.json(distances);
});

export default router;
