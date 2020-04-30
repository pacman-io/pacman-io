<!DOCTYPE html>
<html>
   <head>
      <meta name="GCD" content="YTk3ODQ3ZWZhN2I4NzZmMzBkNTEwYjJlacca7bdbb52031b2f472e38f944f43b2"/>
      <link rel="shortcut icon" type="image/png" href="pacmanlogo.jpg">
      <meta charset="utf-8">
      <title>PacMan.IO | Matchmaking</title>
      <meta name="generator" content="Google Web Designer 8.0.1.0401">
      <style type="text/css" id="gwd-text-style">p {
         margin: 0px;
         }
         h1 {
         margin: 0px;
         }
         h2 {
         margin: 0px;
         }
         h3 {
         margin: 0px;
         }
      </style>
      <style type="text/css">html,
         body {
         width: 100%;
         height: 100%;
         margin: 0px;
         }
         body {
         background-color: transparent;
         transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
         -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
         -moz-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
         perspective: 1400px;
         -webkit-perspective: 1400px;
         -moz-perspective: 1400px;
         transform-style: preserve-3d;
         -webkit-transform-style: preserve-3d;
         -moz-transform-style: preserve-3d;
         }
         .gwd-img-40t8 {
         position: absolute;
         left: 0%;
         width: 100%;
         height: 100%;
         top: 0%;
         }
         .gwd-div-1t6f {
         position: absolute;
         width: 38.75%;
         height: 47.68%;
         left: 30.65%;
         top: 16.38%;
         border-image-source: none;
         border-image-width: 1;
         border-image-outset: 0;
         border-image-repeat: stretch;
         border-color: rgb(106, 152, 206);
         border-style: solid;
         border-width: 2px;
         }
         .gwd-div-q9se {
         position: absolute;
         border-image-source: none;
         border-image-width: 1;
         border-image-outset: 0;
         border-image-repeat: stretch;
         border-color: rgb(227, 230, 234);
         border-style: solid;
         border-width: 0px;
         left: 33.21%;
         top: 21.41%;
         width: 33.7%;
         height: 16.27%;
         }
         .gwd-div-lx9g {
         position: absolute;
         left: 32.23%;
         top: 38.12%;
         width: 36.67%;
         height: 26.8%;
         border-image-source: none;
         border-image-width: 1;
         border-image-outset: 0;
         border-image-repeat: stretch;
         border-color: rgb(120, 137, 169);
         border-style: solid;
         border-width: 0px;
         }
      </style>
      <style>.myButton {
         box-shadow: rgb(21, 100, 173) 3px 4px 0px 0px;
         background: linear-gradient(rgb(121, 187, 255) 5%, rgb(55, 141, 229) 100%) rgb(121, 187, 255);
         border-radius: 5px;
         border: 1px solid rgb(51, 123, 196);
         display: inline-block;
         cursor: pointer;
         color: rgb(255, 255, 255);
         font-family: Arial;
         font-size: 17px;
         font-weight: bold;
         padding: 12px 44px;
         text-decoration: none;
         text-shadow: rgb(82, 142, 204) 0px 1px 0px;
         }
         .myButton:hover {
         background: linear-gradient(rgb(55, 141, 229) 5%, rgb(121, 187, 255) 100%) rgb(55, 141, 229);
         }
         .myButton:active {
         position: relative;
         top: 1px;
         }
         #st {
         font-size: 1.6vw;
         text-align: center;
         }
         .gwd-div-lx9g div {
         margin: 0px;
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         -webkit-transform: translate(-50%, -50%);
         -moz-transform: translate(-50%, -50%);
         }
         .gwd-div-q9se div {
         margin: 0px;
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         -webkit-transform: translate(-50%, -50%);
         -moz-transform: translate(-50%, -50%);
         }
         .gwd-div-128i div {
         margin: 0px;
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         -webkit-transform: translate(-50%, -50%);
         -moz-transform: translate(-50%, -50%);
         }
         .gwd-div-lx9g {
         top: 40%;
         left: 31.5%;
         }
         .gwd-div-q9se {
         left: 33.09%;
         }
         .gwd-div-1t6f {
         left: 30.4%;
         }
         .gwd-div-128i {
         position: absolute;
         left: 74.6%;
         top: 81.37%;
         width: 22.1%;
         height: 14.56%;
         }
         .usernamespace {
         position: absolute;
         width: 20.45%;
         height: 15.3%;
         left: 3%;
         top: 6%;
         }
         .gwd-img-40t8 {
         top: 0%;
         left: 0%;  
         }
         .welcometext {
         font-family: "Trebuchet MS";
         font-size: 25px;
         color: #50bcd9;
         }
         .usernametext {
         font-size: 30px;
         font-family: Verdana;
         color: #50bcd9;
         }
      </style>
   </head>
   <%
      String session_username = (String)session.getAttribute("session_username");
      if (session_username == null) {
      	session_username = "";
      }
      %>
   <script>
      function Cancel() {
      	window.location.replace("http://localhost:8080/Pacman.io/User.jsp");
      }
      
      function PlayAlone() {
      	window.location.replace();
      }
      
      function StartGame(port){
    	  window.location.replace("http://localhost:8080/Pacman.io/gameWindow.jsp?portNum=" + port);
      }
      
      function JoinQueue(){
      	document.getElementById("status-text").innerHTML = "<h3 style=\"color: white;\">Waiting...</h3>";
      	document.getElementById("solo-button").innerHTML = "";
      	var xhttp = new XMLHttpRequest();
      	xhttp.open("POST", "SetMatchmaking", true);
      	xhttp.onreadystatechange = function(){
			if(this.readyState == XMLHttpRequest.DONE){
				console.log(xhttp.responseText);
				StartGame(xhttp.responseText);
			}
		}
      	xhttp.send();
      }
      
   </script>
   <body class="htmlNoPages">
      <img src="PacManBackGround.jpg" id="PacManBackGround" class="gwd-img-40t8">
      <div class="gwd-div-1t6f"></div>
      <div id="join-queue" class="gwd-div-q9se">
     	 <div id="status-text">
            <a href="#" class="myButton" onclick="JoinQueue();">
               <p id="st">JOIN QUEUE</p>
            </a>
         </div>
      </div>
      <div class="gwd-div-lx9g">
         <div id="solo-button">
            <a href="#" class="myButton" onclick="PlayAlone();">
               <p id="st">PLAY ALONE</p>
            </a>
         </div>
      </div>
      <div class="gwd-div-128i">
         <div>
            <a href="#" class="myButton" onclick="Cancel();">
               <p id="st" >CANCEL</p>
            </a>
         </div>
      </div>
      <div class="usernamespace">
         <p class="welcometext">Welcome</p>
         <br>
         <p class="usernametext"><%=session_username %></p>
      </div>
   </body>
</html>