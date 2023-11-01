import "../styles.css";
import React, { useState, useEffect } from "react";
import charactersData from "../constants/english_words.json"; // Importa i dati dal tuo file JSON

export default function TR_English() {
  const [showCard, setShowCard] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [delaySeconds, setDelaySeconds] = useState(20);
  const [countdown, setCountdown] = useState(delaySeconds);

  const update_start = "Start Automatic Update";
  const update_stop = "Stop Automatic Update";

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setShowCard(true);
    setCountdown(delaySeconds);
  };

  const handleAutoUpdate = () => {
    setAutoUpdate(!autoUpdate);
  };

  // If autopudate faccio l'aggiornamento automatico.
  useEffect(() => {
    let intervalId;

    if (autoUpdate) {
      intervalId = setInterval(() => {
        handleCharacterClick(
          charactersData[Math.floor(Math.random() * charactersData.length)]
        );
      }, delaySeconds * 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [autoUpdate, delaySeconds]);

  useEffect(() => {
    let countdownInterval;

    if (autoUpdate && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      clearInterval(countdownInterval);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [autoUpdate, countdown]);

  return (
    <div className="App container">
      <h1>English</h1>
      <button
        className="button-selector"
        onClick={() =>
          handleCharacterClick(
            charactersData[Math.floor(Math.random() * charactersData.length)]
          )
        }
      >
        Show random word
      </button>
      <button className="button-selector" onClick={handleAutoUpdate}>
        {autoUpdate ? update_stop : update_start}
      </button>
      <div>
        <label htmlFor="delayInput">Update Interval (seconds):</label>
        <input
          id="delayInput"
          type="number"
          value={delaySeconds}
          onChange={(e) => setDelaySeconds(parseInt(e.target.value, 10))}
        />
      </div>
      {showCard && selectedCharacter && (
        <div className="CharacterCard">
          <h1 className="scheda-main">{selectedCharacter.word}</h1>
          <img
            className="card_image"
            src={selectedCharacter.img}
            alt={selectedCharacter.word}
          />
        </div>
      )}
      {autoUpdate && countdown > 0 && (
        <div className="Countdown">
          Countdown: {countdown} secondi
          <div className="progress pgb_countdown">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${(countdown / delaySeconds) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
