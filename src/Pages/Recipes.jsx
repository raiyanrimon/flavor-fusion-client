import { useState, useRef, useCallback } from "react";
import RecipeCard from "../Components/RecipeCard";
import useAxiosOpen from "../hooks/useAxiosOpen";
import { useInfiniteQuery } from "@tanstack/react-query";

const Recipes = () => {
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const axiosOpen = useAxiosOpen();
  const observerElem = useRef();

  const fetchRecipes = async ({ pageParam = 0 }) => {
    let url = `/recipes?page=${pageParam}`;
    const queryParams = [];

    if (category) {
      queryParams.push(`category=${category}`);
    }

    if (country) {
      queryParams.push(`country=${country}`);
    }

    if (searchQuery) {
      queryParams.push(`search=${searchQuery}`);
    }

    if (queryParams.length > 0) {
      url += `&${queryParams.join("&")}`;
    }

    const response = await axiosOpen.get(url);
    return response.data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["recipes", category, country, searchQuery],
    queryFn: fetchRecipes,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
  });

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const lastRecipeElementRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observerElem.current) observerElem.current.disconnect();
      observerElem.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerElem.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Recipes</h1>
      <div className="flex flex-col md:flex-row justify-center items-center mb-6">
        <div className="mb-4 md:mb-0 md:mr-4">
          <select
            value={category}
            onChange={handleCategoryChange}
            className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="">Select a category</option>
            <option value="main">Main Dishes</option>
            <option value="asian">Asian</option>
            <option value="soup">Soups</option>
            <option value="dessert">Dessert</option>
            <option value="salad">Salads</option>
            <option value="chicken">Chicken</option>
            <option value="vegetable">Vegetables</option>
          </select>
        </div>
        <div className="mb-4 md:mb-0 md:mr-4">
          <input
            type="text"
            value={country}
            onChange={handleCountryChange}
            placeholder="Enter country"
            className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4 md:mb-0">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search recipes..."
            className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8">
        {status === "loading" && <p>Loading...</p>}
        {status === "error" && <p>Error: {error.message}</p>}
        {data?.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.data.map((recipe, recipeIndex) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                ref={
                  page.data.length === recipeIndex + 1
                    ? lastRecipeElementRef
                    : null
                }
              />
            ))}
          </div>
        ))}
      </div>
      {isFetching && !isFetchingNextPage && <p>Fetching...</p>}
    </div>
  );
};

export default Recipes;
