import { Connection, model, Schema } from "mongoose";

export const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export const createUserModel = (connection: Connection) =>
  connection.model("User", UserSchema);

export { UserModel };
