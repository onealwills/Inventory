import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function ProfilePage() {
  const userSignin = useSelector((state) => state.userSignin);
  console.log("usersignin for proffile page >>>", userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo._id]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="profile-container">
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox type="danger">{error}</MessageBox>
        ) : (
          <div>
            <div className="row">
              <label htmlFor="name" className="name-label">
                Name
              </label>
              <input
                type="text"
                placeholder="put your f** name"
                id="name"
                value={user.name}
              ></input>
            </div>
            <div className="row">
              <label htmlFor="Email" className="email-label">
                Email
              </label>
              <input
                type="email"
                placeholder="your Email"
                id="email"
                value={user.email}
              ></input>
            </div>
            <div className="row">
              <label htmlFor="password" className="password-label">
                password
              </label>
              <input
                type="password"
                placeholder="shitty password"
                id="password"
              ></input>
            </div>
            <div className="row">
              <label
                htmlFor="confirmpassword"
                className="confirmpassword-label"
              >
                password
              </label>
              <input
                type="password"
                placeholder="shitty password"
                id="confirmpassword"
              ></input>
            </div>
            <div className="row">
              <label />
              <button type="submit" className="update-btn">
                update
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
