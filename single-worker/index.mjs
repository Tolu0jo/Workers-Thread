import express from 'express';
import { Worker,parentPort, workerData } from 'worker_threads';
const app = express();

app.use(express.json());


app.get("/non-blocking",(req,res) => {
    res.status(200).json({message:"This is nonblocking"});
});



app.get("/blocking",async(req,res) => {
  
   const worker = new Worker("./worker.mjs")

   worker.on('message', (data) => {
    res.status(200).send("result is " + data);
  });
 
  worker.on('error', (error) => {
    res.status(500).json({ message: error.message });
  });
});





const port = 3000;
app.listen(port,()=>{
    console.log("Listening on port " + port)
});