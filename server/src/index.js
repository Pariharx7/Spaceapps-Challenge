import  express from "express";
import cors from "cors";
import dotenv from "dotenv";


// Import our custom weather routes
import weatherRouter from "./routes/weather.routes.js";

dotenv.config();




const app = express();
const PORT = process.env.PORT || 3001; // Use port from .env or default to 3001

// ## Middleware ##
// Enable Cross-Origin Resource Sharing for all routes
app.use(cors());
// Enable Express to parse JSON in request bodies
app.use(express.json());

// ## API Routes ##
// Tell the app to use our weather router for any URL starting with /api/weather
app.use('/api/weather', weatherRouter);

// ## Start Server ##
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🚀`);
});