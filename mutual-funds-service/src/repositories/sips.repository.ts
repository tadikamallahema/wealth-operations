import { pool } from "../config/db";

export const getAllSips = async () => {

  const query = `
    SELECT *
    FROM mf_sips
    ORDER BY id DESC
  `;

  const result = await pool.query(query);

  return result.rows;

};

export const getSipById = async (
  sipId: string
) => {

  const query = `
    SELECT *
    FROM mf_sips
    WHERE id = $1
  `;

  const result = await pool.query(query, [
    sipId
  ]);

  return result.rows[0];

};

export const getInvestorSips = async (
  investorId: string
) => {

  const query = `
    SELECT *
    FROM mf_sips
    WHERE customer_ref = $1
    ORDER BY id DESC
  `;

  const result = await pool.query(query, [
    investorId
  ]);

  return result.rows;

};

export const createSip = async (
  data: any
) => {

  const query = `
    INSERT INTO mf_sips (
      customer_ref,
      scheme_code,
      sip_amount,
      sip_status,
      start_date,
      next_due_date
    )
    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6
    )
    RETURNING *
  `;

  const values = [
    data.customer_ref,
    data.scheme_code,
    data.sip_amount,
    data.sip_status,
    data.start_date,
    data.next_due_date
  ];

  const result = await pool.query(
    query,
    values
  );

  return result.rows[0];

};

export const pauseSip = async (
  sipId: string
) => {

  const query = `
    UPDATE mf_sips
    SET sip_status = 'PAUSED'
    WHERE id = $1
    RETURNING *
  `;

  const result = await pool.query(query, [
    sipId
  ]);

  return result.rows[0];

};

export const resumeSip = async (
  sipId: string
) => {

  const query = `
    UPDATE mf_sips
    SET sip_status = 'ACTIVE'
    WHERE id = $1
    RETURNING *
  `;

  const result = await pool.query(query, [
    sipId
  ]);

  return result.rows[0];

};

export const cancelSip = async (
  sipId: string
) => {

  const query = `
    UPDATE mf_sips
    SET sip_status = 'CANCELLED'
    WHERE id = $1
    RETURNING *
  `;

  const result = await pool.query(query, [
    sipId
  ]);

  return result.rows[0];

};
export const getFailedSips = async () => {

  const query = `
    SELECT *
    FROM mf_sip_failures
    ORDER BY failure_date DESC
  `;

  const result =
    await pool.query(query);

  return result.rows;

};



export const getSipFailures = async (
  sipId: string
) => {

  const query = `
    SELECT *
    FROM mf_sip_failures
    WHERE sip_id = $1
    ORDER BY failure_date DESC
  `;

  const result =
    await pool.query(query, [
      sipId
    ]);

  return result.rows;

};



export const retryFailedSip = async (
  sipId: string
) => {

  // UPDATE FAILURE STATUS
  const updateQuery = `
    UPDATE mf_sip_failures
    SET retry_status = 'SUCCESS'
    WHERE sip_id = $1
    RETURNING *
  `;

  const result =
    await pool.query(updateQuery, [
      sipId
    ]);

  // UPDATE SIP STATUS
  const sipQuery = `
    UPDATE mf_sips
    SET sip_status = 'ACTIVE'
    WHERE id = $1
  `;

  await pool.query(sipQuery, [
    sipId
  ]);

  return result.rows;

};