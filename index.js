
// Ham nav meny START---------------------------------->
// från https://www.w3schools.com/howto/howto_js_curtain_menu.asp

// fick ändra från onclick till addEventListener
const xbtn = document.getElementById("closebtn").addEventListener("click", closeNav);
const hamLink = document.getElementById("ham-bg-content").addEventListener("click", closeNav);
const hamMenu = document.getElementById("hamicon").addEventListener("click", openNav);

function openNav() {
    document.getElementById("ham-nav").style.width = "100%";
}

function closeNav() {
    document.getElementById("ham-nav").style.width = "0%";
}
// Ham nav meny SLUT---------------------------------->



// Form validering START------------------------------>
// från https://codepen.io/RajRajeshDn/pen/QRjwpG
function validate() {
    const name = document.getElementById("name").value;
    const tele = document.getElementById("tele").value;
    const email = document.getElementById("email").value;
    const error_message = document.getElementById("error_message");

    error_message.style.padding = "10px";

    let text;
    if (name.length < 3) {
        text = "Namnet är för kort";
        error_message.innerHTML = text;
        return false;
    }
    if (isNaN(tele) || tele.length <= 5 || tele.length >= 15) {
        text = "Ogiltigt telefonnummer";
        error_message.innerHTML = text;
        return false;
    }
    if (email.indexOf("@") == -1 || email.length < 6) {
        text = "Email-adressen är ogiltig";
        error_message.innerHTML = text;
        return false;
    }

    alert("Vi tackar för ditt meddelande.");
    return true;
}
// Form validering SLUT------------------------------>




// Carousel JS START----------------------------------------------------------------->
// från https://cheewebdevelopment.com/boilerplate-vanilla-javascript-content-slider/

const slideshow = document.querySelector('.slide-wrap');

if (slideshow != null) {

    let slides = document.querySelectorAll('.slide-entry'),
        slideCount = slides.length,
        currentSlide = 0,
        slideHeight = null,
        initialHeight = slides[0].clientHeight;

    slides[0].classList.add('active');

    function moveToSlide(n) {
        slides[currentSlide].className = 'slide-entry';
        currentSlide = (n + slideCount) % slideCount;
        slides[currentSlide].className = 'slide-entry active';
        slideHeight = slides[currentSlide].clientHeight;
        slideshow.style.height = slideHeight + 'px';
        window.addEventListener('resize', function () {
            resizedSlideHeight = slides[currentSlide].clientHeight;
            slideshow.style.height = resizedSlideHeight + 'px';
        });
    }

    function nextSlide(e) {
        moveToSlide(currentSlide + 1);
        let code = e.keyCode;
        if (code == 39) {
            moveToSlide(currentSlide + 1);
        }
    };
    function prevSlide(e) {
        moveToSlide(currentSlide + -1);
        let code = e.keyCode;
        if (code == 37) {
            moveToSlide(currentSlide + -1);
        }
    };

    const slideHandlers = {
        nextSlide: function (element) {
            document.querySelector(element).addEventListener('click', nextSlide);
            document.body.addEventListener('keydown', nextSlide, false);
        },
        prevSlide: function (element) {
            document.querySelector(element).addEventListener('click', prevSlide);
            document.body.addEventListener('keydown', prevSlide, false);
        }
    }

    slideHandlers.nextSlide('#next-slide');
    slideHandlers.prevSlide('#prev-slide');


    slideshow.style.height = initialHeight + 'px';

    window.addEventListener('resize', function () {
        let resizedHeight = slides[0].clientHeight;
        slideshow.style.height = resizedHeight + 'px';
    });


    let initialX = null;
    let initialY = null;
    function startTouch(e) {
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;
    };
    function moveTouch(e) {
        if (initialX === null) {
            return;
        }
        if (initialY === null) {
            return;
        }
        let currentX = e.touches[0].clientX;
        let currentY = e.touches[0].clientY;
        let diffX = initialX - currentX;
        let diffY = initialY - currentY;
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) {
                // swiped left
                moveToSlide(currentSlide + 1);
            } else {
                // swiped right
                moveToSlide(currentSlide + -1);
            }
        }
        initialX = null;
        initialY = null;
        e.preventDefault();
    };

    slideshow.addEventListener("touchstart", startTouch, false);
    slideshow.addEventListener("touchmove", moveTouch, false);

    // optional autoplay function  
    setInterval(function () {
        nextSlide();
    }, 4000);

} //end slideshow