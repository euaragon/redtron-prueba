export interface user {
  username: string;
  id: string;
  role: string;
  token: string;
  phone: Number;
  email: string;
}

export interface users {
  username: string;
  role: string;
  token: string;
  phone: Number;
  email: string;
  status: string;
  percent_agreement: Number;
  total_balance: Number;
};
