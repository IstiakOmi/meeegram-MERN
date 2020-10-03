import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import pusher from "pusher";
import dbModel from "./dbModel.js";
// app config
const app = express();
const port = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(cors());

// DB COnfig
const connectionURL =
  "mongodb+srv://admin:uqJ6aRKzzZfYFijZ@cluster0.39ieg.mongodb.net/instameeeDB?retryWrites=true&w=majority";
mongoose.connect(connectionURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB is Connected");
});

// api routes
app.get("/", (req, res) => res.status(200).send("Hello Node JS | | Express"));

app.post("upload", (req, res) => {
  const body = req.body;

  dbModel.create(body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/sync", (req, res) => {
  dbModel.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// listen
app.listen(port, () => console.log(`listening on localhost: ${port}`));

//uqJ6aRKzzZfYFijZ
//mongodb+srv://admin:<password>@cluster0.39ieg.mongodb.net/<dbname>?retryWrites=true&w=majority

//  const dbObj = {
//     caption: req.body.caption,
//     user: req.body.user,
//     image: {
//       data: fs.readFileSync(path.join("./uploads/" + req.file.filename)),
//       contentType: "image*",
//     },
//     comments: [],
//   };
