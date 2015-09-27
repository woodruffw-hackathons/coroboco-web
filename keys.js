var mapping = {
  65: '.left',
  37: '.left',
  87: '.up',
  38: '.up',
  68: '.right',
  39: '.right',
  40: '.down',
  83: '.down'

};

$(document).ready(function(){
    $("#hide").click(function(){
        $("p").hide();
    });
    $("#show").click(function(){
        $("p").show();
    });
});


function connect(value){
  console.log(value);
  if(value){ document.getElementById('yes').style.display = 'block'; document.getElementById('no').style.display = 'none'; }
  else if(!value){ document.getElementById('yes').style.display = 'none'; document.getElementById('no').style.display = 'block'; }
}

function getreq(direction){
    var req = new XMLHttpRequest(), url = '/key/' + direction;
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200){
            $(document).ready(function(){
              if(req.responseText === 'true'){ $("#no").hide(); $("#yes").show();  }
              else if(req.responseText === 'false'){ $("#yes").hide(); $("#no").show();  }
            });
        }
    }
    req.open("GET", url, true); // true for asynchronous
    req.send(null);
}

$(document.documentElement).keydown(function(event){
    var key = mapping[event.keyCode];
    if (key) $(key).addClass('pressed');
});

$(document.documentElement).keyup(function(event){

    var key = mapping[event.keyCode];
    if (key) $(key).removeClass('pressed');
    if(key == ".up"){ getreq("up"); }
    else if(key == ".down"){ getreq("down"); }
    else if(key == ".left"){ getreq("left"); }
    else if(key == ".right"){ getreq("right"); }
});
