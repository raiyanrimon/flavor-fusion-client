import { useState, useEffect } from "react";
import CountUp from "react-countup";
import useAxiosOpen from "../hooks/useAxiosOpen";

const SuccessStories = () => {
  const [recipesCount, setRecipesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const axiosOpen = useAxiosOpen();

  useEffect(() => {
    const fetchRecipesCount = async () => {
      try {
        const response = await axiosOpen.get("/recipes");
        setRecipesCount(response.data.length);
      } catch (error) {
        console.error("Failed to fetch recipes count:", error);
      }
    };

    const fetchUsersCount = async () => {
      try {
        const response = await axiosOpen.get("/users");
        setUsersCount(response.data.length);
      } catch (error) {
        console.error("Failed to fetch users count:", error);
      }
    };

    fetchRecipesCount();
    fetchUsersCount();
  }, [axiosOpen]);

  return (
    <section className="bg-gradient-to-b from-gray-700 to-purple-700 py-10 border border-1">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8">
          Join Our Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              Recipes Created
            </h3>
            <p className="text-4xl md:text-5xl font-bold text-white mb-4">
              <CountUp end={recipesCount} duration={2} />
            </p>
            <p className="text-lg md:text-xl text-white">
              Embark on a culinary journey with{" "}
              <span className="font-bold">over {recipesCount}</span>{" "}
              mouthwatering recipes waiting to be discovered and enjoyed.
            </p>
          </div>
          <div className="p-8 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg flex flex-col items-center justify-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              Happy Users
            </h3>
            <p className="text-4xl md:text-5xl font-bold text-white mb-4">
              <CountUp end={usersCount} duration={2} />
            </p>
            <p className="text-lg md:text-xl text-white">
              Join a vibrant community of{" "}
              <span className="font-bold">{usersCount}</span> satisfied users
              who have found joy and inspiration in our platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
