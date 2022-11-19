import React, { useState } from "react";

export default function SearchBox(props) {
  const [model, setModel] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/model/${model}`);
  };
  return (
    <form autocomplete="on" onSubmit={submitHandler}>
      <input
        className="nav-search"
        name="q"
        id="q"
        type="text"
        placeholder="search for product..."
        onChange={(e) => setModel(e.target.value)}
      />
      <button className="search-btn" type="submit">
        <i className="fa fa-search"></i>
      </button>
    </form>
  );
}
