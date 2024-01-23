import { useEffect, useRef, useState } from "react";
import {
  addFavoriteRecipe,
  getFavoriteRecipes,
  removeFavourite,
  searchRecipies,
} from "./api";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import { Recipe, Tabs } from "./types";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined,
  );
  const [selectedTab, setSelectedTab] = useState<Tabs>("search");
  const [favoriteRecipe, setFavoriteRecipe] = useState<Recipe[]>([]);
  const pageNumber = useRef(1);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const favoriteRecipe = await getFavoriteRecipes();
        setFavoriteRecipe(favoriteRecipe.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavoriteRecipes();
  }, []);

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { results } = await searchRecipies(searchTerm, 1);
      setRecipes(results);
      pageNumber.current = 1;
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewMore = async () => {
    const nextPage = pageNumber.current + 1;

    const { results } = await searchRecipies(searchTerm, nextPage);
    setRecipes([...recipes, ...results]);
    pageNumber.current = nextPage;
  };

  const handleAddfavorite = async (recipe: Recipe) => {
    try {
      await addFavoriteRecipe(recipe);
      setFavoriteRecipe([...favoriteRecipe, recipe]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFavorite = async (recipe: Recipe) => {
    try {
      await removeFavourite(recipe);
      const updatedFavorite = favoriteRecipe.filter(
        (favRecipe) => favRecipe.id !== recipe.id,
      );

      setFavoriteRecipe(updatedFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <img src="/hero-img.jpg" alt="hero" />
      </div>
      <div className="title">My Recipe App</div>
      <div className="tab">
        <h1
          className={selectedTab === "search" ? "tab-active" : ""}
          onClick={() => setSelectedTab("search")}
        >
          Recipe Search
        </h1>
        <h1
          className={selectedTab === "favorite" ? "tab-active" : ""}
          onClick={() => setSelectedTab("favorite")}
        >
          Favorite
        </h1>
      </div>

      {selectedTab === "search" && (
        <>
          <form onSubmit={(event) => handleSearchSubmit(event)}>
            <input
              type="text"
              required
              placeholder="Enter your search text..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button className="submit" type="submit">
              Submit
            </button>
          </form>

          <div className="grid">
            {recipes.map((recipe) => {
              const isFavorite = favoriteRecipe.some(
                (favRecipe) => favRecipe.id === recipe.id,
              );

              return (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe)}
                  isFavorite={isFavorite}
                  onFavoriteButtonClick={
                    isFavorite ? handleRemoveFavorite : handleAddfavorite
                  }
                />
              );
            })}
          </div>

          <button className="view-more" onClick={handleViewMore}>
            View More
          </button>
        </>
      )}

      {selectedTab === "favorite" && (
        <div className="grid">
          {favoriteRecipe.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              onFavoriteButtonClick={handleRemoveFavorite}
              isFavorite={true}
            />
          ))}
        </div>
      )}

      {selectedRecipe ? (
        <RecipeModal
          recipeId={selectedRecipe.id.toString()}
          onClose={() => setSelectedRecipe(undefined)}
        />
      ) : null}
    </div>
  );
};

export default App;
