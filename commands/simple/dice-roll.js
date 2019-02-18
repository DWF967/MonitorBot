const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'rolldie',
            group: 'simple',
            memberName: 'rolldie',
            description: 'Rolls a die with as many sides as specified. If you do not give a number, it defaults to a six sided die.'
        })
    }

    async run(message, args)
    {
        let diceRoll;

        if(args == "")
        {
            diceRoll = Math.floor(Math.random() * 6) + 1;
            message.reply("your die landed on " + diceRoll + " 🎲");
        }
        else
        {
            diceRoll = Math.floor(Math.random() * args) + 1;
            if(isNaN(diceRoll))
            {
                message.reply(args + " is not a number so I rolled a 6 sided die.");
                diceRoll = Math.floor(Math.random() * 6) + 1;
                message.reply("your die landed on " + diceRoll + " 🎲");
            }
            else
            {
                message.reply("your die landed on " + diceRoll + " 🎲");
            }
        }
    }
}

module.exports = DiceRollCommand;