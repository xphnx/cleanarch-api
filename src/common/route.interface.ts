import { NextFunction, Request, Response, Router } from "express";

export interface ControllerRoute {
    path: string;
    handler: (req: Request, res: Response, next: NextFunction) => void;
    method: keyof Pick<Router, 'get' | 'post' | 'patch' | 'put' | 'delete'>;
}