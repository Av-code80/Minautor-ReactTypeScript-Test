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


// const uploadFile = {
//   uploadFile: (
//     data: FormData,
//     onUploadProgress: ((progressEvent: any) => void) | undefined
//   ) => api.file("/file-upload", data, onUploadProgress),
// };
