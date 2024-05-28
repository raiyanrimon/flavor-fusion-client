import { useForm } from "react-hook-form";

import { FaUtensils } from "react-icons/fa";
import useAxiosOpen from "../hooks/useAxiosOpen";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddRecipe = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);
  const axiosOpen = useAxiosOpen();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosOpen.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // sending recipe data to the server with the image url
      const recipe = {
        name: data.name,
        image: res.data.data.display_url,
        details: data.recipe,
        link: data.youtube,
        country: data.country,
        category: data.category,
        creatorEmail: user?.email,
        watchCount: 0,
        purchased_by: [],
      };

      //
      const recipeRes = await axiosSecure.post("/recipes", recipe);
      console.log(recipeRes.data);

      if (recipeRes.data.data.insertedId) {
        // show success popup

        Swal.fire({
          position: "center",
          icon: "success",
          title: `${data.name} is added to Database.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }

    reset();
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Recipe Name</span>
            </label>
            <input
              type="text"
              placeholder="Recipe Name"
              {...register("name", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          {/* Image */}
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>
          {/* recipe details */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
              {...register("recipe")}
              className="textarea textarea-bordered h-24"
              placeholder="Details"
            ></textarea>
          </div>
          {/* Embedded Video  */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Embedded Youtube Video Code</span>
            </label>
            <input
              type="text"
              placeholder="youtube embedded link"
              {...register("youtube", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <input
                type="text"
                placeholder="Country"
                {...register("country", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            {/* category */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                defaultValue="default"
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="main">Main Dishes</option>
                <option value="asian">Asian</option>
                <option value="soup">Soups</option>
                <option value="dessert">Dessert</option>
                <option value="salad">Salads</option>
                <option value="chicken">Chicken</option>
                <option value="vegetable">vegetables</option>
              </select>
            </div>

            {/* Country */}
          </div>

          <div className="flex justify-center my-4">
            <button className="btn btn-outline">
              Add Recipe <FaUtensils className="ml-4"></FaUtensils>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
