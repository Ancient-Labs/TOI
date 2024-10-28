import type { Document, Model } from "mongoose";

// src/types/user.ts
export interface User
{
    _id: string,
    username: string,
    email: string, 
    password: string,
    createdAt: Date | string,
    updatedAt: Date | string
}

export interface IUser
{
    username: string,
    email: string,
    password: string,
    createdAt: string | Date,
    updatedAt: string | Date
}

export interface IUserDocument extends IUser, Document {
    _id: string
}

export interface IUserModel extends Model<IUserDocument> {
    login(log: string, password: string): Promise<IUserDocument | null>
    checkPassword(id: string, password:string): Promise<boolean>
}

export type UserID = IUserDocument['_id'];