document.getElementById('genBtn').onclick = function (event) {
  console.log('x')
  var length = document.getElementById('length').value;
  var quantity = document.getElementById('quantity').value;
  var style = document.getElementById('style').value;

  var output = "";

  for (var i = 1; i <= quantity; i++) {
    output += generate(length, style) + "<br>";
  }

  document.getElementById('result').innerHTML = output;
}

var freqsVowels = {
  а: [8, 12],
  е: [8, 8],
  и: [7, 7],
  о: [11, 7],
  у: [3, 8],
  я: [2, 3],
  ы: [1, 0],
  ю: [1, 0],
  э: [1, 1]
};

var freqsCons = {
  б: [2, 3],
  ц: [2, 1],
  д: [3, 3],
  ф: [1, 7],
  г: [2, 2],
  х: [1, 7],
  ж: [1, 7],
  ш: [1, 7],
  й: [1, 1],
  к: [3, 3],
  л: [4, 2],
  м: [3, 3],
  н: [7, 3],
  п: [3, 3],
  ч: [1, 4],
  р: [5, 5],
  с: [5, 7],
  т: [6, 7],
  в: [5, 5],
  з: [2, 4]
};

function generate(length, style) {
  var vowels = createVowels(style);
  var consonants = createConsonants(style);

  var pattern = [];
  if (document.getElementById('skeleton').value.length > 0) {
    pattern = document.getElementById('skeleton').value.split('');
  } else {
    pattern = makePattern(length);
  }

  var name = [];

  for (var i = 0; i < pattern.length; i++) {
    if (pattern[i] == 0) {
      name.push(vowels[Math.floor(Math.random() * vowels.length)]);
    } else {
      name.push(consonants[Math.floor(Math.random() * consonants.length)]);
    }
  }

  name[0] = name[0].charAt(0).toUpperCase() + name[0].slice(1);

  return name.join("");
}//end of generate function

//create pattern of vowels(0) and consonants(1) for future name
function makePattern(length) {

  var pattern = [];

  for (var i = 0; i < length; i++) {
    if (pattern.length > 1 && pattern[i - 1] == 0 && pattern[i - 2] == 0) {
      pattern[i] = 1;
    } else if (pattern.length > 1 && pattern[i - 1] == 1 && pattern[i - 2] == 1) {
      pattern[i] = 0;
    } else {
      pattern[i] = Math.round(Math.random());
    }
  }

  return pattern;
}//end of makePattern

//create an array for letter frequency
function freqArray(letter, frequency) {
  var arr = [];
  for (var i = 0; i < frequency; i++) {
    arr.push(letter);
  }
  return arr;
}//end of freqArray

function createVowels(style) {
  var vowels = [];

  for (var property in freqsVowels) {
    if (freqsVowels.hasOwnProperty(property)) {
      vowels = vowels.concat(freqArray(property, freqsVowels[property][style]));
    }
  }
  return vowels;
}

function createConsonants(style) {
  var consonants = [];

  for (var property in freqsCons) {
    if (freqsCons.hasOwnProperty(property)) {
      consonants = consonants.concat(freqArray(property, freqsCons[property][style]));
    }
  }
  return consonants;
}