var divBlocks = '<button class="block" id="$sing" onclick="sanya(this.id)">$content</button>';


function createBlocks() {
  for (var i = 1; i < 36; i++) {
    $('.panel').append(divBlocks
      .replace('$sing', i)
      .replace('$content', unicode(i))
      .replace('$id', i)
    );
    if ((i > 10 && i < 14) || (i > 17) && (i < 21) || (i > 24) && (i < 28) || (i > 31) && (i < 34)) {
      $('#' + i).removeClass('block');
      $('#' + i).addClass('numbers');
    } else if (i == 34) {
      $('#' + i).removeClass('block');
      $('#' + i).addClass('equally');
    }
  }
}


function calculate(a, b, symb) {
 $.get("/g").done(function(result){
    console.log(result);
    });
}
// ( - x kor is y   ) - e v step x
function sanya(identificator) {
  var text = id(identificator).innerHTML;
  var firstText = id('input_output').value;
  if (text === 'AC') {
    id('input_output').value = "";
  } else if((text === 'sin') || (text === 'cos') || (text === 'tg') || (text === 'log') || text === 'ln') {
    id('input_output').value = firstText + text + '(';
  } else if (text === '=') {
    alert("LOX");
  } else {
    id('input_output').value = firstText + text;
  }
}


function unicode(i) {
  switch(i) {
    case 1: return 'Rad';
    case 2: return 'Deg';
    case 3: return '&#120;&#33;';
    case 4: return '<span id="first">y</span>&#8730;<span id="second">x</span>';
    case 5: return '&#101;<sup>x</sup>';
    case 6: return '&#37;';
    case 7: return 'AC';
    case 8: return 'lnv';
    case 9: return 'sin';
    case 10: return 'ln';
    case 11: return '&#55;';
    case 12: return '&#56;';
    case 13: return '&#57;';
    case 14: return '&#47;';
    case 15: return '&#960;';
    case 16: return 'cos';
    case 17: return 'log';
    case 18: return '&#52;';
    case 19: return '&#53;';
    case 20: return '&#54;';
    case 21: return '&#42;';
    case 22: return '&#101;';
    case 23: return 'tg';
    case 24: return '<span id="first">2</span>&#8730;';
    case 25: return '&#49;';
    case 26: return '&#50;';
    case 27: return '&#51;';
    case 28: return '&#43;';
    case 29: return 'Ans';
    case 30: return 'EXP';
    case 31: return 'x<sup>y</sup>';
    case 32: return '&#48;';
    case 33: return '&#46;';
    case 34: return '&#61;';
    case 35: return '&#45;';
    default: return -1;
  }
}

function id(id) {
  return document.getElementById(id);
}
