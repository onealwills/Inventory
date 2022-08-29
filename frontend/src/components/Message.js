import React from "react";

export default function Message(props) {
  return (
    <div className={`alert alert-${props.type || "info"} `}>
      {props.children}
    </div>
  );
}
