var numBricks = 20;
var messageDisplay = document.querySelector('#message');
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var bricks = document.querySelectorAll(".brick");
var newPicArray;
var tries = 0;
var firstGuess;
var secondGuess;
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
        if (!this.classList.contains('clicked') && tries <= 1 ) {
            console.log('click');
            this.style.transition = "background 0.6s"
            this.style.background = newPicArray[this.id];
            this.style.backgroundSize = "cover"
            this.classList.add('clicked');
            tries++;
            if(tries === 1){
                firstGuess = this;
                console.log(firstGuess);
            } else {
                secondGuess = this;
                console.log(secondGuess);
            }
            if(tries === 2 && firstGuess.style.background !== secondGuess.style.background){
                setTimeout(function(){
                firstGuess.style.background = "rgb(190, 190, 36)"; firstGuess.classList.remove('clicked');
                secondGuess.style.background = "rgb(190, 190, 36)"; secondGuess.classList.remove('clicked');
                tries = 0;
                }, 2000)
            } else if(tries === 2 && firstGuess.style.background === secondGuess.style.background){
                tries = 0;
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

