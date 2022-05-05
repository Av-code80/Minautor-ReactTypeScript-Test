import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import UserType from "../../types/UserType";
import { editUser, getUser, getUserPost, getUsers } from "../../gate";
import Post from "../../types/Post";

interface UserStateType {
  users: UserType[];
  posts: Post[];
  activeUser?: UserType;
  error?: SerializedError;
  loading?: boolean;
}

const initialState: UserStateType = {
  users: [],
  posts: [],
  activeUser: undefined,
  error: undefined,
  loading: false,
};

export const getUsersAction = createAsyncThunk<UserType[]>(
  "get-users",
  async (): Promise<UserType[]> => {
    try {
      const res = await getUsers();
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const getUserAction = createAsyncThunk<UserType, { userId: string }>(
  "get-user",
  async ({ userId }): Promise<UserType> => {
    try {
      const res = await getUser(userId);
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const getUserPostAction = createAsyncThunk<Post[], { userId: string }>(
  "get-user-posts",
  async ({ userId }): Promise<Post[]> => {
    try {
      const res = await getUserPost(userId);
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const editUserAction = createAsyncThunk<
  UserType,
  { userId: string; name: string }
>("edit-user", async ({ userId, name }): Promise<UserType> => {
  try {
    const res = await editUser(userId, { name });
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    emptyActiveUser: (state) => {
      state.activeUser = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUsersAction.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(getUsersAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(getUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserAction.fulfilled, (state, action) => {
      state.activeUser = action.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(getUserAction.rejected, (state, action) => {
      state.activeUser = undefined;
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(editUserAction.pending, (state, action) => {});
    builder.addCase(editUserAction.fulfilled, (state, action) => {
      state.error = undefined;
    });
    builder.addCase(editUserAction.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(getUserPostAction.pending, (state, action) => {});
    builder.addCase(getUserPostAction.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(getUserPostAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const { emptyActiveUser } = usersSlice.actions;
