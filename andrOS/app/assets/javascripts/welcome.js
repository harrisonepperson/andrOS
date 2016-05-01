
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

    //Hide apps in initial stay can be done with CSS display:none too
    $("#calcFrame").hide();
    $("#drawFrame").hide();
    $("#browserFrame").hide();
    $("#notesFrame").hide();
    $("#textfileFrame").hide();
    //Toggle Apps
    $(".toggleApps").click(function(){
            $("#apps").toggle("fast", "linear");
    });
    $(".toggleExample").click(function(){
            $("#exampleFrame").toggle("fast", "linear");
    });
    $(".toggleCalculator").click(function(){
            $("#calcFrame").toggle("fast", "linear");
            launchApp($('#calcApp').index());
    });
    $(".toggleDraw").click(function(){
            $("#drawFrame").toggle("fast", "linear");
            launchApp($('#drawApp').index());
    });
    $(".toggleBrowser").click(function(){
            $("#browserFrame").toggle("fast", "linear");
            launchApp($('#browserApp').index());
    });
     $(".toggleTextFile").click(function(){
            $("#textfileFrame").toggle("fast", "linear");
            launchApp($('#textfileApp').index());
    });
    $(".toggleNotes").click(function(){
            $("#notesFrame").toggle("fast", "linear");
            launchApp($('#notesApp').index());
    });
    //Search Apps
    (function ($) {
        $('#filter').keyup(function () {
            var rex = new RegExp($(this).val(), 'i');
            $('.searchable td').hide();
            $('.searchable td').filter(function () {
                return rex.test($(this).text());
            }).show();
        })
    }($));
    //Making Apps Active
    $('#calcFrame').click(function(){        
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
    $(startTime);
    
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
function makeActive(app)
{    
    for(var i = 0;i<appList.length;i++){
      
        if($("#"+appList[i]).hasClass('active')){
          console.log(true);

        }//here the erro it need to use the actual id
        
    
    }
     document.getElementById(app).className += " active";
     
}

function closeApp(app)
{
    document.getElementById(app).style.display = "none";
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
    document.getElementById(app).style.display = "none";
}

