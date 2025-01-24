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
    // Avoids any duplicate cards
    while (currentCards.includes(dealt_card)) {
        dealt_card = deal_card()
    }
    return dealt_card
}

// Flips the card that was clicked 
function flipCard(num) {
    // Does nothing if the card has already been dealt      // TODO: 
    if (currentCards[num-1] != "") {
        return;
    }

    var id = 'card' + num
    var element = document.getElementById(id)
    newcard = deal_card()
    currentCards[num-1] = newcard
    console.log(currentCards)
    element.src = "../../../images/cards/" + newcard + ".png"
}

function changeHandSize(num) {
    num_cards = num;
    var element
    for (let i = 1; i <= 5; i++){
        element = document.getElementById("card"+ i)
        if (i <= num_cards) {
            // make visible
            element.style.display = "inline";
        }
        else {
            // make invisible & remove from hand
            element.style.display = "none";
            element.src = "../../images/card back black.png"
            currentCards[i-1] = ""
        }
    }      
}

function resetHand() {
    for (let i = 1; i <= 5; i++){
        document.getElementById("card" + i).src = "../../images/card back black.png"
        currentCards[i-1] = ""     
    }   
    console.log(currentCards)  
    document.getElementById("user-message").innerHTML = "Flip over cards to uncover your reading!"
}

function saveReading() {
    // TODO: attach to DB
    el = document.getElementById("user-message")
    el.innerHTML = "Oops, that doesnt exist yet"
}