import { pool } from "../config/db";

export const getAllFunds = async () => {

  const query = `
    SELECT *
    FROM mf_schemes
  `;

  const result = await pool.query(query);

  return result.rows;
};

export const getFundById = async (
  fundId: string
) => {

  const query = `
    SELECT *
    FROM mf_schemes
    WHERE scheme_code = $1
  `;

  const result = await pool.query(query, [fundId]);

  return result.rows[0];
};

export const getFundNAV = async (
  fundId: string
) => {

  const query = `
    SELECT
      scheme_code,
      scheme_name,
      nav_value,
      nav_date
    FROM mf_schemes
    WHERE scheme_code = $1
  `;

  const result = await pool.query(query, [fundId]);

  return result.rows[0];
};

export const getFundNAVHistory = async (
  fundId: string
) => {

  const query = `
    SELECT
      scheme_code,
      scheme_name,
      nav_value,
      nav_date
    FROM mf_schemes
    WHERE scheme_code = $1
  `;

  const result = await pool.query(query, [fundId]);

  return result.rows;
};