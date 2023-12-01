import React from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";

function Home() {
  let navigate = useNavigate();
  const handleStartGame = (e) => {
    navigate("/quiz");
  };

  return (
    <div className="home-container">
      <button className="start-btn" onClick={handleStartGame}>Start Game</button>
    </div>
  );
}

export default Home;
