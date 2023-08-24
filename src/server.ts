import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";
import csvParser from "csv-parser";
import path from "path";
import http, { Server as HttpServer } from "http";
import helmet from "helmet";
import cors from "cors";

class Server {
  private app: Express;
  private server: HttpServer | null;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public getApp(): Express {
    return this.app;
  }

  // Configure the application settings
  private config(): void {
    dotenv.config(); // Load environment variables from '.env' file
    this.app.use(express.json()); // Parse JSON request bodies
    this.app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
    this.app.use(
      cors({
        origin: "*",
        methods: "GET",
      })
    );
    this.app.use(helmet());
  }

  // Define application routes
  private routes(): void {
    // Handle the root route with a simple "Hello, Express!" message
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello, Express!");
    });

    // Handle the '/search' route for searching in CSV file
    this.app.get("/search", (req: Request, res: Response) => {
      const searchText = req.query.text?.toString() || ""; // Get the search query from request

      // Construct the file path to the CSV file
      const csvFilePath = path.join(__dirname, "worldcities.csv");

      const results: any[] = []; // Array to store search results
      let count = 0; // Counter for limiting results

      // Read the CSV file, parse it, and search for matching rows
      fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on("data", (row) => {
          // Check if the city name includes the search text and the result count is within limit
          if (
            row.city.toLowerCase().includes(searchText.toLowerCase()) &&
            count < 10
          ) {
            results.push(row); // Add matching row to results
            count++; // Increment result count
          }
        })
        .on("end", () => {
          res.json(results); // Respond with the search results
        });
    });
  }

  // Start the Express server
  public start(): void {
    this.server = http.createServer(this.app); // Create the server instance
    this.server.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  }

  public stop(): void {
    if (this.server) {
      this.server.close(() => {
        console.log("Server has been stopped.");
      });
    }
  }
}

// Create an instance of the Server class and start the server
const server = new Server();
server.start();

export default Server;

