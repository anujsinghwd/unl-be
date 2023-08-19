import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';

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
  }

  public start(): void {
    this.app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  }
}

const server = new Server();
server.start();
