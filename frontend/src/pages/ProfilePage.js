import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userContants";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stockKeeperName, setStockKeeperName] = useState("");
  const [stockKeeperWarehouse, setStockKeeperWarehouse] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  console.log("usersignin for proffile page >>>", userSignin);
  const { userInfo } = userSignin;
  console.log("userinfo for profile>>>", userInfo);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  console.log("user update profile>>>>", userUpdateProfile);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      if (user.stockKeeper) {
        setStockKeeperName(user.stockKeeper.name);
        setStockKeeperWarehouse(user.stockKeeper.warehouse);
      }
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("your shitty passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
          stockKeeperName,
          stockKeeperWarehouse,
        })
      );
    }
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
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox type="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox type="success">
                Profile Updated Successfully
              </MessageBox>
            )}
            <div>
              <div className="row">
                <label htmlFor="name" className="name-label">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="put your f** name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
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
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
              </div>
              {user.isStockKeeper && (
                <>
                  <h2>Stock Keeper</h2>
                  <div className="row">
                    <label htmlFor="stockKeeper name">Stock Keeper Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="stock keeper name"
                      value={stockKeeperName}
                      onChange={(e) => setStockKeeperName(e.target.value)}
                    ></input>
                  </div>
                  <div className="row">
                    <label htmlFor="stockKeeper warehouse">
                      Stock Keeper WareHouse Address
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="stock keeper name"
                      value={stockKeeperWarehouse}
                      onChange={(e) => setStockKeeperWarehouse(e.target.value)}
                    ></input>
                  </div>
                </>
              )}
              <div className="row">
                <label />
                <button type="submit" className="update-btn">
                  update
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
