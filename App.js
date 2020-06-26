const gameContainer = document.getElementById("game");
const displayScore=document.getElementById("score")
//const resetGame=document.getElementById("reset")
const COLORS = [
  "cyan",
  "blue",
  "green",
  "orange",
  "purple",
  "cyan",
  "blue",
  "green",
  "orange",
  "purple"
];
let openCard = 0;
let memoryCardArr = [];
let score = 0;
let currId = 0;
let selected = [];
const tiles_flipped = 0;
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  //let cardId=1
  //this.classList.toggle("white")
  for (let color of colorArray) {
    // create a new div

    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.id = currId++
    newDiv.style.backgroundColor = "violet"
    newDiv.setAttribute('opened', 'false')
    // newDiv.classList.toggle("reset")
    //newDiv.classList.toggle("close")
     // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", (e) => {
      console.log(e.target.getAttribute('opened'))
      if(e.target.getAttribute('opened')==='true'){
        console.log('alredy opened')
        return;
      }
      console.log("not alreDY OPENED SO PROCEEING")
      if (openCard < 2) {
        if(openCard===1){
          if(e.target.id===selected[0].id){
            return;//do nothing
          }
        }
        e.target.style.backgroundColor = color;
        //e.target.classList.toggle(color)
        openCard += 1
        memoryCardArr.push(e.target.style.backgroundColor)
        selected.push(e.target)
      }
      if (openCard === 2) {

        if (selected[0].style.backgroundColor === selected[1].style.backgroundColor) {
          score += 1
          displayScore.textContent=score;
          console.log(score)
          selected[0].setAttribute('opened','true')
          selected[1].setAttribute('opened','true')
          
          reset()
        } else {
          
          setTimeout(() => {
            selected[0].classList.add("reset")
            selected[0].classList.toggle("reset")
            console.log(selected[0].classList)
            selected[0].style.backgroundColor = 'violet'
            selected[1].style.backgroundColor = 'violet'
            reset()
          }, 1000);
        }

      }

    });
    const reset = () => {
      console.log('reset called')
      selected = []
      openCard = 0
    }
   
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
// function handleCardClick(event) {
//   // you can use event.target to see which element was clicked
//   console.log(event.target)
// }

// when the DOM loads
//

  createDivsForColors(shuffledColors)
