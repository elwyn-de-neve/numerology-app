
// STAPPENPLAN:
// Stap 0: `npm install`
// Stap 1: Importeer de data, zodat deze toegankelijk is op deze pagina
// Stap 2: Maak een verwijzing naar ons input veld, output veld en het formulier zodat deze beschikbaar is op deze pagina
// Stap 3: Voeg een event listener aan voor onze submit button (formulier)
// Stap 4: Creëer een functie die de waarde van elke letter in je naam opzoekt in de 'database' (valueOfNumbers) en het totaal samenvoegt
// Stap 5: Creëer een functie die het totaal terugbrengt tot 1 digit (dus 7 + 8 = 15 --> 1 + 5 = 6 )
// Stap 6: Creëer een functie die de single digit opzoekt in de 'database' (meaningOfNumbers) en dit als één element injecteert in de DOM
// Stap 1: Importeer de data, zodat deze toegankelijk is op deze pagina
import valueOfNumbers from "./assets/data/valueOfNumbers";
import meaningOfNumbers from "./assets/data/meaningOfNumbers";

// Stap 2: Maak een verwijzing naar ons input veld en formulier zodat deze beschikbaar is op deze pagina
const input = document.getElementById( "input" );
const submit = document.getElementById( "submit" );
const card = document.getElementById( "card" );

submit.addEventListener( "click", ( e ) => {
    e.preventDefault();
    getNumerologyValue( input.value, valueOfNumbers );
} );

function getNumerologyValue( str, obj ) {
    let output = 0;
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
    // for ( const value of "abcdefghijklmnopqrstuvwxyz" ) {
    //     console.log(valueOfNumbers[value]);
    // }
    for ( let value of str.toLowerCase() ) { // We loopen door de string heen en vangen elke entry af in char
        // console.log(obj[value]);
        if ( obj[value] ) { // We loopen door de string heen en vangen elke entry af in char
            output += obj[value];
        }
    }
    // console.log( output );
    return createCardElement( getSingleDigitSum( output ), meaningOfNumbers );
}

function getSingleDigitSum( num ) {
    // Heeft num twee of meer digits?
    while ( num > 9 ) {
        // Set counter
        let sum = 0; // Ronde twee is dit een 8
        // Is num groter dan 0?
        while ( num > 0 ) {
            let rem = num % 10; // Wat blijft er over wanneer we het getal door 10 delen? 82 geeft dus 2
            sum = sum + rem; // We tellen dit op bij de counter. 0 + 2 = 2
            num = parseInt( num / 10 ); // 82 / 10 = 8,2 --> parseInt parses a string and returns first int. = 8
        }
        num = sum;
    }
    return num;
}

function createCardElement( num, arr ) {
    if ( num ) {
        card.classList.remove( "hide" );
    }
    arr.map( ( numbers ) => {
        if ( numbers.number === num ) {
            card.innerHTML = `
                <h5 class="card__title">Expression Number</h5>
                <span class="card__number">${ numbers.number }</span>
                <div class="card__info-container">
                    <h6 class="card__info-title">${ numbers.title }</h6>
                    <p class="card__info-text">${ numbers.text }</p>
                </div>
            `;
        }
    } );
}
