const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { db } = require("./model/dbConnection");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Tambah Data
app.post("/movie/insert", (req, res) => {
   const urlPoster = req.body.urlPoster;
   const title = req.body.title;
   const duration = req.body.duration;

   const sqlInsert = "INSERT INTO movie (urlPoster, title, duration ) VALUES (?,?,?)";
   db.query(sqlInsert, [urlPoster, title, duration], (err, result) => {
      if (err) {
         console.log(err);
         res.send({ message: "Error" });
      }
      if (!err) {
         console.log(result);
         res.send({ Message: "Data berhasil di input" });
      }
   });
});

// Update Data
app.put("/movie/update", (req, res) => {
   const urlPoster = req.body.urlPoster;
   const title = req.body.title;
   const duration = req.body.duration;
   const id = req.body.id;
   const data = [urlPoster, title, duration, id];
   const sqlUpdate = "UPDATE movie SET urlPoster=?, title=?, duration=? WHERE id=?";
   db.query(sqlUpdate, data, (err, result) => {
      if (err) {
         console.log(err);
      }
      if (!err) {
         console.log(result);
         res.send({ Message: "Data berhasil di Update" });
      }
   });
});

// Get Data
app.get("/movie/get", (req, res) => {
   const sqlSelect = "SELECT * FROM movie";
   db.query(sqlSelect, (err, result) => {
      if (!err) {
         res.send(result);
         console.log("results : ", result);
      } else {
         console.log("err : ", err);
      }
   });
});

// Get Data By ID
app.get("/movie/:id", (req, res) => {
   const id = req.params.id;
   const sqlWhere = "SELECT * FROM movie WHERE id= ? ";
   db.query(sqlWhere, id, (err, result) => {
      if (err) res.send(err);
      res.send(result);
   });
});

// Delete Data By ID
app.delete("/movie/delete/:id", (req, res) => {
   const id = req.params.id;
   console.log("delete id : ", id);
   const sqlDelete = "DELETE FROM movie WHERE id=? ";
   db.query(sqlDelete, id, (err, result) => {
      if (err) {
         res.send(err);
      } else {
         res.send(result);
         console.log("deleted");
      }
   });
});

app.listen(3001, () => {
   console.log("server on port 3001 is running...");
});
