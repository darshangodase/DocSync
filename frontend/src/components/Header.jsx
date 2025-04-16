import React from "react";
import { Navbar, Button, Dropdown, Avatar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; 
import { useAuth } from "../context/AuthProvider"; 
import profilePicture from "../assets/profile_picture.png";
import toast from "react-hot-toast";
import { getAuth } from "firebase/auth";

function Header() {
  const user = useSelector((state) => state.user.user); 
  const { handleSignOut } = useAuth(); 
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleSignOutClick = async () => {
    try {
      await handleSignOut();
      toast.success("Sign-out successfully.");
    } catch (error) {
      console.error("Sign-out failed:", error.message);
      toast.error("Failed to sign out.");
    }
  };

  return (
    <Navbar className="w-full z-50 bg-white text-black shadow-md">
      {/* Brand */}
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="bg-gradient-to-r from-blue-500 to-green-400 px-2 py-1 rounded-md text-white">
        DocSync
        </span>
      </Link>

      {/* Navbar Right Section */}
      <div className="flex gap-5 md:order-2">
        {user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user"
                img={profilePicture}
                rounded
                className="object-cover"
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                @{user.name} ({user?.role})
              </span>
              <span className="block text-sm font-medium truncate">
                {currentUser?.email}
              </span>
            </Dropdown.Header>
            <Link
              to={
                user?.role === "doctor"
                  ? "/doctor/dashboard?tab=AdminMessage"
                  : "/admin/dashboard?tab=overview"
              }
            >
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOutClick}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white sm:px-2 font-rubik">
              Login
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>

      {/* Navbar Links */}
      <Navbar.Collapse className="bg-white text-black font-rubik">
        <Navbar.Link as={"div"}>
          <Link to="/" className={`text-lg cursor-pointer ${
              location.pathname === "/"
                ? "text-blue-500 font-semibold"
                : ""
            }`}>
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link as={"div"}>
          <Link to="/howitworks" className={`text-lg cursor-pointer ${
              location.pathname === "/howitworks"
                ? "text-blue-500 font-semibold"
                : ""
            }`}>
            Process
          </Link>
        </Navbar.Link>
        {/* <Navbar.Link as={"div"}>
          <Link to="/testimonial" className={`text-lg cursor-pointer ${
              location.pathname === "/testimonial"
                ? "text-blue-500 font-semibold"
                : ""
            }`}>
            Testimonial
          </Link>
        </Navbar.Link> */}
        <Navbar.Link as={"div"}>
          <Link to="/about" className={`text-lg cursor-pointer ${
              location.pathname === "/about"
                ? "text-blue-500 font-semibold"
                : ""
            }`}>
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link as={"div"}>
          <Link
            to="/contactus"
            className={`text-lg cursor-pointer ${
              location.pathname === "/contactus"
                ? "text-blue-500 font-semibold"
                : ""
            }`}
          >
            Contact Us
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
