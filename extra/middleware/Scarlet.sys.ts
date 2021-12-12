const stkn = require("../../config.json").ScarletToken
const axios = require("axios");

exports.automod = async function(msgContent: string)
{
    const res = await axios.post("https://api.scarletai.xyz/scarlet/analyze", {
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        content: String(msgContent),
        token: String(stkn),
    });
    return res.data;
};
