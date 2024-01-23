import { Recipe } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onClick: () => void;
  onFavoriteButtonClick: (recipe: Recipe) => void;
}

const RecipeCard = ({
  recipe,
  isFavorite,
  onClick,
  onFavoriteButtonClick,
}: RecipeCardProps) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image} alt="recipe"></img>
      <div className="recipe-title">
        <span
          onClick={(event) => {
            event.stopPropagation();
            onFavoriteButtonClick(recipe);
          }}
        >
          {isFavorite ? (
            <AiFillHeart size={25} fill="red" />
          ) : (
            <AiOutlineHeart size={25} />
          )}
        </span>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
