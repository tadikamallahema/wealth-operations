import client from "../config/pgManager.js";

export interface EquityUser {
  investor_id: string;
  full_name: string;
  email: string;
  pan_number: string;
  demat_account: string;
  password_hash: string;
  created_at?: Date;
}

export type NewEquityUser = Omit<EquityUser, 'created_at'>;

export interface EquityHolding {
  id: number;
  investor_id: string;
  stock_symbol: string;
  quantity: string | number;
  avg_buy_price: string | number;
  current_market_price: string | number;
  exchange: string;
  updated_at?: Date;
}

export type NewEquityHolding = Omit<EquityHolding, 'id' | 'updated_at'>;

export interface EquityTransaction {
  id: number;
  investor_id: string;
  stock_symbol: string;
  transaction_type: string;
  quantity: string | number;
  price: string | number;
  exchange: string;
  realized_gain?: string | number | null;
  executed_at: Date;
}

export type NewEquityTransaction = Omit<EquityTransaction, 'id'>;

export interface EquityWatchlist {
  id: number;
  investor_id: string;
  stock_symbol: string;
  added_at?: Date;
}

export interface EquityMarketPrice {
  stock_symbol: string;
  company_name: string;
  current_price: string | number;
  day_change_percent: string | number;
  exchange: string;
  updated_at?: Date;
}

export const getAllUsers = async (): Promise<EquityUser[]| undefined> => {
  try {
    const data = await client.query(
      `SELECT * FROM equity_users
        ORDER BY investor_id;`,
    );
    return data.rows as EquityUser[];
  } catch (err) {
    console.log(err);
  }
}
export const getAllHoldings = async (): Promise<EquityHolding[]| undefined> => {
  try {
    const data = await client.query(
      `SELECT * FROM equity_holdings
        ORDER BY investor_id;`,
    );
    return data.rows as EquityHolding[];
  } catch (err) {
    console.log(err);
  }
};

export const getAllTransactions = async (): Promise<EquityTransaction[] | undefined> => {
  try {
    const data = await client.query(
      `SELECT * FROM equity_transactions
        ORDER BY investor_id;`,
    );
    return data.rows as EquityTransaction[];
  } catch (err) {
    console.log(err);
  }
};

const getInvestor_id = async (pan_num: string): Promise<string | null> => {
  try {
    const result = await client.query(
      `SELECT investor_id
       FROM equity_users
       WHERE UPPER(TRIM(pan_number)) = UPPER(TRIM($1))`,
      [pan_num],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0].investor_id;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getHoldingsbyINV = async (pan_num: string): Promise<EquityHolding[] | "Investor not found"> => {
  try {
    const investor_id = await getInvestor_id(pan_num);

    if (!investor_id) {
      return "Investor not found";
    }

    const data = await client.query(
      `SELECT * 
       FROM equity_holdings 
       WHERE investor_id = $1`,
      [investor_id],
    );

    return data.rows as EquityHolding[];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getTransactionsbyINV = async (pan_num: string): Promise<EquityTransaction[] | "Investor not found"> => {
  try {
    const investor_id = await getInvestor_id(pan_num);

    if (!investor_id) {
      return "Investor not found";
    }

    const data = await client.query(
      `SELECT * 
       FROM equity_transactions 
       WHERE investor_id = $1`,
      [investor_id],
    );

    return data.rows as EquityTransaction[];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getEquityMarketPrices = async():Promise<EquityMarketPrice[] | "market prices not found "> => {
  try {
    const data = await client.query(`SELECT * FROM equity_market_prices`);
    return data.rows as EquityMarketPrice[];
  } catch (err) {
    console.log(err);
    return [];
  }
};
