function miniMaxSum(arr) {
    // Write your code here
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const result = arr.reduce(reducer)
    const arrayValues = arr.map((element) =>   result - element)
    const minimunValue = Math.min.apply(Math,arrayValues);
    const maxValue = Math.max.apply(Math,arrayValues);
    console.log(minimunValue + '  ' + maxValue)
}



miniMaxSum([ 1, 2, 3, 4, 5 ])