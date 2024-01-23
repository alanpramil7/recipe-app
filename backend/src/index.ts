import express from "express";
import cors from "cors";
import * as RecipeAPI from "./recipe-api";
import { PrismaClient } from "@prisma/client";

const app = express();

const prismaClient = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/api/recipe/search", async (req, res) => {
  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string);

  const results = await RecipeAPI.searchRecipes(searchTerm, page);
  res.json(results);
});

app.get("/api/recipe/:recipeId/summary", async (req, res) => {
  const recipeId = req.params.recipeId as string;

  const results = await RecipeAPI.recipeSummary(recipeId);
  res.json(results);
});

app.post("/api/recipe/favorite", async (req, res) => {
  const recipeId = req.body.recipeId;

  try {
    const favouriteRecipe = await prismaClient.favoriteRecipe.create({
      data: { recipeId },
    });

    res.status(201).json(favouriteRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error");
  }
});

app.get("/api/recipe/favorite", async (req, res) => {
  try {
    const favoriteRecipeId = await prismaClient.favoriteRecipe.findMany();
    const recipeIds = favoriteRecipeId.map((recipe) =>
      recipe.recipeId.toString(),
    );

    const favoriteRecipe = await RecipeAPI.getFavouriteRecipeByIds(recipeIds);
    res.json(favoriteRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error");
  }
});

app.delete("/api/recipe/favorite", async (req, res) => {
  const recipeId = req.body.recipeId;

  try {
    await prismaClient.favoriteRecipe.delete({
      where: { recipeId },
    });

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal error");
  }
});

app.listen(5000, () => {
  console.log("server listening on port 5000");
});
