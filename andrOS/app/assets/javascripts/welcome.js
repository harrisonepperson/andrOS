
var appList = [];

$(function() {
    $( ".draggable" ).draggable({
        handle: ".titleBar",
        scroll: false,
        snap: true,
        snapMode: "outer",
        stack: "#example",
        containment: "body"//,
	//zIndex: 50
    });

});

$(document).ready(function(){

    //Hide apps in initial stay can be done with CSS display:none too
    $("#calcFrame").hide();
    $("#drawFrame").hide();
    $("#browserFrame").hide();
    $("#notesFrame").hide();
    $("#textfileFrame").hide();
    $("#cmdFrame").hide();
    //Toggle Apps
    $(".toggleApps").click(function(){
            $("#apps").toggle("fast", "linear");
            $("#filter").autofocus="true";
    });
    /*$(".toggleExample").click(function(){
            $("#exampleFrame").toggle("fast", "linear");
            launchApp('example');
    });
    $(".toggleCalculator").click(function(){
            $("#calcFrame").toggle("fast", "linear");
            //launchApp($('#calcApp').index());
            launchApp('calc');
    });
    $(".toggleDraw").click(function(){
            $("#drawFrame").toggle("fast", "linear");
            launchApp('draw');
    });
    $(".toggleBrowser").click(function(){
            $("#browserFrame").toggle("fast", "linear");
            launchApp('browser');
    });
     $(".toggleTextFile").click(function(){
            $("#textfileFrame").toggle("fast", "linear");
            launchApp('textfile');
    });
    $(".toggleNotes").click(function(){
            $("#notesFrame").toggle("fast", "linear");
            launchApp('notes');
    });
    $(".toggleCmd").click(function(){
            $("#cmdFrame").toggle("fast", "linear");
            launchApp('cmd');
    });
	$(".togglePres").click(function(){
		$("#presFrame").toggle("fast", "linear");
		launchApp('pres');
	});
	$(".toggleWelcome").click(function(){
		$("#welcomeFrame").toggle("fast", "linear");
		launchApp('welcome');
	});*/
	
	$(".toggleWindow").click(function(e){
		e.preventDefault();
		
		var app = $(this).data('app');
		var icon = $(this).data('icon');
		$("#" + app + "Frame").toggle("fast", "linear");
		launchApp(app, icon);
	});

    //Search Apps
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
        $("#" + window + "Frame").removeClass("sink");
        $("#" + window + "Frame").addClass("active");

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

    //Making Apps Active
    /*$('#calcFrame').click(function(){        
        makeActive('calc');
    });
    $('#drawFrame').click(function(){        
        makeActive('draw');
    });
    $('#browserFrame').click(function(){        
        makeActive('browser');
    });
    $('#textfileFrame').click(function(){        
        makeActive('textfile');
    });
    //Runs clock function when the DOM loads  
    $(startTime);*/
    
    //TERMINAL
    var ContentofDiv = $('#txtDiv').html();
    var cmdText= "";
    var text = $('#txtDiv').text();
    var connection= "Networking connection:" + " " +navigator.onLine;
    var engine= "Engine Name of the browser:" + " " +navigator.product;
    var cookies="Cookies enabled:" + " " +navigator.cookieEnabled;
    var lang="Broweser language:" + " " +navigator.language;
    var browserV="Broweser version information:" + " " +navigator.appVersion;
    
    $("#cmdIn").keypress(function(e) {
        
        if(e.which == 13) {
            //style="min-height:600px; width:600px;"
            //style="min-height:520px; width:600px;"
            if($("#cmdIn").val() == "ip config" || $("#cmdIn").val()==1){              
               
               cmdText = $("#cmdResult").text();    
               $("#cmdResult").text("");           
               $("#cmdResult").text(cmdText+"~$ "+ myip +"\n");
               $("#cmdIn").val("");;
            }
            else if($("#cmdIn").val() == "cnx" ||$("#cmdIn").val() == "2"){
               cmdText = $("#cmdResult").text();    
               $("#cmdResult").text("");           
               $("#cmdResult").text(cmdText+"~$ "+connection+"\n");
               $("#cmdIn").val("");
            }
            else if($("#cmdIn").val() == "3"){
               cmdText = $("#cmdResult").text();    
               $("#cmdResult").text("");           
               $("#cmdResult").text(cmdText+"~$ "+engine+"\n");
               $("#cmdIn").val("");
            }
            else if($("#cmdIn").val() == "4"){
               cmdText = $("#cmdResult").text();    
               $("#cmdResult").text("");           
               $("#cmdResult").text(cmdText+"~$ "+cookies+"\n");
               $("#cmdIn").val("");
            }
            else if($("#cmdIn").val() == "5"){
               cmdText = $("#cmdResult").text();    
               $("#cmdResult").text("");           
               $("#cmdResult").text(cmdText+"~$ "+lang+"\n");
               $("#cmdIn").val("");
            }
            else if($("#cmdIn").val() == "browser -v" ||$("#cmdIn").val() == "6"){
               cmdText = $("#cmdResult").text();    
               $("#cmdResult").text("");           
               $("#cmdResult").text(cmdText+"~$ "+browserV+"\n");
               $("#cmdIn").val("");
            }
            else if($("#cmdIn").val() == "7"){
               cmdText = $("#cmdResult").text();    
               $("#cmdResult").text("");           
               $("#cmdResult").text(cmdText+"~$ "+"App list \n");
               $("#cmdIn").val("");
            }
            else if($("#cmdIn").val() == "clear"){
                $("#cmdResult").text("");
                $("#cmdIn").val("");
                cmdText= "";
            }
            else{
                cmdText = $("#cmdResult").text();   
               $("#cmdResult").text("");           
               $("#cmdResult").text("command not found \n");
               $("#cmdIn").val("");
            }
           
        }
    });
    
});

