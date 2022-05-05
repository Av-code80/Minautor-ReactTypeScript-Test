import { RootState } from "../store"

// get whole auth state
export const usersSelector = (state: RootState) => state.users;
