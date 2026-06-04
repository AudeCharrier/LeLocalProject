import "./ReservationBar.css";
import { useState } from "react";

// Reservation Bar creation
function ReservationBar() {
  const [date, setDate] = useState("2026-06-14");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("12:00");
  const [space, setSpace] = useState("Tous les espaces");

  return (
    //IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA
    <section className="reservation-bar-global-section">
      {/* Global Reservation Bar */}
      <div className="reservation-bar-container">
        {/* Date */}
        <div className="reservation-bar-input-div">
          <label htmlFor="reservation-date" className="reservation-bar-label">
            Réservation rapide :
          </label>

          <input
            id="reservation-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="reservation-bar-input"
          />
        </div>

        {/* Start Time */}
        <div className="reservation-bar-input-div">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="reservation-bar-input"
          />
        </div>

        {/* End Time */}
        <div className="reservation-bar-input-div">
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="reservation-bar-input"
          />
        </div>

        {/* Spaces */}
        <div className="reservation-bar-input-div">
          <select
            value={space}
            onChange={(e) => setSpace(e.target.value)}
            className="reservation-bar-select"
          >
            <option>Tous les espaces</option>
            <option>Open Space</option>
            <option>Salle de réunion</option>
            <option>Studio photo</option>
            <option>Studio son</option>
            <option>Atelier</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="button"
          className="reservation-bar-button"
          onClick={() => {
            console.log({
              date,
              startTime,
              endTime,
              space,
            });
          }}
        >
          VOIR LES DISPONIBILITÉS
        </button>
      </div>
    </section>
    //IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA IA
  );
}

export default ReservationBar;
