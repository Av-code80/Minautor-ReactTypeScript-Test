import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { usersSelector } from "../../redux/selectors";
import {
  emptyActiveUser,
  getUserAction,
  getUserPostAction,
} from "../../redux/slices/users";
import { AppDispatch, useSelector } from "../../redux/store";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./userPosts.module.css";
import BackButton from '../../components/BackButton'

export const UserPosts = () => {
  let { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const userState = useSelector(usersSelector);

  useEffect(() => {
    if (id) {
      dispatch(getUserAction({ userId: id }));
      dispatch(getUserPostAction({ userId: id }));
    }
    return () => {
      dispatch(emptyActiveUser());
    };
  }, []);

  return userState.loading ? (
    <div className={styles.loading}>
      <CircularProgress />
    </div>
  ) : (
    <div className={styles.wrapper}>
      <div>
        <BackButton />
      </div>
      <div className={styles.wrapperIDUser}>
        <div>
          <span className={styles.propertyStyle}>Name : </span>
          {userState.activeUser?.name}
        </div>
        <div className={styles.wrapperNumber}>
          <span className={styles.propertyStyle}> UserName : </span>
          {userState.activeUser?.username}
        </div>
      </div>
      <div className={styles.wrapperElements}>
        {userState.posts.map((post) => {
          return (
            <Accordion key={post.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{post.title}</Typography>
              </AccordionSummary>
              <AccordionDetails className={styles.wrapperBody}>
                <Typography>{post.body}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default UserPosts;
