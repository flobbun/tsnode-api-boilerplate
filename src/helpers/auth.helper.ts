import {sign} from 'jsonwebtoken';
import { Document } from 'mongoose';
import config from '../configurations/config';
import { User } from '../interfaces';
import { LogsService } from '../services/http/logs.service';
import { LogTypesEnum } from '../constants/logTypes.enum';

const {JWT_TOKEN, JWT_EXPIRATION, JWT_REFRESH_TOKEN} = config;

/**
 * Generates a JWT token from a user
*/
export const generateToken = (user: Partial<User>) => sign({_id: user._id, email: user?.email}, JWT_TOKEN, {expiresIn: JWT_EXPIRATION});

/**
 * Generates a JWT refresh token from a user
*/
export const generateRefreshToken = (user: Partial<User>) => sign({_id: user._id, email: user?.email}, JWT_REFRESH_TOKEN);

/**
 * Takes a user and returns a token and a refresh token
 */
export const getUserCredentials = (user: Partial<User> | Partial<Document<unknown, any, User>>) => {
  try {
    return {
      token: generateToken(user),
      refreshToken: generateRefreshToken(user),
    };
  } catch (error) {
    LogsService.log(error as string, LogTypesEnum.ERROR)
    throw new Error('Error generating token');
  }
};
