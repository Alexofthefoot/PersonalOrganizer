// import the variables and function from module.js
import { db } from './app.js';

function insertTarotReading() {
    const sql = 'INSERT INTO cards (deck_id, arcana, card_name, card_value) VALUES (?, ?, ?)';

    db.query(sql, [cards.deck_id, cards.arcana, cards.card_name, cards.card_value], (err, result) => {
        if (err) {
            console.error('Error inserting tarot card:', err);
            return;
        }
        console.log('Tarot card inserted successfully:', result);
    });
}

// const reading = {
//     deck_id : 1,
//     arcana : "Major",
//     card_name : "The Fool",
//     card_value : 1,
// }

// insertTarotReading(reading);





// // JavaScript to handle form submission
// document.getElementById('tarot-new-card').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent the default form submission

//     const formData = new FormData(this);
//     const data = Object.fromEntries(formData.entries());

//     // Send data to the server
//     fetch('/add-card', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(result => {
//         console.log('Success:', result);
//         alert('Card added successfully!');
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('Error adding card.');
//     });
// });