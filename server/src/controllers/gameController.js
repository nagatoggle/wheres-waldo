import { getCharacterList, getBoardUrl, validateCoords } from '../models/characters.js';
import * as queries from '../db/queries.js';

export function landing(req, res) {
  const characters = getCharacterList();
  const boardUrl = getBoardUrl();
  res.json({ characters, boardUrl });
}

export async function startGame(req, res) {
  const sid = await queries.startGame();
  res.json({ sid });
}

export function validateClick(req, res) {
  const { id, clickX, clickY } = req.body;
  const isCorrect = validateCoords(id, clickX, clickY);

  res.json({
    found: isCorrect,
  });
}

export async function endGame(req, res) {
  const { sid } = req.body;
  const durationMs = await queries.stopTimer(sid);
  const rank = await queries.getUserRank(sid);
  const isRankedIn = rank <= 30;

  res.json({
    durationMs,
    rank,
    isRankedIn
  });
}

export async function recordName(req, res) {
  const { sid, name } = req.body;
  await queries.recordName(sid, name);
  res.json({ success: true });
}

export async function getLeaderboard(req, res) {
  const leaderboard = await queries.getLeaderboard();
  res.json({ leaderboard });
}

