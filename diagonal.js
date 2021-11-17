function diagonalDifference(arr) {
    // Write your code here
    let sum = 0;
    let firstLine ;
    let secondLine ;

    for(let i = 0;  i < arr.length; i++) {
        if(i === 0) {
           firstLine =  Number(arr[i][0]);
        } else {
            firstLine = Number(firstLine) + Number(arr[i][i])
        }
    }

    let reversedArray = arr.reverse()


    for(let i = 0;  i < reversedArray.length; i++) {
        if(i === 0) {
            secondLine =  Number(reversedArray[i][0]);
        } else {
            secondLine = Number(secondLine) + Number(reversedArray[i][i])
        }
    }
    
    sum = Math.abs(firstLine - secondLine);
    console.log(sum)
    return sum;


}

diagonalDifference([[11,2,4], [4,5,6], [10,8,-12]])