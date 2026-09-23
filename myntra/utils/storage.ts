import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const isWeb = Platform.OS === "web";

export const setStore = async (key: string, value: string) => {
  if (isWeb && typeof localStorage !== "undefined") {
    localStorage.setItem(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
};

export const getStore = async (key: string) => {
  if (isWeb && typeof localStorage !== "undefined") {
    return localStorage.getItem(key);
  }
  return SecureStore.getItemAsync(key);
};

export const removeStore = async (key: string) => {
  if (isWeb && typeof localStorage !== "undefined") {
    localStorage.removeItem(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
};

export const saveUserData = async (
  _id: string,
  name: string,
  email: string,
  method = "email"
) => {
  await setStore("userid", _id);
  await setStore("userName", name);
  await setStore("userEmail", email);
  await setStore("userMethod", method);
};

export const getUserData = async () => {
  const _id = await getStore("userid");
  const name = await getStore("userName");
  const email = await getStore("userEmail");
  const method = await getStore("userMethod");
  return { _id, name, email, method };
};

export const clearUserData = async () => {
  await removeStore("userid");
  await removeStore("userName");
  await removeStore("userEmail");
  await removeStore("userMethod");
};
