

function cameraView() {

    // Prepare screen
    $("#mainArea").html("");
    $("#cameraView").addClass("active");
    $("#irrigationView").removeClass("active");
    $("#terminalView").removeClass("active");

    var cameraViewHTML = `
        <div id='pictureFrame'></div>
        <div id='requestDiv'>
            <button id='requestBtn'
                    onclick='requestImage()'
                    type="button" 
                    class="btn btn btn-success">
                        Get Image
            </button>
        </div>
    `;
    
    $("#mainArea").html(cameraViewHTML);
} 

function requestImage(){

    var spinner = `
        <div class="spinner-border text-warning" style="width: 1rem; height: 1rem;"  role="status"></div> &nbsp;Get Image
    `;

    $("#requestBtn").prop("disabled", true);
    $("#requestBtn").html(spinner);

    $.get("/getPic")
        .done((data)=>{

            $("#pictureFrame").html(`<img src='${data}' style='margin:auto;'>`);

            $("#requestBtn").prop("disabled", false);
            $("#requestBtn").html('Get Image');
        })
        .catch((error)=>{
            $("#requestBtn").prop("disabled", false);
            $("#requestBtn").html('Get Image');
            alert("Oh Oh: " + JSON.stringify(error));
        });
}