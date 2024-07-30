import { UserData } from "../models/User.model";
import {
  createUserInDB,
  fetchUsersFromDB,
  updateUserInDB,
  logoutFirebase,
  authUser,
} from "../repository/userCollection";

const updateUser = async (userId: string, data: UserData) => {
  return await updateUserInDB(userId, data);
};

const fetchUser = async (userId?: string) => {
  return await fetchUsersFromDB();
};

const createUser = async (data: UserData) => {
  return await createUserInDB(data);
};

const logout = async (userId: string) => {
  return await logoutFirebase(userId);
};

const getUser = async (accessToken: string) => {
  return await authUser(accessToken);
};

export { UserData, createUser, fetchUser, updateUser, getUser, logout };
