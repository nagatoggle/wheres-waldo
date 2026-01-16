import express from 'express';
import path from 'node:path';
import apiRouter from './routes/api.js';

const app = express();
app.use(express.json());
app.use('/api', apiRouter);

const publicPath = path.resolve(import.meta.dirname, '../public');
app.use(express.static(publicPath));

const clientDistPath = path.resolve(import.meta.dirname, '../../client/dist');
app.use(express.static(clientDistPath));

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.resolve(clientDistPath, 'index.html'));
});

export default app;