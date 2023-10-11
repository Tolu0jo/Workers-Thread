import express,{Request,Response,NextFunction} from 'express';

const app = express();

app.use(express.json());


app.get("/non-blocking",(req:Request,res:Response) => {
    res.status(200).json({message:"This is nonblocking"});
});

const calculate=()=>{
    return new Promise((resolve,reject) => {
        let counter = 0;
        for (let index = 0; index < 20_000_000_000; index++) {
            counter ++;
    
        }
        resolve(counter);
    })
}

app.get("/blocking",async(req:Request,res:Response) => {
  
    const counter = await calculate()

    
    res.status(200).json({message:"result is " + counter});
});

const port = 3000;
app.listen(port,()=>{
    console.log("Listening on port " + port)
});