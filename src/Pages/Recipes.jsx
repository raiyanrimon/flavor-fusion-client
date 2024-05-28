import { useState, useEffect } from "react";
import RecipeCard from "../Components/RecipeCard";
import useAxiosOpen from "../hooks/useAxiosOpen";
import InfiniteScroll from "react-infinite-scroll-component";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const axiosOpen = useAxiosOpen();

  useEffect(() => {
    // Function to fetch recipes based on selected filters and search query
    const fetchRecipes = async () => {
      let url = `/recipes?page=${page}`;
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

      try {
        const response = await axiosOpen.get(url);
        setLoading(false);
        setRecipes((prevRecipes) => [...prevRecipes, ...response.data.data]);
        setHasMore(response.data.data.length > 0);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };

    // Call fetchRecipes function when category, country, searchQuery, or page changes
    fetchRecipes();
  }, [axiosOpen, category, country, searchQuery, page]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setRecipes([]);
    setPage(1);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setRecipes([]);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setRecipes([]);
    setPage(1);
  };

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Recipes</h1>
      <div className="flex flex-col md:flex-row justify-center items-center mb-6">
        {/* Filter by category */}
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
        {/* Filter by country */}
        <div className="mb-4 md:mb-0 md:mr-4">
          <input
            type="text"
            value={country}
            onChange={handleCountryChange}
            placeholder="Enter country"
            className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
        {/* Search input */}
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
      <InfiniteScroll
        dataLength={recipes.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <span className="loading loading-spinner loading-lg">Loading...</span>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen all the recipes</b>
          </p>
        }
      >
        <div className="grid grid-cols-1 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Recipes;
