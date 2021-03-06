import {NextFunction, Request, Response} from "express";

//constructor

export class BaseRoute {
    protected title: string;
    private scripts: string[];

    constructor() {
        this.title = "Tour of Heros";
        this.scripts = [];
    }

    //add a JS external file to the request
    public addScript(src: string): BaseRoute {
        this.scripts.push(src);
        return this;
    }

    //render a page
    public render(req: Request, res: Response, view: string, options?: Object) {
        //add constants
        res.locals.BASE_URL = "/";

        //add scripts
        res.locals.scripts = this.scripts;

        //add title
        res.locals.title = this.title;

        //render view
        res.render(view, options);
    }
}