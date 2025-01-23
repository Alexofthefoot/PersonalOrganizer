var num_cards;
let currentCards = ["", "", "", "", ""]

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

function flipCard(num) {
    var id= 'card' + num
    console.log("flipCard triggered");
    // document.getElementById(id).style.display = "none";
    newcard = deal_card()
    currentCards[num-1] = newcard
    document.getElementById(id).src = "../../../images/cards/" + newcard + ".png"
}

// function hand_size(num) {

// }