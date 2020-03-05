var numBricks = 20;
const messageDisplay = document.querySelector('#message');
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");
const bricks = document.querySelectorAll(".brick");
/*
Using the 'var' keyword is not a problem in itself, but be aware of the pitfalls. Consider the following (nonsensical) line
at this point in the code:

var abcd = numBricks + tries;

Because 'tries' isn't defined until later, we wouldn't expect this to work, however it will run without error. 
This is because the 'var' keyword causes the variable to exist as if it was defined at the top of the function
(or file, in this case), but the contents of the variable is still undefined at this point, 'tries' won't be set to 0 
until two lines below. Therefore the operation numBricks + tries is equivalent to 20 + undefined, which produces NaN.
Using 'let' would produce an error instead, which almost always makes more sense. However, see caniuse.com/let
*/
var newPicArray;
var tries = 0;
var totalTries = 0;
var firstGuess;
var secondGuess;
var header = document.querySelector('h1');

/*
Neat definition here. A different way to do it could be to have an array of just the picture names
var pics = ["Albert.jpg", "Spiderman.jpg", ...]
and from that construct the picArray. This separates the definitions from the implementation details.
*/
var picArray = [
    "url(pics/Albert.png)",
    "url(pics/Albert.png)",
    "url(pics/Spiderman.jpg)",
    "url(pics/Spiderman.jpg)",
    "url(pics/Bello.png)",
    "url(pics/Bello.png)",
    "url(pics/BlixtenMcQueen.jpeg)",
    "url(pics/BlixtenMcQueen.jpeg)",
    "url(pics/BrandmanSam.jpg)",
    "url(pics/BrandmanSam.jpg)",
    "url(pics/RobotTrainsAlf.jpg)",
    "url(pics/RobotTrainsAlf.jpg)",
    "url(pics/Jet.png)",
    "url(pics/Jet.png)",
    "url(pics/Jocke.jpg)",
    "url(pics/Jocke.jpg)",
    "url(pics/Kaja.png)",
    "url(pics/Kaja.png)",
    "url(pics/RobotTrainsKay.jpg)",
    "url(pics/RobotTrainsKay.jpg)",
    "url(pics/Rekku.jpeg)",
    "url(pics/Rekku.jpeg)",
    "url(pics/Riku.jpeg)",
    "url(pics/Riku.jpeg)",
    "url(pics/Rolle.png)",
    "url(pics/Rolle.png)",
    "url(pics/Samppa.jpg)",
    "url(pics/Samppa.jpg)",
    "url(pics/RobotTrainsViktor.png)",
    "url(pics/RobotTrainsViktor.png)",
    "url(pics/Toma.jpg)",
    "url(pics/Toma.jpg)",
    "url(pics/Vainu.jpeg)",
    "url(pics/Vainu.jpeg)",
    "url(pics/Zebra.png)",
    "url(pics/Zebra.png)"
]

/*
This doesn't work as intended, although the bug might not cause problems in this case. The variable window.onload expects 
to be assigned a function, however this line calls the function and assigns the return value to window.onload.
Since setupBricks(12) returns nothing (i.e. undefined), this is the same as
  window.onload = undefined;
Normally you'd write window.onload = setupBricks; instead which assigns the function itself to the variable instead of calling it,
but since setupBricks needs a parameter, you can do it like this:
  window.onload = function() { setupBricks(12); };
*/
window.onload = setupBricks(12);
/* 
A second problem: Only one function can be assigned to .onload, so this line overwrites whatever was assigned on the previous line
(though by chance it doesn't actually matter in this case). Consider combining the calls in one function, or using:
  window.addEventListener("load", function(){ setupBricks(12) });
  window.addEventListener("load", function(){ setupPics(12) }); 
*/
window.onload = setupPics(12);


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

//find out which mode button is selected when reset button is clicked and reset accordingly
resetButton.addEventListener('click', function () {
    var selectedButton;
    modeButtons.forEach(function (button) {
        if (button.classList.contains('selected')) {
            selectedButton = button;
        }
    })
    setupBricks(Number(selectedButton.textContent));
    setupPics(Number(selectedButton.textContent));
})

//change the background of the clicked div, using the divs id, to corresponding image from randomized array of pics
for (var i = 0; i < bricks.length; i++) {
    bricks[i].addEventListener('click', function () {
        /*
        This function is the entirety of the actual game. It does a few things which could be split out into
        separate functions: game sequence, state logic, and UI code.
        The game sequence and state logic is the overall behaviour of the game (no guess, first guess, second guess, game over),
        as well as how the game moves from one state to another (user clicks something, reset buttons, etc.)
        The UI code on the other hand is the styles, animations, and other visual details which don't affect the game itself.
        By separating out these into other functions, this event listener becomes much shorter and easier to read, and more 
        importantly, easier to test.
        */
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
                    document.body.backgroundColor = "rgb(190, 190, 36)"
                }
            }
        }

    })
}


function setupBricks(num) {
    header.textContent = "The Memory Game";
    tries = 0;
    bricks.forEach(function (brick) {
        brick.classList.remove('clicked');
        brick.style.transition = "none"
        brick.style.background = "rgb(190, 190, 36)"
    })
    /*
    This function is simple and easy to read, but if there were more choices in number of bricks, it'd get longer and longer.
    If you instead define a mapping like so:
    var gameSizes = {
        12: { display: "block, width: "22%", paddingBottom: "22%", margin: "1.5%" },
        16: { ... },
        ...
    };
    You would then only have to write one loop that handles all defined cases using that structure, instead of three different
    loops as below.
    */
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

