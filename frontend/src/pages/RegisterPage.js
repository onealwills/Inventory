import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function RegisterPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      alert("baba your password no match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, userInfo, redirect]);
  return (
    <div className="register-container">
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox type="danger">{error}</MessageBox>}
      <form className="form" onSubmit={submitHandler}>
        <h3>Register Here bitch!</h3>
        <div className="row">
          <label className="name-label">Name</label>
          <input
            type="name"
            placeholder="Enter your name werey!"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="row">
          <label className="email-label">Email</label>
          <input
            type="email"
            placeholder="Enter your Email werey!"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="row">
          <label className="password-label">Password</label>
          <input
            type="password"
            placeholder="Enter your password werey!"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="row">
          <label className="confirmpassword-label">Password</label>
          <input
            type="password"
            placeholder="Enter your password werey!"
            id="confirmpassword"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div className="row">
          <div>
            <label />
            <button className="register-btn" type="submit">
              Register
            </button>
          </div>
          <div>
            Have account Alredy?
            <Link to={`/signin?redirect=${redirect}`}>create an account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
