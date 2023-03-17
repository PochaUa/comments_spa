import express from 'express';
import cors from 'cors';
import router from './router';

const app = express();
const port = 8080;

app.use(cors());
app.use(router);

app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
