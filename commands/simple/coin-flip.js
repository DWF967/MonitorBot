const commando = require('discord.js-commando');
const path = require('path');

class CoinFlipCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'coinflip',
            group: 'simple',
            memberName: 'coinflip',
            description: 'Flips a coin, landing on either heads or tails.'
        })
    }

    async run(message, args)
    {
        var chance = Math.floor(Math.random() * 2);

        let headsPng = path.join(__dirname, '../../images/coin/heads.png');
        let tailsPng = path.join(__dirname, '../../images/coin/tails.png');

        if(chance == 0)
        {
            message.reply("your coin landed on Heads! 🐰", {files: [headsPng]});
        }
        else
        {
            message.reply("your coin landed on Tails! 🐇", {files: [tailsPng]});
        }
    }
}

module.exports = CoinFlipCommand;