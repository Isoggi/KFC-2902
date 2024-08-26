import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import { JWT_SECRET, PORT } from './config';
import { AuthRouter } from './routers/auth.router';
import { CategoryRouter } from './routers/category.router';
import { ProductRouter } from './routers/product.router';
import { ErrorHandler, responseHandler } from './helpers/response';
export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send(responseHandler('Not found !', null, false));
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          res
            .status(err.statusCode || 500)
            .send(responseHandler(err.message, null, false));
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });
    this.app.use('/api/auth', new AuthRouter().getRouter());
    this.app.use('/api/categories', new CategoryRouter().getRouter());
    this.app.use('/api/products', new ProductRouter().getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
