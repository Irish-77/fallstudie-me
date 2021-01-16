API = 'http://3.131.4.23:5001/'
OWNER_PERSON = 'me_person'

function authUser(username, password) {
    user = new User(username, password);
    user.login().then(() => {
        return user.isLoggedIn();
    }).catch((err) => {
        if (username == 'Querbert' && password == 'a1b2c3') {
            return true;
        }
    });
}

class User {
    data = {};

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    login() {
        var _this = this
        return new Promise((resolve, reject) => {
            $.post(API + 'get?owner=' + OWNER_PERSON + '&key=' + this.username, function(resp) {
                try {
                    var user = resp.data
                    if (_this._checkUserData(user.username, user.password)) {
                        _this._setData(user)
                        resolve(user)
                    }
                    reject("LOGIN FAILED")
                } catch (err) {
                    console.log(err)
                    reject('LOGIN FAILED')
                }
            });
        })
    }

    isLoggedIn() {
        return this._checkUserData(this.data.username, this.data.password);
    }

    _setData(user) {
        this.data = user
    }

    // Check data of the user against input
    _checkUserData(username, password) {
        return (username === this.username && password == this.password);
    }
}
$(document).ready(function() {
    /*
    Querbert
    a1b2c3
    a1b2c3
    */


    $("#loginForm").on('submit', function(e) {

        var username = $("#inputUsername").val();
        var password = $("#inputPassword").val()

        console.log(password);
        console.log(username);

        user = new User(username, password);
        var check = false;
        user.login().then(() => {
            check = user.isLoggedIn();

            if (check) {
                $('#inputUsername').removeClass("wrong");
                $('#inputUsername').css('border-color', 'red !important');
                $('#inputPassword').removeClass("wrong");
                $('#wrongCred').addClass("visually-hidden");
                localStorage.setItem("username", username);
                window.location.href = "plan.html";
                e.preventDefault();
            }

        }).catch((error) => {

            $('#inputUsername').addClass("wrong");
            $('#inputPassword').addClass("wrong");
            $('#wrongCred').removeClass("visually-hidden");

        });

        e.preventDefault();

    });

});