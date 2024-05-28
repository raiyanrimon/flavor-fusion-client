import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PropTypes from "prop-types";

const RecipeCard = ({ recipe }) => {
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((response) => {
          setUserDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          Swal.fire("Error", "Failed to fetch user data", "error");
        });
    }
  }, [user, axiosSecure]);

  const handleViewRecipe = async () => {
    if (!user) {
      Swal.fire("Login Required", "Please login to view the recipe", "warning");
      return;
    }

    if (user.email === recipe.creatorEmail) {
      navigate(`/recipes/${recipe._id}`);
      return;
    }

    if (userDetails.coin < 10) {
      Swal.fire({
        title: "Not Enough Coins",
        text: "You need to purchase more coins to view this recipe",
        icon: "warning",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/purchase-coins");
        }
      });
      return;
    }

    if (recipe.purchased_by.includes(user.email)) {
      navigate(`/recipes/${recipe._id}`);
      return;
    }

    Swal.fire({
      title: "Spend 10 coins to view this recipe?",
      showCancelButton: true,
      confirmButtonText: "Yes, spend 10 coins",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.post("/purchase-recipe", {
            userEmail: user.email,
            recipeId: recipe._id,
          });

          const data = response.data;

          if (data.acknowledged) {
            Swal.fire(
              "Purchased!",
              "You can now view the recipe.",
              "success"
            ).then(() => navigate(`/recipes/${recipe._id}`));
          } else {
            Swal.fire("Error", data.message, "error");
          }
        } catch (error) {
          Swal.fire("Error", "Something went wrong", "error");
        }
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="md:flex">
        <div className="md:w-1/2">
          <img
            className="w-96 h-96 object-cover"
            src={recipe.image}
            alt={recipe.name}
          />
        </div>
        <div className="p-4 md:w-1/2">
          <h2 className="text-xl font-bold mb-2">{recipe.name}</h2>
          <p className="text-gray-600 mb-1">
            Creator Email:{" "}
            <span className="font-semibold">{recipe.creatorEmail}</span>
          </p>
          <p className="text-gray-600 mb-1">
            Purchased by:{" "}
            <span className="font-semibold">
              {recipe.purchased_by.join(", ")}
            </span>
          </p>
          <p className="text-gray-600 mb-4">
            Country: <span className="font-semibold">{recipe.country}</span>
          </p>
          <div className="flex justify-end">
            <button
              onClick={handleViewRecipe}
              className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
            >
              View The Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.object,
};

export default RecipeCard;
