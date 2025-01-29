const resultLimit = 10;
var page = 1;

window.onload = function() {
    getTarotReadings();
}

function nextPage(){
    currentPage
}


function prevPage() {
    if (currentPage > 1){
        changePage(page-1)
    }
}

function changePage(num) {
    page = num
    //access DB
    //limit results to
    var results = ["test", 'test2']
    for (var result in results) {
        print(result)
        document.getElementById(prev).innerHTML = "test"

        document.createElement('button')
    } 
}

async function getTarotReadings() {
    try {
        const response = await fetch('/api/get-reading', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Tarot Readings:', data);
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong while logging the reading.');
    }
}