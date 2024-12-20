import type { Model } from "mongoose";
import type { Document } from "mongoose";
import { Schema } from "mongoose";
import {genSalt, hash, compare} from "bcrypt";
import { model } from "mongoose";
import isEmail from "npm:validator/lib/isEmail.js";
import type { IUserDocument, User } from "../src/types/index.ts";
import type { IUserModel } from "../src/types/user.ts";
import { isValidObjectId } from "mongoose";
import { isEmpty } from "../src/utils/index.ts";


export interface UserModel extends Model<User> {
    login(log:string, password:string):Promise<Document>;
}

const userSchema:Schema<IUserDocument> = new Schema ({
    username: {type: String, required:true, maxlength:24, minlength:3},
    email: {type:String, required:true, validate:isEmail},
    password: {type:String, required:true},    
});

// Before create account, we hash the password
userSchema.pre<User>('save', async function(this: User, next) {
    const salt:string = await genSalt();
    this.password = await hash(this.password, salt);
    next();
});

// Login function to see if the password match.
userSchema.statics.login = async function (log:string, password:string)
{
    let user;

    if(isEmail(log))
    {
        user = await userModel.findOne({email: log});
    }
    else 
    {
        user = await userModel.findOne({username: log});
    }

    if (user) 
    {
        const auth = await compare(password, user.password);
        if (auth)
        {
            return user
        }
        else
        {
            throw new Error("Incorrect logs");
        }
    }
}

userSchema.statics.checkPassword = async function (id:string, password:string): Promise<boolean>
{
    if (!isValidObjectId(id)) return false //TODO : Error handle
    const user = await userModel.findById(id);
    if (isEmpty(user)) return false
    const authUser = await compare(password, user!.password);
    return authUser;

}

//default export.
const userModel = model<IUserDocument, IUserModel>('user', userSchema);
export default userModel;