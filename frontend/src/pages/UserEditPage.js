import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_RESET } from "../constants/userContants";

export default function UserEditPage(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStockKeeper, setIsStockKeeper] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  console.log("user details >>>", userDetails);

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;
  console.log("user update >>>", userUpdate);

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push("/userlist");
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsSuperAdmin(user.isSuperAdmin);
      setIsAdmin(user.isAdmin);
      setIsStockKeeper(user.isStockKeeper);
    }
  }, [dispatch, successUpdate, props.history, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        isSuperAdmin,
        isAdmin,
        isStockKeeper,
      })
    );
  };
  return (
    <div className="useredit-container">
      <form className="form" onSubmit={submitHandler}>
        <h1>Edit User</h1>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox type="danger">{errorUpdate}</MessageBox>}

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox type="danger">{error}</MessageBox>
        ) : (
          <>
            <div className="row">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter your shitty name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="row">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Enter your shitty email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="row">
              <label htmlFor="isSuperAdmin">isSuperAdmin</label>
              <input
                type="checkbox"
                id="isSuperAdmin"
                value={isSuperAdmin}
                onChange={(e) => setIsSuperAdmin(e.target.value)}
              ></input>
            </div>
            <div className="row">
              <label htmlFor="isAdmin">isAdmin</label>
              <input
                type="checkbox"
                id="isAdmin"
                value={isAdmin}
                onChange={(e) => setIsAdmin(e.target.value)}
              ></input>
            </div>
            <div className="row">
              <label htmlFor="isStockKeeper">isStockKeeper</label>
              <input
                type="checkbox"
                id="isStockKeeper"
                value={isStockKeeper}
                onChange={(e) => setIsStockKeeper(e.target.value)}
              ></input>
            </div>
            <div>
              <button className="update-btn">Update</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
