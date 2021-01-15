var months = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];

$(document).ready(function() {


    for (i = 0; i < 35; i++) {
        let id = i;
        let content = "lorem ipsum";
        let step = `<div class="step active" id=${ id }> <div class="v-stepper"> <div class="circle"></div> <div class="line"></div> </div> <div class="content">${ content }</div> </div>`;

        //$('#plan').append(step);
        if (i % 2 === 0) {
            //$(`#${id}`).removeClass('active').addClass('completed')

        }
    }

    for (i = 0; i < 1; i++) {
        const date = new Date(2020, 10, 01);
        console.log(date.toLocaleString('default', { month: 'short' }));
        console.log(date.toLocaleString('default', { month: 'long' }));
        console.log(date.toLocaleString('default', { weekday: 'narrow' }));
        console.log(date.toLocaleString('default', { weekday: 'short' }));
        console.log(date.toLocaleString('default', { weekday: 'long' }));
        console.log(date.toLocaleString('default', { year: 'numeric' }));
        console.log(date.toLocaleString('default', { year: '2-digit' }));
        console.log(date.toLocaleString('default', { day: 'numeric' }));
        console.log(date.toLocaleString('default', { day: '2-digit' }));

    }




});