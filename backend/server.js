const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const connectDB = require("./db/db");
const authRouter = require("./router/authRouter");
const noteRouter = require("./router/notesRouter");

connectDB();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});