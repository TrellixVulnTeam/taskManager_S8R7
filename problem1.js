function solution(A) {
    // write your code in JavaScript (Node.js 8.9.4)
    let consecutiveNumber = 1
    for(let i = 1; i < A.length; i++) {
      // console.log(i);
        if(!A.includes(i)) {
            console.log(i)
            return i
        } else {
            consecutiveNumber = consecutiveNumber + i 
        }
    }
    console.log(consecutiveNumber)
    return consecutiveNumber;  


}

solution([1, 3, 6, 4, 1, 2]);
solution([1, 2, 3]);
solution([0, 2, 3]);
solution([0, 2, 3, 30, 495]);