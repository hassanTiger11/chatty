/*
Author: Hassan Alnamer
This is the cliet side script for Chatty.
The client side has two main functions:
1) sendMessage() : send the message using AJAX and clear the textFields
2) fetchMessage(): fetch messages from the server every 1 second. Does so, by setting the setInterval()
The message should be shown upon recival fromt he server, not upon sending to the server
*/

/**
This function uses the AJAX model to compose an http request and communicate with the server.
The request I am going to use is GET since I am more fimiliar with it
*/
function sendMessage(){

  var httpRequest = new XMLHttpRequest();

  if(!httpRequest){
    alert("Error!1");
    return false;
  }

  httpRequest.onreadystatechange  = ()=>{
    if(httpRequest.readyState === XMLHttpRequest.DONE){

      if(httpRequest.status === 200){

      }else{
        document.getElementById('messageDisplay').value ="Failed!"
      }
    }
  }

  let user = document.getElementById('alias').value;
  let message = document.getElementById('message').value;

  let url = "/"+user+"/"+message;
  console.log(url);
  httpRequest.open('GET', url);
  httpRequest.send();
}

function fetchMessages(){

    var httpRequest = new XMLHttpRequest();

    if(!httpRequest){
      alert("Error!1");
      return false;
    }

    httpRequest.onreadystatechange  = ()=>{

      if(httpRequest.readyState === XMLHttpRequest.DONE){

        if(httpRequest.status === 200){
          
          document.getElementById('chatDisplay').innerHTML  = httpRequest.response;

        }else{
          alert("couldn't refresh chat!");
        }
      }
    }

    let url = "/fetch";
    console.log(url);
    httpRequest.open('GET', url);
    httpRequest.send();
}
