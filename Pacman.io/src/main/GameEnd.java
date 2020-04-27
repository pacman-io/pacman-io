package main;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/GameEnd")
public class GameEnd extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public GameEnd() {
        super();
    }

    /*
	 * This is the end of the game
	 * It calls the function to add records to the stats database page
	 * It also redirects to the Results page after this
	 * It prints error messages to the console should errors occur
	 * */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		String username = (String)session.getAttribute("session_username");
		
		String win_or_loss = request.getParameter("result");
		Integer kills = Integer.parseInt(request.getParameter("kills"));
		Integer deaths = Integer.parseInt(request.getParameter("deaths"));
		Integer score = Integer.parseInt(request.getParameter("score"));
		
		String result_response = DatabaseMutator.tryAddResults(username, win_or_loss, kills, deaths, score);
		
		if (result_response.equalsIgnoreCase("FAILED: NO_MATCHING_ACCOUNT")) {
			Util.printMessage("Result Update failed for " + username);
		}
		else if (result_response.equalsIgnoreCase("FAILED: SQL_ERROR")) {
			Util.printMessage("Result Update for " + username + "failed: SQL Error");
		}
		else if (result_response.equalsIgnoreCase("SUCCESS")) {
			Util.printMessage("Result update for " + username + " SUCCESSFUL");
		}
		
		response.sendRedirect("http://localhost:8080/Pacman.io/Results.jsp");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
