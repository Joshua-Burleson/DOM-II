const blocks = Array.from(document.querySelectorAll('.block'));

blocks.forEach((block) => {
    // click event
    block.addEventListener('click', (event) => {
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
            block.clearInterval = () => {
                window.clearInterval(block.interval);
            }

            block.interval = setInterval(() => {
                block.style.marginLeft = `${Number(block.style.marginLeft.slice(0,-2)) + 25}px`;
            }, 1000);

    });

    // mouseup or leave event clears interval
    ['mouseup', 'mouseleave'].forEach(event => {
        block.addEventListener(event, () => {
                block.clearInterval ? block.clearInterval() : block.style.marginLeft = '10px';
        });
    })
});