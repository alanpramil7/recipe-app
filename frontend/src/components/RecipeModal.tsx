import { useEffect, useState } from "react";
import { recipeSummary } from "../api";
import { Summary } from "../types";
import "./../App.css";

interface RecipeModalProps {
  recipeId: string;
  onClose: () => void;
}

const RecipeModal = ({ recipeId, onClose }: RecipeModalProps) => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await recipeSummary(recipeId);
        setSummary(summary);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [recipeId]);

  if (loading) {
    return (
      <div className="overlay">
        <div className="modal loading">Loading...</div>
      </div>
    );
  }

  if (!recipeSummary) {
    return <></>;
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{summary?.title}</h2>
            <span className="close-button" onClick={onClose}>
              &times;
            </span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: summary?.summary || "" }}></p>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
