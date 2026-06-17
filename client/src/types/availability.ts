export type SpaceAvailability = {
  spaceId: number;
  date?: string;
  startDate?: string;
  endDate?: string;
  timeSlotId?: number;
  capacity?: number;
  booked?: number;
  available?: number;
};
