
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
            <td><button id='rel1' type="button" class="btn btn-outline-secondary">Relay 1</button></td>
            <td><button id='rel2' type="button" class="btn btn-outline-secondary">Relay 2</button></td>
            <td><button id='rel3' type="button" class="btn btn-outline-secondary">Relay 3</button></td>
            <td><button id='rel4' type="button" class="btn btn-outline-secondary">Relay 4</button></td>
            <td><button id='rel5' type="button" class="btn btn-outline-secondary">Relay 5</button></td>
            <td><button id='rel6' type="button" class="btn btn-outline-secondary">Relay 6</button></td>
            <td><button id='rel7' type="button" class="btn btn-outline-secondary">Relay 7</button></td>
            <td><button id='rel8' type="button" class="btn btn-outline-secondary">Relay 8</button></td>
        </tr>
        </table>
    </div>
    `;

    $("#mainArea").html(irrigationHtml);

    // Register events
    $("#rel1").click(() => { activate(1) });
    $("#rel2").click(() => { activate(2) });
    $("#rel3").click(() => { activate(3) });
    $("#rel4").click(() => { activate(4) });
    $("#rel5").click(() => { activate(5) });
    $("#rel6").click(() => { activate(6) });
    $("#rel7").click(() => { activate(7) });
    $("#rel8").click(() => { activate(8) });

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
