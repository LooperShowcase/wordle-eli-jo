const wordsNum = 6;
const charNum = 5;
let words = document.getElementById("container");

for (let index = 0; index < 6; index++) {
  // rows
  let singleWord = document.createElement("div");
  singleWord.className = "word";
  for (let index = 0; index < 5; index++) {
    let singleChar = document.createElement("div");
    singleChar.className = "char";
    singleWord.appendChild(singleChar);
  } // characters
  words.appendChild(singleWord);
}

let currentWord = 0;
let currentChar = 0;

document.addEventListener("keydown", async function (event) {
  if (event.key === "Backspace") {
    if (currentChar > 0) {
      let wordDiv = words.children[currentWord];
      let charDel = wordDiv.children[currentChar - 1];
      charDel.innerHTML = "";
      currentChar--;
    }
  } else if (event.key === "Enter") {
    if (currentChar === 5) {
      let wordDiv = words.children[currentWord];
      let chars = wordDiv.children;
      const word = getWord();
      const results = await (await fetch("/word/" + word)).json();
      for (let i = 0; i < results.length; i++) {
        wordDiv.children[i].style.backgroundColor = results[i];
        wordDiv.children[i].style.color = "white";
        wordDiv.children[i].style.border = "4px " + results[i] + " solid";
        animateCSS(wordDiv.children[i], "flipInX");
      }
      currentWord++;
      currentChar = 0;
    }
  } else if (currentChar < 5 && isLetter(event.key)) {
    let wordDiv = words.children[currentWord];
    let charDiv = wordDiv.children[currentChar];
    charDiv.innerHTML = event.key;
    currentChar++;
  }
});

function getWord() {
  let word = "";
  let myGuess = words.children[currentWord];
  for (let i = 0; i < myGuess.children.length; i++) {
    word = word + myGuess.children[i].innerHTML;
  }
  return word;
}

const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element

    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    element.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  });

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
  document.getElementsByClassName("char").style.border = "4px white solid";
}
