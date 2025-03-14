// routes/movieRouter.js
import express from "express";
const router = express.Router();

// Importa il controller per i film
import { index, show, destroy } from "../controllers/movieController.js";

// Rotte per i film

// index
// localhost:3000/api/movies
router.get("/", index);

// show
// localhost:3000/api/movies/:id
router.get("/:id", show);

// destroy
// localhost:3000/api/movies/:id
router.delete("/:id", destroy);

export default router;
