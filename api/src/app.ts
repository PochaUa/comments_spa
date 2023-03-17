import express from 'express';
import router from './router';

const app = express();
const port = 8080;
app.use(router);

app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
