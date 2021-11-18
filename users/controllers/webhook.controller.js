const request = require("request");

exports.toDiscord = (req, res) => {
    const Payload = req.body;
    //Respond To Heroku Webhook
    res.sendStatus(200);
    console.log(Object.keys(Payload));
    const options = {
        method: "POST",
        url:
            "https://discord.com/api/webhooks/909948140436721714/s3E0Z611HJ5w4oY2muWVEIJOGsvwYIZJdHdGvNMo1KMrAoj-yipOLrXd0A8CBN-bHdIU",
        headers: {
            "Content-type": "application/json",
        },
        //Format JSON DATA
        body: JSON.stringify({
            content: `Hi There!\nA new update has been pushed to my server! \nServer-name: \`${Payload.data.app.name}\`\nUpdate: \`Unkown\`\nVersion: \`${Payload.data.app.version}`
        }),
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response);
    })
};