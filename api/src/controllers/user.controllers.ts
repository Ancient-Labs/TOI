import { Request, Response } from "npm:express"
import { isEmpty } from "../utils/isEmpty.ts";
import log from "../../log.ts";
import { isValidObjectId } from "mongoose";
import userModel from "../../models/user.model.ts";

export async function updateUsername(req:Request, res:Response)
{
    try {
        
        const {id, password, newUsername} : {id:string, password:string, newUsername: string} = req.body;
        
        if (isEmpty(id) || isEmpty(password) || isEmpty(newUsername)) return log("Empty id, password or newUsername at changeUsername", 0) // Todo error handle
        if (!isValidObjectId(id)) return log("not a valid id at changeUsername", 0);
        if (newUsername.length < 3 && newUsername.length > 24) return log("new username is too short or too long at changeUsername");

        const checkPassword = await userModel.checkPassword(id, password);
        if (checkPassword)
        {
            userModel.findByIdAndUpdate(id, {
                $set: {
                    username: newUsername
                }
            }, {upsert: true, new:true}).then((data) => {
                res.status(201).send(data);
            }).catch((error:string) => {
                console.log(error)
                //TODO Error handle
            })
        } else {
            return log("wrong password", 0) //TODO: error handle
        }
        

    } catch (error:unknown) {
        console.log(error); //TODO : error handle
    }
}