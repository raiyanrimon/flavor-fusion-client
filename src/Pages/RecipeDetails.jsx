import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAxiosOpen from "../hooks/useAxiosOpen";
import RecipeCard from "../Components/RecipeCard";
import { AuthContext } from "../Provider/AuthProvider";

const RecipeDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [reactions, setReactions] = useState([]);
  const axiosSecure = useAxiosSecure();
  const axiosOpen = useAxiosOpen();
  const userEmail = user?.email;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axiosSecure.get(`/recipes/${id}`);
        setRecipe(response.data);
        setReactions(response.data.reactions || []);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchRecipe();
  }, [id, axiosSecure]);

  useEffect(() => {
    if (recipe) {
      const fetchSuggestions = async () => {
        try {
          const response = await axiosOpen.get(
            `/recipes?country=${recipe.country}&category=${recipe.category}`
          );
          setSuggestions(response.data.data || []); // Ensure suggestions is an array
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]); // Set to empty array on error
        }
      };
      fetchSuggestions();
    }
  }, [recipe, axiosOpen]);

  const handleReaction = async () => {
    try {
      const existingReaction = reactions.find((r) => r.email === userEmail);

      if (existingReaction) {
        await axiosSecure.delete(`/recipes/${id}/reactions`, {
          data: { email: userEmail },
        });
        setReactions(reactions.filter((r) => r.email !== userEmail));
      } else {
        const type = "like";
        await axiosSecure.post(`/recipes/${id}/reactions`, {
          email: userEmail,
          type,
        });
        setReactions([...reactions, { email: userEmail, type }]);
      }
    } catch (error) {
      console.error("Error handling reaction:", error);
    }
  };

  if (!recipe) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Recipe details */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-96 h-96 object-cover"
            />
          </div>
          <div className="p-6 md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">{recipe.name}</h2>
            <p className="text-gray-600 mb-2">
              Creator Email:{" "}
              <span className="font-semibold">{recipe.creatorEmail}</span>
            </p>
            <p className="text-gray-600 mb-2">
              Watch Count:{" "}
              <span className="font-semibold">{recipe.watchCount}</span>
            </p>
            <p className="text-gray-600 mb-2">
              Country: <span className="font-semibold">{recipe.country}</span>
            </p>
            <p className="text-gray-600 mb-2">
              Category: <span className="font-semibold">{recipe.category}</span>
            </p>
            <p className="text-gray-600 mb-2">
              Purchased by:{" "}
              <span className="font-semibold">{recipe.purchased_by}</span>
            </p>
            <div className="mt-4">
              <button onClick={handleReaction} className="text-3xl">
                {reactions.some((r) => r.email === userEmail) ? (
                  <AiFillHeart className="text-red-500" />
                ) : (
                  <AiOutlineHeart />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="my-8">
        <iframe
          src={`https://www.youtube.com/embed/${recipe.link}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full aspect-video"
        ></iframe>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-6">{recipe.details}</p>
      </div>

      {/* Suggestions */}
      <div>
        <h3 className="text-xl font-semibold my-4">You might also like:</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Array.isArray(suggestions) && suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <RecipeCard key={suggestion._id} recipe={suggestion} />
            ))
          ) : (
            <p>No suggestions available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
