const express = require("express");
const { usernames, adminpanels } = require("./src/database_handler/server");
let checkuser = require("./src/validation_handler/validation");
const port=process.env.PORT;
const app = express();
app.use(express.json());
app.set("views", __dirname + "/views");
app.set("view engine", "pug");
app.use(express.static(__dirname + "/src/certificate_handler"));
app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/vendors"));
app.use(express.static(__dirname + "/pdfs"));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/src/validation_handler"));

//Homepage routes
app.get("/", (req, res) => {
  res.status(200).sendFile("index.html", { root: __dirname });
});
app.post("/", async (req, res) => {
  
  let checkname = await adminpanels.find({ name: req.body.name });
  if (checkname.length != 0) {
    await usernames.create(req.body);
  }
  else{
    res.status(500).send("showAlert");
  }
  res.status(200).send();
});


//validation route
app.get("/validation", checkuser.validation);

app.listen(port, () => {
  console.log("running");
});
