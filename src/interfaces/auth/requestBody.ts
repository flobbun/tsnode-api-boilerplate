export interface BodyToken {
    _id: string;
    email: string;
    exp: number;
    iat: number;
}

export interface RequestBody {
    user: BodyToken;
}