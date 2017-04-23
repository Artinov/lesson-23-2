$(document).ready(function() {
    var token = window.localStorage.getItem("token");
    if (token != undefined) {

        $.ajax({
            url: "/token",
            method: "POST",
            data: {
                "token": token
            },
        }).then(function(res) {
            if (res.result == true) {
                window.location = "/secret.html"
            }
        });
    }
});

$("#loginButton").click(function() {
    var login = $("[name='login']").val();
    var password = $("[name='password']").val();

    $.ajax({
        url: "/login",
        method: "POST",
        data: {
            "login": login,
            "password": password
        },
    }).then(function(res) {
        console.log(res);

        if (res.result == true) {
            window.localStorage.setItem("token", res.token);
            alert("ok");

            window.location = "/secret.html"
        } else {
            alert(":c")
        }
    })
});