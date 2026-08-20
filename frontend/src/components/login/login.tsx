import React from "react";

export const Login = () => {
  return (
    <div className="flex h-screen">
      <div className="bg-gray-50 basis-1/2 ">
        <div className="bg-white max-w-3/4 m-40 rounded-2xl shadow-2xl">
          <div className="flex flex-col p-4">
            <h1>Family Hub</h1>
            <div className="mt-3 mb-3">
              <h3>Welcome back</h3>
              <p>Sign in to continue to your account</p>
            </div>
            <div className="mt-3 mb-3">
              <h3>Email address</h3>
              <input type="e-mail" className="border-0 border-gray-200"></input>
            </div>
            <div className="mt-3 mb-3">
              <h3>Password</h3>
              <input
                type="password"
                className="border-0 border-gray-200"
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-400 basis-1/2">blue</div>
    </div>
  );
};
