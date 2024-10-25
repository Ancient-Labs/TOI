import config from "../config/config.ts";
import * as jwt from 'jsonwebtoken';
import userModel from "../models/user.model.ts";
import express from 'express';

type decodedTokenType = {
    id: string
}

export function checkUser(req: express.Request, res: express.Response, next: () => void)
{
    const token = req.cookies.auth;

    if (!token) 
    {
        res.locals.user = null;
        next();
    }

    jwt.verify(token, config.JWT_TOKEN, async(err: string | object, decodedToken: decodedTokenType) => {
        if (err)
        {
            res.locals.user = null;
            next();
        } else {
            const user = await userModel.findById(decodedToken.id).select('-password');
            res.locals.user = user;
            next();
        }
    })
}

export function requireAuth(req: express.Request, res: express.Response, next: () => void)
{
    const token = req.cookies.auth;

    if(!token) return res.status(200);
    
    jwt.verify(token, config.JWT_TOKEN, (err: string, _decodedToken: decodedTokenType) => {
        if (err)
        {
            console.log(err);
        } else {
            next();
        }
    })

}