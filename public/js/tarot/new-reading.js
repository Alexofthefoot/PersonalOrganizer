var num_cards = 3; 
var currentCards = ["", "", "", "", ""]

// Randomly selects one new card (no repeats) and returns it 
function deal_card() {
    var dealt_card
    // Randomize suit
    const suits = ["ar", "cu", "sw", "pe", "wa"];
    dealt_card = suits[Math.floor(Math.random() * suits.length)];

    // randomize card (ace to king)
    card = Math.floor(Math.random() * 13 + 1).toString()
    if (card < 10) {
        card = "0" + card
    }
    dealt_card += card
    while (currentCards.includes(dealt_card)) {
        console.log("duplicate card skipped")
        dealt_card = deal_card()
    }
    return dealt_card
}

// Flips or refreshes the card that was clicked 
function flipCard(num) {
    var id= 'card' + num
    // console.log("flipCard triggered");
    newcard = deal_card()
    currentCards[num-1] = newcard
    console.log(currentCards)
    document.getElementById(id).src = "../../../images/cards/" + newcard + ".png"
}

function changeHandSize(num) {
    num_cards = num;
    for (let i = 1; i <= 5; i++){
        if (i <= num_cards) {
            // make visible
            console.log("make "+ i + "visible")
            document.getElementById("card"+ i).style.display = "inline";
        }
        else {
            // make invisible & remove from hand
            console.log("make "+ i + "invisible")
            document.getElementById("card" + i).style.display = "none";
            document.getElementById("card" + i).src = "../../images/card back black.png"
            currentCards[i-1] = ""
        }
    }      
}