function solution(S) {
    // write your code in JavaScript (Node.js 8.9.4)

    const operationList = S.split(' ');
    let stack = [];
    console.log(operationList.length)

    const orderArray = (result) => {
        stack.splice(stack[stack.length -2].indexOf() -1, 2, result.toString())

    }

    const calculateValues = (value) => {
        switch (value) {
            case '-':
            //Evaluate if the stack length can continue doing operations
                if(stack.length > 1) {
                    let substract = Number(stack[stack.length -1]) - Number(stack[stack.length -2])
                    orderArray(substract)
                } else {
                    return stack = [-1]
                }
                break;
            case '+':
                if(stack.length > 1) {
                    let add = Number(stack[stack.length -1]) + Number(stack[stack.length -2])
                    if(stack.length == 2) {
                        stack = [add];
                    } else {
                        orderArray(add)
                    }

                } else {
                    return stack = [-1]

                }
                break;
            case 'DUP':
                stack.push(stack[stack.length -1])
                break;
            case 'POP':
                stack.pop();
                break;
            default:
                stack.push(value)
                break
        }
    }
    for(let i = 0; i < operationList.length; i++ ) {
        calculateValues(operationList[i])

    }

   console.log('stack', stack.pop())
   return stack.pop()
}

//solution('4 5 6 - 7 +');
//solution('3 DUP 5 - -');
solution('5 6 + -');