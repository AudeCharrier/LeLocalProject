import { useState } from "react";
import "./CreateEventForm.css";
import useSpaces from "../../hooks/useSpaces";
import useTimeSlot from "../../hooks/useTimeSlot";

export default function CreateEventForm() {
  const spaces = useSpaces();
  const slot = useTimeSlot();
  const [participants, setParticipants] = useState<number>(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSpace, setSelectedSpace] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      nom,
      email,
      titre,
      startDate,
      endDate,
      participants,
      description,
      salle: selectedSpace,
      creneau: selectedTimeSlot,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/createEvent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      console.log("Succès :", result);
      setMessage({
        type: "success",
        text: "Votre demande a bien été envoyée. Nous vous répondrons sous 48h.",
      });
    } catch (error) {
      console.error("Erreur :", error);
      setMessage({
        type: "error",
        text: "Une erreur est survenue. Veuillez réessayer.",
      });
    }
  };

  return (
    <div className="create-event-page">
      {/* Colonne de présentation */}
      <div className="create-event-sidebar">
        <p className="create-event-sidebar-subtitle">Vous avez un projet ?</p>

        <h1 className="create-event-sidebar-title">Proposez un événement</h1>

        <p className="create-event-sidebar-description">
          La Forge met ses espaces à disposition de la communauté pour organiser
          des ateliers, conférences, soirées et hackathons. Soumettez votre
          projet et notre équipe vous recontactera sous 48h.
        </p>

        <ul className="create-event-benefits-list">
          {[
            "Accès gratuit ou tarif communautaire",
            "Espaces de 8 à 100 personnes",
            "Sono, vidéo, Wi-Fi inclus",
            "Accompagnement logistique",
          ].map((item) => (
            <li key={item} className="create-event-benefit-item">
              <span className="create-event-benefit-icon" aria-hidden="true">
                ✓
              </span>
              <span className="create-event-benefit-text">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Formulaire */}
      <form
        className="create-event-form-container"
        onSubmit={handleSubmit}
        noValidate
      >
        {message && (
          <p
            className={`create-event-message create-event-message--${message.type}`}
          >
            {message.text}
          </p>
        )}

        <div className="create-event-form-row">
          {/* Nom */}
          <div className="create-event-name-field">
            <label htmlFor="nom" className="create-event-name-label">
              Votre nom
              <span className="create-event-required">*</span>
            </label>
            <input
              id="nom"
              className="create-event-name-input"
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Sophie Lefèvre"
              required
            />
          </div>

          {/* Email */}
          <div className="create-event-email-field">
            <label htmlFor="email" className="create-event-email-label">
              E-mail
              <span className="create-event-required">*</span>
            </label>
            <input
              id="email"
              className="create-event-email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sophie@studio.fr"
              required
            />
          </div>
        </div>

        {/* Titre */}
        <div className="create-event-title-field">
          <label htmlFor="titre" className="create-event-title-label">
            Titre de l'événement
            <span className="create-event-required">*</span>
          </label>
          <input
            id="titre"
            className="create-event-title-input"
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Workshop Sérigraphie"
            required
          />
        </div>

        <div className="create-event-form-row">
          {/* Date */}
          <div className="create-event-date-field">
            <label htmlFor="date" className="create-event-date-label">
              Date de début souhaitée
              <span className="create-event-required">*</span>
            </label>
            <div className="create-event-date-input-wrapper">
              <span className="create-event-date-icon">📅</span>
              <input
                id="date"
                className="create-event-date-input"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="create-event-date-field">
            <label htmlFor="date" className="create-event-date-label">
              Date de fin souhaitée
              <span className="create-event-required">*</span>
            </label>
            <div className="create-event-date-input-wrapper">
              <span className="create-event-date-icon">📅</span>
              <input
                id="date"
                className="create-event-date-input"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Participants */}
          <div className="create-event-participants-field">
            <label
              htmlFor="participants"
              className="create-event-participants-label"
            >
              Participants estimés
            </label>
            <div className="create-event-participants-input-wrapper">
              <span className="create-event-participants-icon">👥</span>
              <input
                id="participants"
                required
                className="create-event-participants-input"
                type="number"
                min={1}
                max={300}
                value={participants}
                onChange={(e) => setParticipants(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="create-event-form-row">
          {/* Salle */}
          <div className="create-event-space-field">
            <label htmlFor="space" className="create-event-space-label">
              Salle souhaitée
              <span className="create-event-required">*</span>
            </label>
            <select
              id="space"
              className="create-event-space-select"
              value={selectedSpace}
              onChange={(e) => setSelectedSpace(e.target.value)}
              required
            >
              <option value="">Choisir une salle</option>
              {spaces.map((space) => (
                <option key={space.id} value={space.id}>
                  {space.space_name}
                </option>
              ))}
            </select>
          </div>

          {/* Créneau */}
          <div className="create-event-slot-field">
            <label htmlFor="slot" className="create-event-slot-label">
              Créneau souhaité
              <span className="create-event-required">*</span>
            </label>
            <select
              id="slot"
              className="create-event-slot-select"
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
              required
            >
              <option value="">Choisir un créneau</option>
              {slot.map((timeSlot) => (
                <option
                  key={timeSlot.id}
                  value={`${timeSlot.start_hour} - ${timeSlot.end_hour}`}
                >
                  {timeSlot.start_hour} - {timeSlot.end_hour}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="create-event-description-field">
          <label
            htmlFor="description"
            className="create-event-description-label"
          >
            Description du projet
            <span className="create-event-required">*</span>
          </label>
          <textarea
            id="description"
            className="create-event-description-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez votre événement, son objectif, son public cible…"
            rows={4}
            required
          />
        </div>

        {/* Bouton */}
        <button type="submit" className="create-event-submit-button">
          <span className="create-event-submit-icon">→</span>
          Envoyer ma demande
        </button>

        <p className="create-event-form-footnote">
          Champs obligatoires marqués * · Réponse sous 48h
        </p>
      </form>
    </div>
  );
}
