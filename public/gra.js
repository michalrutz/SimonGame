//DATA Difficulty
let difficulties = [
  {level: "extra", numOfbttn: 9},
  {level: "hard", numOfbttn: 6},
  {level: "advanced", numOfbttn: 4},
  {level: "easy", numOfbttn: 3}
];
let difficultyLevel;
//DATA COLOR
let colors = ["green","red","yellow","blue","pink","white","pink","white", "pink","white"];
let icons = ["🍔","red","yellow","blue","pink","white","pink","white", "pink","white"];
let level = 0;
let chain = [];
// let gameOver = false;

// CREATE buttons Difficulty
function createBttns_DifficultyLevel(){
let difficultyBttns ="";
for (let g=0; g<difficulties.length; g++){ 
  difficultyBttns+=
  `<button type="button"
    name=${g}
    id=${difficulties[g].level} class="bttn bttnDifficulty">
    ${difficulties[g].level}
  </button>`
};
document.getElementById("bg").innerHTML=difficultyBttns;
console.log(difficultyBttns);
}
createBttns_DifficultyLevel()

//add FUN set difficulty level to buttons
function addFunToBttms_SetDifficulty(){
  var difficultyBttns = document.getElementsByClassName("bttnDifficulty");

  for(var i = 0; i < difficultyBttns.length; i++){
    document.getElementsByClassName("bttnDifficulty")[i]
    .addEventListener("click", (e)=>{
      difficultyLevel = difficulties.find( (dif) => dif.level === e.target.id ).numOfbttn;
      console.log(difficultyLevel);
      setTimeout(function (){
            startGame();
          }, 500);  
    });
}
}
addFunToBttms_SetDifficulty()


// START GAME
// create buttons

function startGame(){
  //(1) create color bttms
  createGamePage();
  //(2) add event Lisener
  addFunctionToColorBtts();
  setTimeout(() => {
    addToChain();
  }, 500 );
}

function createHeadline() {
  let headline = `<div id="level"><p>LEVEL ${level}</p></div>`;
  return headline;
}

const createColorBttms = () => {
  let colorBttns ="";
  for (let i=0; i<difficultyLevel; i++){ 
    colorBttns +=
        `<button type="button" id=${colors[i]} class="bttn ${colors[i]}"></button>`;
        if((i+1)%2===0 & difficultyLevel==4){
      colorBttns+="<br>"
    }
    else if((i+1)%3===0 & difficultyLevel%4!=0){
      colorBttns+="<br>"
    }
  };
  console.log(colorBttns);
  return colorBttns
}

function createGamePage(){
  var gamePage ="";
  gamePage += createHeadline();
  gamePage += createColorBttms();
  document.getElementById("bg").innerHTML=gamePage;
};

const addFunctionToColorBtts = () =>{
  for(let i=0; i < difficultyLevel; i++){
    console.log(document.getElementsByClassName("bttn")[i]);
    document.getElementsByClassName("bttn")[i]
      .addEventListener("click", (e)=>{
        check(colors.indexOf(e.target.id), e.target.id);
        console.log(chain)})
  }
}

let index = 0;
function check(num, color){
  if( num == chain[index] ){
    //GOOD
    playBttn(color);
    if (index+1 != chain.length){
      index = index+1;
    }
    else{ 
      addToChain();
      changeLevel()
      index = 0;
    }
  }
    //WRONG
  else if( num!==chain[index] ){
      gameOver();
      playBttn("wrong");
      chain = [];
  }
}
// ADD to chain
function addToChain(){
  //1)
  randomNum = Math.floor(Math.random()*difficultyLevel);
  chain.push(randomNum);
  //2) 
    for (let i = 0; i < chain.length; i++) {
      disableBttns();
      setTimeout(() => {
        animateBttm(colors[chain[i]], i);     
      }, 700*(i+1));
      setTimeout(() => {
        activateBttns();
      }, 700*chain.length);
    }
  console.log("new chain="+chain);
  };

// ACTIONS of the BUTTons
function disableBttns(){
  for (let i = 0; i < difficultyLevel; i++) {
      document.getElementsByClassName("bttn")[i].setAttribute("disabled", true);
    }
}
function activateBttns(){
  for (let i = 0; i < difficultyLevel; i++) {
    document.getElementsByClassName("bttn")[i].removeAttribute("disabled");
}  
} 
function animateBttm(color, i) { 
    const step = document.getElementById(color);
      step.classList.add("animate-flicker");
      step.innerHTML="";  
    console.log(document.getElementById(color).id);

    setTimeout(() => {
      step.classList.remove("animate-flicker");
    }, 600);
};
function playBttn(color) {
  let good = new Audio ("sounds/"+color+".mp3");
    good.play();
}

//*F CHANGE_LEVEL
function changeLevel(){
  level++
  document.getElementById("level").innerHTML=`LEVEL ${level}`;
}
//*F GAME OVER
function gameOver(){
  document.getElementById("level").innerHTML=`GAME OVER`;
  disableBttns();
  setTimeout(function() {location.reload()}, 1500);
}








