var menuState ="roll";

//initilizing diceArray, checking Local Storage for savedDice.
var diceArray = JSON.parse(localStorage.getItem('savedDice'));
if (diceArray === null) {
    diceArray = [];
} else{
    renderDice();
}

//Button Listeners
document.getElementById("buttonCreateDiceMenu").addEventListener('click', function(event){
    document.getElementById("createDiceCurtain").classList.toggle('hidden');
});

document.getElementById("buttonNewDiceSubmit").addEventListener('click', function(event){
    //creating variables for ease of code reading
    var inputName = document.getElementById('inputName').value;
    var inputRolls = document.getElementById('inputRolls').value;
    var inputSides = document.getElementById('inputSides').value;
    var inputBonus = document.getElementById('inputBonus').value;

    newDice = {
        name:inputName, 
        rolls:inputRolls, 
        sides:inputSides, 
        bonus:inputBonus
    }

    //adding the new dice to my array, and then pushing the full updated array to local storage.
    diceArray.push(newDice);
    localStorage.clear; //ensureing local storage only contains the new array
    localStorage.savedDice = JSON.stringify(diceArray);

    //close menu and render dice on screen
    clearDiceCreateMenu();
    renderDice();
});

document.getElementById("buttonCancelDiceMenu").addEventListener('click', function(event){

    clearDiceCreateMenu();
});

document.getElementById("closeSpBanner").addEventListener('click', function (event){
    menuState="roll";
});
document.getElementById("dropDownMenu").addEventListener('click', function(event){
    console.log("slide menu toggle");
    document.getElementById('slideMenu').classList.toggle('slide-hide');
});
document.getElementById("buttonDeleteDice").addEventListener('click', function(event){
    console.log("Delete Dice");
    menuState="delete"; //clicks are now going to delete dice rather than roll

    //hiding and unhiding ui elements to not distract the user or end up with weird results.
    document.getElementById('nav').classList.toggle('hidden');
    document.getElementById('specialEvent').classList.toggle('hidden');
    document.getElementById('slideMenu').classList.toggle('slide-hide');

    //updating special Event menu for text specific to this event
    document.getElementById('special-banner-text').textContent = "Click a Dice to Delete";
});

document.getElementById("closeSpBanner").addEventListener('click', function(event){

    //changing menuState so that clicks now roll
    menuState = "roll"
    //hiding the special event pop-up and bringing back the nav bar.
    document.getElementById('nav').classList.toggle('hidden');
    document.getElementById('specialEvent').classList.toggle('hidden');
});

// Functions ************************************************************************************************************

function renderDice(){

    //clears out existing dice for a fresh render of the new diceArray.
    document.getElementById('diceDeck').innerHTML = "";

    for(var i = 0; i<diceArray.length; i++){

        //named variables for ease of reading code.
        var name = diceArray[i].name;
        var rolls = diceArray[i].rolls;
        var sides = diceArray[i].sides;
        var bonus = diceArray[i].bonus;
        var diceID = i;

        // console.log(name, rolls, sides, bonus);

        //constructing new elements to be appended to diceDeck
        var newDiceCard = document.createElement('div');
        newDiceCard.classList = "dice-card";

        var newDiceFace = document.createElement('div');
        newDiceFace.classList = "dice-face";

        var newResultSpan = document.createElement('span');
        newResultSpan.classList = "dice-result";
        newResultSpan.textContent = "0";

        var newDiceText = document.createElement('div');
        newDiceText.classList = "dice-text";

        var newNameDiv = document.createElement('div');

        var newNameSpan = document.createElement('span');
        newNameSpan.classList = "dice-name";
        newNameSpan.textContent = name;

        var newValuesDiv = document.createElement('div');

        var newValuesSpan = document.createElement('span');
        newValuesSpan.classList = "dice-values";
        newValuesSpan.textContent = "" + rolls + "d" + sides + "+" + bonus;

        //assembaling dice
        newDiceFace.append(newResultSpan);
        newNameDiv.append(newNameSpan);
        newValuesDiv.append(newValuesSpan);
        newDiceText.append(newNameDiv, newValuesDiv);
        newDiceCard.append(newDiceFace, newDiceText);

        //attaching metadata to diceFace
        newDiceFace.id = diceID;

        //giving the dice a listeners
        newDiceFace.addEventListener('click', function(event){
            diceClick(this.id);
        });

        //adding to deck
        document.getElementById('diceDeck').append(newDiceCard);
    }

};

function clearDiceCreateMenu(){
    //closing the curtain and clearing out any inputs the user may have given
    document.getElementById('createDiceCurtain').classList.toggle('hidden');
    document.getElementById('inputName').value = "";
    document.getElementById('inputRolls').value = "";
    document.getElementById('inputSides').value = "";
    document.getElementById('inputBonus').value = "";
}

function diceClick(key){

    //checking to see if dice should roll
    if(menuState === "roll"){

        //variables for ease of reading code
        var totalRolled = 0;
        var withBonus = 0;
        var name = diceArray[key].name;
        var rolls = Number(diceArray[key].rolls);
        var sides = Number(diceArray[key].sides);
        var bonus = Number(diceArray[key].bonus);
        console.log(name+": " + rolls + "d" + sides + "+" + bonus);

        //for number of rolls, generating a random number to match sides+1
        for(var i = 0; i < rolls; i++){
            var roll = Math.floor((Math.random()*sides) +1);
            console.log("roll "+ (i+1) +" out of "+ rolls + ": " + roll);
            totalRolled += roll;
        }

        withBonus = totalRolled + bonus;
        console.log ("Total Rolled: " + totalRolled);
        console.log ("with bonus: "+ withBonus);
        document.getElementById(key).textContent = withBonus;
    }else if (menuState === "delete"){
        removeDice(key)
    }
}

function removeDice(id){
    console.log("remove: " + id);
    diceArray.splice(id,1);
    renderDice();
    localStorage.clear; //ensureing local storage only contains the new array
    localStorage.savedDice = JSON.stringify(diceArray);
}