import { omit } from 'lodash';
import { Document } from 'mongoose';
import { PublicUser } from '../interfaces';

/**
 * Array containing user private fields, for example: password
 */
export const privateFields = [
    'password',
    '__v',
    'createdAt'
]

/**
 * Takes an array of users and returns an array of public users
 */
export const getPublicUsers = async (users: Document<unknown>[]) => {
    return Promise.all(users.map(async (user) => await getPublicUser(user)));
}

/**
 * Takes a user and returns a public user
*/
export const getPublicUser = async (user: Document<unknown>) => {
    const userData = user.toObject();

    return omit(userData, privateFields) as PublicUser;
}