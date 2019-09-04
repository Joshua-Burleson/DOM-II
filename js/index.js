// Your code goes here

// Detect original page size for dynamic response on resize
let startingSize = window.innerWidth + window.innerHeight;

// Functions for events ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // ID generator
function idGeneratorFunc(){
    let count = 0;

    return (type) => {
        count ++;
        return `${type}${count}`;
    }
}

const generateID = idGeneratorFunc();


    // Animation clearing function
const clearAnimations = (element, timeOut = 800, callback = () => {return}) => {
    
    setTimeout(() => {

        element.style.animationName = 'none';
        element.style.animationDuration = 'none';
        element.style.animationIterationCount = 'none';

        callback();

    }, timeOut)
}

    // tire image visibility toggle
const tireVisibility = (toggle) => {

    const wheels = document.querySelectorAll('.tire-burn img');

    wheels.forEach(tread => {
        tread.style.visibility = toggle;
    });
}

    // bus speed away animation
const speedOff = (aBus) => {

    aBus.style.animationName = 'speed-off';
    aBus.style.animationDuration = '3s';
    aBus.style.animationIterationCount = '1';

    //clear animation to allow us to play it again on the next 
    //mouseover event
    clearAnimations(aBus);
}

    // magic school bus animation
const busMagic = (newSize) => {

    const magicSection = document.querySelector('.magic-school-bus');
    const magicSchoolBus = document.querySelector('.magic-school-bus img');

    magicSchoolBus.style.animationName = newSize > startingSize ? 'bus-grow' : 'bus-shrink';
    // Now that we've used the starting size, we can set it to the new
    // size to detect another change
    startingSize = newSize;
    
    magicSchoolBus.style.animationIterationCount = '1';

    magicSection.style.display = 'flex';

    magicSchoolBus.style.animationDuration = '2s';

    clearAnimations(magicSchoolBus, 2000, () => {
        magicSection.style.display = 'none';
    });
}

// Event Listeners ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// 1) Show tire tread images on wheel event
document.body.addEventListener('wheel', (event) => {
    
    tireVisibility('visible');

    setTimeout(()=> {
        tireVisibility('hidden');
    }, 400);

});

// 2) Have bus img "speed off" on mouseover
const bus = document.querySelector('.container header img');

bus.addEventListener('mouseover', () => {

    speedOff(bus);

});

// 3) Create an obnoxious display showing what key is pressed when one is pressed
window.addEventListener('keypress', (keyData) => {
    const section = document.querySelector('.key-press-window')
    const key = keyData.key;
    const keyDisplay = document.createElement('h1');

    keyDisplay.textContent = key;
    section.replaceChild(keyDisplay, section.childNodes[0]);
    section.style.display = 'flex';

    setTimeout(() => {
        keyDisplay.textContent = '';
        section.style.display = 'none';
    }, 175);

});

// 4) Magic School Bus Animation on window resize
window.addEventListener('resize', () => {

    const newSize = window.innerWidth + window.innerHeight;

    busMagic(newSize);
});

// 5) Create 'click' eventListeners for the nav section and anchor tags, 
// also, preventDefault nav anchor behavior and stop click propagation to nav
document.querySelector('.nav').addEventListener('click', () => {
    document.querySelector('.nav').style.backgroundColor = 'yellow';
});

document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
    });
});

// 6) Insert GSAP script tag after index.js loads
document.head.querySelectorAll('script')[0].addEventListener('load', () => {

    const gsap = document.createElement('script');
    gsap.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/TweenMax.min.js";
    
    document.head.appendChild(gsap);
});

// 7) use GSAP Rotation animation when images are double clicked
const images = document.querySelectorAll('img');

images.forEach(image => {
    image.addEventListener('dblclick', () => {
        // console.log(TweenMax);
        image.id = !image.id ? generateID('img') : image.id;
        TweenMax.to(`#${image.id}`, 1, {directionalRotation: '360_cw', yoyo: true});
        clearAnimations(image, 1100, () => {
            image.style.visibility = 'hidden';
        });
    });
});

// 8) Display a fun message when an image is dragged
images.forEach(image => {
    image.addEventListener('drag', () => {
        const section = document.querySelector('.key-press-window')
        section.querySelector('h1').textContent = 'Put Down My Child Psycho!'
        section.style.display = 'flex';
        section.style.textAlign = 'center';
        section.style.opacity = 0.8;
        section.style.color = 'red';
    });
});

// 9) Hide the aforementioned fun message and clear the associated
// data when the drag ends.
images.forEach(image => {
    image.addEventListener('dragend', () => {
        const section = document.querySelector('.key-press-window')
        section.querySelector('h1').textContent = '';
        section.style.display = 'none';
        section.style.opacity = 0.5;
        section.style.color = 'black';
    });
});

// 10) Change font color of anchor tags on focus and back to normal on blur
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('focus', () => {
        anchor.style.color = 'red';
        anchor.style.fontSize = '2rem';
    });

    anchor.addEventListener('blur', () => {
        anchor.style.color = 'black';
        anchor.style.fontSize = '1.6rem';
    });
})
