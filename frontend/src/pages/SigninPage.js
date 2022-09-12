import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SigninPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("email >>>", email);
  console.log("password >>>", password);

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const x = props.location.search;
  const y = props.location.search.split("=")[1];
  console.log("x and y >>>", x, y);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  console.log("userSignin>>>", userSignin);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <div className="signin-container">
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox type="danger">{error}</MessageBox>}
      <form className="form" onSubmit={submitHandler}>
        <h3>Sigin in</h3>
        <div className="row">
          <label className="email-label">Email</label>
          <input
            type="email"
            placeholder="Enter your email werey!"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="row">
          <label className="password-label">Password</label>
          <input
            type="password"
            placeholder="Enter your fucking password!"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="row">
          <div>
            <label />
            <button className="signin-btn" type="submit">
              Sign in
            </button>
          </div>
          <div>
            <label />
            <Link to="/register">create an account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
