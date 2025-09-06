import express from 'express'
import { config } from './config.ts'
import { sendMail } from './utils/email.ts';
import connectDB from './utils/db.ts';

const app = express();
app.use(express.json());

const port = config.PORT || 3001;

app.get('/', (_, res) => {
  res.send("Hello World!");
})

app.post('/send-email', async (req, res) => {
  const options = req.body;
  const result = await sendMail(options);
  return res.json({
    "response": result
  })
});

(async () => {
  if(config.URI)
    await connectDB(config.URI); 
  app.listen(port, ()=> {
    console.log(`server running at port - ${port}`)
  })
})();