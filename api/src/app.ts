import express from 'express';
import cors from 'cors';
import router from './router';
import db from './db';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, async () => {
  return db
    .sync()
    .then(() => {
      console.log('Synced db.');
    })
    .catch((err) => {
      console.log('Failed to sync db: ' + err.message);
    })
    .then(() => {
      console.log(
        `App is ready to accept requests on http://localhost:${port}`
      );
    });
});
