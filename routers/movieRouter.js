import express from "express";
const router = express.Router();

import {
  getMovies,
  getMovieById,
  deleteMovie,
} from "../controllers/movieController.js";

// Rotta per ottenere tutti i film
router.get("/", getMovies);

// Rotta per ottenere un film per ID
router.get("/:id", getMovieById);

// Rotta per eliminare un film
router.delete("/:id", deleteMovie);

export default router;
