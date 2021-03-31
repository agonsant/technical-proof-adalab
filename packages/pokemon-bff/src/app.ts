import express, { Application } from 'express';
import cors from 'cors';

/**
 * Express App class that initialices the APP and defines the API routes
 */
export class App {
  private readonly app: Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(cors());
    this.app.get('/', (_req, res) => {
      res.send('Hello World!');
    });
  }

  public retrieveApp(): Application {
    return this.app;
  }
}
