import express, {Express,Request,Response} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { Cards } from './models/cards';
dotenv.config();

mongoose.connect('mongodb://localhost:27017/assgn').then(() => console.log('connected'))


const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/cards',async(req:Request,res:Response)=>{
  try {

    const {title,description } = req.body
    if (title == "" || title == null || title == undefined){
      return res.status(400).json({success: false,message: "Title can't be empty"});
    }
    else if (description == "" || description == null || description == undefined){
      return  res.status(400).json({success: false,message: "Description can't be empty"});
    }
    const card = await Cards.create({title,description});
    
    if(card){
      return res.status(201).json({success:true,message:"Card created Successfully",card})
    }
    res.status(500).json({success: false,message: "Internal Server Error"})
  }catch(err){
    console.log(err)
    res.status(500).json({success: false,message: "Internal Server Error"})
  }
})
app.get('/cards',async(req:Request,res:Response)=>{
  try {
    const cards = await Cards.find()
    res.status(200).json({success: true,data: cards})
  }catch(err){
    console.log(err)
    res.status(500).json({success: false,message: "Internal Server Error"})
  }
})

app.get('/cards/:title',async (req:Request,res:Response)=>{
  try {
    const { title } = req.params
    const card = await Cards.find({title})
    if(card.length == 0){
      return res.status(404).json({success: false,message: "Card Not Found"})
    }
    res.status(200).json({success: true,message: "Card Fetched",data:card})
  }catch(err){
    console.log(err)
    res.status(500).json({success: false,message: "Internal Server Error"})
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

