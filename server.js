const express = require("express");

const app = express();

const ourWord = "lucky";

app.get("/word/:guess", function (req, res) {
  let ourWordMap = {
    l: 1,
    u: 1,
    c: 1,
    k: 1,
    y: 1,
  };

  let resArr = ["", "", "", "", ""];
  const word = req.params.guess.toLowerCase();
  for (let i = 0; i < word.length; i++) {
    if (word[i] === ourWord[i]) {
      resArr[i] = "green";
      let currentLetter = ourWord[i];
      ourWordMap[currentLetter]--;
    }
  }
  for (let i = 0; i < word.length; i++) {
    if (word[i] !== ourWord[i]) {
      let currentLetter = word[i];
      if (ourWordMap[currentLetter] === undefined) {
        resArr[i] = "gray";
      } else if (ourWordMap[currentLetter] > 0) {
        resArr[i] = "orange";
        ourWordMap[currentLetter]--;
      } else {
        resArr[i] = "gray";
      }
    }
  }
  res.send(resArr);
});
app.use(express.static("public"));

app.listen(3000);
