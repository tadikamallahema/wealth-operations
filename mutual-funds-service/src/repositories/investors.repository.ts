import { pool } from "../config/db";

export const getAllInvestors = async () => {

  const query = `
    SELECT *
    FROM mf_customers
  `;

  const result = await pool.query(query);

  return result.rows;
};

export const getInvestorById = async (
  investorId: string
) => {

  const query = `
    SELECT *
    FROM mf_customers
    WHERE customer_ref = $1
  `;

  const result = await pool.query(query, [
    investorId
  ]);

  return result.rows[0];
};

export const getInvestorHoldings = async (
  investorId: string
) => {

  const query = `
    SELECT
      mf.customer_ref,
      mf.scheme_code,
      ms.scheme_name,
      mf.units,
      mf.invested_amount,
      mf.current_value,
      mf.investment_date
    FROM mf_customer_funds mf
    JOIN mf_schemes ms
      ON mf.scheme_code = ms.scheme_code
    WHERE mf.customer_ref = $1
  `;

  const result = await pool.query(query, [
    investorId
  ]);

  return result.rows;
};

export const getInvestorHoldingByFund = async (
  investorId: string,
  fundId: string
) => {

  const query = `
    SELECT
      mf.customer_ref,
      mf.scheme_code,
      ms.scheme_name,
      mf.units,
      mf.invested_amount,
      mf.current_value
    FROM mf_customer_funds mf
    JOIN mf_schemes ms
      ON mf.scheme_code = ms.scheme_code
    WHERE mf.customer_ref = $1
    AND mf.scheme_code = $2
  `;

  const result = await pool.query(query, [
    investorId,
    fundId
  ]);

  return result.rows[0];
};

export const getPortfolioSummary = async (
  investorId: string
) => {

  const query = `
    SELECT
      customer_ref,
      SUM(invested_amount) AS total_invested,
      SUM(current_value) AS total_current_value
    FROM mf_customer_funds
    WHERE customer_ref = $1
    GROUP BY customer_ref
  `;

  const result = await pool.query(query, [
    investorId
  ]);

  return result.rows[0];
};
export const getInvestorByPAN = async (
  panNumber: string
) => {

  const query = `
    SELECT *
    FROM mf_customers
    WHERE pan_number = $1
  `;

  const result = await pool.query(query, [
    panNumber
  ]);

  return result.rows[0];

};