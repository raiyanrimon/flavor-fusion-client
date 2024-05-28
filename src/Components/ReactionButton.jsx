import { useState } from "react";
import axios from "axios";

const ReactionButton = ({ recipeId }) => {
  const [isReacted, setIsReacted] = useState(false);

  const handleReaction = async () => {
    try {
      const response = await axios.post(`/recipes/${recipeId}/react`);
      setIsReacted(response.data.reacted);
    } catch (error) {
      console.error("Error reacting to recipe:", error);
    }
  };

  return (
    <button onClick={handleReaction}>
      {isReacted ? "Remove Reaction" : "React"}
    </button>
  );
};

export default ReactionButton;
