$( document ).ready(go);

function go(){

  $(".arrow").on("click", function(){
    $('.about').slideToggle();
    if($('.arrow').hasClass('reversed')){
      $('.arrow').removeClass('reversed')
    }else{
      $('.arrow').addClass("reversed"); 
    }    
  });

  
  $(".input-group-field").on("change", function(){
    var length = $('.length').val();    
  })

  $('button').on('click', function(){
    var length = $('.length').val();
    var quantity = $('.quantity').val();


    var output = "";

    for(var i = 1; i <= quantity; i++){
      output += generate(length) + "<br>";
    }

    $('.result').html(output);
  })
}//end of go function

//numbers in arrays - generic frequency, soft, harsh, snake
var freqsVowels = {
    а: [8],
    е: [8],
    и: [7],
    о: [11],
    у: [3],
	я: [2],
	ы: [1],
	ю: [1],
	э: [1]
};

//numbers in arrays - generic frequency, soft, harsh, snake
var freqsCons = {
    б: [2],
    ц: [2],
    д: [3],
    ф: [1],
    г: [2],
    х: [1],
	ж: [1],
	ш: [1],
	ц: [1],
	й: [1],
    к: [3],
    л: [4],
    м: [3],
    н: [7],
    п: [3],
    ч: [1],
    р: [5],
    с: [5],
    т: [6],
    в: [5],
    з: [2],
	й: [1]
};

function generate(length){
  var vowels = createVowels(1);
  var consonants = createConsonants(1);
  
  
  var pattern = [];
  if($('#skeleton').val().length > 0){
	  pattern = $('#skeleton').val().split('');
  }else{
	  pattern = makePattern(length);
  }
  
  var name = [];

    for(var i = 0; i < pattern.length; i++){
      if(pattern[i] == 0){
        name.push(vowels[Math.floor(Math.random() * vowels.length)]);
      }else{
        name.push(consonants[Math.floor(Math.random() * consonants.length)]);
      }
    }
  
  
  name[0] = name[0].charAt(0).toUpperCase() + name[0].slice(1);
  
  return name.join("");
}//end of generate function

//create pattern of vowels(0) and consonants(1) for future name
function makePattern(length){

  var pattern = [];  
 

  for(var i = 0; i < length; i++){    
    if(pattern.length > 1 && pattern[i-1] == 0 && pattern[i-2] == 0){
      pattern[i] = 1;
    }else if(pattern.length > 1 && pattern[i-1] == 1 && pattern[i-2] == 1){
      pattern[i] = 0;
    }else{
      pattern[i] = Math.round(Math.random());
    }    
  }


  return pattern;
}//end of makePattern

//create an array for letter frequency
function freqArray(letter, frequency){
  var arr = [];
  for(var i = 0; i < frequency; i++){
    arr.push(letter);
  }
  return arr;  
}//end of freqArray


function createVowels(){
  var vowels =[];

  for (var property in freqsVowels) {
    if (freqsVowels.hasOwnProperty(property)) {
        vowels = vowels.concat(freqArray(property, freqsVowels[property][0]));
    }
}
  return vowels;
}

function createConsonants(){
  var consonants = [];

  for (var property in freqsCons) {
    if (freqsCons.hasOwnProperty(property)) {
        consonants = consonants.concat(freqArray(property, freqsCons[property][0]));
    }
}

  return consonants;
}