const request = require('request');
const config = require('./config.json');

const steamKey = config.steam.key;    //access key for steam api
const channelId = config.channel.id; //id for current steam game profile

const steamData = (callback) => {
    request({
        url: `http://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?key=${steamKey}&appid=${channelId}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('some error happend :(');
        } else if (response.statusCode == '200') {
            callback(undefined, {
                title1: body.appnews.newsitems[0].title,
                url1: body.appnews.newsitems[0].url,
                content1: body.appnews.newsitems[0].contents,
                title2: body.appnews.newsitems[1].title,
                url2: body.appnews.newsitems[1].url,
                content2: body.appnews.newsitems[1].contents,
                title3: body.appnews.newsitems[2].title,
                url3: body.appnews.newsitems[2].url,
                content3: body.appnews.newsitems[2].contents,
            })
        };
    });
};

module.exports.steamData = steamData;