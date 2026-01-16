#! /usr/bin/env node

import { Client } from 'pg';

const SQL_DROP_LEADERBOARD = `
DROP TABLE IF EXISTS leaderboard CASCADE;
`;

const SQL_CREATE_LEADERBOARD = `
CREATE TABLE IF NOT EXISTS leaderboard (
  id          integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  session_key uuid DEFAULT gen_random_uuid(),
  start_time  timestamptz NOT NULL DEFAULT current_timestamp,
  end_time    timestamptz,
  duration_ms integer,
  name        varchar(64)
);
`;

const SQL_INSERT_LEADERBOARD = `
INSERT INTO leaderboard (start_time, end_time, duration_ms, name)
VALUES
  (current_timestamp - interval '10 minutes', current_timestamp - interval '9 minutes 50 seconds', 10000, 'Alice'),
  (current_timestamp - interval '20 minutes', current_timestamp - interval '19 minutes 40 seconds', 20000, 'Bob'),
  (current_timestamp - interval '30 minutes', current_timestamp - interval '29 minutes 30 seconds', 30000, 'Carol'),
  (current_timestamp - interval '40 minutes', current_timestamp - interval '39 minutes 20 seconds', 40000, 'Dave'),
  (current_timestamp - interval '1 minute', NULL, NULL, NULL)
;
`;

async function main() {
  const isProd = process.env.NODE_ENV === 'production';

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: isProd ? { rejectUnauthorized: false } : false,
  });

  try {
    await client.connect();

    if (!isProd) {
      console.log("Dropping existing table...");
      await client.query(SQL_DROP_LEADERBOARD);
    }

    await createAndInsert('leaderboard', SQL_CREATE_LEADERBOARD, SQL_INSERT_LEADERBOARD, client);

  } catch (err) {
    console.error(err.message);
    process.exit(1);

  } finally {
    await client.end();
    console.log("done");
  }
}

async function createAndInsert(tableName, sqlCreate, sqlInsert, client) {
  await client.query(sqlCreate);

  const { rows } = await client.query(`SELECT COUNT(*) FROM ${tableName}`);
  const count = Number(rows[0].count);

  if (count === 0) {
    console.log(`Inserting initial data into ${tableName}...`);
    await client.query(sqlInsert);
  } else {
    console.log(`Table (${tableName}) already exists and contains data. Skipping seed.`);
  }
}

main();