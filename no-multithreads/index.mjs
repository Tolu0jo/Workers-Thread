import express from 'express';
import { Worker,parentPort, workerData } from 'worker_threads';
const app = express();

app.use(express.json());


app.get("/non-blocking",(req,res) => {
    res.status(200).json({message:"This is nonblocking"});
});




app.get("/blocking",async(req,res) => {
   let counter = 0;
   for(let i = 0; i < 20_000_000_000;i++){
    counter ++;
   }
   res.status(200).json(counter)
});


const port = 3000;
app.listen(port,()=>{
    console.log("Listening on port " + port)
});