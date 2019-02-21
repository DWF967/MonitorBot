const commando = require('discord.js-commando');
const discord = require('discord.js');

const pvtJson = require('../../pvt.json');

global.defaultPvTVotes = {"votes": {"pewdiepie": 0, "tseries": 0},"users_voted":{}};

class PvTCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'pvtvote',
            group: 'pvt',
            memberName: 'pvtvote',
            description: 'Vote for PewDiePie or T-Series.'
        })
    }

    async run(message, args)
    {
        let vote = args;
        let id = message.author.id;

        if(!vote == 'pewdiepie' || !vote == 'tseries')
        {
            message.channel.send("Please specify 'pewdiepie' or 'tseries'.");
            return;
        }
        if(pvtJson["users_voted"][id])
        {
            message.reply("sorry, you have already voted for " + pvtJson["users_voted"][id]);
            return;
        }

        let pdpSubs = globalFunctions.getChannelData('PewDiePie');
        let tsSubs = globalFunctions.getChannelData('tseries');
        let subGap = pdpSubs - tsSubs;

        let embed = new discord.RichEmbed()
            .setTitle("__**PewDiePie** *vs.* **T-Series**__")
            .setColor("0xf70f2b")
            .setFooter("The current sub gap is: " + subGap.toLocaleString('en'), bot.user.avatarURL)
            .setTimestamp(Date());

        if(vote == "pewdiepie")
        {
            pvtJson["votes"].pewdiepie = pvtJson["votes"].pewdiepie + 1;
            pvtJson["users_voted"][id] = vote;
            globalFunctions.stringifyFile('pvt.json', pvtJson, false, '', true);
            embed.addField("**You have voted for:**", "PewDiePie", false)
                .addField("**PewDiePie currently has:**", pdpSubs.toLocaleString('en') + " subscribers and " + pvtJson["votes"].pewdiepie.toLocaleString('en') + " votes.", false);
        }
        else if(vote == "tseries")
        {
            pvtJson["votes"].tseries = pvtJson["votes"].tseries + 1;
            globalFunctions.stringifyFile('pvt.json', pvtJson, false, '', true);
            embed.addField("**You have voted for:**", "T-Series", false)
                .addField("**T-Series currently has:**", tsSubs.toLocaleString('en') + " subscribers and " + pvtJson["votes"].tseries.toLocaleString('en') + " votes.", false);
        }

        message.channel.send(embed);
    }
}

module.exports = PvTCommand;