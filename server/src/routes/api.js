import { Router } from 'express';
import {
  landing,
  startGame,
  validateClick,
  endGame,
  recordName,
  getLeaderboard
} from '../controllers/gameController.js';

const apiRouter = Router();

apiRouter.post('/landing', landing);
apiRouter.post('/start', startGame);
apiRouter.post('/validate', validateClick);
apiRouter.post('/end', endGame);
apiRouter.patch('/record', recordName);
apiRouter.get('/leaderboard', getLeaderboard);

export default apiRouter;