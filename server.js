const express = require("express");
const request = require("request");
const app = express();

app.use(express.static("public"));
var localTime  = new Date();
console.log(localTime);
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.get("/", function (request, response) {
  response.render("index");
});
var fetchUser = "masaow";
app.get("/contests", function (request, response) {
  response.render("contests", { ejs_user: fetchUser });
});
app.get("/allUsers", function (request, response) {
  response.render("allUsers");
});
app.get("/ratings", function (req, response) {
  fetchUser = req.query.userHandle;
  response.render("ratings", { ejs_user: fetchUser });
});
app.get("/tags", function (request, response) {
  response.render("tags", { ejs_user: fetchUser });
});
const port = process.env.PORT || 8080;
app.listen(port, function () {
  return console.log(`Server up at - ${port}`);
});
