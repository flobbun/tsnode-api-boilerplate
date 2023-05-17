import {Connection, model, Schema} from 'mongoose';

export const refreshTokenSchema = new Schema(
    {
      token: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
    }
);

const RefreshTokenModel = model('RefreshToken', refreshTokenSchema);

export const createRefreshTokenModel = (connection: Connection) => connection.model('RefreshToken', refreshTokenSchema);

export {RefreshTokenModel};
