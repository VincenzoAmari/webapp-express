import express from "express";
import movieRouter from "./routers/movieRouter.js";
import setImagePath from "./middlewares/imagePath.js";

const app = express();
const port = 3000;

app.use(express.json()); // Per il body parser
app.use(setImagePath);
app.use("/api/movies", movieRouter);

app.listen(port, () => {
  console.log(`Server in esecuzione sulla porta: ${port}`);
});
