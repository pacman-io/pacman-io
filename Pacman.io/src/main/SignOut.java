package main;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/SignOut")
public class SignOut extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public SignOut() {
        super();
    }
    
    /*
	 * Signs User out of  the website
	 * Redirects to Landing/Login page
	 * */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		
		Util.printMessage("User " + session.getAttribute("session_username") + " signed out");
		
		session.setAttribute("session_username", "NO_SESSION");
		session.setAttribute("type", "NO_SESSION");
		response.sendRedirect("http://localhost:8080/Pacman.io/Landing.jsp");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
