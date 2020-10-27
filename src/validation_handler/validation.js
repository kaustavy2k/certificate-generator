const usernames = require("../database_handler/server");
const url = require("url");
exports.validation = async (req, res) => {
  let { query } = url.parse(req.url, true);
  let queryid = query.value;
  let check = await usernames.find({ uid: queryid });
  if (check.length != 0) {
    res.render("validation", {
      title: check[0].name,
      confirm: "is",
    });
  } else {
    res.render("validation", {
      title: "",
      confirm: "You are NOT",
    });
  }
};
