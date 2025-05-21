// DOM Elements for flipping the book
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const papers = [
    document.querySelector("#p1"),
    document.querySelector("#p2"),
    document.querySelector("#p3")
];

// Book state
let currentPosition = 1;
const totalPapers = papers.length;
const maxPosition = totalPapers + 1;//adding one to the paper as it goes on


// Event Listeners check
    prevBtn.addEventListener("click", goPrevPage);
    nextBtn.addEventListener("click", goNextPage);
    updateButtonStates();

//gives the book a transition of how it should flip
function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning) {
    book.style.transform = isAtBeginning ? "translateX(0%)" : "translateX(100%)";
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}
//transition so it can flip page and go back 1 by 1, by giving it like a beg,mid,end
function goNextPage() {
    if (currentPosition >= maxPosition) return; 
    
    switch(currentPosition) {
        case 1:
            openBook();
            flipPaper(0, 1);
            break;
        case 2:
            flipPaper(1, 2);
            break;
        case 3:
            flipPaper(2, 3);
            closeBook(false);
            break;
    }
    
    currentPosition++;
    updateButtonStates();
}

//same thing but being able to flip backwards
function goPrevPage() {
    if (currentPosition <= 1) return;
    
    switch(currentPosition) {
        case 2:
            closeBook(true);
            unflipPaper(0, 3);
            break;
        case 3:
            unflipPaper(1, 2);
            break;
        case 4:
            openBook();
            unflipPaper(2, 1);
            break;
    }
    
    currentPosition--;
    updateButtonStates();
}
//flip the page
function flipPaper(paperIndex, zIndex) {
    papers[paperIndex].classList.add("flipped");
    papers[paperIndex].style.zIndex = zIndex;
}

function unflipPaper(paperIndex, zIndex) {
    papers[paperIndex].classList.remove("flipped");
    papers[paperIndex].style.zIndex = zIndex;
}
//giving  the button state/appearance
function updateButtonStates() {
    // Disable prev button if at first page
    prevBtn.disabled = currentPosition === 1;
    
    // Disable next button if at last page
    nextBtn.disabled = currentPosition === maxPosition;
    
    // Visual feedback (optional)
    prevBtn.style.opacity = prevBtn.disabled? "0.5" : "1";
    nextBtn.style.opacity = nextBtn.disabled? "0.5" : "1";
}
//page2 button
    function revealHiddenNumber() {
        // Get the hidden number element
        var hiddenNumberElement = document.getElementById("hiddenNumber");
        
        // Toggle its visibility
        if (hiddenNumberElement.style.display === "none") {
            hiddenNumberElement.style.display = "block";
        } else {
            hiddenNumberElement.style.display = "none";
        }
    }

    //page 3 button to color change
// color Change Functionality, const means it wouldnt change
const colorChangeBtn = document.getElementById("colorChangeBtn");
const subwayColors = [
    '#EE352E', // Red (1/2/3 trains)
    '#00933C', // Green (4/5/6 trains)
    '#FF6319', // Orange (B/D/F/M trains)
    '#0039A6', // Blue (A/C/E trains)
    '#B933AD', // Purple (7 train)
    '#FCCC0A', // Yellow (N/Q/R/W trains)
    '#996633', // Brown (J/ Z trains)
    '#A7A9Ac',  // Gray (L trains)
    '#6CBE45', // Light Green (G trains)
    '#808183', // Dark Gray (S trains)
    '#00ADD0' //Light blue(Ttrain)

];

let currentColorIndex = 0;

//event listener, which tells it what to dp
colorChangeBtn.addEventListener("click", function(e) {
    e.stopPropagation(); // Prevent event interference
    
    const paper3 = document.getElementById("p3");
    const front = paper3.querySelector('.front');
    const back = paper3.querySelector('.back');
    
    // Cycle to next color, hence the +1
    currentColorIndex = (currentColorIndex + 1) % subwayColors.length;
    const newColor = subwayColors[currentColorIndex];
    
   //applying the color change to the page
    front.style.backgroundColor = newColor;

    
    console.log("Changed color to:", newColor); // For debugging
});