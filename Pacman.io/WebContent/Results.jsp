<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
   pageEncoding="ISO-8859-1"%>
<%@ page import="main.DatabaseMutator" %>
<%@ page import="main.StatWrapper" %>
<%@ page import="main.Util" %>
<!DOCTYPE html>
<html>
   <head>
      <meta name="GCD" content="YTk3ODQ3ZWZhN2I4NzZmMzBkNTEwYjJl4aa50a2bf503158e7d22a80da45de696"/>
      <meta charset="utf-8">
      <link rel="shortcut icon" type="image/png" href="pacmanlogo.jpg">
      <title>PacMan.IO | Results</title>
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
         }
         .gwd-img-a9v2 {
         position: absolute;
         left: 0%;
         top: 0%;
         width: 100%;
         height: 100%;
         }
         .gwd-div-hp70 {
         position: absolute;
         border-style: solid;
         border-width: 1pt;
         border-image-source: none;
         border-image-width: 1;
         border-image-outset: 0;
         border-image-repeat: stretch;
         border-color: rgb(165, 180, 209);
         left: 38.1%;
         top: 6%;
         width: 51.77%;
         height: 60.81%;
         }
         .gwd-div-hp70 div{
         margin: 0;
         position: absolute;
         top: 50%;
         left: 50%;
         -ms-transform: translate(-50%, -50%);
         transform: translate(-50%, -50%);
         }
         .gwd-p-1dfe {
         position: absolute;
         left: 40.54%;
         top: 10.92%;
         width: 46.89%;
         height: 51.61%;
         }
         .gwd-div-1ww4 {
         position: absolute;
         width: 223px;
         height: 67px;
         left: 42px;
         top: 30px;
         }
         .gwd-div-uttu {
         width: 27.23%;
         height: 14.35%;
         left: 5%;
         top: 26%;
         }
         .gwd-div-p99j {
         left: 5.13%;
         top: 6.42%;
         width: 27.23%;
         height: 14.35%;
         }
         .gwd-div-1ww4 .gwd-div-p99j div {
         margin: 0px;
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         -webkit-transform: translate(-50%, -50%);
         -moz-transform: translate(-50%, -50%);
         }
         .gwd-div-1ww4 .gwd-div-uttu div {
         margin: 0px;
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         -webkit-transform: translate(-50%, -50%);
         -moz-transform: translate(-50%, -50%);
         }
         .usernamespace {
         position: absolute;
         width: 20.45%;
         height: 15.3%;
         left: 70%;
         top: 83%;
         }
         .welcometext {
         font-family: "Trebuchet MS";
         font-size: 25px;
         color: #50bcd9;
         align: right;
         }
         .usernametext {
         font-size: 30px;
         font-family: Verdana;
         color: #50bcd9;
         float: right;
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
      </style>
   </head>
   <%
      String session_username = (String)session.getAttribute("session_username");
      if (session_username == null) {
      	session_username = "";
      }
      
      String wins = "null";
      String losses = "null";
      String games_played = "null";
      String kills = "null";
      String deaths = "null";
      String kill_death_ratio = "null";
      String score = "null";
      String high_score = "null";
      
      StatWrapper stats = DatabaseMutator.tryGetStats(session_username);
      
      if(stats.response_message != null){
      	if(stats.response_message.equalsIgnoreCase("SUCCESS")){
      		if(stats.wins != null){
      			wins = stats.wins;
      		}
      		if(stats.losses != null){
      			losses = stats.losses;
      		}
      		if(stats.games_played != null){
      			games_played = stats.games_played;
      		}
      		if(stats.kills != null){
      			kills = stats.kills;
      		}
      		if(stats.deaths != null){
      			deaths = stats.deaths;
      		}
      		if(stats.kill_death_ratio != null){
      			kill_death_ratio = stats.kill_death_ratio;
      		}
      		if(stats.score != null){
      			score = stats.score;
      		}
      		if(stats.high_score != null){
      			high_score = stats.high_score;
      		}
      		Util.printMessage("Stats fetched for " + session_username);
      	}
      	else if(stats.response_message.equalsIgnoreCase("FAILED:NO_MATCHING_RECORD")){
      		Util.printMessage("No matching record for " + session_username);
      	}
      	else if(stats.response_message.equalsIgnoreCase("FAILED: SQL_ERROR")){
      		Util.printMessage("SQL error in fetching results for " + session_username);
      	}
      }
      %>
   <script>
      function SignOut() {
      	window.location.replace("https://cs201-pacman-io.herokuapp.com/SignOut");
      }
      
      function PlayAgain() {
      	window.location.replace("https://cs201-pacman-io.herokuapp.com/Matchmaking.jsp");
      }
   </script>
   <body class="htmlNoPages">
      <img src="PacManBackGround.jpg" id="PacManBackGround" class="gwd-img-a9v2">
      <div class="gwd-div-hp70">
         <div  style="text-align: center;">&nbsp; </div>
         <table style="font-family: Verdana;">
            <tbody>
               <tr style="height: 20px;">
                  <td style="width: 513px; height: 20px; text-align: center;" colspan="2">&nbsp;</td>
               </tr>
               <tr style="height: 20px;">
                  <td style="width: 513px; height: 20px; text-align: center;" colspan="2">&nbsp;</td>
               </tr>
               <tr style="height: 20px;">
                  <td style="width: 513px; height: 20px; text-align: center;" colspan="2">&nbsp;</td>
               </tr>
               <tr style="height: 20px;">
                  <td style="width: 513px; height: 20px; text-align: center;" colspan="2"><strong><span style="color: #00ccff;">Here are your game statistics!</span></strong></td>
               </tr>
               <tr style="height: 20px;">
                  <td style="width: 513px; height: 20px; text-align: center;" colspan="2"><strong><span style="color: #00ccff;">&nbsp;</span></strong></td>
               </tr>
               <tr style="height: 20px;">
                  <td style="width: 513px; height: 20px; text-align: center;" colspan="2"><strong><span style="color: #00ccff;">&nbsp;</span></strong></td>
               </tr>
               <tr style="height: 20px;">
                  <td style="width: 212.4px; height: 20px; text-align: right;"><strong><span style="color: #00ccff;">GAMES PLAYED</span></strong></td>
                  <td style="width: 300.6px; height: 20px; text-align: center;"><strong><span style="color: #00ccff;">&nbsp;<%=games_played %></span></strong></td>
               </tr>
               <tr style="height: 20px;">
                  <td style="width: 212.4px; height: 20px; text-align: center;"><strong><span style="color: #00ccff;">&nbsp;</span></strong></td>
                  <td style="width: 300.6px; height: 20px; text-align: center;"><strong><span style="color: #00ccff;">&nbsp;</span></strong></td>
               </tr>
               <tr style="height: 20.8px;">
                  <td style="width: 212.4px; height: 20.8px; text-align: right;"><strong><span style="color: #00ccff;">WINS</span></strong></td>
                  <td style="width: 300.6px; height: 20.8px; text-align: center;"><strong><span style="color: #00ccff;">&nbsp;<%=wins %></span></strong></td>
               </tr>
               <tr style="height: 20px;">
                  <td style="width: 212.4px; height: 20px;"><strong><span style="color: #00ccff;">&nbsp;</span></strong></td>
                  <td style="width: 300.6px; height: 20px; text-align: center;"><strong><span style="color: #00ccff;">&nbsp;</span></strong></td>
               </tr>
               <tr style="height: 20px;">
                  <td style="width: 212.4px; height: 20px; text-align: right;"><strong><span style="color: #00ccff;">&nbsp;LOSSES&nbsp;</span></strong></td>
                  <td style="width: 300.6px; height: 20px; text-align: center;"><strong><span style="color: #00ccff;">&nbsp;<%=losses %></span></strong></td>
               </tr>
               <tr style="height: 20px;">
                  <td style="width: 212.4px; height: 20px;"><strong><span style="color: #00ccff;">&nbsp;</span></strong></td>
                  <td style="width: 300.6px; height: 20px; text-align: center;"><strong><span style="color: #00ccff;">&nbsp;</span></strong></td>
               </tr>
               <tr style="height: 20px;">
                  <td style="width: 212.4px; height: 20px; text-align: right;"><strong><span style="color: #00ccff;">&nbsp;KILLS</span></strong></td>
                  <td style="width: 300.6px; height: 20px; text-align: center;"><strong><span style="color: #00ccff;">&nbsp;<%=kills %></span></strong></td>
               </tr>
               <tr style="height: 20px;">
                  <td style="width: 212.4px; height: 20px;"><strong><span style="color: #00ccff;">&nbsp;</span></strong></td>
                  <td style="width: 300.6px; height: 20px; text-align: center;"><strong><span style="color: #00ccff;">&nbsp;</span></strong></td>
               </tr>
               <tr style="height: 20px;">
                  <td style="width: 212.4px; height: 20px; text-align: right;"><strong><span style="color: #00ccff;">&nbsp;DEATHS</span></strong></td>
                  <td style="width: 300.6px; height: 20px; text-align: center;"><strong><span style="color: #00ccff;">&nbsp;<%=deaths %></span></strong></td>
               </tr>
               <tr style="height: 20px;">
                  <td style="width: 212.4px; height: 20px;"><strong><span style="color: #00ccff;">&nbsp;</span></strong></td>
                  <td style="width: 300.6px; height: 20px;"><strong><span style="color: #00ccff;">&nbsp;</span></strong></td>
               </tr>
               <tr style="height: 20px;">
                  <td style="width: 212.4px; height: 20px; text-align: right;"><strong><span style="color: #00ccff;">&nbsp;KILLS/DEATHS RATIO</span></strong></td>
                  <td style="width: 300.6px; height: 20px; text-align: center;"><strong><span style="color: #00ccff;">&nbsp;<%=kill_death_ratio %></span></strong></td>
               </tr>
               <tr style="height: 20px;">
                  <td style="width: 212.4px; height: 20px;"><strong><span style="color: #00ccff;">&nbsp;</span></strong></td>
                  <td style="width: 300.6px; height: 20px;"><strong><span style="color: #00ccff;">&nbsp;</span></strong></td>
               </tr>
               <tr style="height: 20px;">
                  <td style="width: 212.4px; height: 20px; text-align: right;"><strong><span style="color: #00ccff;">&nbsp;SCORE</span></strong></td>
                  <td style="width: 300.6px; height: 20px; text-align: center;"><strong><span style="color: #00ccff;">&nbsp;<%=score %></span></strong></td>
               </tr>
               <tr style="height: 20px;">
                  <td style="width: 212.4px; height: 20px;"><strong><span style="color: #00ccff;">&nbsp;</span></strong></td>
                  <td style="width: 300.6px; height: 20px;"><strong><span style="color: #00ccff;">&nbsp;</span></strong></td>
               </tr>
               <tr style="height: 20px;">
                  <td style="width: 212.4px; height: 20px; text-align: right;"><strong><span style="color: #00ccff;">&nbsp;HIGH SCORE</span></strong></td>
                  <td style="width: 300.6px; height: 20px; text-align: center;"><strong><span style="color: #00ccff;">&nbsp;<%=high_score %></span></strong></td>
               </tr>
            </tbody>
         </table>
      </div>
      <div class="gwd-div-1ww4 gwd-div-p99j">
         <div>
            <a href="#" class="myButton" onclick="PlayAgain();">
               <p id="st">PLAY AGAIN</p>
            </a>
         </div>
      </div>
      <div class="gwd-div-1ww4 gwd-div-uttu">
         <div>
            <a href="#" class="myButton" onclick="SignOut();">
               <p id="st">SIGN OUT</p>
            </a>
         </div>
      </div>
      <div class="usernamespace">
         <p class="welcometext">Hello Player</p>
         <br>
         <p class="usernametext"><%=session_username %></p>
      </div>
   </body>
</html>