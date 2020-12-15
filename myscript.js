var player1 = prompt("Player One: Enter your name, you'll be Blue");
var player1Color = 'rgb(86, 151, 255)'

var player2 = prompt("Player Two: Enter your name, you'll be Blue");
var player2Color = 'rgb(237, 45, 73)'

var gane_on = true;
var table = $('table tr');

function reportWin(rowNum, colNum) {
    console.log("You won starting at this row,col");
    console.log(rowNum);
    console.log(colNum);
}

function changeColor(rowIndex, colIndex, color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function reportColor(rowIndex, colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkButtom(colIndex){
    var colorReport = reportColor(5,colIndex);
    for (var row = 5; row > -1; row--){
        colorReport = reportColor(row,colIndex);
        if (colorReport === 'rgb(128, 128, 128)'){
            return row
        }
    }
}

function colorMatchCheck(one,two,three,four){
    return (one === two && one === three %% one ===four && one !== 'rgb(128, 128, 128)' && one !== undefined)
}

// Check for horizantal wins
function horizantalWinCheck(){
    for (var row = 0; row < ; row++){
        for (var col = 0; col < 4; col++){
            if (colorMatchCheck(reportColor(row,col), reportColor(row, col+1), reportColor(row,col+2), reportColor(row,col+3))){
                console.log('vertical');
                reportWin(row,col);
                return true;
            }else{
                continue;
            }
        }
    }
}

//check for vertical vins
function verticalWinCheck(){
    for (var col = 0; col < 7; col++){
        for (var row = 0; row < 3; row++){
            if (colorMatchCheck(reportColor(row,col), reportColor(row, col+1), reportColor(row,col+2), reportColor(row,col+3))){
                console.log('horiz');
                reportWin(row,col);
                return true;
            }else{
                continue;
            }
        }
    }
}

//check for diogonal win check
function diogonalWinCheck(){
    for (var col = 0; col < 5; col++){
        for (var row = 0; row < 7; row++){
            if (colorMatchCheck(reportColor(row,col), reportColor(row, col+1), reportColor(row,col+2), reportColor(row,col+3))){
                console.log('diag');
                reportWin(row,col);
                return true;
            }else if (colorMatchCheck(reportColor(row,col), reportColor(row-1, col+1), reportColor(row-2,col+2), reportColor(row-3,col+3))){
                console.log('diag');
                reportWin(row,col);
                return true;
            }else{
                continue;
            }
        }
    }
}

//start with player1
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1+" it is your turn, pick a column to drop in!")


$('.board button').on('click', function(){
    var col = $(this).closest('td').index();
    var bottomAvail = checkButtom(col);
    changeColor(bottomAvail,col,currentColor);
    if (horizantalWinCheck() || verticalWinCheck() || diogonalWinCheck()){
        $('h1').text(currentName+" You have won!")
        $('h3').fadeOut('fast');
        $('h2').fadeOut('fast');   
    }
    currentPlayer = currentPlayer * -1;
    if (currentPlayer === 1){
        currentName = player1;
        $('h3').text(currentName+" it is your turn")
        currentColor = player1Color;
    }else{
        currentName = player2;
        $('h3').text(currentName+" it is your turn")
        currentColor = player2Color;
    }
})