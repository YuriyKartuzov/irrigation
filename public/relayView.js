
function irrigationView(){
    $("#mainArea").html("");
    $("#irrigationView").addClass("active");
    $("#cameraView").removeClass("active");
    $("#terminalView").removeClass("active");

    let irrigationHtml = `
    <div name="relayGrid">
        <table style="margin:auto">
        <th colspan="8" style="margin:auto;margin: auto;">
            Water valves
        </th>
        <tr>
            <td><button id='rel1' onclick="activateRelay(1)" type="button" class="btn btn-outline-dark">Relay 1</button></td>
            <td><button id='rel2' onclick="activateRelay(2)" type="button" class="btn btn-outline-dark">Relay 2</button></td>
            <td><button id='rel3' onclick="activateRelay(3)" type="button" class="btn btn-outline-dark">Relay 3</button></td>
            <td><button id='rel4' onclick="activateRelay(4)" type="button" class="btn btn-outline-dark">Relay 4</button></td>
            <td><button id='rel5' onclick="activateRelay(5)" type="button" class="btn btn-outline-dark">Relay 5</button></td>
            <td><button id='rel6' onclick="activateRelay(6)" type="button" class="btn btn-outline-dark">Relay 6</button></td>
            <td><button id='rel7' onclick="activateRelay(7)" type="button" class="btn btn-outline-dark">Relay 7</button></td>
            <td><button id='rel8' onclick="activateRelay(8)" type="button" class="btn btn-outline-dark">Relay 8</button></td>
        </tr>
        </table>
    </div>
    `;

    $("#mainArea").html(irrigationHtml);
}


// Activate relay
function activateRelay(rel) {

    $.get("/activate/" + rel).done((status) => {
        if(status == "ON"){
            $("#rel" + rel).removeClass("btn-outline-dark");
            $("#rel" + rel).addClass("btn-success");
        } else if(status == "OFF"){
            $("#rel" + rel).removeClass("btn-success");
            $("#rel" + rel).addClass("btn-outline-dark");
        }
    }).fail((data) => {
        alert("Relay is busy try again");
    });
}
