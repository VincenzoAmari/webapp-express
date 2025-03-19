import connection from "../data/db.js";

function index(req, res) {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Errore nella query INDEX:", err);
      return res.status(500).json({
        error: "Errore lato server INDEX function",
      });
    }

    const movies = results.map((movie) => {
      return {
        ...movie,
        image: movie.image ? req.imagePath + movie.image : null,
      };
    });

    res.json(movies);
  });
}

function show(req, res) {
  const { id } = req.params;

  const movieSql = "SELECT * FROM movies WHERE id = ?";
  const reviewsSql = "SELECT * FROM reviews WHERE movie_id = ?";

  connection.query(movieSql, [id], (err, results) => {
    if (err) {
      console.error("Errore nella query SHOW (movies):", err);
      return res.status(500).json({
        error: "Errore lato server SHOW function",
      });
    }

    if (results.length === 0)
      return res.status(404).json({
        error: "Movie not found",
      });

    const movie = results[0];

    connection.query(reviewsSql, [id], (err, reviewsResults) => {
      if (err) {
        console.error("Errore nella query SHOW (reviews):", err);
        return res.status(500).json({
          error: "Errore lato server SHOW function",
        });
      }

      movie.reviews = reviewsResults;

      res.json({
        ...movie,
        image: movie.image ? req.imagePath + movie.image : null,
      });
    });
  });
}

function destroy(req, res) {
  const { id } = req.params;

  const sql = "DELETE FROM movies WHERE id = ?";

  connection.query(sql, [id], (err) => {
    if (err) {
      console.error("Errore nella query DESTROY:", err);
      return res
        .status(500)
        .json({ error: "Errore lato server DESTROY function" });
    }

    res.sendStatus(204);
  });
}

// funzione per salvare una recensione
function storeReview(req, res) {
  const { id } = req.params;
  const { name, vote, text } = req.body;

  if (!name || !vote || !text) {
    return res.status(400).json({
      error: "Nome, voto e testo sono obbligatori",
    });
  }

  const sql =
    "INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)";
  const values = [id, name, vote, text];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Errore nella query STORE REVIEW:", err);
      return res.status(500).json({
        error: "Errore lato server STORE REVIEW function",
      });
    }

    res.status(201).json({
      message: "Recensione creata con successo",
      review: {
        id: result.insertId,
        movie_id: id,
        name,
        vote,
        text,
      },
    });
  });
}
export {
  index as getMovies,
  show as getMovieById,
  destroy as deleteMovie,
  storeReview,
};
