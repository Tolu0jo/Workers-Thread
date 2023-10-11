import express from 'express';
import { Worker,parentPort, workerData } from 'worker_threads';
const app = express();

app.use(express.json());


// app.get("/non-blocking",(req,res) => {
//     res.status(200).json({message:"This is nonblocking"});
// });



// app.get("/blocking",async(req,res) => {
  
//    const worker = new Worker("./worker.mjs")

//    worker.on('message', (data) => {
//     res.status(200).send("result is " + data);
//   });
 
//   worker.on('error', (error) => {
//     res.status(500).json({ message: error.message });
//   });
// });

const THREAD_COUNT =4;

function createWorker(){
    return new Promise((resolve, reject) => {
        const worker = new Worker("./four_workers.mjs",{
        workerData : {
            thread_count:THREAD_COUNT},
        });
        worker.on("message",(message) =>{
            resolve(message);
        });
        worker.on("error",(error) =>{
            resolve("An error occured: " + error);
        });
    })
}

app.get("/blocking",async(req,res) => {
  
   const workerPromises = []
for (let index = 0; index < THREAD_COUNT; index++) {
   workerPromises.push(createWorker())  
}
 const thread_results =await Promise.all(workerPromises)
 let total ="";
 for (let index = 0; index < THREAD_COUNT; index++) {
    total += thread_results[index] + " ";

 }
 res.status(200).json("result is " + total.trim())
});

const port = 3000;
app.listen(port,()=>{
    console.log("Listening on port " + port)
});