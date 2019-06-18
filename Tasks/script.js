
//////////Palindrome//////////

const palindrome = str => {
	str = str.toLowerCase();
	return str === str.split('').reverse().join('');
}

palindrome(str);



//////////FizzBuzz//////////

const fizzBuzz = num => {
	for(let i = 1; i <= num; i++) {
		if(i % 3 === 0 && i % 5 === 0) {
			console.log('fizzbuzz');
		} else if (i % 3 === 0) {
			console.log('fizz');
		} else if (i % 5 === 0) {
			console.log('buzz');
		} else {
			console.log(i);
		}
	}
}

fizzBuzz(num);



//////////FindVowels//////////

const findVowels = str => {
  let count = 0
  const vowels = ['a', 'e', 'i', 'o', 'u']
  for(let char of str.toLowerCase()) {
    if(vowels.includes(char)) {
      count++
    }
  }
  return count
}

console.log(findVowels(str));



//////////Anagram//////////

const buildCharObject = str => {

  const charObj = {}

  for(let char of str.replace(/[^\w]/g).toLowerCase()) {

    charObj[char] = charObj[char] + 1 || 1
  }
  return charObj
}
const anagram = (strA, strB) => {

  const aCharObject = buildCharObject(strA)
  const bCharObject = buildCharObject(strB)

  if(Object.keys(aCharObject).length !== Object.keys(bCharObject).length) {
    return false
  }

  for(let char in aCharObject) {
    if(aCharObject[char] !== bCharObject[char]) {
      return false
    }
  }

  return true
}

console.log(anagram("find", "infssd"));



//////////Fibonacci//////////

const fibonacci = num => {

  const result = [0, 1]

  for(let i = 2; i <= num; i++) {

    const prevNum1 = result[i - 1]
    const prevNum2 = result[i - 2]
    result.push(prevNum1 + prevNum2)
  }
  return result[num]
}

console.log(fibonacci(3));

