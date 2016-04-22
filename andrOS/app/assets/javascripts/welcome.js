
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
            launchApp('#browser');
    });

    $(".toggleExample").click(function(){
            $("#exampleFrame").toggle("fast", "linear");
            launchApp('#example');
    });
    $(".toggleCalculator").click(function(){
            $("#calcFrame").toggle("fast", "linear");
            //launchApp($('#calcApp').index());
            launchApp('#calc');
    });
    $(".togglePaint").click(function(){
            $("#paintFrame").toggle("fast", "linear");
            launchApp('#paint');
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

    //Activate a Window based on HTML data tag
    $('.draggable').mousedown(function (e) {
        e.preventDefault();

        appList.forEach(removeActive);

        var window = $(this).data('app');
        $("#" + window).removeClass("sink");
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

function removeActive(item, index)
{
    $(item).removeClass("active");
    $(item).addClass("sink");

    console.log(index + ", " + item);
}

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
    //;
    var found = $.inArray(app, appList);
    if (found >= 0) {
        appList.splice(app, 1);
    } else {
        // Element was not found, add it.
        appList.push(app);
    }

    console.log(appList[1]);
    console.log("Length " + appList.length)
}

function closeApp(app)
{
    $("#" + app).hide();
}

function snapApp(app, condition)
{

    //  -1 = left
    //   0 = restore
    //   1 = right
    //   2 = max

    if(condition == -1)
    {
        $("#" + app).addClass("left");
        $("#" + app).removeClass("right");
        $("#" + app).removeClass("maximize");

        $("#" + app + " .max").addClass("none");
        $("#" + app + " .rest").removeClass("none");
    }
    else if(condition == 0)
    {
        $("#" + app).removeClass("left");
        $("#" + app).removeClass("right");
        $("#" + app).removeClass("maximize");

        $("#" + app + " .max").removeClass("none");
        $("#" + app + " .rest").addClass("none");
    }

    else if(condition == 1)
    {
        $("#" + app).removeClass("left");
        $("#" + app).addClass("right");
        $("#" + app).removeClass("maximize");

        $("#" + app + " .max").addClass("none");
        $("#" + app + " .rest").removeClass("none");
    }

    else if(condition == 2)
    {
        $("#" + app).removeClass("left");
        $("#" + app).removeClass("right");
        $("#" + app).addClass("maximize");

        $("#" + app + " .rest").removeClass("none");
        $("#" + app + " .max").addClass("none");
    }
}

function minApp(app)
{
    $("#" + app).hide();
}
