function terminalView() {

    $("#mainArea").html("");
    $("#terminalView").addClass("active");
    $("#irrigationView").removeClass("active");
    $("#cameraView").removeClass("active");

    $("#mainArea").html("Terminal");
}