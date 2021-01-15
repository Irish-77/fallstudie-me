var emailEntered = true;
var emailValid = false;

//import { authUser } from "./login_service.js";

//import { authUser } from "./login_service.js";

$(document).ready(function() {


    console.log(localStorage.getItem("username"));


    $("#toggle-btn").click(function() {
        if ($("#toggle-btn").hasClass("collapsed")) {
            $("#blur").removeClass("blur-content");
        } else {
            $("#blur").addClass("blur-content");
        }
    });

    $(".nav-link").click(function() {
        if (!$("#toggle-btn").hasClass("collapsed")) {
            $("#toggle-btn").trigger('click');
            $("#blur").removeClass("blur-content");

        }
    });



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