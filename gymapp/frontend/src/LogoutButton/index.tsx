import React from "react";

type Props = {};

function LogoutButton({}: Props) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-3 rounded-md hover:bg-red-700 transition duration-300 mr-3 w-[150px]"
      >
        Logout
      </button>
    </>
  );
}

export default LogoutButton;
