// Gerenciamento do jogo.

const Game = {

    generated_letters: [],

    sent_words: [],

    score: 0,

    Reset_Game: function(){

        this.generated_letters = [];

        const alphabet = "aaaaabcdeeeeefghiiiiijklmnooooopqrstuuuuuvwxyz";

        this.generated_letters = new Array(3).fill().map(function(){

            const random_index = Math.floor(Math.random() * alphabet.length);

            return alphabet[random_index];

        });

        this.sent_words = [];

        this.score = 0;

    },

    Validate_Word: async function(word){

        for(let i = 0; i < this.generated_letters.length; i++)
        {

            if(!word.includes(this.generated_letters[i]))
            {

                return false;

            }

        }

        if(this.sent_words.includes(word))
        {

            return false;

        }

        else
        {

            const requisition = await fetch(`https://api.dicionario-aberto.net/word/${word}`);

            const data = await requisition.json();

            if(data.length === 0)
            {

                return false;

            }

            else
            {

                this.sent_words.push(word);

                this.score++;

                return true;

            }

        }

    }

}

// Elementos - HTML.

const score = document.getElementById("points");

const form = document.querySelector("form");

const input = document.getElementById("answer");

const error = document.getElementById("error");

// Eventos.

window.onload = function(){

    Game.Reset_Game();

    const letters_game = document.getElementsByClassName("letter");

    for(let i = 0; i < letters_game.length; i++)
    {

        letters_game[i].querySelector("p").innerText = Game.generated_letters[i].toUpperCase();

    }

    input.focus();

}

form.addEventListener("submit", async function(event){

    event.preventDefault();

    const form_fields = new FormData(event.target);

    if(await Game.Validate_Word(form_fields.get("answer")))
    {

        score.innerText = Game.score;

        error.style.visibility = "hidden";

        input.value = "";

        input.focus();

    }

    else
    {

        error.style.visibility = "visible";

    }

});