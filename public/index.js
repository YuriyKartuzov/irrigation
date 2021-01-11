$(document).ready( () => {
    //alert("Loaded");

    $("#rel1").click(() => {
        activate(9);
    });
});

function activate(rel){
    $.get("/activate/" + rel).done((data) => {
        console.log("Relay one clicked: " + JSON.stringify(data));
    }).fail((data) => {
        alert(JSON.stringify(data));
    });

}