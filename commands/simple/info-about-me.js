const commando = require('discord.js-commando');

class InfoAboutMeCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'info',
            group: 'simple',
            memberName: 'info',
            description: 'Shows you info about me.'
        })
    }

    async run(message, args)
    {
        const embed = {
            "color": 0xF96221,
            "thumbnail": {
                "url": "attachment://monitor.png"
            },

            "author": {
                "name": bot.user.username,
                "icon_url": bot.user.avatarURL
            },

            "fields": [
            {
                "name": "**__Hi there!__**",
                "value": "My name is the Monitor. I am a bot that was created by @Doc#4238 to help him monitor his server and manage things on it.",
                "inline": false
            },
            {
                "name": "**__Commands__**",
                "value": "If you want to get a list of all of my commands, type **!help** and I will DM you the list!",
                "inline": false
            }
            ],

            "timestamp": new Date(),
            "footer": {
                "icon_url": bot.user.avatarURL,
                "text": "Monitor Bot | © 2019 Doc"
            }
        };

        message.channel.send({
            embed,
            files: [{
                attachment: 'images/monitor.png',
                name: 'monitor.png'
            }]
        });
        
        /*var myInfo = new discord.RichEmbed()
            .addField("About this bot:", "Hello, my name is the Monitor. I am a bot created by @Doc#4238 to help him out and monitor his server.")
            .setColor(0x00ffff)
            .setThumbnail("https://www.syfy.com/sites/syfy/files/styles/1140x640/public/2018/12/monitornew.jpg?timestamp=1544019287")
            .setFooter("Monitor Bot | © 2019 Doc");
        
        message.channel.sendEmbed(myInfo);*/
    }
}

module.exports = InfoAboutMeCommand;