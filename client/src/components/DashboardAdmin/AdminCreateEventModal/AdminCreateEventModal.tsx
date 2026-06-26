import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { apiFetch } from "../../../hooks/apiFetch";
import useSpaces from "../../../hooks/useSpaces";
import useTimeSlot from "../../../hooks/useTimeSlot";
import "./AdminCreateEventModal.css";

type AdminCreateEventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
};

function AdminCreateEventModal({
  isOpen,
  onClose,
  onCreated,
}: AdminCreateEventModalProps) {
  const spaces = useSpaces();
  const timeSlots = useTimeSlot();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedSpace, setSelectedSpace] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eventSpaces = useMemo(
    () => spaces.filter((space) => space.space_type === "Evenements"),
    [spaces],
  );

  function resetForm() {
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setSelectedSpace("");
    setSelectedTimeSlot("");
    setImageFile(null);
    setMessage("");
    setIsSubmitting(false);
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const formData = new FormData();
    formData.append("titre", title);
    formData.append("description", description);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("salle", selectedSpace);
    formData.append("creneau", selectedTimeSlot);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await apiFetch("/api/createEvent", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setMessage("Une erreur est survenue pendant la création.");
        setIsSubmitting(false);
        return;
      }

      resetForm();
      onCreated();
      onClose();
    } catch {
      setMessage("Une erreur est survenue pendant la création.");
      setIsSubmitting(false);
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <dialog
      aria-labelledby="admin-create-event-modal-title"
      aria-modal={true}
      className="admin-create-event-modal"
      open
    >
      <button
        aria-label="Fermer la modale"
        className="admin-create-event-modal__overlay"
        onClick={handleClose}
        type="button"
      />

      <div className="admin-create-event-modal__panel">
        <div className="admin-create-event-modal__header">
          <h3
            className="admin-create-event-modal__title"
            id="admin-create-event-modal-title"
          >
            Créer un événement
          </h3>
          <button
            aria-label="Fermer"
            className="admin-create-event-modal__close"
            onClick={handleClose}
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <form className="admin-create-event-modal__form" onSubmit={handleSubmit}>
          <div className="admin-create-event-modal__field">
            <label htmlFor="admin-event-title">Titre</label>
            <input
              id="admin-event-title"
              onChange={(event) => setTitle(event.target.value)}
              required
              type="text"
              value={title}
            />
          </div>

          <div className="admin-create-event-modal__field admin-create-event-modal__field--full">
            <label htmlFor="admin-event-description">Description</label>
            <textarea
              id="admin-event-description"
              onChange={(event) => setDescription(event.target.value)}
              required
              rows={4}
              value={description}
            />
          </div>

          <div className="admin-create-event-modal__field">
            <label htmlFor="admin-event-start-date">Date de début</label>
            <input
              id="admin-event-start-date"
              onChange={(event) => setStartDate(event.target.value)}
              required
              type="date"
              value={startDate}
            />
          </div>

          <div className="admin-create-event-modal__field">
            <label htmlFor="admin-event-end-date">Date de fin</label>
            <input
              id="admin-event-end-date"
              onChange={(event) => setEndDate(event.target.value)}
              required
              type="date"
              value={endDate}
            />
          </div>

          <div className="admin-create-event-modal__field">
            <label htmlFor="admin-event-space">Espace</label>
            <select
              id="admin-event-space"
              onChange={(event) => setSelectedSpace(event.target.value)}
              required
              value={selectedSpace}
            >
              <option value="">Choisir un espace</option>
              {eventSpaces.map((space) => (
                <option key={space.id} value={space.id}>
                  {space.space_name}
                </option>
              ))}
            </select>
          </div>

          <div className="admin-create-event-modal__field">
            <label htmlFor="admin-event-slot">Créneau</label>
            <select
              id="admin-event-slot"
              onChange={(event) => setSelectedTimeSlot(event.target.value)}
              required
              value={selectedTimeSlot}
            >
              <option value="">Choisir un créneau</option>
              {timeSlots.map((timeSlot) => (
                <option key={timeSlot.id} value={timeSlot.id}>
                  {timeSlot.slot}
                </option>
              ))}
            </select>
          </div>

          <div className="admin-create-event-modal__field admin-create-event-modal__field--full">
            <label htmlFor="admin-event-image">Image</label>
            <input
              accept="image/*"
              id="admin-event-image"
              onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
              type="file"
            />
          </div>

          {message ? (
            <p className="admin-create-event-modal__message">{message}</p>
          ) : null}

          <div className="admin-create-event-modal__actions">
            <button
              className="admin-create-event-modal__secondary-button"
              onClick={handleClose}
              type="button"
            >
              Annuler
            </button>
            <button
              className="admin-create-event-modal__primary-button"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Création..." : "Créer l'événement"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default AdminCreateEventModal;
