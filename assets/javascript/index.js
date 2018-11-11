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
});

document.getElementById("buttonCancelDiceMenu").addEventListener('click', function(event){

    //closing the curtain and clearing out any inputs the user may have given
    document.getElementById('curtain').classList.toggle('hidden');
    document.getElementById('inputName').value = "";
    document.getElementById('inputRolls').value = "";
    document.getElementById('inputSides').value = "";
    document.getElementById('inputBonus').value = "";
    
});