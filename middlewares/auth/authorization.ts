import  express from "express";
import jwt from "jsonwebtoken";
import { NextFunction } from "express";

const authorie = (
    req: express.Request,
    res: express.Response,
    next : NextFunction
) => {
    const token = req.headers['authorization'] || '';
    let tokenIsValid ; 
    try {
        tokenIsValid = jwt.verify(token, process.env.SECRET_KEY || '');
    }catch(error){}
    if(tokenIsValid){
        const decode = jwt.decode(token);
        res.locals.user = decode;
        next();
    }else{
        res.status(401).send(' You are unauthorized');
    }
}

export {authorie};