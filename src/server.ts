import express, { type Request } from 'express'
import { config } from 'dotenv'

const app = express();

config();
const port = process.env.PORT || 3000;

app.get('/', (_, res) => {
  res.send("Hello World!");
})

app.listen(port, ()=> {
  console.log(`servre running at port - ${port}`)
})
