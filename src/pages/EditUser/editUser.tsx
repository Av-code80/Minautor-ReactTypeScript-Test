import { LoadingButton } from "@mui/lab";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { usersSelector } from "../../redux/selectors";
import {
  editUserAction,
  emptyActiveUser,
  getUserAction,
} from "../../redux/slices/users";
import { AppDispatch, useSelector } from "../../redux/store";
import UserType from "../../types/UserType";
import styles from "./editUser.module.css";
import BackButton from "../../components/BackButton";

export const EditUser = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userState = useSelector(usersSelector);

  const [user, setUser] = useState<UserType>({} as UserType);

  useEffect(() => {
    if (id) {
      dispatch(getUserAction({ userId: id }));
    }
    return () => {
      dispatch(emptyActiveUser());
    };
  }, []);

  useEffect(() => {
    if (userState.activeUser) {
      setUser(userState.activeUser);
    }
  }, [userState.activeUser]);

  const onEditClick = async () => {
    if (id) {
      await dispatch(editUserAction({ userId: id, name: user.name }));
      navigate("/", { replace: true });
    }
  };

  const onNameChange = (e: any) => {
    setUser((prevUser) => {
      return {
        ...prevUser,
        name: e.target.value,
      };
    });
  };

  return userState.loading ? (
    <div className={styles.loading}>
      <CircularProgress />
    </div>
  ) : (
    <div className={styles.inputWrapper}>
      <div>
        <BackButton />
      </div>
      <TextField
        id="id"
        label="Id"
        variant="outlined"
        disabled
        value={user?.id}
      />

      <TextField
        className={styles.firstField}
        id="username"
        label="User Name"
        variant="outlined"
        disabled
        value={user?.username}
      />

      <TextField
        className={styles.secondField}
        id="name"
        label="Name"
        variant="outlined"
        value={user?.name}
        onChange={onNameChange}
      />

      <LoadingButton
        onClick={onEditClick}
        className={styles.loadingButton}
        loading={false}
        loadingPosition="start"
        variant="contained"
        color="success"
      >
        Edit
      </LoadingButton>
    </div>
  );
};

export default EditUser;
