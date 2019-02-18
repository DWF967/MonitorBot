const commando = require('discord.js-commando');
const discord = require('discord.js');
const fs = require('fs');
const path = require('path');

const gameScores = require('../../gameScores.json');

global.defaultRpsScores = {wins: 0, losses: 0, draws: 0};

class RpsCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'rps',
            group: 'game',
            memberName: 'rps',
            description: 'Play rock, paper, scissors with me.'
        })
    }

    async run(message, args)
    {
        var chance = Math.floor(Math.random() * 3);
        
        let playerChoice = args;
        let botChoice;
        let possibleChoices = ["rock", "paper", "scissors"];

        let embed = new discord.RichEmbed()
            .setTitle("**__RPS__**")
            .setColor("0xf55500");

        /*

        */

        if(chance == 0) botChoice = "Rock";
        if(chance == 1) botChoice = "Paper";
        if(chance == 2) botChoice = "Scissors";

        let attachment;

        if(!possibleChoices.includes(playerChoice)) 
        {
            message.channel.send("Please choose a valid option: Rock, paper, or scissors.");
            return;
        }

        if(botChoice == "Rock")
        {
            if(playerChoice == possibleChoices[2])
            {
                embed.addField("Rock", "I win!", false);
                attachment = 'rock-scissors.png';
                gameScores["RPS"].wins = gameScores["RPS"].wins + 1;
                globalFunctions.stringifyFile('gameScores.json', gameScores, false, "Changed Game Scores!", true);
            }
            else if (playerChoice == botChoice.toLowerCase())
            {
                embed.addField("Rock", "It's a draw!", false);
                attachment = 'rock-rock.png';
                gameScores["RPS"].draws = gameScores["RPS"].draws + 1;
                globalFunctions.stringifyFile('gameScores.json', gameScores, false, "Changed Game Scores!", true);            
            }
            else
            {
                embed.addField("Rock", "You win!", false);
                attachment = 'rock-paper.png';
                gameScores["RPS"].losses = gameScores["RPS"].losses + 1;
                globalFunctions.stringifyFile('gameScores.json', gameScores, false, "Changed Game Scores!", true);
            }
        }
        else if(botChoice == "Paper")
        {
            if(playerChoice == possibleChoices[0])
            {
                embed.addField("Paper", "I win!", false);
                attachment = 'paper-rock.png';
                gameScores["RPS"].wins = gameScores["RPS"].wins + 1;
                globalFunctions.stringifyFile('gameScores.json', gameScores, false, "Changed Game Scores!", true);
            }
            else if (playerChoice == botChoice.toLowerCase())
            {
                embed.addField("Paper", "It's a draw!", false);
                attachment = 'paper-paper.png';
                gameScores["RPS"].draws = gameScores["RPS"].draws + 1;
                globalFunctions.stringifyFile('gameScores.json', gameScores, false, "Changed Game Scores!", true);
            }
            else
            {
                embed.addField("Paper", "You win!", false);
                attachment = 'paper-scissors.png';
                gameScores["RPS"].losses = gameScores["RPS"].losses + 1;
                globalFunctions.stringifyFile('gameScores.json', gameScores, false, "Changed Game Scores!", true);
            }
        }
        else if(botChoice == "Scissors")
        {
            if(playerChoice == possibleChoices[1])
            {
                embed.addField("Scissors", "I win!", false);
                attachment = 'scissors-paper.png';
                gameScores["RPS"].wins = gameScores["RPS"].wins + 1;
                globalFunctions.stringifyFile('gameScores.json', gameScores, false, "Changed Game Scores!", true);
            }
            else if (playerChoice == botChoice.toLowerCase())
            {
                embed.addField("Scissors", "It's a draw!", false);
                attachment = 'scissors-scissors.png';
                gameScores["RPS"].draws = gameScores["RPS"].draws + 1;
                globalFunctions.stringifyFile('gameScores.json', gameScores, false, "Changed Game Scores!", true);
            }
            else
            {
                embed.addField("Scissors", "You win!", false);
                attachment = 'scissors-rock.png';
                gameScores["RPS"].losses = gameScores["RPS"].losses + 1;
                globalFunctions.stringifyFile('gameScores.json', gameScores, false, "Changed Game Scores!", true);
            }
        }

        let winsNum = gameScores["RPS"].wins;
        let lossNum = gameScores["RPS"].losses;
        let drawNum = gameScores["RPS"].draws;

        embed.setTimestamp(Date())
            .setFooter("Wins: " + winsNum + ", Losses: " + lossNum + ", Draws: " + drawNum);
        
        message.channel.send({
            embed,
            files: [{
                attachment: 'images/rps/' + attachment,
                name: attachment
            }]
        });
    }
}

module.exports = RpsCommand;