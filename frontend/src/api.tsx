import { Recipe } from "./types";

export const searchRecipies = async (searchTerm: string, page: number) => {
  const baseUrl = new URL("http://localhost:5000/api/recipe/search");
  baseUrl.searchParams.append("searchTerm", searchTerm);
  baseUrl.searchParams.append("page", String(page));

  const response = await fetch(baseUrl.toString());

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
};

export const recipeSummary = async (recipeId: string) => {
  const baseUrl = `http://localhost:5000/api/recipe/${recipeId}/summary`;

  const response = await fetch(baseUrl.toString());

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
};

export const getFavoriteRecipes = async () => {
  const url = new URL("http://localhost:5000/api/recipe/favorite");
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
};

export const addFavoriteRecipe = async (recipe: Recipe) => {
  const body = {
    recipeId: recipe.id,
  };

  const response = await fetch("http://localhost:5000/api/recipe/favorite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to save favourite");
  }
};

export const removeFavourite = async (recipe: Recipe) => {
  const body = {
    recipeId: recipe.id,
  };
  const response = await fetch("http://localhost:5000/api/recipe/favorite", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to delete favourite");
  }
};
