let btn =document.querySelector("button"); //finding where our button is in the DOM

btn.addEventListener("click", () => { //getting the button from your HTML and putting the variable in the event listener, button is out object which is giving the job of listening to the click, the first parameter is the event, the second parameter is the function. this event listener is listening to when the button is clicked. first one is listening second is the function

    //generating a random number between 0 and 255 getting an rgb valuing by getting a random number between 0 and 255
 let r = Math.floor(Math.random() * 255);
 let g = Math.floor(Math.random() * 255);
 let b = Math.floor(Math.random() * 255);

 let bgColor = "rgb("+ r + ","+ g +","+ b +")"; //putting it into a string, so it can be used to change the background, constructing an rgb value that the DOM can use
    console.log(bgColor);

    btn.style.backgroundColor = bgColor;

    document.body.style.background = bgColor;// accessing the DOM and the bodu and changing the background. JAVASCRIPT WILL TAKE OVER CSS, JAVASCRIPT CAN CHANGE THE DOM

    let form1= document.querySelector("form1"); //same as prev query selector but this one is for the idform1, getting element from form1
    console.log(form1);
    let h2s= document.querySelector("h2"); //same as prev query selector but this one is for the idform1
    console.log(h2s); 

    let i;

    // for (i = 0; i < h2s.length; i++) {
    //     h2s[i].innerHTML = form1[i].value; //frst h2 is getting valuje from first h2 box, second h2 is getting value from second h2
    // }
 let elements = [];

    for (i = 0; i < h2s.length; i++) {
        elements.push(document.createElement("h3")); //adding h3 to the DOM

        elements[i].innerHTML = form1[i].value;
        document.body.appendChild(elements[i]);
       
    }
})