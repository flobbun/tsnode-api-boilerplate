import { compare as verify, hash } from "bcrypt";
import { verify as verifyToken } from "jsonwebtoken";
import config from "../../configurations/config";
import { Errors } from "../../constants/errors";
import UserFacingError from "../../errors/UserFacingError";
import { generateToken, getUserCredentials } from "../../helpers/auth.helper";
import {
  LoginBody,
  PublicUser,
  SignupBody,
  User,
} from "../../interfaces";
import { RefreshTokenModel } from "../../models/refreshToken.model";
import { UserModel } from "../../models/user.model";
import { getPublicUser } from "../../helpers/users.helper";

class AuthService {
  checkEmail = async (email: string): Promise<{ exists: boolean }> => ({
    exists: (await UserModel.countDocuments({ email })) > 0,
  });

  async signUp(data: SignupBody) {
    const { email, password } = data;
    const userExists = await UserModel.findOne({ email }).lean();
    if (userExists) {
      throw new UserFacingError(Errors.USER_ALREADY_EXISTS);
    }

    try {
      await UserModel.create({
        email,
        password: await hash(password, 10),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async logIn(
    data: LoginBody
  ): Promise<{ user: PublicUser; token: string; refreshToken: string }> {
    const user = await UserModel.findOne({ email: data.email });
    if (!user) {
      throw new UserFacingError(Errors.USER_NOT_FOUND);
    }
    if (!(await verify(data.password, user.password))) {
      throw new UserFacingError(Errors.INVALID_CREDENTIALS);
    }
    const credentials = getUserCredentials(user);
    await RefreshTokenModel.create({
      token: credentials?.refreshToken,
      userId: user._id,
    });
    return {
      user, 
      ...credentials!,
    };
  }

  async refreshToken(
    token: string
  ): Promise<{ user: PublicUser; token: string }> {
    const refreshToken = await RefreshTokenModel.findOne({ token });
    if (!refreshToken) {
      throw new UserFacingError(Errors.INVALID_REFRESH_TOKEN);
    }
    const user = await UserModel.findById(refreshToken.userId);
    if (!user) {
      throw new UserFacingError(Errors.USER_NOT_FOUND);
    }

    try {
      const decoded = verifyToken(
        token as string,
        config.JWT_REFRESH_TOKEN as string
      );
      return {
        user: await getPublicUser(user),
        token: generateToken(decoded as User),
      };
    } catch (error) {
      throw new UserFacingError(Errors.INVALID_REFRESH_TOKEN);
    }
  }

  async logOut(token: string): Promise<void> {
    const refreshToken = await RefreshTokenModel.findOne({ token });
    if (!refreshToken) {
      throw new UserFacingError(Errors.INVALID_REFRESH_TOKEN);
    }
    await RefreshTokenModel.deleteOne({ token });
  }
}

const authService = new AuthService();
export { authService as AuthService };
