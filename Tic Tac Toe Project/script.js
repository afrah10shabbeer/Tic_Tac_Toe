console.log("Welcome to Tic Tac Toe")
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameOver = new Audio("gameover.mp3")
let turn = "X"
let playerColor = "#ff3333";

let isGameOver = false;

//Function to change the turn
const changeTurn = ()=>
{
    if(turn === "X")
        turn = "O";
    else 
        turn = "X";

    return turn;
}

//Function to change color 
const changeColor = ()=>
{
    // Red color for 'X' and Blue color for 'O'
    if(playerColor === "#ff3333")
        playerColor = "#00bfff";
    else 
        playerColor = "#ff3333";

    return playerColor;
}

//Funtion to check for a win
const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxText');

    //wins = [1st cell, 2nd cell,3rd cell,transalte_x,translate_y,theta,length_of_line]
    let wins = [
        [0, 1, 2, 0.5, 4.2, 180, 26],
        [3, 4, 5, 0.5, 13.2, 180, 26],
        [6, 7, 8, 0.5, 22.2, 180, 26],
        [0, 3, 6, -8.5, 13.5, 90, 26],
        [1, 4, 7, 0.6, 13.5, 90, 26],
        [2, 5, 8, 9.6, 13.5, 90, 26],
        [0, 4, 8, -3.7, 13.5, 45, 35],  //Diagonal cells
        [2, 4, 6, -3.7, 13.2, 135, 35]  //Diagonal cells
    ]

    wins.forEach(e =>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== ""))
        {
            music.pause();
            gameOver.play(); //Play game over music
            isGameOver = true;  //Marking the status of the gameOver as 'true'
            
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won!"; //Displaying the winner

            document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width = "100px"; //Displaying the excited gif after winning
            
            //Styling cut line after a player wins the game!
            let cutLine = document.querySelector(".line");      //Select the line to cross cells after a win
            cutLine.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            cutLine.style.width = `${e[6]}vw`;

        }
    })
}

//Game Logic
//music.play();
let boxes = document.getElementsByClassName("box"); //Collect all boxes from class 'box'
let cell_count = 0;

//Apply for each loop to all boxes
Array.from(boxes).forEach(element=>{

    let boxtext = element.querySelector('.boxText');

    element.addEventListener('click',()=>{

        if(isGameOver === true)
        {
            //If Game is over(i.e if any player wins, then other user should be prevented from filled other empty cells)
            //Therefore in this case DO NOTHING
        }
        else    //If Game is not yet over, only then let the players click on any cell
        {
            if(boxtext.innerText === '') //If box(cell) is empty, then
            {
                cell_count++;           //Increment the count of cells
                boxtext.style.color = playerColor;  //Set the player's corresponding color to it's symbol
                playerColor = changeColor();        //Change the color of next player
                boxtext.innerText = turn;   //Fill the cell with value 'turn'
                turn = changeTurn();        //Now change the 'turn' variable
                audioTurn.play();           //Play the audio at each press
                checkWin();                 //Check if current player has won? or not.
                
                if(!isGameOver)
                {   
                    //Check if all cells are filled, in such case display game status as 'Draw'
                    if(cell_count === 9)
                    {
                        let messageDraw = document.getElementsByClassName("info");
                        messageDraw[0].style.color = "rgb(0, 230, 115)";
                        messageDraw[0].innerText = "Draw!!!";
                        cell_count = 0;
                        playerColor = "#ff3333";
                    }
                    //or else continue with the game
                    else
                    {
                        let message = document.getElementsByClassName("info");
                        message[0].style.color = playerColor; //Change the text color
                        message[0].innerText = "Turn for " + turn;  //Change the turns of players accordingly
                    }
                    
                }
            }
        }
        
    })
})


//Add onclick listener to reset button
let resetButton = document.querySelector('.reset');
resetButton.addEventListener('click',()=>{
    let boxtext = document.querySelectorAll('.boxText');
    Array.from(boxtext).forEach(element => {
        element.innerText = "";                 //Resetting all box cells back to empty cells
    });

    //Play the game music
    //music.play();

    //Change the turn back to 'X' after resetting the game
    turn = "X";
    //Change the gameOver status back to 'false'
    isGameOver = false;

    //Change the color back to 'red' for 'X'
    playerColor = "#ff3333";

    let message = document.getElementsByClassName("info");
    message[0].style.color = "#ff3333"; //Change the text color
    message[0].innerText = "Turn for " + turn; //Change turn back to 'X'

    //Removing the excited gif after resetting
    document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width = "0px";

    //Remove cut line
    let cutLine = document.querySelector('.line');
    cutLine.style.width = '0px';

})



