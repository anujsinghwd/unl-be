import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";
import csvParser from "csv-parser";

class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    dotenv.config();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello, Express!");
    });

    this.app.get("/search", (req: Request, res: Response) => {
      const searchText = req.query.text?.toString() || "";

      const results: any[] = [];
      fs.createReadStream("./data/cities.csv")
        .pipe(csvParser())
        .on("data", (row) => {
          if (row.city.toLowerCase().includes(searchText.toLowerCase())) {
            results.push(row);
          }
        })
        .on("end", () => {
          res.json(results);
        });
    });
  }

  public start(): void {
    this.app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  }
}

const server = new Server();
server.start();
