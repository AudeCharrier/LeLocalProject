export type Claim = {
  title: string;
  category: string;
  message: string;
  activity_id: string;
};

export type AdminClaim = {
  id: number;
  title: string;
  category: string;
  message: string;
  claim_date: string;
  firstname: string;
  lastname: string;
};
