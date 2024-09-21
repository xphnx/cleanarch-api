import { NextFunction, Request, Response } from "express";

export interface Exeption {
    catch: (error: Error, request: Request, response: Response, next: NextFunction) => void;
}