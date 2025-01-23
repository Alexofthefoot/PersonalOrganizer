var num_cards;

function deal_cards() {
    // Randomize suit
    const suits = ["ar", "cu", "sw", "pe", "wa"];
    var suit = suits[Math.floor(Math.random() * suits.length)];

    //Randomize card
    const num = []
    var random = Math.floor(Math.random() * 5) // between 0 and 3 (inclusive)
    console.log(random)
    
    // randomize card number (ace to king)
    random = Math.floor(Math.random() * 13)
    var num
    if (random == 0) {
        num = "ac"
    }
    else if (random < 10 && random > 1){//2 to 9
        num == "0" + random.toString()
    }
    else if (random == 10){
        num = "10"
    }
    else
}

function flipCard(num) {
    var id= 'card' + num
    console.log("flipCard triggered");
    // document.getElementById(id).style.display = "none";
    document.getElementById(id).src = "../../../images/cards/ar01.png"
    deal_cards()
}

// function hand_size(num) {
//     if (num == 1){

//     }

// }