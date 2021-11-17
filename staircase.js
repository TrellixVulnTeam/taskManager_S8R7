function staircase(n) {
    // Write your code here
    let staircase = '';
    for(let i=0; i <= n; i++) {
        staircase = `  ${staircase}\n${'#'.repeat(i)}`

    }

    return console.log(staircase);


}

staircase(6);