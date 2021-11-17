function birthdayCakeCandles(candles) {
    // Write your code here
   const higherCandle = Math.max.apply(Math, candles);
   let counter = 0;
   console.log(higherCandle)
   for(let i = 0; i < candles.length; i++) {
       if(higherCandle === candles[i]) {
            counter = counter +1
       }
   }
   console.log('counter',counter)
   return counter;
}


birthdayCakeCandles([ 3, 2, 1, 3 ])