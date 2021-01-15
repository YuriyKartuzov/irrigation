// Initialization
$(document).ready(() => {
    $("#rel1").click(() => {
        var ans = activate(9);
        console.log(ans);
    });

    // Start of the clock & date
    StartClock()

    // Set up polling for button status
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

});

// Activate relay
function activate(rel) {
    $.get("/activate/" + rel).done((data) => {
        console.log("Relay one clicked: " + JSON.stringify(data));
        return data;
    }).fail((data) => {
        alert(JSON.stringify(data));
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