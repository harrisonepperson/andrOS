
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
    $(".toggleApps").click(function(){
            $("#apps").toggle("fast", "linear");
    });
    $(".toggleBrowser").click(function(){
            $("#browserFrame").toggle("fast", "linear");
    });

    $(".toggleExample").click(function(){
            $("#exampleFrame").toggle("fast", "linear");
    });
    $("#calcFrame").hide();
    $(".toggleCalculator").click(function(){
            $("#calcFrame").toggle("fast", "linear");
            launchApp($('#calcApp').index());
    });
    (function ($) {

        $('#filter').keyup(function () {

            var rex = new RegExp($(this).val(), 'i');
            $('.searchable td').hide();
            $('.searchable td').filter(function () {
                return rex.test($(this).text());
            }).show();
        })
    }($));
    $('#calcFrame').click(function(){        
        makeActive('calc');
    });
    //Runs clock function when the DOM loads  
    $(startTime);
        
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

    document.getElementById(app).className += " active";
    /*for(var i = 0;i<appList.length;i++){
        //document.getElementById().removeClass('active');
        //console.log(appList[i]);
    }*/

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

