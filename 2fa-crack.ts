let numerics:number[] = [1,2,3,4,5,6,7,8,9,0];

let same_values: number[];

let out: number;

for(let i = 0; i> -1 && i < 10; i++) {
    let guess: any = [i,i,i, i,i,i];
    same_values.push(guess);
    if (guess in same_values) {
        // do nothing
        console.log("same values generated");
    } else {
        same_values.push(guess);
        out += guess;
        console.log(out);
    }
}