 import express from "express"
 import OpenAI from "openai";
 import cors from "cors";
 import { configDotenv } from "dotenv";
 configDotenv();
 const app = express();
 app.use(cors());
 app.use(express.json());

 //Configure api  
 const openai = new OpenAI({
   apiKey:process.env.OPENAI_KEY
 })
 // create post req

 app.post("/chatbot", async(req,res)=>{
   try{
      const {prompt} = req.body
      if(!prompt){
         res.status(400).json({error:"the input is empty"})
      } 

      const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "system", content:prompt}],
          store: true,
      });
      
      console.log(completion.choices[0].message);
      res.json(completion.choices[0].message);

   }catch(error){
      res.status(500).json({error:"server failde"})
      console.log(error)
   }
 })

 app.listen(5000,()=>{
    console.log("running.....")
 })