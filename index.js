const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000 || process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users = [];

app.get("/", (req, res) => [res.end("hello")]);
app.get("/data", (req, res) => [res.end(JSON.stringify(users))]);
app.post("/register", (req, res) => {
  // const { username, password } = req.body;
  users.push(req.body);
  console.log(req.body);
  res.send("Registration successful!");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  console.log(req.body, "ok");
  console.log(users);
  if (user) {
    res.send({ login: true, data: user });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
