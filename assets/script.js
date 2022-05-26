//Timer Text paragraph
let timeText= document.querySelector('p');
//Main text (5 elements)
let main=document.querySelector("#main")
let scoresBTN = document.querySelector("#scores-btn");
let start = document.querySelector("#start-btn");
let ansBox = document.querySelector(".container");
let form=document.querySelector("form")
let showBTN=document.querySelector("button")
//Global variables for access purposes with the timer function
let currentQuestion=0;
let timeLeft=0;
let score=0;

//Add buttonclick ->
scoresBTN.addEventListener("click",viewScores);

function viewScores(){
    //Display scores by changing main element text and grabbing values from localstorage
    showBTN.setAttribute("class", "hidden")
    for (let i =1;i<main.children.length;i++){
        main.children[i].setAttribute("class","hidden");
    }
    main.children[0].textContent="These are the most recent scorers for our quiz game!:";
    let scorers = JSON.parse(localStorage.getItem("scorer") || "[]");
    console.log(scorers);
    if (scorers.length===0){
        main.children[1].setAttribute("class","visible")
        main.children[1].textContent="No one has played the game!";
    }
    else{
        for (let i=0;i<scorers.length;i++){
            let tag=document.createElement("li");
            tag.textContent=(scorers[i].name+" got a score of "+scorers[i].highscore);
            document.body.appendChild(tag);
        }
    }
    let tag=document.createElement("button");
    tag.textContent="Back";
    document.body.appendChild(tag)
    tag.addEventListener("click", function(){
        location.reload();
    })
}

function enterScore(){
    //Clear screen, have score entering section, add to local storage
    for (let i =2;i<main.children.length;i++){
        main.children[i].setAttribute("class","hidden");
    }
    main.children[0].textContent=("Well done! You have achieved a final score of: "+score+" on our quiz! Please submit your name below to have your score saved.");
    main.children[1].textContent="Please Enter your Name";
    form.setAttribute("class", "visible");

    form.children[1].addEventListener("click", function(event){
        event.preventDefault();
        let personName=document.querySelector(".input").children[1];
        console.log(personName);
        let participant ={
            name:personName.value,
            highscore:score
        }
        let formatting=[participant];
        //Needs Work
        let scorers = JSON.parse(localStorage.getItem("scorer") || "[]");
        console.log(scorers);
        if (scorers.length===0){
            localStorage.setItem("scorer", JSON.stringify(formatting));
        }
        else{
            scorers.push(participant);
            localStorage.setItem("scorer", JSON.stringify(scorers));
        }
        viewScores();
    })
}

function pickQuestion() {
    let questionBank=[
        "In JS, variables are defined using the ___________________________________________ keyword:",
        "5 % 2 equals _____________________________________________________________",
        "A non primitive data type from the list below is ___________________________________",
        "How is a single line comment typically written in Java Script language?",
        "JS is a ____________________________________ type of language",
        "What operator makes this statement true: 5 is equivalent to '5' as a string"
    ]
    let answerBank=[
        ["let","function","this","variable"],
        ["2","1","5","undefined"],
        ["number","boolean","string","object"],
        ["<!---->","//","/**/","comment:"],
        ["static","variable","dynamic","styling"],
        ["==","=","===","!=="]
    ]

    //Pick Question
    currentQuestion=Math.floor(Math.random()*10);
    while (currentQuestion>=6){
        currentQuestion=Math.floor(Math.random()*10);
    }
    //Set Header to question Content
    main.children[0].textContent=questionBank[currentQuestion];

    //populate Li text
    let ans= document.querySelectorAll("li");
    for (let i=0;i<4;i++){
        main.children[3].setAttribute("class", "flexbox")
        ans[i].setAttribute("class","boxy");
        ans[i].textContent=answerBank[currentQuestion][i];
    }
}

ansBox.addEventListener("click", function(event){
    let element=event.target;
    //Right Question condition
    if (((currentQuestion===0 || currentQuestion===5)&&(element.matches("#q1"))) ||
        ((currentQuestion===1||currentQuestion===3)&&(element.matches("#q2"))) ||
        ((currentQuestion===2)&&(element.matches("#q4"))) ||
        ((currentQuestion===4)&&(element.matches("#q3")))) {
        score+=10;
        main.children[4].setAttribute("class", "visible");
        main.children[4].setAttribute("style","color:green")
        main.children[4].textContent="Correct!"
    }
    else{
        timeLeft-=10;
        main.children[4].setAttribute("class", "visible");
        main.children[4].setAttribute("style","color:red")
        main.children[4].textContent="Wrong Answer!"
    }
    pickQuestion();
});

function startGame(){ 
    timeLeft=60;
    score=0;
    //Set this in style.CSS
    main.children[1].setAttribute("class", "hidden");
    main.children[2].setAttribute("class", "hidden");

    let questionNum =pickQuestion();


    let timeInterval = setInterval(function () {
        timeText.textContent="Time: "+timeLeft+"          Score: "+score;
        timeLeft--;

        if (timeLeft<=0){
          clearInterval(timeInterval)
          enterScore();
        }
    
      }, 1000);
}

start.addEventListener("click",startGame);