import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFound } from "./middlewares/not-found.middleware.js";
import routes from "./routes/index.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Node.js API Listening on port: ${port}....`);
});

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(express.json());

app.use("/api", routes);

app.use("/", (req, res) => {
  res.send("Welcome to the Node.js API");
});

// Not found MiddleWare
app.use(notFound);

// Error MiddleWare
app.use(errorMiddleware);
