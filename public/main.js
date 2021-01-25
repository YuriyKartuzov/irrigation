// Initialization
$(document).ready(() => {
    $("#rel1").click(() => {
        var ans = activate(1);
        console.log(ans);
    });
    $("#rel2").click(() => {
        var ans = activate(2);
        console.log(ans);
    });
    $("#rel3").click(() => {
        var ans = activate(3);
        console.log(ans);
    });
    $("#rel4").click(() => {
        var ans = activate(4);
        console.log(ans);
    });
    $("#rel5").click(() => {
        var ans = activate(5);
        console.log(ans);
    });
    $("#rel6").click(() => {
        var ans = activate(6);
        console.log(ans);
    });
    $("#rel7").click(() => {
        var ans = activate(7);
        console.log(ans);
    });
    $("#rel8").click(() => {
        var ans = activate(8);
        console.log(ans);
    });



    // Start of the clock & date
    // StartClock()

    // Set up polling for button status
    /*
    let polling = setInterval(() => {
        // Needs to be ajax since it need timeout, important 

        $.ajax({
            type: "GET",
            url: "/status/9",
            timeout: 3000
        }).done(function (data) {
            console.log("Status of 1 relay with # 9 is: " + data);
            // Add logic to change picture if necessary
            if (data == "ON") {
                $("#rel1").removeClass("btn-secondary")
                $("#rel1").addClass("btn-success")
            }
            else {
                $("#rel1").removeClass("btn-success")
                $("#rel1").addClass("btn-secondary")
            }
        });

    }, 3000);

    // Crear polling when no buttons present
    let isPolling = setInterval(() => {
        if (!$("#rel1").length) {
            clearInterval(polling)
            clearInterval(isPolling)
        }
    });
    */

});

function printLCD(e) {
    e.preventDefault();
    var text = $("#lcd_msg").val();
    $.get("/lcd/" + text);
    var text = $("#lcd_msg").val("");
    return;
}

// Activate relay
function activate(rel) {

    $.get("/activate/" + rel).done((status) => {
        if(status == "ON"){
            $("#rel" + rel).removeClass("btn-outline-secondary");
            $("#rel" + rel).addClass("btn-success");
        } else if(status == "OFF"){
            $("#rel" + rel).removeClass("btn-success");
            $("#rel" + rel).addClass("btn-outline-secondary");
        }
    }).fail((data) => {
        alert("Relay is busy try again");
    });
}

// Second delay for time
function secDelay() {
    var refresh = 1000; // Refresh rate in milli seconds
    mytime = setTimeout('StartClock()', refresh)
}

// Time 
function StartClock() {
    let date = new Date();
    let final = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    $("#timeDate").html(final)
    secDelay();
}