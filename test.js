const fetch = require("axios");
fetch.default.get("http://localhost:3600/users", {
    body: {
        username: "your_username",
        password: "your_password",
        email: "your@example.email",
    }
}).then(response => console.log(response))
.catch(err => console.log(err));