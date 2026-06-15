import { X } from "lucide-react";
import type { Activity } from "../../../types/activity";
import type { Booking } from "../../../types/booking";
import "./AllActivitiesModal.css";

type Props = {
  title: string;
  items: Activity[] | Booking[];
  onClose: () => void;
  type: "event" | "booking";
};

function isBooking(item: Activity | Booking): item is Booking {
  return "total_price" in item;
}

function AllActivitiesModal({ title, items, onClose, type }: Props) {
  return (
    <div
      className="all-activities-modal__overlay"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="presentation"
    >
      <div
        className="all-activities-modal__container"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div className="all-activities-modal__header">
          <h2 className="all-activities-modal__title">{title}</h2>
          <button
            type="button"
            className="all-activities-modal__close"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <ul className="all-activities-modal__list">
          {items.map((item) => (
            <li key={item.id} className="all-activities-modal__item">
              <div className="all-activities-modal__info">
                <span className="all-activities-modal__name">
                  {type === "event" ? item.name : item.space_name}
                </span>
                <span className="all-activities-modal__meta">
                  {item.start_date.slice(0, 10)} · {item.start_hour.slice(0, 5)}{" "}
                  - {item.end_hour.slice(0, 5)}
                </span>
              </div>
              {isBooking(item) && (
                <span className="all-activities-modal__price">
                  {item.total_price} €
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AllActivitiesModal;
