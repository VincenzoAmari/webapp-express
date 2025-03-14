import express from "express";
import movieRouter from "./routers/movieRouter.js";

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());

// Rotte API per i film
app.use("/movies", movieRouter);

// Avvio del server
app.listen(port, () => {
  console.log(`Server in esecuzione su http://localhost:${port}`);
});

app
  .listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.error("Errore durante l'avvio del server:", err);
  });
