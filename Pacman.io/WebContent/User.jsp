<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<!DOCTYPE html>
<html>

<%
	String session_username = (String)session.getAttribute("session_username");
	if (session_username == null) {
		session_username = "";
	}
%>

<script>
	function Stats() {
		window.location.replace("http://localhost:8080/Pacman.io/Results.jsp");
	}
	
	function SignOut() {
		window.location.replace("http://localhost:8080/Pacman.io/SignOut");
	}
	
	function Play() {
		window.location.replace("http://localhost:8080/Pacman.io/Matchmaking.jsp");
	}
</script>

<link rel="shortcut icon" type="image/png" href="pacmanlogo.jpg">
<head>
  <meta charset="utf-8">
  <title><%=session_username %> | PacMan.IO</title>
  <meta name="generator" content="Google Web Designer 8.0.1.0401">
  <style type="text/css" id="gwd-text-style">
    p {
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
  <style type="text/css">
    html, body {
      width: 100%;
      height: 100%;
      margin: 0px;
    }
    body {
      background-color: transparent;
      transform: perspective(1400px) matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      transform-style: preserve-3d;
    }
    .gwd-img-39wg {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0%;
      top: 0%;
    }
    .gwd-div-128i {
      position: absolute;
      width: 22.1%;
      height: 14.56%;
      left: 47%;
      top: 44%;
    }
    .gwd-div-128i div {
      margin: 0px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .myButton {
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
    .gwd-div-128i .gwd-div-1n0w {
      transform: matrix(1, 0, 0, 1, -72.5333, -20.2667);
    }
    .gwd-p-flrv {
      font-size: 13.2352px;
      text-align: center;
    }
    .gwd-div-3nil {
      top: 42.76%;
      left: 42.88%;
    }
    .gwd-div-1nbd {
      top: 42.76%;
      left: 27.44%;
    }
    .gwd-p-npvv {
      position: absolute;
      font-family: Tahoma;
      color: rgb(85, 163, 187);
      font-size: 80px;
      top: 9.02%;
      width: 57.69%;
      height: 27.87%;
      text-align: center;
      left: 21.2%;
    }
    .gwd-div-m3ps {
      left: 75%;
      top: 81%;
    }
    .gwd-div-1h80 {
      left: 50.48%;
    }
    .gwd-div-jaig {
      left: 50%;
      top: 43%;
    }
    .gwd-div-bfwy {
      left: 74%;
      top: 82%;
    }
  </style>
</head>

<body class="htmlNoPages">
  <img src="PacManBackGround.jpg" id="PacManBackGround" class="gwd-img-39wg">
  <div class="gwd-div-128i gwd-div-1nbd">
    <div class="">
      <a href="#" class="myButton" onclick="Stats();">
        <p class="" id="st">STATS</p>
      </a>
    </div>
  </div>
  <div class="gwd-div-128i gwd-div-1nbd gwd-div-bfwy">
    <div class="">
      <a href="#" class="myButton" onclick="SignOut();">
        <p class="" id="st">SIGN OUT</p>
      </a>
    </div>
  </div>
  <div class="gwd-div-128i gwd-div-1nbd gwd-div-jaig">
    <div class="">
      <a href="#" class="myButton" onclick="Play();">
        <p class="" id="st">PLAY</p>
      </a>
    </div>
  </div>
  <p class="gwd-p-npvv">Welcome User<br>
     <%=session_username %>
  </p>
</body>

</html>