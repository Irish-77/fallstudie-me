feedList = [{
        "id": 1,
        "text": "Never Give Up!",
        "author": "Dwayne Johnson",
        "type": "celebrity"
    }, {
        "id": 2,
        "text": "Neuer Kurs 'Relaxen' absofort online",
        "author": "Me",
        "type": "announcement"
    },
    {
        "id": 3,
        "text": "Ich habe soeben Stage 2 von Stärke absolviert!",
        "author": "Tom",
        "type": "friend"
    }
];


$(document).ready(function() {

    document.title = "Hi " + localStorage.getItem('username');

    for (i = 0; i < 30; i++) {


        var random = i % 3;

        var feed = feedList[Math.floor(Math.random() * 3)];

        var author = feed.author;
        var content = feed.text;
        var date = "19.08.10";
        var current_id = "id_" + i;
        var post = `<a href="#" class="list-group-item list-group-item-action"> <div class="d-flex w-100 justify-content-between"> <h5 id="${current_id}" class="mb-1">@${author} sagt</h5> <small class="text-muted">am ${date}</small> </div> <p class="mb-1">${content}</p></a>`;
        $('#feedList').append(post);




        var type = feed.type;
        if (type == "friend") {
            $('#' + current_id).addClass('friend');
        }
    }


    $("#signout").click(function(e) {

        localStorage.removeItem('username');
        window.location.href = "index.html";

    });

    $("#searchDashboard").keyup(function() {
        var current_value = $("#searchDashboard").val().toLowerCase();

        $(".searchable").each(function() {
            if (!$(this).text().toLowerCase().includes(current_value) && current_value != "") {
                $(this).addClass('filterHidden');
            } else {
                $(this).removeClass('filterHidden');
            }

        });

    });

});