import Head from "next/head";
import { useState, useEffect } from "react";
import Dashboard from "./components/dashboard";

import axios from "axios";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();
  const [isSuccess, setIsSuccess] = useState(true);

  const [data, setData] = useState({ msg: "", secret: "" });
  const localToken =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;
  console.log("🚀 ~ Home ~ localToken:", localToken)

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7000/api/v1/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );
      setData(response.data);
      // localStorage.removeItem("token");
    } catch (error) {
      console.log("🚀 ~ fetchData ~ error:", error)
      localStorage.removeItem("token");
      setMessage("An error occurred");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Process login logic here
    // console.log(username, password);
    try {
      const response = await axios.post(`http://localhost:7000/api/v1/login`, {
        username,
        password,
      });
      if (response.status === 200) {
        const {
          data: { token },
        } = response;
        console.log("🚀 ~ handleSubmit ~ token:", token)
        localStorage.setItem("token", token);
        // localStorage.setItem("token", `Bearer ${token}`);
        setMessage("Login Successful!!!🥳🥳🥳");
        setIsSuccess(true);
      } else {
        setMessage("Failed to login task.😪🥲😓");
        setIsSuccess(false);
      }
    } catch (error) {
      localStorage.removeItem("token");
      setIsSuccess(false);
      setMessage(`${error?.response?.data?.msg}`);
    }
  };

  return (
    <>
      <Head>
        <title>Login/Register Form</title>
      </Head>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {localToken === null ? (
            <>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Login/Register
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-bold text-gray-500">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold text-gray-500">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors">
                  Submit
                </button>
              </form>
              <div
                className={`text-sm font-semibold px-4 py-2 rounded-lg ${
                  isSuccess
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                {message}
              </div>
            </>
          ) : (
            <>
              <Dashboard fetchData={fetchData} data={data} />
            </>
          )}
          {/* Dashboard UI goes here */}
        </div>
      </div>
    </>
  );
}
