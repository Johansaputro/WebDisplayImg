var myVar;

function myFunction() {
  myVar = setTimeout(function() {
    $(".cssload-thecube").css("display", "none");
    // document.getElementById("all").style.display = "block";
    $("#all").css("display", "block");
  }, 5000);
}

$(document.body).on("load", myFunction());
