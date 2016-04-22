
var appList = [];

$(function() {
    $( ".draggable" ).draggable({
        handle: ".titleBar",
        scroll: false,
        snap: true,
        snapMode: "outer",
        stack: "#example",
        containment: "body"
    });

});

$(document).ready(function(){
    $("#calcFrame").hide();
    $("#paintFrame").hide();

    $(".toggleApps").click(function(){
            $("#apps").toggle("fast", "linear");
            $("#filter").autofocus="true";
    });
    $(".toggleBrowser").click(function(){
            $("#browserFrame").toggle("fast", "linear");
    });

    $(".toggleExample").click(function(){
            $("#exampleFrame").toggle("fast", "linear");
    });
    $(".toggleCalculator").click(function(){
            $("#calcFrame").toggle("fast", "linear");
            launchApp($('#calcApp').index());
    });
    $(".togglePaint").click(function(){
            $("#paintFrame").toggle("fast", "linear");
            launchApp($('#paintApp').index());
    });
    (function ($) {

        $('#filter').keyup(function () {

            var rex = new RegExp($(this).val(), 'i');
            $('.searchable li').hide("fast", "linear");
            $('.searchable li').filter(function () {
                return rex.test($(this).text());
            }).show("fast", "linear");
        })
    }($));

    //Sets an arbitrary window as active based on html data tag
    $('.draggable').click(function (e) {
        e.preventDefault();

        var window = $(this).data('app');
        $("#" + window).addClass("active");

    });

    //Runs clock function when the DOM loads
    $(startTime);
    var color = $(".selected").css("background-color");
      var $canvas = $("canvas");
      var context = $canvas[0].getContext("2d");
      var lastEvent;
      var mouseDown = false;

      //When clicking on control list items
      $(".controls").on("click", "li", function(){
        //Deselect sibling elements
        $(this).siblings().removeClass("selected");
        //Select clicked element
        $(this).addClass("selected");
        //cache current color
        color = $(this).css("background-color");
      });

      //When "New Color" is pressed
      $("#revealColorSelect").click(function(){
        //Show color select or hide the color select
        changeColor();
        $("#colorSelect").toggle();
      });

      //update the new color span
      function changeColor() {
        var r = $("#red").val();
        var g = $("#green").val();
        var b = $("#blue").val();
        $("#newColor").css("background-color", "rgb(" + r + "," + g +", " + b + ")");
      }

      //When color sliders change
      $("input[type=range]").change(changeColor);

      //When "Add Color" is pressed
      $("#addNewColor").click(function(){
        //Append the color to the controls ul
        var $newColor = $("<li></li>");
        $newColor.css("background-color", $("#newColor").css("background-color"));
        $(".controls ul").append($newColor);
        //Select the new color
        $newColor.click();
      });

      //On mouse events on the canvas
      $canvas.mousedown(function(e){
        lastEvent = e;
        mouseDown = true;
      }).mousemove(function(e){
        //Draw lines
        if(mouseDown) {
          context.beginPath();
          context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
          context.lineTo(e.offsetX, e.offsetY);
          context.strokeStyle = color;
          context.stroke();
          lastEvent = e;
        }
      }).mouseup(function(){
        mouseDown = false;
      }).mouseleave(function(){
        $canvas.mouseup();
      });

});

function startTime()
{
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i)
{
    if (i < 10)
    {
        i = "0" + i;
    }  // add zero in front of numbers < 10
    return i;
}

function www()
{
    var x = document.getElementById("www").value;
    document.getElementById("browserContent").src = x;
}

function launchApp(app)
{
    //var testString = app.toString();
    //document.getElementById(app).style.display = "show";
    ;
    var found = $.inArray(app, appList);
    if (found >= 0) {
        appList.splice(app, 1);
    } else {
        // Element was not found, add it.
        appList.push(app);
    }
    console.log(appList[0]);
    console.log("Length " + appList.length)
}

function closeApp(app)
{
    document.getElementById(app).hide();
}

function maxApp(app, condition)
{
    if(condition)
    {
        document.getElementById(app).className += " maximize";
    }
    else
    {
        //document.getElementById(i).className = document.getElementById(i).className.replace( /(?:^|\s)active(?!\S)/g , '' );
    }
}

function minApp(app, condition)
{
    document.getElementById(app).hide();
}
