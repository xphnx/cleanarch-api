import { NextFunction, Request, Response } from "express";

export interface Users {
    signIn: (req: Request, res: Response, next: NextFunction) => void;
    signUp: (req: Request, res: Response, next: NextFunction) => void;
}