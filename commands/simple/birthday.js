const commando = require('discord.js-commando');
const path = require('path')

class BirthdayCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'birthday',
            group: 'simple',
            memberName: 'birthday',
            description: 'Wishes you a happy birthday.'
        })
    }

    async run(message, args)
    {
        let birthdayCakePng = path.join(__dirname, '../../images/birthday-cake.png');
        
        message.reply("happy birthday! Here, have a cake!", {files: [birthdayCakePng]});
    }
}

module.exports = BirthdayCommand;