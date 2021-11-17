function timeConversion(s) {
    // Write your code here
    const arrayOfHours =  s.split(':')
    const minutes = [];
    const splitPMorAm = arrayOfHours[2].split('');
    
    minutes.push(splitPMorAm[0], splitPMorAm[1])

    if(arrayOfHours[2].includes('PM')) {
        let hours = Number(arrayOfHours[0]) + 12;
        arrayOfHours[0] == 12 && (hours= '12');
        console.log(hours + ':' + arrayOfHours[1] + ':' + minutes.join('') ) 
    } else {
        arrayOfHours[0] == 12 && (arrayOfHours[0] = '00');
        console.log(arrayOfHours[0] + ':' + arrayOfHours[1] + ':' + minutes.join('') )
    }

}

timeConversion('09:05:45PM')
timeConversion('12:40:22AM')
timeConversion('12:00:00AM')
timeConversion('12:00:00PM')