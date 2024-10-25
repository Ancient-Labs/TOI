import type { Document, Model } from "mongoose";

// src/types/user.ts
export interface User
{
    username: string,
    email: string,
    password: string,
}

export interface IUserDocument extends User, Document {}

export interface IUserModel extends Model<IUserDocument> {
    login(log: string, password: string): Promise<IUserDocument | null>
}

export type UserID = IUserDocument['_id'];