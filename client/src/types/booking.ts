export type Booking = {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  space_name: string;
  space_type: string;
  start_date: string;
  end_date: string;
  start_hour: string;
  end_hour: string;
  total_price: number;
  quantity: number;
};

export type BookingHistory = {
  id: number;
  bills_number: number;
  quantity: number;
  total_price: number;
  activity_price_unit: number;
  space_price_unit: number;
  payment_status: string;
  name: string;
  start_date: string;
  space_name: string;
  firstname: string;
  lastname: string;
  email: string;
};
