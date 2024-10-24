import type { Model } from "mongoose";
import type { ObjectId } from "mongoose";
import type { Document } from "mongoose";
import { Schema } from "mongoose";
import { isEmail } from "npm:validator/lib/isEmail"
import {genSalt, hash, compare} from "bcrypt";
import { model } from "mongoose";


export interface IUser extends Document
{
    _id: ObjectId | string,
    username: string,
    email: string,
    password: string,
    createdAt: Date | string,
    updatedAt: Date | string,
}

export interface UserModel extends Model<IUser> {
    login(log:string, password:string):Promise<Document>;
}

const userSchema = new Schema<IUser>({
    username: {type: String, required:true, maxlength:24, minlength:3},
    email: {type:String, required:true, validate:isEmail},
    password: {type:String, required:true},    
});

// Before create account, we hash the password
userSchema.pre<IUser>('save', async function(this: IUser, next) {
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

//default export.
const userModel = model<IUser, UserModel>('user', userSchema);
export default userModel;