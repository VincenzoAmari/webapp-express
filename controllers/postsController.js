// const db = require("../data/db"); // connessione a MySQL

// const getAllPosts = (req, res) => {
//   let sql = "SELECT * FROM posts"; // Query SQL

//   // filtro per tag
//   if (req.query.tag) {
//     sql = `SELECT * FROM posts WHERE tags LIKE '%${req.query.tag}%'`;
//   }

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Errore durante il recupero dei post:", err);
//       return res.status(500).json({ error: "Errore interno al server" });
//     }
//     res.json(results);
//   });
// };

// const getPostById = (req, res) => {
//   const id = parseInt(req.params.id);
//   db.query("SELECT * FROM posts WHERE id = ?", [id], (err, results) => {
//     if (err) {
//       console.error("Errore durante il recupero del post:", err);
//       return res.status(500).json({ error: "Errore interno al server" });
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ error: "Post non trovato" });
//     }
//     res.json(results[0]);
//   });
// };

// //crea il post

// const createPost = (req, res) => {
//   const { titolo, contenuto, immagine, tags } = req.body;

//   if (!titolo || !contenuto || !immagine || !tags) {
//     return res.status(400).json({ error: "Tutti i campi sono obbligatori" });
//   }

//   const sql =
//     "INSERT INTO posts (titolo, contenuto, immagine, tags) VALUES (?, ?, ?, ?)";
//   db.query(sql, [titolo, contenuto, immagine, tags], (err, result) => {
//     if (err) {
//       console.error("Errore durante la creazione del post:", err);
//       return res.status(500).json({ error: "Errore interno al server" });
//     }
//     res
//       .status(201)
//       .json({ id: result.insertId, titolo, contenuto, immagine, tags });
//   });
// };

// //Aggiorna post

// const updatePost = (req, res) => {
//   const id = parseInt(req.params.id);
//   const { titolo, contenuto, immagine, tags } = req.body;

//   const sql =
//     "UPDATE posts SET titolo = ?, contenuto = ?, immagine = ?, tags = ? WHERE id = ?";
//   db.query(sql, [titolo, contenuto, immagine, tags, id], (err, result) => {
//     if (err) {
//       console.error("Errore durante l'aggiornamento del post:", err);
//       return res.status(500).json({ error: "Errore interno al server" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Post non trovato" });
//     }
//     res.json({ message: "Post aggiornato con successo" });
//   });
// };

// //cancella post con id selezionato

// ////////////////////////////////////////

// const deletePost = (req, res) => {
//   const id = parseInt(req.params.id);

//   db.query("DELETE FROM posts WHERE id = ?", [id], (err, result) => {
//     if (err) {
//       console.error("Errore durante l'eliminazione del post:", err);
//       return res.status(500).json({ error: "Errore interno al server" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Post non trovato" });
//     }
//     res.status(204).send(); // Nessun contenuto, eliminazione riuscita
//   });
// };

// module.exports = {
//   getAllPosts,
//   getPostById,
//   createPost,
//   updatePost,
//   deletePost,
// };
