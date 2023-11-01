import "../styles.css";
import React, { useState, useEffect } from "react";
import charactersData from "../constants/hanzi.json"; // Importa i dati dal tuo file JSON

export default function TR_Hanzi({}) {
  const [showCard, setShowCard] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [delaySeconds, setDelaySeconds] = useState(15);
  const [countdown, setCountdown] = useState(delaySeconds);
  const [selectedTag, setSelectedTag] = useState("v");
  const [tags, setTags] = useState([]);

  const selectCard = () => {
    const hanziSelection = selectedTag
      ? charactersData.filter((obj) => obj.t.includes(selectedTag))
      : charactersData;
    const hanziRandom =
      hanziSelection[Math.floor(Math.random() * hanziSelection.length)];

    setSelectedCharacter(hanziRandom);
    setShowCard(true);
    setCountdown(delaySeconds);
  };

  useEffect(() => {
    let intervalId;

    if (autoUpdate) {
      intervalId = setInterval(() => {
        selectCard();
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

  useEffect(() => {
    const allTags = charactersData.reduce((acc, obj) => {
      obj.t.forEach((tag) => {
        if (!acc.includes(tag)) {
          acc.push(tag);
        }
      });
      return acc;
    }, []);
    setTags(allTags);
  }, []);

  return (
    <div className="App container">
      <h1>Hanzi</h1>
      <button className="button-selector" onClick={() => selectCard()}>
        Mostra carattere casuale
      </button>
      <button
        className="button-selector"
        onClick={() => {
          setAutoUpdate(!autoUpdate);
        }}
      >
        {autoUpdate
          ? "Disattiva aggiornamento automatico"
          : "Attiva aggiornamento automatico"}
      </button>
      <select
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
      >
        <option value="">All Tags</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
      <div>
        <label htmlFor="delayInput">Intervallo Aggiornamento (secondi):</label>
        <input
          id="delayInput"
          type="number"
          value={delaySeconds}
          onChange={(e) => setDelaySeconds(parseInt(e.target.value, 10))}
        />
      </div>
      {showCard && selectedCharacter && (
        <div className="CharacterCard">
          <h1 className="scheda-main">{selectedCharacter.h}</h1>
          <p className="scheda-caption">PinYin: {selectedCharacter.p}</p>
          <p className="scheda-caption">Italiano: {selectedCharacter.m_it}</p>
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
