const commando = require('discord.js-commando');
const path = require('path');
const fs = require('fs');
const gameScores = require('../../gameScores.json');

function stringifyFile()
{
    fs.writeFile('gameScores.json', JSON.stringify(gameScores, null, 2), function(err){
        if(err) throw err;
        //console.log("Changed game scores!");
    });
}

class ResetGameCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'resetgame',
            group: 'admin',
            memberName: 'resetgame',
            description: 'Resets all global game scores for a specific game or all games.'
        })
    }

    async run(message, args)
    {
        if(!message.member.hasPermission('ADMINISTRATOR'))
        {
          message.channel.send("You don't have permission to use that command!");
          return;
        }

        if(args == "*")
        {
            gameScores["RPS"] = defaultRpsScores;
            stringifyFile();
            console.log("Reset all game scores!");
        }
        else if(args == "rps")
        {
            gameScores["RPS"] = defaultRpsScores;
            stringifyFile();
            console.log("Reset game scores for game: rps.");
        }
        else
        {
            message.channel.send("Please input a game's name to reset a specific score or \"*\" to reset all game's scores.");
        }
    }
}

module.exports = ResetGameCommand;