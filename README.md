<h1 style="text-align:center">ScarletAI</h1>

<h2 style="text-align:center">Description</h2>

<p style="text-align:center">Scarlet API is a multi-purpose API targeting the usage of User Databasing and administration, Crypto-Currency, and AI Semantics to prevent written or verbal assualt across various user implementations.</p>

<h2 is="Prereqs" style="text-align:center">Prerequisites</h2>

+ Knowlegde of Postman (or similar)
+ Knowledge of JavaScript to better understand examples

<h2 id="New-Items" style="text-align:center">New Feature!</h2>

- Yup that's right! A new feature has been implemented
  - AI anti-abuse

<h2 id="Usage" style="text-align:center">Usage</h2>

- Being a RestAPI, Scarlet retains full functional capabilities ranging from:
  - User Profiling (Self-Biography)
  - Custom Crypto, dubbed ScarletCrypt.
  - AI automated written abuse detector

```js
// For creating your very own account! (TypeScript)
import { post } from "node-fetch";
post("https://api.scarletai.xyz/users", {
    body: {
        username: "your username",
        password: "your password",
        email: "your@example.email",
    }
}

// In JavaScript
const { post } = require("node-fetch");
post("https://api.scarletai.xyz/users", {
    body: {
        username: "your username",
        password: "your password",
        email: "your@example.email",
    }
}
```
<p style="text-align:center">Now, you'll be wondering what else we can do, right?<br>Cool! Cause here are some extra paths that you can use:</p>

- POST | PATCH | PUT: 
  - ``/users`` (POST)
  - `/users/:id` (PATCH | PUT)
- GET:
  - `/users` (GET - Unlike the POST, this will return your credentials)
  - `/docs` (GET - It will send you the link for this)
  - `/chain_info`
  - `/chain_info/lastBlock`
- POST:
  - `/chain_info/pay/:id/:amount`

<p style="text-align:center">Now, if you just tried that, you'd have gotten a 401, if you received another error, please drop an issue with a description of what you done!<br><br>The cause for the 401 is that those requests were not formed properly! Don't worry that's nothing bad, we simply just need to make another request to the API containing our new details from the <a href="#Usage">example</a><br><br>Now for the next example!</p>

```js
// Lets find out why it didn't work!
/** your requires here **/
get("https://api.scarletai.xyz/chain_info/lastBlock", {
    body: {
        username: "your_username", // to validate the pass and token
        password: "your_password", // extra layer to help against token theft
        token: "y.ourtoken_here",
    }
});
```
<p style="text-align:center">Now you should get a 200, right? Cool, if you are still getting errors, pop a report in the issues tab and we'll look into it!<br>But that should be it! Always remember to keep your credentials safe!</p>
<br>
<br>
<p>Now we're onto the AI! So cool right? Yeah, that's what I thought!<br>To use the AI we need to have a token which we can request from the developers on Discord(𝒫𝒽𝑜𝑒𝓃𝒾𝓍𝐹𝓁𝑜𝓌𝑒𝓇#0666). Once we have the token we can put it into a body request, like so:</p>

```js
/** Your requires here **/
post("https://api.scarletai.xyz/scarlet/", {
  body: {
    aitk: "your access token",
    content: "the string content of what to check!"
  }
});
```

<p style="text-align:center">This will return a range value from -5 to +5, where negative numbers are explicit and need action taken, 0 is neutral and can be ignored, and positive numbers aren't explicit and are allowed.<br />have fun with this and please do submit any ideas you believe it's missing or if any bugs appear!</p>

<h2 style="text-align:center">Contributing</h2>

<p style="text-align:center">Issue Tracker: <a href="github.com/KazutoKashima/ScarletAI/issues">github.com/KazutoKashima/ScarletAI/issues</a></p>

<h2 style="text-align:center">License</h2>

<p style="text-align:center">MIT</p>

<h2 style="text-align:center">Contact</h2>

- Link to URLs or email address