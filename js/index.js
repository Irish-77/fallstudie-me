var emailEntered = true;
var emailValid = false;

localStorage.setItem("username", 'Querbert');

$(document).ready(function() {


    console.log(localStorage.getItem("username"));


    $("#toggle-btn").click(function() {
        if ($("#toggle-btn").hasClass("collapsed")) {
            $("#blur").removeClass("blur-content");
            $(".navbar-top").addClass("navbar-top-shadow");
        } else {
            $("#blur").addClass("blur-content");
            $(".navbar-top").removeClass("navbar-top-shadow");
        }
    });

    $(".nav-link").click(function() {
        if (!$("#toggle-btn").hasClass("collapsed")) {
            $("#toggle-btn").trigger('click');
            $("#blur").removeClass("blur-content");

        }
    });




    const header = document.querySelector("header");
    const sectionOne = document.querySelector(".changeNav");

    const sectionOneOptions = {
        rootMargin: "-200px 0px 0px 0px"
    };

    const sectionOneObserver = new IntersectionObserver(function(
            entries,
            sectionOneObserver
        ) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    header.classList.add("nav-scrolled");
                } else {
                    header.classList.remove("nav-scrolled");
                }
            });
        },
        sectionOneOptions);

    sectionOneObserver.observe(sectionOne);

    const faders = document.querySelectorAll(".fade-in");
    const sliders = document.querySelectorAll(".slide-in");


    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -250px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(
            entries,
            appearOnScroll
        ) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add("appear");
                    appearOnScroll.unobserve(entry.target);
                }
            });
        },
        appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });


    sliders.forEach(slider => {
        appearOnScroll.observe(slider);
    });

});