import Post from "../types/Post";
import UserType from "../types/UserType";
import api from "./api";

export const getUsers = () => {
  return api.get<UserType[]>("users")
};

export const getUser = (userId: string) => {
  return api.get<UserType>(`users/${userId}`)
};

export const getUserPost = (userId: string) => {
  return api.get<Post[]>(`posts?userId=${userId}`)
};

export const editUser = (userId: string, data: { name: string }) => {
  return api.patch<UserType>(`users/${userId}`, data)
};



