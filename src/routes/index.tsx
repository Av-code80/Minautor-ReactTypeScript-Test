
import { Routes, Route } from "react-router-dom";
import UsersTable from "../pages";
import EditUser from "../pages/EditUser/editUser";
import UserPosts from "../pages/UserPosts/userPosts";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersTable />} />
      <Route path="/user/:id" element={<EditUser />} />
      <Route path="/posts/:id" element={<UserPosts />} />
    </Routes>
  );
};

export default AppRoutes;
