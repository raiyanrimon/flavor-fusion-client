import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import videoBg from "../assets/banner.mp4"; // Make sure to add a video file to your assets folder

const Banner = () => {
  const { user, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddRecipeClick = () => {
    if (user) {
      navigate("/add-recipe");
    } else {
      googleSignIn().then(() => {
        navigate("/add-recipe");
      });
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={videoBg}
        autoPlay
        loop
        muted
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide">
          Welcome to FlavorFusion
        </h1>
        {/* Subtitle */}
        <p className="text-xl md:text-2xl mb-8">
          Discover and share your favorite recipes
        </p>
        {/* Action Buttons */}
        <div className="space-x-4">
          {/* Button to See Recipes */}
          <Link
            to="/recipes"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md"
          >
            See Recipes
          </Link>
          {/* Button to Add Recipes */}
          <button
            onClick={handleAddRecipeClick}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md"
          >
            Add Recipes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
