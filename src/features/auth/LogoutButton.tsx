import React from "react";
import useFirebaseLogout from "../../hooks/useFirebaseLogout";

const LogoutButton: React.FC = function () {
  const logout = useFirebaseLogout();

  return (
    <button className="btn btn--tertiary" onClick={logout}>
      Logout
    </button>
  );
};

export default LogoutButton;
