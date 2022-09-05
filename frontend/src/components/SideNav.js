import React from "react";
import { Link } from "react-router-dom";

export default function SideNav({ categories }) {
  return (
    <aside>
      <div className="list">
        <ul className="sidenav">
          {categories.map((category) => {
            const { _id, type } = category;
            return (
              <Link to={`/${type}`}>
                <li key={_id}>{type}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
