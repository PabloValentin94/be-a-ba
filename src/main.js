import { game } from "./game.js";

const new_game_button = document.getElementById("new-game");

const word_input = document.getElementById("word");

const error_message = document.querySelector(".error");

const form = document.getElementById("form");

const streak_display = document.getElementById("streak");

new_game_button.addEventListener("click", function(){

    game.New_Game();

    const letters_squares = document.querySelectorAll(".square");

    for(let i = 0; i < letters_squares.length; i++)
    {

        letters_squares[i].innerHTML = game.random_letters[i];

    }

    word_input.disabled = false;

    word_input.value = "";

    word_input.focus();

    error_message.style.visibility = "hidden";

    streak_display.innerText = "";

});

form.addEventListener("submit", async function(event){

    event.preventDefault();

    const form_data = new FormData(event.target);

    const word = form_data.get("word");

    const valid_word = await game.Validate_Word(word.toLowerCase());

    if(valid_word)
    {

        streak_display.innerText = game.streak + " acerto(s)!";

        error_message.style.visibility = "hidden";

    }

    else
    {

        error_message.style.visibility = "visible";

    }

});
