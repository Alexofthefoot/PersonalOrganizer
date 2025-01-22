var num_cards;

function deal_cards() {

}

function flipCard(num) {
    var id= 'card' + num
    console.log("flipCard triggered");
    // document.getElementById(id).style.display = "none";
    document.getElementById(id).src = "../../../images/cards/ar01.png"
}
