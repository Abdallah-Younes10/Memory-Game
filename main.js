
document.querySelector(".control-btn span").onclick = function(){
    let yourName = prompt ("Whats Your Name ?") 

    if( yourName == null || yourName == ""){
        document.querySelector(".info-container .name span").innerHTML="UnKnown";
    }else{
        document.querySelector(".info-container .name span").innerHTML= yourName ;
    }
    document.querySelector(".control-btn").remove()
}

let duration = 1000 ;

let blockContainer = document.querySelector(".memory-game-blocks")

let blocks = Array.from(blockContainer.children);

let orderRange = [...Array(blocks.length).keys()]

swap(orderRange)
blocks.forEach((block , index) => {

    block.style.order = orderRange[index]
    block.addEventListener('click' , function(){
        flipBlock(block)
    })
})

function swap (array){
    let current = array.length , temp , random ;
    while (current > 0){
        random = Math.floor(Math.random() * current)

        current--

        temp = array[current] 
        array[current] = array[random]
        array[random] = temp
    }
    return array
}

function flipBlock(selectedBlock){
    selectedBlock.classList.add("is-flipped")

    let allSelectedBlock = blocks.filter(blockselect => blockselect.classList.contains('is-flipped'));
    console.log(allSelectedBlock);
    
    if(allSelectedBlock.length === 2){
        stopflip()
        match(allSelectedBlock[0] , allSelectedBlock[1])
    }
}

function stopflip(){
    blockContainer.classList.add("no-clicking")

    setTimeout(()=>{
        blockContainer.classList.remove("no-clicking")
    }, duration)
}

function match(first , second){
    let tries = document.querySelector(".info-container .tries span")
    if(first.dataset.pes === second.dataset.pes){
        first.classList.remove("is-flipped")
        second.classList.remove("is-flipped")

        first.classList.add("is-match")
        second.classList.add("is-match")
        winGame()
    }else{
        tries.innerHTML = parseInt(tries.innerHTML) + 1
        setTimeout(()=>{
            first.classList.remove("is-flipped")
        second.classList.remove("is-flipped")
        }, duration)
    }
}

function winGame(){
    let allMatchedBlock = blocks.filter(blockselect => blockselect.classList.contains('is-match'));
    // console.log(allMatchedBlock)
    if (allMatchedBlock.length === blocks.length){
        blockContainer.classList.add("no-clicking")
        console.log("you win");
        // document.querySelector(".control-btn").add()
         tries.innerHTML =`<div class="control-btn layout">
        <span>Start Game</span>
    </div>`
    }
}

