export const game = {

    random_letters: [],

    inputed_words: [],

    streak: 0,
    
    New_Game: function()
    {

        this.random_letters = [];

        const alphabet = "aaaaabcdeeeeefghiiiiijklmnooooopqrstuuuuuvwxyz";

        this.random_letters = new Array(3).fill().map(function(){
            
            const random_index = Math.floor(Math.random() * alphabet.length);

            return alphabet[random_index];

        });

        this.inputed_words = [];

        this.streak = 0;

    },

    Validate_Word: async function(word)
    {

        for(let i = 0; i < this.random_letters.length; i++)
        {

            if(!word.includes(this.random_letters[i]))
            {

                return false;

            }

        }

        if(this.inputed_words.includes(word))
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

                this.streak++;

                this.inputed_words.push(word);

                return true;

            }

        }

    }

}
