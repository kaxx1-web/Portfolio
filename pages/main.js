// DOM Elements
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

// Update button states initially
updateButtonStates();

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

function flipPaper(paperIndex, zIndex) {
    papers[paperIndex].classList.add("flipped");
    papers[paperIndex].style.zIndex = zIndex;
}

function unflipPaper(paperIndex, zIndex) {
    papers[paperIndex].classList.remove("flipped");
    papers[paperIndex].style.zIndex = zIndex;
}

function updateButtonStates() {
    // Disable prev button if at first page
    prevBtn.disabled = currentPosition === 1;
    
    // Disable next button if at last page
    nextBtn.disabled = currentPosition === maxPosition;
    
    // Visual feedback (optional)
    prevBtn.style.opacity = prevBtn.disabled? "0.5" : "1";
    nextBtn.style.opacity = nextBtn.disabled? "0.5" : "1";
}