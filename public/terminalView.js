var cmdHistoryCounter = 0;
var cmdHistory = [" "];

function terminalView() {

    $("#mainArea").html("");
    $("#terminalView").addClass("active");
    $("#irrigationView").removeClass("active");
    $("#cameraView").removeClass("active");

    var terminalViewHTML = `
        <div id='container'>
            <div id='inputDiv'>
                    <label for='cmd'>Terminal:</label>
                    <input id='cmd' type='text' name='cmd' autocomplete='off' size='50' spellcheck='false'>
            </div>
            <div id='outputAreaDiv'></div>
        </div>
    `;

    $("#mainArea").html(terminalViewHTML);
    $('#cmd').focus();

    //cmdHistory
    $(document).unbind('keydown');
    $(document).keydown((e) => {
        if (e.which == 38) { // 38 - UP arrow key
            let val = cmdHistory[cmdHistoryCounter];
            cmdHistoryCounter = (cmdHistoryCounter + 1 >= cmdHistory.length) ? cmdHistoryCounter : cmdHistoryCounter + 1;
            $("#cmd").val(val);
        }

        if (e.which == 40) { // 40 - Down arroy key
            let idx = (cmdHistoryCounter - 1 >= cmdHistory.length) ? cmdHistoryCounter : cmdHistoryCounter--;
            let val = cmdHistory[idx];
            $("#cmd").val(val);
        }

        if (e.which == 13 ) { // Enter key
            terminalSubmit();
        }
    });

    //$("#form").on("submit", terminalSubmit);
    function terminalSubmit() {
        // event.preventDefualt();
        cmdHistoryCounter = 0;

        let cmd = $("#cmd").val();
        if (cmd.trim() == "") return;

        if (cmd == "clear" || cmd == "cl") {
            $("#outputAreaDiv").empty();
            $("#cmd").val("");
            $("#cmd").focus();
        }

        $("#cmd").val("");
        $.get("/term/" + cmd.replace(/[\/]/g, 'zzz'), (res) => {
            console.log("DATAI S IN");
            let html = `<strong>$dev:<greeg>${cmd}</green></strong></br>
                            <span id='termRes'>${res}</span></br>`;
            $("#termRes").prepend(html);
            $("#cmd").focus();
        }).fail((data, textStatus, xrh) => {
            alert("Error" + data);
        });
    }



}
