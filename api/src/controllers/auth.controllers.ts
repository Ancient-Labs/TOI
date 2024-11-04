import { Request, Response } from "npm:express";
import { sign } from "npm:jsonwebtoken";
import config from "../../config/config.ts";
import log from "../../log.ts";
import userModel from "../../models/user.model.ts";
import type { IUserDocument, User } from "../types/index.ts";
import { isEmpty } from "../utils/isEmpty.ts";

//Cookie maxAge 7 days
const maxAge:number = 604800000;

//function that create JSW token
function createToken(id:string): string {
    return sign({id}, config.JWT_TOKEN as string, {
        expiresIn: maxAge
    });
};

export async function signup(req:Request, res:Response): Promise<void>
{
    // Username, Email and password are required.
    const {username, email, password}: {username:string,email:string,password:string} = req.body;

    //TODO : Edit error Handler
    if (isEmpty(username)) res.status(500).send({error: "not valid username"})
    if (isEmpty(email)) res.status(500).send({error: "not valid email"})
    if (isEmpty(password)) res.status(500).send({error: "not valid password"})

    try {
        const user = await userModel.create({username, email, password});
        log(`New user created : ${user._id}`, 3)
        return res.status(201).json({user:user._id});
    } catch (error:unknown) {
        // TODO : Error handle
        res.status(200).send(error);
    };
}

export async function signin(req:Request, res:Response): Promise<void>
{
    // Require a log (can be ethier email or username) and the password
    const {log, password}: {log:string,password:string} = req.body;
    
    //TODO : Edit error Handler
    if (isEmpty(log)) res.status(500).send({error: "not valid log"})
    if (isEmpty(password)) res.status(500).send({error: "not valid password"})

    try {
        const queryUser:IUserDocument | null  = await userModel.login(log, password);
        if (queryUser)
        {
            const user:User = queryUser;
            const token:string = createToken(user._id);
            res.cookie('auth', token, {httpOnly: true, maxAge});
            return res.status(200).json({user});
        }
    } catch (error:unknown) {
        // handle Errors
        res.status(201).send(error);
    };
}

//to logout a user "signout"
export const signout = (_req: Request, res: Response) => {
    res.cookie("auth", null, {httpOnly: true, maxAge: 1});
    return res.status(200).send('logout');
}