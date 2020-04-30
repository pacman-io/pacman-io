<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
   pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
   <head>
      <meta name="GCD" content="YTk3ODQ3ZWZhN2I4NzZmMzBkNTEwYjJl9008695b9c227768a714a9027e2b5325"/>
      <link rel="shortcut icon" type="image/png" href="pacmanlogo.jpg">
      <%
      /*
  	 * Sets all the variables to be used later
  	 * */
         String type = (String)request.getAttribute("type");
         if (type == null) {
         	type = "";
         }
         
         String session_username = (String)session.getAttribute("session_username");
         if (session_username == null) {
         	session_username = "";
         }
         
         String login_username = (String)request.getAttribute("login_username");
         if (login_username == null) {
         	login_username = "";
         }	
         
         String signup_username = (String)request.getAttribute("signup_username");
         if (signup_username == null) {
         	signup_username = "";
         }	
         
         String confirm_password_error = (String)request.getAttribute("confirm_password_error");
         if (confirm_password_error == null) {
         	confirm_password_error = "";
         }
         else{
         	confirm_password_error = confirm_password_error.replace("%20", " ");			
         }
         
         String login_username_error = (String)request.getAttribute("login_username_error");
         if (login_username_error == null) {
         	login_username_error = "";
         }
         else{
         	login_username_error = login_username_error.replace("%20", " ");
         }
         
         String login_password_error = (String)request.getAttribute("login_password_error");
         if (login_password_error == null) {
         	login_password_error = "";
         }
         else{
         	login_password_error = login_password_error.replace("%20", " ");
         }
         
         String signup_username_error = (String)request.getAttribute("signup_username_error");
         if (signup_username_error == null) {
         	signup_username_error = "";
         }
         else{
         	signup_username_error = signup_username_error.replace("%20", " ");
         }
         
         String signup_password_error = (String)request.getAttribute("signup_password_error");
         if (signup_password_error == null) {
         	signup_password_error = "";
         }
         else{
         	signup_password_error = signup_password_error.replace("%20", " ");
         }
         %>
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
      </style>
      <meta charset="utf-8">
      <title>PacMan.IO</title>
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
         .gwd-img-w3v7 {
         position: absolute;
         top: 325px;
         left: 266px;
         width: 1645px;
         height: 534px;
         }
         .gwd-img-o354 {
         position: absolute;
         width: 100%;
         height: 100%;
         left: 0%;
         top: 0%;
         opacity: 0.9;
         }
         .gwd-img-1qxu {
         position: absolute;
         background-image: none;
         background-color: rgb(33, 21, 102);
         border-image-source: none;
         border-image-width: 1;
         border-image-outset: 0;
         border-image-repeat: stretch;
         border-color: rgb(83, 176, 225);
         border-style: solid;
         border-width: 2px;
         height: 62.26%;
         width: 20%;
         left: 65%;
         top: 6%;
         }
         .gwd-div-1x0d {
         position: absolute;
         border-style: solid;
         border-width: 0px;
         width: 20.47%;
         height: 36.89%;
         left: 64.84%;
         top: 18.12%;
         }
         .gwd-div-16qu {
         position: absolute;
         border-style: solid;
         border-width: 0px;
         left: 65%;
         top: 56.01%;
         width: 20.49%;
         height: 13.1%;
         }
         .gwd-span-v1b1 {
         position: absolute;
         text-align: right;
         transform-origin: 176.469px 165.25px 0px;
         -webkit-transform-origin: 176.469px 165.25px 0px;
         -moz-transform-origin: 176.469px 165.25px 0px;
         left: 17.83%;
         top: 6.4%;
         width: 43.1%;
         height: 70.79%;
         }
         .gwd-span-27d1 {
         color: rgb(194, 206, 214);
         font-size: 40px;
         font-family: Tahoma;
         }
         .gwd-span-t5ha {
         font-family: Verdana;
         }
         .gwd-span-173d {
         font-family: "Courier New";
         }
         .gwd-span-15zz {
         font-family: Verdana;
         }
         .gwd-span-dc1m {
         font-family: Verdana;
         }
         .gwd-span-1at5 {
         font-family: Verdana;
         }
         .gwd-span-2p9g {
         font-family: Verdana;
         }
         .gwd-span-18p5 {
         font-family: Verdana;
         }
         .gwd-span-1ji0 {
         font-family: Verdana;
         }
         .gwd-span-st9n {
         color: rgb(163, 176, 184);
         font-size: 50px;
         font-family: "Courier New";
         }
         .gwd-span-9rjq {
         font-family: Tahoma;
         color: rgb(232, 237, 240);
         }
         .gwd-span-1ufo {
         color: rgb(168, 201, 220);
         }
         .gwd-span-wfu0 {
         font-family: Verdana;
         color: rgb(181, 201, 213);
         }
         .gwd-span-1a6u {
         color: rgb(157, 185, 202);
         }
         .gwd-div-16qu div {
         width: 80%;
         margin: 0px;
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         -webkit-transform: translate(-50%, -50%);
         -moz-transform: translate(-50%, -50%);
         }
         .gwd-div-1ukw div {
         width: 80%;
         margin: 0px;
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         -webkit-transform: translate(-50%, -50%);
         -moz-transform: translate(-50%, -50%);
         }
         .gwd-div-50uy div {
         width: 80%;
         margin: 0px;
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         -webkit-transform: translate(-50%, -50%);
         -moz-transform: translate(-50%, -50%);
         }
         #st {
         font-size: 1.6vw;
         text-align: center;
         }
         #in {
         font-size: 1.3vw;
         text-align: center;
         display: inline-block;
         }
         .btn {
         text-decoration: none;
         color: rgb(51, 51, 51);
         font-size: 12px;
         font-weight: bold;
         padding: 0px 15px;
         line-height: 32px;
         height: auto;
         display: inline-block;
         text-align: center;
         background-color: rgb(221, 221, 221);
         }
         .btn.round {
         border-radius: 3px;
         }
         .gwd-span-141k {
         color: rgb(172, 190, 201);
         font-family: Verdana;
         }
         .gwd-span-15r4 {
         color: rgb(183, 201, 213);
         }
         .gwd-div-1ukw {
         position: absolute;
         left: 65%;
         top: 6%;
         height: 12.12%;
         width: 18%;
         }
         .gwd-div-50uy {
         position: absolute;
         left: 75.37%;
         top: 6%;
         width: 10.19%;
         height: 12.12%;
         }
         input[type="text"],
         select {
         width: 100%;
         padding: 12px 20px;
         margin: 8px 0px;
         display: inline-block;
         border: 1px solid rgb(204, 204, 204);
         border-radius: 4px;
         box-sizing: border-box;
         }
         input[type="password"],
         select {
         width: 100%;
         padding: 12px 20px;
         margin: 8px 0px;
         display: inline-block;
         border: 1px solid rgb(204, 204, 204);
         border-radius: 4px;
         box-sizing: border-box;
         }
         input[type="submit"] {
         width: 100%;
         background-color: rgb(221, 221, 221);
         color: black;
         padding: 14px 20px;
         margin: 8px 0px;
         border: none;
         border-radius: 4px;
         cursor: pointer;
         }
         input[type="submit"]:hover {
         background-color: rgb(69, 160, 73);
         }
         #formstuff {
         border-radius: 5px;
         padding: 20px;
         margin: 0px;
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         -webkit-transform: translate(-50%, -50%);
         -moz-transform: translate(-50%, -50%);
         }
         ::placeholder {
         color: red;
         opacity: 1;
         }
      </style>
   </head>
   <script>	
      <%
         String login = null;
         String signup = null;
         
         if(type.equals("sign_up") || type.equals("GUEST")){
			login = "display: none";
          	signup = "";
         	
         	%>
      			var is_login = false;
      		<%
         } else{
			login = "";
          	signup = "display: none";
         	%>
      			var is_login = true;
      		<%
         }
         %>
      
      function Login() {
      	if (!is_login){
      		document.getElementById("login_form").style = "";
      		document.getElementById("sign_up_form").style = "display: none";
      	}
      	is_login = true;
      }
      
      function SignUp() {
      	if (is_login){
      		document.getElementById("login_form").style = "display: none";
      		document.getElementById("sign_up_form").style = "";
      	}
      	is_login = false;
      }
      
      function PlayAsGuest() {
      	window.location.replace("https://cs201-pacman-io.herokuapp.com/TryLoginSignUp?type=play_as_guest");
      }
   </script>
   <body class="htmlNoPages">
      <img src="PacManBackGround.jpg" id="PacManBackGround" class="gwd-img-o354">
      <img class="gwd-img-1qxu">
      <div class="gwd-div-1x0d">
         <div id="login_form" style="<%=login%>">
            <form method="POST" style="height: 100%; width: 80%; object-fit: contain;" id="formstuff" action="TryLoginSignUp">
               <input type="hidden" id="type" name="type" value="login">
               <label style="color: white;" for="username">Username</label>
               <input type="text" id="fname" name="username" placeholder="<%=login_username_error %>" value="<%=login_username %>">
               <label style="color: white;" for="password">Password</label>
               <input type="password" id="lname" name="password" placeholder="<%=login_password_error %>" >
               <input type="submit" value="Login">
            </form>
         </div>
         <div id="sign_up_form" style="<%=signup%>">
            <form method="POST" style="height: 100%; width: 80%; object-fit: contain;" id="formstuff" action="TryLoginSignUp">
               <input type="hidden" id="type" name="type" value="sign_up">
               <label style="color: white;" for="username">Username</label>
               <input type="text" id="username" name="username" placeholder="<%=signup_username_error %>" value="<%=signup_username %>" >
               <label style="color: white;" for="password">Password (At least 6 characters long)</label>
               <input type="password" id="password" name="password" placeholder="<%=signup_password_error %>" >
               <label style="color: white;" for="confirm_password">Confirm Password</label>
               <input type="password" id="confirm_password" name="confirm_password" placeholder="<%=confirm_password_error %>" >
               <input type="submit" value="Sign Up">
            </form>
         </div>
      </div>
      <div class="gwd-div-16qu">
         <div>
            <a href="#" class="myButton" onclick="PlayAsGuest()">
               <p id="st">Play as Guest</p>
            </a>
            <form id="play_as_guest" action="TryLoginSignUp">
               <input type="hidden" id="type" name="type" value="play_as_guest">
            </form>
         </div>
      </div>
      <span class="gwd-span-v1b1"><span class="gwd-span-27d1">Welcome to </span><br>
      <span class="gwd-span-st9n">PacMan.IO</span><br>
      <br>
      <span class="gwd-span-15r4"><br><span class="gwd-span-141k">Created by:</span><br>
      <span class="gwd-span-dc1m">Terry Tang</span><br>
      <span class="gwd-span-1at5">Roddur Dasgupta</span><br>
      <span class="gwd-span-2p9g">Victor Udobong</span><br>
      <span class="gwd-span-18p5">Albert Yan</span><br>
      <span class="gwd-span-1ji0">Zach Blalock</span></span>
      </span>
      <div class="gwd-div-1ukw">
         <div>
            <a id="st" class="btn round" href="#" onclick="Login();">
               <p id="in">LOGIN</p>
            </a>
         </div>
      </div>
      <div class="gwd-div-50uy">
         <div>
            <a id="st" class="btn round" href="#" onclick="SignUp();">
               <p id="in">SIGN UP</p>
            </a>
         </div>
      </div>
   </body>
</html>