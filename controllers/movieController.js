import connection from "../data/db.js";

function index(req, res) {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Errore nella query INDEX:", err); // Aggiunto per debug
      return res
        .status(500)
        .json({ error: "Errore lato server INDEX function" });
    }

    const movies = results.map((movie) => {
      return {
        ...movie,
        image: req.imagePath + movie.image,
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
      console.error("Errore nella query SHOW (movies):", err); // Aggiunto per debug
      return res
        .status(500)
        .json({ error: "Errore lato server SHOW function" });
    }

    if (results.length === 0)
      return res.status(404).json({ error: "Movie not found" });

    const movie = results[0];

    connection.query(reviewsSql, [id], (err, reviewsResults) => {
      if (err) {
        console.error("Errore nella query SHOW (reviews):", err); // Aggiunto per debug
        return res
          .status(500)
          .json({ error: "Errore lato server SHOW function" });
      }

      movie.reviews = reviewsResults;

      res.json({
        ...movie,
        image: req.imagePath + movie.image,
      });
    });
  });
}

function destroy(req, res) {
  const { id } = req.params;

  const sql = "DELETE FROM movies WHERE id = ?";

  connection.query(sql, [id], (err) => {
    if (err) {
      console.error("Errore nella query DESTROY:", err); // Aggiunto per debug
      return res
        .status(500)
        .json({ error: "Errore lato server DESTROY function" });
    }

    res.sendStatus(204);
  });
}

export { index as getMovies, show as getMovieById, destroy as deleteMovie };
