const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Commando.Client();
const KEY = process.env.yt_api_key;
const TOKEN = process.env.token;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

const $ = jQuery = require('jquery')(window);

const botConfig = require(__dirname + '/botConfig.json');
const pvtJson = require(__dirname + '/pvt.json');

global.bot = bot;

global.currentTeamMembers = [];
global.servers = {};

bot.registry.registerGroup('simple', 'Simple');
bot.registry.registerGroup('music', 'Music');
bot.registry.registerGroup('team', 'Team');
bot.registry.registerGroup('game', 'Game');
bot.registry.registerGroup('admin', 'Admin');
bot.registry.registerGroup('pvt', 'PvT');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

/*
    Functions that can be accessed from any file.
*/
global.globalFunctions = {
    stringifyFile: function(fileName, requiredFile, logBool, logString, prettyPrint)
    {
        let indentNum = 0;
        if(prettyPrint == true) indentNum = 2;
        fs.writeFile(fileName, JSON.stringify(requiredFile, null, indentNum), function(err){
            if(err) throw err;
            if(logBool == true) console.log(logString);
        });
    },

    getChannelData: function (channel)
    {
        var ytApiUrl = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=' + channel + '&key=' + KEY;
    
        $.ajaxSetup({
            async: false
        });

        $.getJSON(ytApiUrl, function(result){
            pvtJson["subscriber_count"][channel] = +result['items'][0]['statistics'].subscriberCount;
            globalFunctions.stringifyFile('pvt.json', pvtJson, false, '', true);
        });        

        setTimeout(() => {
            pvtJson['subscriber_count'] = {};
            globalFunctions.stringifyFile('pvt.json', pvtJson, false, '', true);
        }, 10000);
    }
}

/*
    Function to pick a random faction out of the three and
    give that role to a member.
*/
function setMemberFaction(member)
{
    let factionOne = member.guild.roles.find(role => role.name === botConfig["roles"].faction_one);
    let factionTwo = member.guild.roles.find(role => role.name === botConfig["roles"].faction_two);
    let factionThree = member.guild.roles.find(role => role.name === botConfig["roles"].faction_three);

    let chance = Math.floor(Math.random() * 3);

    //Change channel name for the default channel!
    let defaultChannel = member.guild.channels.find(channel => channel.name === botConfig["channels"].welcome);

    if(chance == 0)
    {
        member.addRole(factionOne);
        member.send("You are a \"Time Lord\".");
        defaultChannel.send(member + " is the newest member of the Time Lords!");
    }
    else if (chance == 1)
    {
        member.addRole(factionTwo);
        member.send("You are a \"Dalek\".");
        defaultChannel.send(member + " is the newest member of the Daleks!");
    }
    else 
    {
        member.addRole(factionThree);
        member.send("You are a \"Mondasian\".");
        defaultChannel.send(member + " is the newest member of the Mondasians!");
    }
}

/*
    Triggered when a new member joins.
*/
bot.on('guildMemberAdd', function(member)
{
    member.send("Welcome to the server! Hope you enjoy your stay!");

    let memberRole = member.guild.roles.find(role => role.name === botConfig["roles"].default);
    member.addRole(memberRole);

    setMemberFaction(member);
});

/*
    Triggered when a member says a specific message.
*/
bot.on('message', function(message)
{
    if(message.content == 'Hello')
    {
        message.channel.sendMessage('Hello ' + message.author + ', how are you?');
    }   
    if(message.content == 'Faction')
    {
        setMemberFaction(message.member);
    }
});

/* 
    Triggered when the bot is on and ready.
*/
bot.on('ready', function(){
    console.log("Ready");
    bot.user.setActivity("The Server", {type: 'WATCHING'});
})

bot.login(TOKEN);