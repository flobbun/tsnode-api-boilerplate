import { Errors } from '../../constants/errors';
import { getPublicUser } from '../../helpers/users.helper';
import { PublicUser } from '../../interfaces';
import { UserModel } from '../../models/user.model';

class UserService {
  async getUsers() {
    const users = await UserModel.find();
    return users;
  }

  async getUser(id: string) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error(Errors.USER_NOT_FOUND);
    }
    return (await getPublicUser(user));
  }

  async updateUser(id: string, user: PublicUser) {
    return await UserModel.findByIdAndUpdate(id, user);
  }
}

const userService = new UserService();
export { userService as UserService };

