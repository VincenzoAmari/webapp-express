import connection from "../db.js" assert { type: "module" };

// Ottenere tutti i film
export function getAllMovies(req, res) {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Errore nel recupero dei film" });
    }

    res.json(results);
  });
}

// Ottenere un singolo film con le recensioni
export function getMovieById(req, res) {
  const { id } = req.params;

  const movieSql = "SELECT * FROM movies WHERE id = ?";
  const reviewsSql = "SELECT * FROM reviews WHERE movie_id = ?";

  connection.query(movieSql, [id], (err, movieResults) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Errore nel recupero del film" });
    }
    if (movieResults.length === 0) {
      return res.status(404).json({ error: "Film non trovato" });
    }

    const movie = movieResults[0];

    connection.query(reviewsSql, [id], (err, reviewsResults) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Errore nel recupero delle recensioni" });
      }

      movie.reviews = reviewsResults;
      res.json(movie);
    });
  });
}
