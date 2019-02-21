const commando = require('discord.js-commando');
const discord = require('discord.js');

const pvtJson = require('../../pvt.json');

class PvTCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'pvt',
            group: 'simple',
            memberName: 'pvt',
            description: 'Displays the current sub count of PewDiePie and T-Series and the current sub-gap.'
        })
    }

    async run(message, args)
    {
        globalFunctions.getChannelData('PewDiePie');
        globalFunctions.getChannelData('tseries');

        let pdpSubCount = pvtJson['subscriber_count'].PewDiePie;
        let tsSubCount = pvtJson['subscriber_count'].tseries;
        let subGap = pdpSubCount - tsSubCount;

        let embed = new discord.RichEmbed()
            .setTitle("__**PewDiePie** *vs.* **T-Series**__")
            .setColor("0xf70f2b")
            .addField("**PewDiePie's Subscribers:**", pdpSubCount.toLocaleString('en'), true)
            .addField("**T-Series' Subscribers:**", tsSubCount.toLocaleString('en'), true)
            .addField("**The subgap is:**", subGap.toLocaleString('en'), false)
            .setFooter("This cmd takes a while to get the live count. | Doc", bot.user.avatarURL)
            .setTimestamp(Date());

        message.channel.send(embed);
    }
}

module.exports = PvTCommand;