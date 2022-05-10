import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { usersSelector } from "../redux/selectors";
import { useDispatch } from "react-redux";
import { getUsersAction } from "../redux/slices/users";
import { AppDispatch, useSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

export const UsersTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userState = useSelector(usersSelector);

  useEffect(() => {
    dispatch(getUsersAction());
  }, []);

  const onEditClick = (e: any, userId: number) => {
    navigate(`user/${userId.toString()}`);
    e.preventDefault();
  };

  const onPostClick = (e: any, userId: number) => {
    navigate(`posts/${userId.toString()}`);
    e.preventDefault();
  };

  return userState.loading ? (
    <div className={styles.loading}>
      <CircularProgress />
    </div>
  ) : (
    <div className={styles.wrapper}>
      <div className={styles.wrapperTotalNumber}>
        <div className={styles.infoContiner}>
          <div className={styles.description}>
            Number of users living in SUITE:
          </div>
          <div className={styles.information}>
            {userState.users.filter((user) =>
              user.address.suite.includes("Suite")
            ).length}
          </div>
        </div>
        <div className={styles.infoContiner}>
          <div className={styles.description}>
            Number of users living in APT:
          </div>
          <div className={styles.information}>
            {userState.users.filter((user) => user.address.suite.includes("Apt"))
              .length}
          </div>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={styles.tableTh}>Id</TableCell>
              <TableCell className={styles.tableTh} align="center">Name</TableCell>
              <TableCell className={styles.tableTh} align="center">Username</TableCell>
              <TableCell className={styles.tableTh} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userState.users?.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    onClick={(e) => onPostClick(e, user.id)}
                  >
                    Posts
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={(e) => onEditClick(e, user.id)}
                    className={styles.secondButton}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersTable;
