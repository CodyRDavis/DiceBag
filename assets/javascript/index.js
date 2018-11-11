var diceArray = [];


//Button Listeners
document.getElementById("buttonCreateDiceMenu").addEventListener('click', function(event){
    console.log ('button: createDice touched');
    document.getElementById("curtain").classList.toggle('hidden');
});

document.getElementById("buttonNewDiceSubmit").addEventListener('click', function(event){
    //creating variables for ease of code reading
    var inputName = document.getElementById('inputName').value;
    var inputRolls = document.getElementById('inputRolls').value;
    var inputSides = document.getElementById('inputSides').value;
    var inputBonus = document.getElementById('inputBonus').value;

    console.log (inputName, inputRolls, inputSides, inputBonus);
    newDice = {
        name:inputName, 
        rolls:inputRolls, 
        sides:inputSides, 
        bonus:inputBonus
    }

    diceArray.push(newDice);
    console.log(diceArray);

    clearDiceCreateMenu();

    renderDice();
});

document.getElementById("buttonCancelDiceMenu").addEventListener('click', function(event){

    clearDiceCreateMenu();
});

function renderDice(){

    //clears out existing dice for a fresh render of the new diceArray.
    document.getElementById('diceDeck').innerHTML = "";

    for(var i = 0; i<diceArray.length; i++){
        console.log(diceArray[i]);

        //named variables for ease of reading code.
        var name = diceArray[i].name;
        var rolls = diceArray[i].rolls;
        var sides = diceArray[i].sides;
        var bonus = diceArray[i].bonus;
        var diceID = i;

        console.log(name, rolls, sides, bonus)

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

        //TODO: trying to just make array calls. so that the objects are much easier to use than constantly adding more and more meta data.
        // newDiceCard.setAttribute("data-name", name);
        // newDiceCard.setAttribute("data-rolls", rolls);
        // newDiceCard.setAttribute("data-sides", sides);
        // newDiceCard.setAttribute("data-bonus", bonus);

        //giving the dice a listener
        newDiceFace.addEventListener('click', function(event){
            roller(this.id);
        });

        //adding to deck
        document.getElementById('diceDeck').append(newDiceCard);
    }

};

function clearDiceCreateMenu(){
    //closing the curtain and clearing out any inputs the user may have given
    document.getElementById('curtain').classList.toggle('hidden');
    document.getElementById('inputName').value = "";
    document.getElementById('inputRolls').value = "";
    document.getElementById('inputSides').value = "";
    document.getElementById('inputBonus').value = "";
}

function roller(key){

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
}