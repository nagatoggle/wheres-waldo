import express from 'express';
import path from 'node:path';
import apiRouter from './routes/api.js';

const app = express();
app.use(express.json());
app.use('/api', apiRouter);

const serverRoot = path.dirname(import.meta.dirname);
const publicPath = path.join(serverRoot, 'public');
app.use(express.static(publicPath));

const projectRoot = path.dirname(serverRoot);
const clientDistPath = path.join(projectRoot, 'client', 'dist');
app.use(express.static(clientDistPath));

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.resolve(clientDistPath, 'index.html'));
});

export default app;