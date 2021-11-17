function plusMinus(arr) {
    // Write your code here
    const sizeArr = arr.length;
    let zerosValues = [];
    let positiveValues = [];
    let negativeValues = [];
    let resultZeroValues = 0;
    let resultPositiveValues = 0;
    let resulNegativeValues = 0;
    
    for(let i =0; i < arr.length; i++) {
        if(arr[i] == 0) {
            zerosValues.push(arr[i]);
        }
        (arr[i] > 0) &&  positiveValues.push([arr[i]]);
        (arr[i] < 0) &&  negativeValues.push([arr[i]]);
    }

    resultZeroValues = (zerosValues.length / sizeArr).toFixed(6) ;
    resultPositiveValues = (positiveValues.length / sizeArr).toFixed(6);
    resulNegativeValues = (negativeValues.length / sizeArr).toFixed(6);

    console.log('resultZeroValues',resultZeroValues);
    console.log('resultPositiveValues', resultPositiveValues);
    console.log('resulNegativeValues', resulNegativeValues);

}


plusMinus([-4, 3, -9, 0, 4, 1])