import "./CardSpace.css";
import { AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import localVideImg from "../../../../assets/images/empty-space.png";
import sallereunionImg from "../../../../assets/images/meeting-room.png";
import openspaceImg from "../../../../assets/images/openspace.png";
import studioPhotoImg from "../../../../assets/images/photo-studio.png";
import studioEnregImg from "../../../../assets/images/studios.png";
import useSpacesAvailability, {
  type AvailabilityMap,
} from "../../../../hooks/useSpacesAvailabilty";
import useTimeSlot from "../../../../hooks/useTimeSlot";
import type { Space } from "../../../../types/space";
import SpaceModal from "../SpaceModal/SpaceModal";
import SpaceModalContent from "../SpaceModal/SpaceModalContent/SpaceModalContent";

type CardSpaceProps = {
  spaces: Space[];
  categoryName: string;
};

export interface SpaceAvailability {
  available: number;
  capacity: number;
}

function CardSpace({ spaces, categoryName }: CardSpaceProps) {
  if (spaces.length === 0) return null;

  const firstSpace = spaces[0];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalCapacity = spaces.reduce((acc, space) => acc + space.capacity, 0);
  const spaceCategory = firstSpace.space_category;
  const isStudio = spaceCategory.toLowerCase().includes("studio");
  const isLocal = spaceCategory === "Local vide";
  const isMeetRoom = spaceCategory === "Salle de réunion";
  const minPrice = Math.min(...spaces.map((space) => space.price_unit));

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const spaceIds = useMemo(() => spaces.map((s) => s.id), [spaces]);

  const timeSlots = useTimeSlot();
  const slotMatin = timeSlots.find((s) => s.slot === "Matin");
  const slotApresMidi = timeSlots.find((s) => s.slot === "Après-midi");

  const { availabilities: availMatin, loading: loadingMatin } =
    useSpacesAvailability(spaceIds, today, slotMatin?.id);

  const { availabilities: availApresMidi, loading: loadingApresMidi } =
    useSpacesAvailability(spaceIds, today, slotApresMidi?.id);

  const loading = loadingMatin || loadingApresMidi;

  const sumAvailable = (availMap: AvailabilityMap): number =>
    (Object.values(availMap) as (SpaceAvailability | null)[]).reduce(
      (acc, a) => acc + (a?.available ?? 0),
      0,
    );

  const countFree = (availMap: AvailabilityMap): number =>
    (Object.values(availMap) as (SpaceAvailability | null)[]).filter(
      (a) => (a?.available ?? 0) > 0,
    ).length;

  const availableMatinTotal = sumAvailable(availMatin);
  const availableApresMidiTotal = sumAvailable(availApresMidi);
  const studiosLibresMatin = countFree(availMatin);
  const studiosLibresApresMidi = countFree(availApresMidi);
  const locauxLibres = countFree(availMatin);

  const CATEGORY_IMAGES: Record<string, string> = {
    "Open space": openspaceImg,
    "Studio photo": studioPhotoImg,
    "Studio d'enregistrement": studioEnregImg,
    "Salle de réunion": sallereunionImg,
    "Local vide": localVideImg,
  };

  const fallbackImg = openspaceImg;

  const renderSlots = () => {
    if (loading) {
      return (
        <span className="card-space-card-timeslot">
          Chargement des disponibilités…
        </span>
      );
    }

    if (isStudio) {
      return (
        <>
          <span className="card-space-card-timeslot">
            Matin — {studiosLibresMatin}/{spaces.length} studio
            {spaces.length > 1 ? "s" : ""} disponible
            {studiosLibresMatin > 1 ? "s" : ""}
          </span>
          <span className="card-space-card-timeslot">
            Après-midi — {studiosLibresApresMidi}/{spaces.length} studio
            {spaces.length > 1 ? "s" : ""} disponible
            {studiosLibresApresMidi > 1 ? "s" : ""}
          </span>
        </>
      );
    }

    if (isMeetRoom) {
      return (
        <>
          <span className="card-space-card-timeslot">
            Matin — {studiosLibresMatin}/{spaces.length} salle
            {spaces.length > 1 ? "s" : ""} disponible
            {studiosLibresMatin > 1 ? "s" : ""}
          </span>
          <span className="card-space-card-timeslot">
            Après-midi — {studiosLibresApresMidi}/{spaces.length} salle
            {spaces.length > 1 ? "s" : ""} disponible
            {studiosLibresApresMidi > 1 ? "s" : ""}
          </span>
        </>
      );
    }

    if (isLocal) {
      return (
        <span className="card-space-card-timeslot">
          {locauxLibres} salle{locauxLibres > 1 ? "s" : ""} disponible
          {locauxLibres > 1 ? "s" : ""}
        </span>
      );
    }

    return (
      <>
        <span className="card-space-card-timeslot">
          Matin — {availableMatinTotal}/{totalCapacity} place
          {totalCapacity > 1 ? "s" : ""}
        </span>
        <span className="card-space-card-timeslot">
          Après-midi — {availableApresMidiTotal}/{totalCapacity} place
          {totalCapacity > 1 ? "s" : ""}
        </span>
      </>
    );
  };

  return (
    <>
      <div className="card-space-card-div">
        <div className="card-space-card-img-div">
          <img
            className="card-space-card-img"
            src={CATEGORY_IMAGES[spaceCategory] ?? fallbackImg}
            alt={categoryName}
          />
          <span className="card-space-card-badge-price">Dès {minPrice}€</span>
          <h3 className="card-space-card-name">{categoryName}</h3>
        </div>

        <div className="card-space-card-info-div">
          <p className="card-space-card-description">Aujourd'hui</p>

          {renderSlots()}

          <button
            type="button"
            className="card-space-card-reservation-button"
            onClick={() => setIsModalOpen(true)}
          >
            Voir les espaces
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <SpaceModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <SpaceModalContent
              spaces={spaces}
              categoryName={categoryName}
              onClose={() => setIsModalOpen(false)}
            />
          </SpaceModal>
        )}
      </AnimatePresence>
    </>
  );
}

export default CardSpace;
