const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.static("public"));
app.use(express.json());

const data = JSON.parse(
  fs.readFileSync("chatbot-data.json")
);

app.post("/chat", (req, res) => {

  const message = req.body.message.toLowerCase();

  let reply = "Sorry, I don't understand.";

  data.forEach(item => {
    if (message.includes(item.question)) {
      reply = item.answer;
    }
  });

  res.json({ reply });

});

app.listen(3000, () => {
  console.log("Chatbot Running on Port 3000");
});