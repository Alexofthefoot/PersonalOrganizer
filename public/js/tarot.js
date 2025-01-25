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