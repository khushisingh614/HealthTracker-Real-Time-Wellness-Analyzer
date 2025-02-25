import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";


const app = express();
// app.use(express.json());
const port = 3000;

// const genAI = new GoogleGenerativeAI();
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// const prompt = "The best food of Maharashtra";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());


// Define a manual input object
const manualInput = {
  Gender: 1,         // 1 for Male, 0 for Female
  Age: 35,
  Systolic_BP: 129,
  Diastolic_BP: 83,
  Cholesterol: 188,
  Height_cm: 169.07,
  Weight_kg: 73.79,
  BMI: 25.82,
  Smoker: 0,         // 0 for No, 1 for Yes
  Diabetes: 1      // 0 for No, 1 for Yes
};

app.get("/predict", async (req, res) => {
  try {
      const response = await axios.post("http://127.0.0.1:5000/predict", manualInput);
      console.log(response.data);
      res.json(response.data);
  } catch (error) {
      console.error("Error calling Flask API:", error);
      res.status(500).json({ error: "Failed to get prediction" });
  }
});


// app.get("/" , (req , res)=>{
//     res.send("hello");
// });

app.listen(port, () => {
  console.log(`server is running on port ${port}.`);
});
