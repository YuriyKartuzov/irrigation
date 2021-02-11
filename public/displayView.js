let currentDisplayView = null;

function displayView() {
    $("#mainArea").html("");
    $("#displayView").addClass("active");
    $("#cameraView").removeClass("active");
    $("#terminalView").removeClass("active");
    $("#irrigationView").removeClass("active");

    let displayHtml = `
        <div id='displayGrid'>
            <table>
                <tr>
                    <th>KEYESTUDIO 1602 LCD Display 16x2</th>
                </tr>
                <tr>
                    <td>
                        <button onclick='printLCD(event);'>Display Text</button>
                        <input type='text' id='lcd_msg'/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button onclick='weatherLCD(event);'>Display weather</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button onclick='soilSensors(event);'>Soil Sensors</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button onclick='dtLCD(event);'>Show Time and Date</button>
                    </td>
                </tr>
            </table>
        </div>
    `;

    $("#mainArea").html(displayHtml);

}


function printLCD(e) {
    e.preventDefault();
    var text = $("#lcd_msg").val();
    $.get("/lcd/text/" + text, (data) => {
        console.log("printLCD(): " + data)
    });
    var text = $("#lcd_msg").val("");
    return;
}

function weatherLCD(e) {
    e.preventDefault();
    $.get('/lcd/weather/');
}       

function soilSensors(e){
    e.preventDefault();
    $.get('/lcd/soilsensors/');
}

function techLCD(ef) {
    e.preventDefault();
}

function dtLCD(e) {
    e.preventDefault();
}

/*
        <!-- <span class="navbar-text" name="Date and time" id='timeDate'></span> -->
        <form class="form-inline" onsubmit="printLCD(event);">
          <input class="form-control mr-sm-2" id='lcd_msg' type="search" placeholder="Print on LCD" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Print</button>
        </form>

*/