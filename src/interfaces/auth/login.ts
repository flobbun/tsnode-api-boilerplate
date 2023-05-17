import { PublicUser } from "../user";

export interface LoginBody{
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: PublicUser;
    refreshToken: string;
}