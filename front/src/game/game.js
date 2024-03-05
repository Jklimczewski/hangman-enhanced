import { useCallback, useState, useEffect } from "react";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import words from "../../../wordList.json";
import { useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function Game() {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [temp, setTemp] = useState("");

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    if (isLoser || isWinner) setTemp("x");
  }, [isLoser, isWinner]);
  useEffect(() => {
    if (temp === "x")
      axios.post(
        "https://localhost:5000/result",
        { word: wordToGuess, result: isWinner ? "WON" : "LOST" },
        { headers: { Authorization: `Bearer ${keycloak.token}` } }
      );
  }, [temp]);

  const handleExit = () => {
    navigate("/account");
  };

  return (
    <div>
      {keycloak.authenticated && (
        <div
          style={{
            maxWidth: "800px",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            margin: "0 auto",
            alignItems: "center",
          }}
        >
          <button onClick={handleExit}>You done ?</button>
          <div style={{ fontSize: "2rem", textAlign: "center" }}>
            {isWinner && "Winner! - Refresh to try again"}
            {isLoser && "Nice Try - Refresh to try again"}
          </div>
          <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
          <HangmanWord
            reveal={isLoser}
            guessedLetters={guessedLetters}
            wordToGuess={wordToGuess}
          />
          <div style={{ alignSelf: "stretch" }}>
            <Keyboard
              disabled={isWinner || isLoser}
              activeLetters={guessedLetters.filter((letter) =>
                wordToGuess.includes(letter)
              )}
              inactiveLetters={incorrectLetters}
              addGuessedLetter={addGuessedLetter}
            />
          </div>
        </div>
      )}
      {keycloak.authenticated === false && (window.location.href = "/account")}
    </div>
  );
}

export default Game;
