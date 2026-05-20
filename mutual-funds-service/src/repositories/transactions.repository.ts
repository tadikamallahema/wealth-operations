import { pool } from "../config/db";

export const getAllTransactions = async () => {

  const query = `
    SELECT *
    FROM mf_transactions
    ORDER BY executed_at DESC
  `;

  const result = await pool.query(query);

  return result.rows;
};

export const getTransactionById = async (
  transactionId: string
) => {

  const query = `
    SELECT *
    FROM mf_transactions
    WHERE id = $1
  `;

  const result = await pool.query(query, [
    transactionId
  ]);

  return result.rows[0];
};

export const getInvestorTransactions = async (
  investorId: string
) => {

  const query = `
    SELECT *
    FROM mf_transactions
    WHERE customer_ref = $1
    ORDER BY executed_at DESC
  `;

  const result = await pool.query(query, [
    investorId
  ]);

  return result.rows;
};

export const purchaseFund = async (
  data: any
) => {

  const query = `
    INSERT INTO mf_transactions (
      customer_ref,
      scheme_code,
      transaction_type,
      amount,
      units,
      executed_at
    )
    VALUES ($1, $2, $3, $4, $5, NOW())
    RETURNING *
  `;

  const values = [
    data.customer_ref,
    data.scheme_code,
    "PURCHASE",
    data.amount,
    data.units
  ];

  const result = await pool.query(
    query,
    values
  );

  return result.rows[0];
};

export const redeemFund = async (
  data: any
) => {

  const query = `
    INSERT INTO mf_transactions (
      customer_ref,
      scheme_code,
      transaction_type,
      amount,
      units,
      redemption_status,
      executed_at
    )
    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      NOW()
    )
    RETURNING *
  `;

  const values = [
    data.customer_ref,
    data.scheme_code,
    "REDEEM",
    data.amount,
    data.units,
    "SUCCESS"
  ];

  const result = await pool.query(
    query,
    values
  );

  return result.rows[0];
};