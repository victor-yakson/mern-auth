import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader, Lock, Mail } from "lucide-react";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <motion.div
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Welcome Back{" "}
        </h2>
        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

          <div className="flex items-center mb-6">
            <Link
              to="/forgot-password"
              className="text-sm text-green-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
          font-bold rounded-lg shadow-lg hover:from-green-600
          hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
           focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="size-6 animate-spin mx-auto" />
            ) : (
              "Login"
            )}{" "}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
