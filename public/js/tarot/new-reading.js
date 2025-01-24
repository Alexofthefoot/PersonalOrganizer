var num_cards = 3; 
var currentCards = ["", "", "", "", ""]

// Randomly selects one new card (with no repeats) and returns it       // TODO: this pobability is not the same as a standard deck
function deal_card() {
    var dealt_card
    // Randomize suit
    const suits = ["ar", "cu", "sw", "pe", "wa"];
    dealt_card = suits[Math.floor(Math.random() * suits.length)];
    // Randomize card (1-king or 0-22)
    var card
    if (dealt_card == "ar") {
        card = Math.floor(Math.random() * 22).toString()
            if (card < 10) {
                card = "0" + card
            }
    }
    else {
        card = Math.floor(Math.random() * 13 + 1).toString()
            if (card < 10) {
                card = "0" + card
            }
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
    // Does nothing if the card has already been dealt      // TODO: Cant decide if I want to keep this or not
    console.log('card flip')
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

// Formats the current cards nicely and returns to the event listener
function getCurrentCards() {
    var cards = []
    for (var i = 0; i < num_cards; i++){ 
        if (currentCards[i] != "") {
            cards.push(currentCards[i])
        }
        else {
            console.log()
            return null;
        }
    }
    return cards.join(', '); // Convert to "ar01, cu02, sw03" format
}

document.getElementById('reading-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Add data to the form input
    const cardsDrawn = getCurrentCards()
    if (cardsDrawn == null) {
        console.error('Error: Cards missing');
    }
    document.getElementById('cards_drawn').value = cardsDrawn;
    const notes = document.getElementById('notes').value;
    

    // Send data to the backend
    try {
        const response = await fetch('/api/log-reading', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cards_drawn: cardsDrawn, notes: notes })
        });

        const data = await response.json();
        var userMsg = document.getElementById("user-message2")
        if (data.success) {
            userMsg.innerHTML = 'Reading logged successfully!'
            userMsg.style.color = 'green'
        } else {
            userMsg.innerHTML = 'Error logging the reading: ' + data.message
            userMsg.style.color = 'red'
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong while logging the reading.');
    }
});