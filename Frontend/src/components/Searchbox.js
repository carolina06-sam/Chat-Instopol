import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export const Searchbox = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <div className="headind_srch">
      <div className="recent_heading mt-2">
        <h4>{auth.name}</h4>
      </div>
      <div className="srch_bar">
        <div className="stylish-input-group">
          <box-icon
            onClick={logout}
            name="exit"
            type="solid"
            color="#ffffff"
            style={{ cursor: "pointer" }}
          ></box-icon>
        </div>
      </div>
    </div>
  );
};
