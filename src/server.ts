import express, { type NextFunction, type Request, type Response } from 'express'
import { config } from './config.ts'
import adminRouter from './routes/adminRoute.ts'
import userRouter from './routes/userRoute.ts'
import issueRouter from './routes/issueRoute.ts'
import connectDB from './utils/db.ts';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
  maxAge: 86400
}));

const port = config.PORT;

app.get('/', (_, res) => {
  res.send("Hello World!");
});

app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/issue', issueRouter);

(async () => {
  if(config.URI)
    await connectDB(config.URI); 
  app.listen(port, ()=> {
    console.log(`server running at port - ${port}`)
  })
})();


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});
