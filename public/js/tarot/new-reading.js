var num_cards;

function deal_card() {
    // Randomize suit
    const suits = ["ar", "cu", "sw", "pe", "wa"];
    var suit = suits[Math.floor(Math.random() * suits.length)];

    // randomize card (ace to king)
    card = Math.floor(Math.random() * 13 + 1).toString()
    if (card < 10) {
        card = "0" + card
    }
    // console.log(suit+card)
    return suit+card
}

function flipCard(num) {
    var id= 'card' + num
    console.log("flipCard triggered");
    // document.getElementById(id).style.display = "none";
    newcard = deal_card()
    document.getElementById(id).src = "../../../images/cards/" + newcard + ".png"
}

// function hand_size(num) {

// }