import express, { Request, Response } from "express";
import dotenv from "dotenv";
import addressRoutes from "./routes/addressRoutes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();
app.use(express.json());

// Route file
app.use(addressRoutes);

app.get("/", (_: Request, res: Response) => {
  res.json({ message: "API is running." });
});

app.use(errorHandler);

export default app;
