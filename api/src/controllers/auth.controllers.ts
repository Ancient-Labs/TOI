import { Request, Response } from "npm:express";
import { sign } from "npm:jsonwebtoken";
import config from "../../config/config.ts";
import log from "../../log.ts";
import userModel from "../../models/user.model.ts";
import { type IUserDocument, type IUserModel } from "../types/index.ts";

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
    
    try {
        const user:any = await userModel.login(log, password);
        if (user)
        {
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
export const signout = async(_req: Request, res: Response) => {
    res.cookie("auth", null, {httpOnly: true, maxAge: 1});
    return res.status(200).send('logout');
}