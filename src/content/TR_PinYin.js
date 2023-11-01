import "../styles.css";
import React, { useState, useEffect } from "react";
import pinyinData from "../constants/hanzi-pinyin-table.json"; // Importa i dati dal tuo file JSON

export default function TR_PinYin({}) {
  const [showCard, setShowCard] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [delaySeconds, setDelaySeconds] = useState(10);
  const [countdown, setCountdown] = useState(delaySeconds);

  const generaSuonoCineseCasuale = () => {
    // Estrai casualmente una chiave (carattere cinese) dalla tabella
    const caratteri = Object.keys(pinyinData);
    const carattereCasuale =
      caratteri[Math.floor(Math.random() * caratteri.length)];

    // Estrai casualmente un suono Pinyin associato al carattere cinese
    const suoniPinyinCasuali = pinyinData[carattereCasuale];
    const suonoCasuale =
      suoniPinyinCasuali[Math.floor(Math.random() * suoniPinyinCasuali.length)];

    return { Pinyin: suonoCasuale, Carattere: carattereCasuale };
  };

  const handleCharacterClick = () => {
    const pinyin = generaSuonoCineseCasuale();
    setSelectedCharacter(pinyin);
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
        handleCharacterClick();
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
      <h1>PinYin</h1>
      <button
        className="button-selector"
        onClick={() => handleCharacterClick()}
      >
        Mostra carattere casuale
      </button>
      <button className="button-selector" onClick={handleAutoUpdate}>
        {autoUpdate
          ? "Disattiva aggiornamento automatico"
          : "Attiva aggiornamento automatico"}
      </button>
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
          <h1 className="scheda-main">{selectedCharacter.Pinyin}</h1>
          <p className="scheda-caption">{selectedCharacter.Carattere}</p>
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
