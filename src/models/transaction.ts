export interface ITransaction {
  amount: number;
  date: string;
  metadata?: IMetadata;
  payment_reference?: string;
  status: "pending" | "successful";
  type: "deposit" | "withdrawal";
}

export interface IMetadata {
  country: string;
  email: string;
  name: string;
  product_name?: string;
  quantity: number;
  type: string;
}
