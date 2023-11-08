export interface TransactionDataInterface {
  user_id: number;
  name: string;
  type: number;
  frequency: string;
  created_at: number;
}

export interface PaymentTypesDataInterface {
  type: string;
  description: string;
  examples: string;
}

export interface UserDataInterface {
  username: string;
  email: string;
  password: string;
}