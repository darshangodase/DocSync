import React, { useState, useRef, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, clearUserState } from "../redux/userSlice";
import LoginImage from "../assets/login_image.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const suppressEffect = useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const { user, loading: userLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (suppressEffect.current) return;

    if (user?.email) {
      toast.error("You are already logged in. Please log out to log in again.");
      navigate(
        user.role === "admin"
          ? "/admin/dashboard?tab=overview"
          : "/doctor/dashboard?tab=AdminMessage"
      );
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    suppressEffect.current = true;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      const resultAction = await dispatch(fetchUserData(uid));

      if (fetchUserData.fulfilled.match(resultAction)) {
        const userData = resultAction.payload;

        if (userData.status !== "approved") {
          toast.error(
            "Your account is pending approval. Please wait for admin approval."
          );
          await dispatch(clearUserState());
          await auth.signOut();
          return;
        }

        toast.success("Login successful!");
        navigate(
          userData.role === "admin"
            ? "/admin/dashboard?tab=overview"
            : "/doctor/dashboard?tab=AdminMessage"
        );
      } else {
        toast.error("User not found.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        suppressEffect.current = false;
      }, 1000);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, forgotPasswordEmail);
      toast.success("Password reset email sent! Check your inbox.");
      setIsForgotPasswordOpen(false);
    } catch (error) {
      console.error("Forgot password error:", error.message);
      toast.error("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen w-full px-5 sm:px-0 bg-gray-100 font-rubik">
      {/* Left Section: Info and Image Section */}
      <div className="flex flex-col items-center justify-center text-center bg-blue-500 text-white p-6 w-full lg:min-h-screen">
        <img
          src={LoginImage}
          alt="Login Illustration"
          className="w-3/4 mb-6 rounded-lg shadow-lg"
        />
        <h1 className="text-3xl font-bold mb-4">
          Access Your Account or Get Started
        </h1>
        <p className="text-lg mb-6">
          Log in to your account to continue using DocSync or sign up today to
          explore our features.
        </p>
        <ul className="text-left list-disc pl-6 space-y-2">
          <li>Secure access to your prescriptions.</li>
          <li>Multilingual support for diverse patient needs.</li>
          <li>Convenient digital sharing options.</li>
        </ul>
        <p className="mt-6">
          Experience the future of prescription management with{" "}
          <span className="font-bold">DocSync</span>.
        </p>
      </div>

      {/* Right Section: Login Form */}
      <div className="flex flex-col items-center justify-center border max-w-md w-full p-6 lg:w-1/2 lg:min-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back!</h2>
        <p className="text-gray-600 mb-6 text-center">
          Log in to access your account and manage your prescriptions
          effortlessly.
        </p>
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 disabled:opacity-50"
            disabled={loading || userLoading}
          >
            {loading || userLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsForgotPasswordOpen(true)}
            className="text-sm text-gray-500 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
        <div className="mt-4 text-center">
          <a href="/register" className="text-sm text-gray-500">
            Don&apos;t have an account yet?{" "}
            <span className="text-blue-700 font-bold">Register</span>
          </a>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm m-4">
            <h3 className="text-lg font-bold mb-4">Forgot Password</h3>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
              >
                Send Reset Link
              </button>
            </form>
            <button
              onClick={() => setIsForgotPasswordOpen(false)}
              className="text-sm text-gray-500 hover:underline mt-4 block text-center"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
