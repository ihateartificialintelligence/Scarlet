exports.toDiscord = (req, res) => {
    const Payload = req.body.data;
    //Respond To Heroku Webhook
    res.sendStatus(200);

    let embed = {
        "username": "Scarlet~",
        "avatar_url": "https://cdn.discordapp.com/avatars/909948140436721714/8c22ea4906fb11f98b1e07f276e60699.webp",
        "content": "Hi There!\nA new update has been pushed to my server!",
        "embeds": [
            {
                "author": {
                    "name": "ScarletAI",
                    "url": "https://www.reddit.com/r/cats/",
                    "icon_url": "https://cdn.discordapp.com/icons/903394233489190942/01dd72dbe543fdb466aeea04ee5758b4.webp"
                },
                "title": "Scarlet Updates!",
                "url": "https://api.scarletai.xyz/",
                "description": "Whoa! Is this a fix or a release? I can't tell *sobs*",
                "color": 15258703,
                "fields": [
                    {
                        "name": `Server-Name: `,
                        "value": `${Payload.app.name}`,
                        "inline": true
                    },
                    {
                        "name": `Server-ID - `,
                        "value": `${Payload.app.id}`,
                        "inline": true
                    },
                    {
                        "name": `Update/Patch Version: `,
                        "value": `${Payload.release.version}`,
                        "inline": true
                    },
                    {
                        "name": `Update/Patch Descriptions: `,
                        "value": `${Payload.slug.commit_description}`,
                        "inline": true
                    },
                ],
                "thumbnail": {
                    "url": "https://cdn.discordapp.com/icons/903394233489190942/01dd72dbe543fdb466aeea04ee5758b4.webp"
                },
                "footer": {
                    "text": "Woah! So cool! New Features :3 ",
                    "icon_url": "https://cdn.discordapp.com/icons/903394233489190942/01dd72dbe543fdb466aeea04ee5758b4.webp"
                }
            }
            ]
        };

    const fetch = require("node-fetch");
    fetch("https://discord.com/api/webhooks/909948140436721714/s3E0Z611HJ5w4oY2muWVEIJOGsvwYIZJdHdGvNMo1KMrAoj-yipOLrXd0A8CBN-bHdIU", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        //Format JSON DATA
        body: JSON.stringify(embed),
    });
};
