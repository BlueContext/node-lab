import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import errorhandler = require("errorhandler");
import methodOverride = require("method-override");
import { IndexRoute } from "./routes/index";

//The server

export class Server {
    public app: express.Application;

    //Bootstrap the application
    public static bootstrap(): Server {
        return new Server();
    }

    //Constructor
    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //add routes
        this.routes();

        //add api
        this.api();
    }

    //create REST API routes
    public api() {

    }

    //configure application
    public config() {
        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));

        //cofigure pug
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");

        //use logger middleware
        this.app.use(logger("dev"));

        //use json form parser middleware
        this.app.use(bodyParser.json());

        //use query string parser middleware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        //use cookie parser middleware
        this.app.use(cookieParser("SECRET_GOES_HERE"));

        //use override middleware
        this.app.use(methodOverride());

        //catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorhandler());
    }

    //create router
    public routes() {
        let router: express.Router;
        router = express.Router();

        IndexRoute.create(router);

        this.app.use(router);
    }
}