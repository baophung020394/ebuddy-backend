import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { admin, db } from "../configs/config.firebase";
import { BadRequestError } from "../entities/error.response";
import { UserData } from "../models/User.model";

const userCollection = collection(db, "USERS");

const updateUserInDB = async (userId: string, name: UserData) => {
  const userRef = doc(userCollection, userId);
  const userDoc = await getDoc(userRef);
  console.log("userDoc", userDoc?.id);
  if (userDoc.id === userId) {
    await setDoc(userRef, { name }, { merge: true });
  } else {
    throw new Error("User not found");
  }

  return name;
};

const fetchUsersFromDB = async () => {
  // const userCollection = collection(db, "USERS"); // Thay "users" bằng tên bộ sưu tập của bạn
  const userSnapshot = await getDocs(userCollection);
  const users = userSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return users;
};

const createUserInDB = async (data: UserData) => {
  const userId = uuidv4();
  const userRef = doc(userCollection, userId);
  await setDoc(userRef, data);
  return { ...data, id: userId };
};

const logoutFirebase = async (userId: string) => {
  return await admin.auth().revokeRefreshTokens(userId);
};

const authUser = async (accessToken: string) => {
  return await admin.auth().verifyIdToken(accessToken);
};

export {
  createUserInDB,
  fetchUsersFromDB,
  logoutFirebase,
  updateUserInDB,
  authUser,
};
