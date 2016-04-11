// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery-ui/draggable
//= require jquery_ujs
//= require bootstrap-sprockets
//= require_tree .


    var appList = new Array(5);

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

    $(document).ready(
        function()
        {
            $(".toggleApps").click(
                function()
                {
                    $("#apps").toggle("fast", "linear");
                }
            );

            $(".toggleBrowser").click(
                function()
                {
                    $("#browserFrame").toggle("fast", "linear");
                }
            );

            $(".toggleExample").click(
                function()
                {
                    $("#exampleFrame").toggle("fast", "linear");
                }
            );
        }
    ); onclick="launchApp('example')"

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
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }

    function www()
    {
        var x = document.getElementById("www").value;
        document.getElementById("browserContent").src = x;
    }

    function launchApp(app)
    {
        document.getElementById(app).style.display = "show";
        //for (i = 0; i < appList.length; i++) {
        //    document.getElementById(i).className = document.getElementById(i).className.replace( /(?:^|\s)active(?!\S)/g , '' );
        //}
        appList.push(app);
        document.getElementById(app).className += " active";
    }

    function makeActive(app)
    {
        document.getElementById(app).className += " active";
        /*for (i = 0; i < appList.length; i++) {
        //    document.getElementById(i).className = document.getElementById(i).className.replace( /(?:^|\s)active(?!\S)/g , '' );
        //}*/
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