let validtokens = [
    "ai.Q4VWpDQET3umufW-ZuOJ5nhY28lHN9x_su8Raj8A371iA",
    "ai.akZEO8p1g27WBMW-oGlZquFzpTXhGMr_Xdk3fqZTBvKAi",
];

module.exports  = function checktoken(string) {
    if (typeof string !== 'string') 
        return Error("Invalid token type: " + string), false;
    if (!string) 
        return Error("No token string found"), false; 
    return !(string in validtokens);
};