import express, { Application } from 'express';
import cors from 'cors';
import { router } from './routes/pokemon';

/**
 * Express App class that initialices the APP and defines the API routes
 */
export class App {
  private readonly app: Application;
  private readonly API_VERSION = 'v1';

  constructor() {
    this.app = express();
    this.config();
  }

  /**
   * starts a server in the input port
   * @param {string} port the port to listen the server
   * @memberof App
   */
  startServer(port: string): void {
    this.app.listen(port, () => {
      console.log('listening on port ' + port);
    });
  }

  /**
   * Configure the server app with its middlewares and routes
   */
  private config(): void {
    this.app.use(cors());
    this.app.use(`/api/${this.API_VERSION}/`, router);
    this.app.get('/info', (_req, res) => {
      res.json({ status: 'OK', version: this.API_VERSION });
    });
  }
}
