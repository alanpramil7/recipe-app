require("dotenv").config();
const API_KEY = process.env.API_KEY;

export const searchRecipes = async (searchText: string, page: number) => {
  if (!API_KEY) {
    throw new Error("No API key");
  }

  const params = new URLSearchParams({
    apiKey: API_KEY,
    query: searchText,
    number: "10",
    offset: ((page - 1) * 10).toString(),
  });

  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?${params}`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const recipeSummary = async (recipeId: string) => {
  if (!API_KEY) {
    throw new Error("No API  key");
  }

  const params = new URLSearchParams({
    apiKey: API_KEY,
  });

  const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/summary?${params}`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getFavouriteRecipeByIds = async (ids: string[]) => {
  if (!API_KEY) {
    throw new Error("No API key");
  }

  const url = new URL("https://api.spoonacular.com/recipes/informationBulk");
  url.search = new URLSearchParams({
    apiKey: API_KEY,
    ids: ids.join(","),
  }).toString();

  const response = await fetch(url);
  const json = await response.json();
  return { results: json };
};
