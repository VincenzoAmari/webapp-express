import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "db_movies",
});

connection.connect((err) => {
  if (err) {
    console.error("Errore di connessione al database:", err.stack);
    return;
  }
  console.log("Connessione al database MySQL stabilita con successo!");
});

export default connection;
