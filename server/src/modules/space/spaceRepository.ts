import type { Pool, PoolConnection } from "mysql2/promise";
import databaseLeLocal from "../../../database/client";
import type { Rows } from "../../../database/client";

// Une connexion "Queryable" peut être soit le pool global, soit une connexion dédiée (utilisée dans une transaction, ex: readForUpdate)
type Queryable = Pool | PoolConnection;

type Space = {
  id: number;
  space_name: string;
  description: string;
  capacity: number;
  url_image: string;
  price_unit: number;
  space_type: string;
  space_category: string;
};

/**
 * Accès aux données de la table `space` ainsi qu'aux calculs de disponibilité (croisement avec les tables `activity` et `cart`).
 */
class SpaceRepository {
  /** Récupère un espace par son id. */
  async read(id: number) {
    const [rows] = await databaseLeLocal.query<Rows>(
      "select * from space where id = ?",
      [id],
    );
    return rows[0] as Space;
  }

  /** Récupère tous les espaces. */
  async readAll() {
    const [rows] = await databaseLeLocal.query<Rows>("select * from space");
    return rows as Space[];
  }

  /**
   * Récupère un espace en posant un verrou ligne (FOR UPDATE).
   * À utiliser uniquement à l'intérieur d'une transaction (ex: lors de la création d'une réservation) afin d'empêcher une autre requête concurrente de lire/modifier la disponibilité de ce même espace en même temps (évite le double-booking).
   */
  async readForUpdate(
    connection: PoolConnection,
    id: number,
  ): Promise<Space | null> {
    const [rows] = await connection.query<Rows>(
      "SELECT * FROM space WHERE id = ? FOR UPDATE",
      [id],
    );
    return (rows[0] as Space) ?? null;
  }

  /**
   * Compte le nombre total de places déjà réservées (somme des quantités du panier) pour un espace, une date et un créneau donnés.
   * Utilisé pour les espaces "open" (plusieurs places par créneau).
   */
  async countBookedSeats(
    connection: Queryable,
    spaceId: number,
    date: string,
    timeSlotId: number,
  ): Promise<number> {
    const overlappingSlotIds = this.getOverlappingSlotIds(timeSlotId);

    const [rows] = await connection.query<Rows>(
      `SELECT COALESCE(SUM(q.quantity), 0) AS booked
     FROM activity a
     LEFT JOIN (
       SELECT id_activity, quantity FROM cart
       UNION ALL
       SELECT id_activity, quantity FROM booking
     ) q ON q.id_activity = a.id
     WHERE a.space_id = ? AND DATE(a.start_date) = ? AND a.time_slot_id IN (?)`,
      [spaceId, date, overlappingSlotIds],
    );
    return Number((rows[0] as { booked: number })?.booked) || 0;
  }

  /**
   * Indique si un créneau est déjà occupé pour un espace "exclusif" (un seul occupant possible par créneau : salle de réunion, studio...).
   * Prend en compte le chevauchement entre créneaux via getOverlappingSlotIds (ex: si "Journée" est réservée, "Matin" et "Après-midi" sont aussi considérés occupés, et inversement).
   */
  async isSlotTaken(
    connection: Queryable,
    spaceId: number,
    date: string,
    timeSlotId: number,
  ): Promise<boolean> {
    const overlappingSlotIds = this.getOverlappingSlotIds(timeSlotId);

    const [rows] = await connection.query<Rows>(
      `SELECT COALESCE(SUM(c.quantity), 0) AS booked
       FROM activity a
       LEFT JOIN cart c ON c.id_activity = a.id
       WHERE a.space_id = ?
  AND DATE(a.start_date) = ?
  AND a.time_slot_id IN (?)`,
      [spaceId, date, overlappingSlotIds],
    );
    const booked = Number((rows[0] as { booked: number })?.booked) || 0;
    return booked > 0;
  }

  /**
   * Renvoie la liste des créneaux qui entrent en conflit avec le créneau demandé. Règle métier : la "Journée" couvre à la fois le "Matin" et l'"Après-midi", donc :
   * - réserver la Journée bloque Matin, Après-midi ET Journée
   * - réserver le Matin (ou l'Après-midi) bloque aussi la Journée (la réserver empièterait sur ce demi-créneau déjà pris)
   * - tout autre créneau (ex: Soir) ne chevauche que lui-même
   */
  private getOverlappingSlotIds(timeSlotId: number): number[] {
    const MATIN = 1;
    const APRES_MIDI = 2;
    const JOURNEE = 4;

    if (timeSlotId === JOURNEE) {
      return [MATIN, APRES_MIDI, JOURNEE];
    }
    if (timeSlotId === MATIN || timeSlotId === APRES_MIDI) {
      return [timeSlotId, JOURNEE];
    }

    return [timeSlotId];
  }

  /**
   * Indique si une plage de dates [startDate, endDate] chevauche une réservation déjà existante pour ce "Local vide".
   * Condition de chevauchement classique entre deux intervalles : (a.start_date < endDate) ET (startDate < a.end_date)
   */
  async hasOverlappingDateRange(
    connection: Queryable,
    spaceId: number,
    startDate: string,
    endDate: string,
  ): Promise<boolean> {
    const [rows] = await connection.query<Rows>(
      `SELECT COALESCE(SUM(c.quantity), 0) AS booked
       FROM activity a
       LEFT JOIN cart c ON c.id_activity = a.id
       WHERE a.space_id = ?
  AND DATE(a.start_date) < ?
  AND ? < DATE(a.end_date)`,
      [spaceId, endDate, startDate],
    );
    const booked = Number((rows[0] as { booked: number })?.booked) || 0;
    return booked > 0;
  }

  async readByCategory(category: string) {
    const [rows] = await databaseLeLocal.query<Rows>(
      "SELECT * FROM space WHERE space_category = ?",
      [category],
    );
    return rows as Space[];
  }
}

export default new SpaceRepository();
