/**
 * Type containing user private fields, for example: password
*/
type PrivateFields = 'password';

/**
 * Type containing user public fields
 */
export interface UserFields {
    email: string;
    password: string;
}

/**
 * Type containing user public fields
 */
export type PublicUser = Omit<User, PrivateFields>

/**
 * Type to represent an user coming from the database: User + _id
 */
export interface User extends UserFields {
    _id: string | any;
}