function removeActive(item, index)
{
    $("#" + item + "Frame").removeClass("active");
    $("#" + item + "Frame").addClass("sink");

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

function dockToggle(app)
{
	console.log("#" + app + "Frame");
	$("#" + app + "Frame").toggle("fast", "linear");
}

function launchApp(app, icon)
{
    //var testString = app.toString();
    //document.getElementById(app).style.display = "show";
    //;


    var found = $.inArray(app, appList);
    if (found >= 0) {
        //appList.splice(app, 1);
    } else {
        // Element was not found, add it.
        appList.push(app);
	    
	    //Adds the element to the dock with a default pic
	    var parent = document.getElementById("dockCenter");
	    var child = document.createElement("span");
	    child.className = "glyphicon glyphicon-" + icon;
	    child.setAttribute("data-app", app);
	    child.setAttribute("id", "dock" + app);
	    child.setAttribute("onclick", "dockToggle('" + app + "')");
	//var node = document.createTextNode("x");
	//child.appendChild(node);
	    
	    parent.appendChild(child);
	    
	    //Right now the default "check" is used as the app icon, we'll have to scoure the pic info from the html data element to actually have that work.
	    
    }

    console.log(appList[0]);
    console.log("Length " + appList.length)
    
	var para = document.createElement("p");
	var node = document.createTextNode("This is new.");
	para.appendChild(node);

	var element = document.getElementById("div1");
	element.appendChild(para);
}
/*function makeActive(app)
{    
    for(var i = 0;i<appList.length;i++){
      
        if($("#"+appList[i]).hasClass('active')){
          console.log(true);

        }//here the erro it need to use the actual id
        
    
    }
     document.getElementById(app).className += " active";
}*/

function closeApp(app)
{
	//hides the app and resets teh windows size
	$("#" + app + "Frame").toggle("fast", "linear");
	$("#" + app).removeClass("left");
        $("#" + app).removeClass("right");
        $("#" + app).removeClass("maximize");
	$("#" + app + " .max").removeClass("none");
        $("#" + app + " .rest").addClass("none");
	
	//Removes the element from the dock
	var parent = document.getElementById("dockCenter");
	var child = document.getElementById("dock" + app);
	parent.removeChild(child);
	
	//remove the app from the array.
	var i = appList.indexOf(app);
	delete appList[i];
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
	$("#" + app + "Frame").toggle("fast", "linear");
}
