import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosOpen from "../hooks/useAxiosOpen";
import logo from "../assets/logo.webp";

const Navbar = () => {
  const { user, googleSignIn, logOut } = useContext(AuthContext);
  const axiosOpen = useAxiosOpen();
  const [userCoin, setUserCoin] = useState(null);
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axiosOpen
        .get(`/users/${user.email}`)
        .then((res) => setUserCoin(res.data.coin));
    }
  }, [axiosOpen, user]);

  const handleSignIn = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        displayName: result.user?.displayName,
        photoURL: result.user?.photoURL,
        email: result.user?.email,
        coin: 50,
      };
      axiosOpen.post("/users", userInfo).then((res) => console.log(res.data));
    });
  };

  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  const navList = () => {
    if (user) {
      return (
        <>
          <NavLink
            to="/"
            className="block px-4 py-2 nav-link transition duration-300 ease-in-out hover:bg-gray-200 rounded-md"
          >
            Home
          </NavLink>
          <NavLink
            to="/recipes"
            className="block px-4 py-2 nav-link transition duration-300 ease-in-out hover:bg-gray-200 rounded-md"
          >
            Recipes
          </NavLink>
          <NavLink
            to="/add-recipe"
            className="block px-4 py-2 nav-link transition duration-300 ease-in-out hover:bg-gray-200 rounded-md"
          >
            Add Recipe
          </NavLink>
          <span className="block px-4 py-2">Coins: {userCoin}</span>
          <img
            src={user.photoURL}
            alt="User"
            className="w-8 h-8 rounded-full mx-4"
          />
          <button
            onClick={handleLogOut}
            className="block px-4 py-2 nav-link transition duration-300 ease-in-out hover:bg-gray-200 rounded-md"
          >
            Logout
          </button>
        </>
      );
    } else {
      return (
        <>
          <NavLink
            to="/"
            className="block px-4 py-2 nav-link transition duration-300 ease-in-out hover:bg-gray-200 rounded-md"
          >
            Home
          </NavLink>
          <NavLink
            to="/recipes"
            className="block px-4 py-2 nav-link transition duration-300 ease-in-out hover:bg-gray-200 rounded-md"
          >
            Recipes
          </NavLink>
          <button
            onClick={handleSignIn}
            className="block px-4 py-2 nav-link transition duration-300 ease-in-out hover:bg-gray-200 rounded-md"
          >
            Login with Google
          </button>
        </>
      );
    }
  };

  return (
    <header className="font-bold bg-gradient-to-b from-gray-700 to-purple-700 text-white">
      <div className="container mx-auto py-4 px-6 lg:flex lg:items-center lg:justify-between">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link
            to="/"
            className="flex items-center hover:text-orange-400 flex-shrink-0"
          >
            <img
              className="w-[80px] md:w-[100px] flex-shrink-0 object-cover rounded-full"
              src={logo}
              alt="FlavorFusion"
            />
            <div className="ml-2">
              <h3 className="font-extrabold md:text-2xl">FlavorFusion</h3>
            </div>
          </Link>
          <button
            onClick={toggleNav}
            className="block lg:hidden border border-gray-600 p-2 rounded text-gray-600 hover:bg-gray-200 focus:outline-none focus:bg-gray-300"
          >
            <svg
              className={`w-6 h-6 ${openNav ? "hidden" : "block"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
            <svg
              className={`w-6 h-6 ${openNav ? "block" : "hidden"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <nav
          className={`lg:flex lg:space-x-4 mt-4 lg:mt-0 ${
            openNav ? "block" : "hidden"
          }`}
        >
          {navList()}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
