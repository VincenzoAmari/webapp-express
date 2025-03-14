import express from "express";

import movieRouter from "./routes/movieRouter.js";

import imagePathMiddleware from "./middlewares/imagePath.js";

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.static("public"));

app.use(express.json());

app.use(imagePathMiddleware);

// Usa il router per le rotte dei film
app.use("/movies", movieRouter);

// Attivazione del server
app.listen(port, () => {
  console.log(`Server in esecuzione sulla porta: ${port}`);
});
