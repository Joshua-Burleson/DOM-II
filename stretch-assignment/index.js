const blocks = Array.from(document.querySelectorAll('.block'));

blocks.forEach((block) => {

    // Methods for animations

        // Move right
    block.interval = () => {
        rightInterval = setInterval(() => {
            block.style.marginLeft = `${Number(block.style.marginLeft.slice(0,-2)) + 50}px`;
    }, 2000);
    
}
        // Clear right-movement interval
    block.clearMarginInterval = () => {
        clearInterval(rightInterval);
    }


    // click event
    block.addEventListener('dblclick', (event) => {
        const index = blocks.findIndex(searchedBlock => searchedBlock === event.target);
        blocks.splice(index, 1);
        blocks.unshift(event.target);

        document.querySelector('.blocks').innerHTML = '';
        blocks.forEach(newlyOrderedBlock => {
            document.querySelector('.blocks').appendChild(newlyOrderedBlock);
        });

    });

    // mousedown event
    block.addEventListener('mousedown', (event) => {
        block.style.marginLeft = '10px';
        block.interval();

    });

    // mouseup or leave event clears interval
    ['mouseup', 'mouseleave', 'dblclick'].forEach(leaveEvent => {
        block.addEventListener(leaveEvent, (event) => {
            block.clearMarginInterval();
            block.style.marginLeft = '10px';
        });
    });
});