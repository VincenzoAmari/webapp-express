import express from "express";
import movieRouter from "./routers/movieRouter.js";
import setImagePath from "./middlewares/imagePath.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.static("public")); // Middleware per gestire asset statici
app.use(express.json()); // Middleware per gestire il body JSON
app.use(setImagePath); // Middleware per gestione delle immagini

// Rotta di test
app.get("/", (req, res) => {
  res.send("Server Movies tutto a posto!");
});

// Router per i film
app.use("/api/movies", movieRouter);

// Attivazione del server
app.listen(port, () => {
  console.log(`Server Movies in funzione sulla porta: ${port}`);
});
