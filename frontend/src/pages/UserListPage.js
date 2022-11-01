import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_DETAILS_RESET } from "../constants/userContants";

export default function UserListPage() {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  console.log("users list >>>", users);

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;
  console.log("loading delete >>>", userDelete);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch, successDelete]);

  const deleteHandler = (user) => {
    if (window.confirm("you really wann delete that asshole")) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <div>
      <h1>Users List</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox type="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox type="success">User Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox type="danger">{error}</MessageBox>
      ) : (
        <div>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS SUPER ADMIN</th>
              <th>IS ADMIN</th>
              <th>IS STOCK KEEPER</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSuperAdmin ? "YES" : "NO"}</td>
                <td>{user.isAdmin ? "YES" : "NO"}</td>
                <td>{user.isStockKeeper ? "YES" : "NO"}</td>
                <td>
                  <button type="button" className="userlist-btn">
                    Edit
                  </button>
                  <button
                    type="button"
                    className="userlist-btn"
                    onClick={() => deleteHandler(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </div>
      )}
    </div>
  );
}
