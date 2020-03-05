var numBricks = 20;
const messageDisplay = document.querySelector('#message');
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");
const bricks = document.querySelectorAll(".brick");
var newPicArray;
var tries = 0;
var totalTries = 0;
var firstGuess;
var secondGuess;
var header = document.querySelector('h1');
var picArray = [
    "url(pics/Albert.png)",
    "url(pics/Albert.png)",
    "url(pics/Alfons.jpg)",
    "url(pics/Alfons.jpg)",
    "url(pics/Bello.png)",
    "url(pics/Bello.png)",
    "url(pics/BlixtenMcQueen.jpeg)",
    "url(pics/BlixtenMcQueen.jpeg)",
    "url(pics/BrandmanSam.jpg)",
    "url(pics/BrandmanSam.jpg)",
    "url(pics/Hulken.jpg)",
    "url(pics/Hulken.jpg)",
    "url(pics/Jet.png)",
    "url(pics/Jet.png)",
    "url(pics/Jocke.jpg)",
    "url(pics/Jocke.jpg)",
    "url(pics/Kaja.png)",
    "url(pics/Kaja.png)",
    "url(pics/Pettson.jpg)",
    "url(pics/Pettson.jpg)",
    "url(pics/Rekku.jpeg)",
    "url(pics/Rekku.jpeg)",
    "url(pics/Riku.jpeg)",
    "url(pics/Riku.jpeg)",
    "url(pics/Rolle.png)",
    "url(pics/Rolle.png)",
    "url(pics/Samppa.jpg)",
    "url(pics/Samppa.jpg)",
    "url(pics/Spiderman.jpg)",
    "url(pics/Spiderman.jpg)",
    "url(pics/Toma.jpg)",
    "url(pics/Toma.jpg)",
    "url(pics/Vainu.jpeg)",
    "url(pics/Vainu.jpeg)",
    "url(pics/Zebra.png)",
    "url(pics/Zebra.png)"
]

window.onload = setupBricks(20);
window.onload = setupPics(20);


for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener('click', function () {
        numBricks = Number(this.textContent);
        modeButtons.forEach(function (button) {
            button.classList.remove('selected');
        })
        this.classList.add('selected');
        setupBricks(numBricks);
        setupPics(numBricks);
    })
}

//change the background of the clicked div, using the divs id, to corresponding image from randomized array of pics
for (var i = 0; i < bricks.length; i++) {
    bricks[i].addEventListener('click', function () {
        //if brick is not yet clicked on and it's the first of the two tries, show picture from newPicArray
        if (!this.classList.contains('clicked') && tries <= 1 ) {
            this.style.transition = "background 0.6s"
            this.style.background = newPicArray[this.id];
            this.style.backgroundSize = "cover"
            this.classList.add('clicked');
            tries++;
            totalTries++
            //if it was the first try, declare var firstGuess
            if(tries === 1){
                firstGuess = this;
                //else it must be the secondGuess
            } else {
                secondGuess = this;
            }
            //if user clicked an image for the second time and the pictures are not the same, hide them
            if(tries === 2 && firstGuess.style.background !== secondGuess.style.background){
                setTimeout(function(){
                firstGuess.style.background = "rgb(190, 190, 36)"; firstGuess.classList.remove('clicked');
                secondGuess.style.background = "rgb(190, 190, 36)"; secondGuess.classList.remove('clicked');
                tries = 0;
                }, 1000)
                //else if the two pictures match, leave them open and declare tries 0 så user can click again
            } else if(tries === 2 && firstGuess.style.background === secondGuess.style.background){
                tries = 0;
                var totalClickedImages = 0;
                for(var i = 0; i < bricks.length; i++){
                    if(bricks[i].classList.contains('clicked')){
                        totalClickedImages++;
                    }
                    
                } if(totalClickedImages === numBricks){
                    header.textContent = `YESSS! You solved the game in ${totalTries/2} tries!`
                }
            }
        }

    })
}


//find out which mode button is selected when reset button is clicked and reset accordingly
resetButton.addEventListener('click', function () {
    var selectedButton;
    modeButtons.forEach(function (button) {
        if (button.classList.contains('selected')) {
            selectedButton = button;
        }
    })
    setupBricks(Number(selectedButton.textContent));
})

function setupBricks(num) {
    header.textContent = "The Memory Game";
    tries = 0;
    bricks.forEach(function (brick) {
        brick.classList.remove('clicked');
        brick.style.transition = "none"
        brick.style.background = "rgb(190, 190, 36)"
    })
    if (num === 12 || num === 16) {
        for (var i = 0; i < bricks.length; i++) {
            if (i < num) {
                bricks[i].style.display = "block";
                bricks[i].style.width = "22%";
                bricks[i].style.paddingBottom = "22%"
                bricks[i].style.margin = "1.5%"
            } else {
                bricks[i].style.display = "none";
            }
        }
    } else if (num === 20) {
        for (var i = 0; i < bricks.length; i++) {
            if (i < num) {
                bricks[i].style.display = "block";
                bricks[i].style.width = "17%";
                bricks[i].style.paddingBottom = "17%"
                bricks[i].style.margin = "1.5%"
            } else {
                bricks[i].style.display = "none";
            }
        }
    } else {
        for (var i = 0; i < bricks.length; i++) {
            if (i < num) {
                bricks[i].style.display = "block";
                bricks[i].style.width = "14%";
                bricks[i].style.paddingBottom = "14%"
                bricks[i].style.margin = "1.3%"
            } else {
                bricks[i].style.display = "none";
            }
        }
    }
}

function setupPics(num) {
    newPicArray = picArray.slice(0, num);
    shuffle(newPicArray);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

