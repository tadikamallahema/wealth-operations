import client from "../config/pgManager.js";

export const getAllUsers = async () => {
  try {
    const data = await client.query(
      `SELECT * FROM equity_users
        ORDER BY investor_id;`,
    );
    return data.rows
  } catch (err) {
    console.log(err);
  }
}
export const getAllHoldings = async () => {
  try {
    const data = await client.query(
      `SELECT * FROM equity_holdings
        ORDER BY investor_id;`,
    );
    return data.rows
  } catch (err) {
    console.log(err);
  }
};

export const getAllTransactions = async () => {
  try {
    const data = await client.query(
      `SELECT * FROM equity_transactions
        ORDER BY investor_id;`,
    );
    return data.rows;
  } catch (err) {
    console.log(err);
  }
};

const getInvestor_id = async (pan_num: string) => {
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

export const getHoldingsbyINV = async (pan_num: string) => {
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

    return data.rows;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getTransactionsbyINV = async (pan_num: string) => {
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

    return data.rows;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getEquityMarketPrices = async () => {
  try {
    const data = await client.query(`SELECT * FROM equity_market_prices`);

    return data.rows;
  } catch (err) {
    console.log(err);
    return [];
  }
};
