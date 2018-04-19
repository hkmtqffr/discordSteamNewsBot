const express = require('express');
const steamData = require('./steam.js');
const bbcode = require('bbcode.js'); //bbcode2html
const striptags = require('striptags'); //html2string
const Entities = require('html-entities').XmlEntities; //htmlEntity2string
const config = require('./config.json');

const token = config.discord.token; //access key for discord

const entities = new Entities();

const Discord = require('discord.js');
const bot = new Discord.Client();

const port = process.env.PORT || 3000;
const app = express();


bot.on('message', (message) => {
    const msg = message.content.toLowerCase();

    if (msg == '<news' && !msg.includes('@')) {

        steamData.steamData((errorMessage, results) => {
            if (errorMessage) {
                message.reply(errorMessage);
            } else {
                const title1 = results.title1;
                var NewsUrl1 = results.url1;
                const content1 = results.content1;

                const title2 = results.title2;
                var NewsUrl2 = results.url2;
                const content2 = results.content2;

                const title3 = results.title3;
                var NewsUrl3 = results.url3;
                const content3 = results.content3;

                var gen1 = striptags(entities.decode(bbcode.render(content1))).substr(0, 500);
                var gen2 = striptags(entities.decode(bbcode.render(content2))).substr(0, 500);
                var gen3 = striptags(entities.decode(bbcode.render(content3))).substr(0, 500);

                message.channel.send({
                    embed: {
                        color: 3447003,
                        title: "header title text here",
                        // url: NewsUrl,
                        fields: [{
                            name: title1,
                            value: `${gen1} ... [Read More](${NewsUrl1})`
                        },
                        {
                            name: title2,
                            value: `${gen2} ... [Read More](${NewsUrl2})`
                        },
                        {
                            name: title3,
                            value: `${gen3} ... [Read More](${NewsUrl3})`
                        }
                    ],
                        timestamp: new Date(),
                        footer: {
                            text: "footer text here"
                        }
                    }
                })
            }
        });
    }
});


bot.login(token);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})