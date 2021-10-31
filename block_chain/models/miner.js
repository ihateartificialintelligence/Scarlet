while (true) {
    var hash = crypto.createHash("md5");
    hash.update((nonce + solution).toString()).end();
    var attempt = hash.digest('hex');
    if (attempt.substr(0, 4) === '0000') {
        console.log("Sovled Solution: " + solution);
        return solution;
    }
    solution += 1;
}