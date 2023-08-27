import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import http, { Server as HttpServer } from "http";
import helmet from "helmet";
import cors from "cors";
import router from "./routes";

export class Server {
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
    this.app.use("/", router);
  }

  // Start the Express server
  public start(port: number = (Number(process.env.PORT) || 0)): void {
    this.server = http.createServer(this.app); // Create the server instance
    this.server.listen(port, () => {
      // console.log(`Server is running on port ${process.env.PORT}`);
    });
  }

  public stop(): void {
    if (this.server) {
      this.server.close(() => {
        // console.log("Server has been stopped.");
      });
    }
  }
}

// Create an instance of the Server class and start the server
const server = new Server();
server.start(Number(process.env.PORT));
