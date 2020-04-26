package main;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(
		description = "Redirects client to homepage or login", 
		urlPatterns = { 
				"/Home", 
				"/"
		})
public class Home extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public Home() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String session_username = (String)request.getSession().getAttribute("session_username");
		String next_page = "";
		
		if(session_username == null || session_username.equalsIgnoreCase("GUEST") 
				|| session_username.equalsIgnoreCase("")) {
			next_page = "http://localhost:8080/Pacman.io/Landing.jsp";
		}
		else {
			next_page = "http://localhost:8080/Pacman.io/User.jsp";
		}
		
		response.sendRedirect(next_page);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
