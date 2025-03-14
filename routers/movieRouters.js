import express from "express";
import { getAllMovies, getMovieById } from "../controllers/movieController.js";

const router = express.Router();

// Endpoint per ottenere tutti i film
router.get("/", getAllMovies);

// Endpoint per ottenere un singolo film con recensioni
router.get("/:id", getMovieById);

export default router;
