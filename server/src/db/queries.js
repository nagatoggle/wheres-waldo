import { Pool } from 'pg';

const isProd = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProd ? { rejectUnauthorized: false } : false,
});

const SQL_START_GAME = `
INSERT INTO leaderboard DEFAULT VALUES
RETURNING session_key;
`;

export async function startGame() {
  const { rows } = await pool.query(SQL_START_GAME);
  return rows[0].session_key;
}

const SQL_STOP_TIMER = `
UPDATE leaderboard
SET
  end_time = current_timestamp,
  duration_ms = (EXTRACT(EPOCH FROM (current_timestamp - start_time)) * 1000)::INTEGER
WHERE session_key = $1
RETURNING duration_ms;
`;

export async function stopTimer(sessionKey) {
  const { rows } = await pool.query(SQL_STOP_TIMER, [sessionKey]);
  return rows[0].duration_ms;
}

const SQL_GET_USER_RANK = `
WITH rankedLeaderboard AS (
  SELECT
    ROW_NUMBER() OVER (ORDER BY duration_ms ASC, end_time ASC) as rank,
    session_key
  FROM leaderboard
  WHERE end_time IS NOT NULL
)
SELECT rank FROM rankedLeaderboard
WHERE session_key = $1;
`;

export async function getUserRank(sessionKey) {
  const { rows } = await pool.query(SQL_GET_USER_RANK, [sessionKey]);
  const userRank = Number(rows[0].rank);
  return userRank;
}

const SQL_RECORD_NAME = `
UPDATE leaderboard
SET
  name = $2
WHERE session_key = $1;
`;

export async function recordName(sessionKey, name) {
  await pool.query(SQL_RECORD_NAME, [sessionKey, name]);
}

const SQL_GET_LEADERBORD = `
SELECT
  ROW_NUMBER() OVER (ORDER BY duration_ms ASC, end_time ASC) as rank,
  name,
  duration_ms,
  session_key
FROM leaderboard
WHERE end_time IS NOT NULL
ORDER BY duration_ms ASC
LIMIT 30;
`;

export async function getLeaderboard() {
  const { rows } = await pool.query(SQL_GET_LEADERBORD);

  const leaderboard = rows.map((row) => ({
    rank: row.rank,
    name: row.name,
    durationMs: row.duration_ms,
    sessionKey: row.session_key
  }));

  return leaderboard;
}