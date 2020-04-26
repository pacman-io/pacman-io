package main;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/TryLoginSignUp")
public class TryLoginSignUp extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public TryLoginSignUp() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String next_page = "/User.jsp";
		boolean error = false;
		boolean null_fields = false;
		
		HttpSession session = request.getSession();
		String dbm_response = null;
		
		String type = request.getParameter("type");
		
		if(type == null || type.equalsIgnoreCase("") || type.equalsIgnoreCase("NO_SESSION")) {
			type = "play_as_guest";
		}
		
		request.setAttribute("type", type);
		
		if(type.equalsIgnoreCase("login")) {
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			
			if(username == null || username.equalsIgnoreCase("")) {
				request.setAttribute("login_username_error", "Please fill in this field".replace(" ", "%20"));
				null_fields = true;
				Util.printMessage("Empty login username");
			}
			
			if(password == null || password.equalsIgnoreCase("")) {
				request.setAttribute("login_password_error", "Please fill in this field".replace(" ", "%20"));
				null_fields = true;
				Util.printMessage("Empty login password");
			}
			
			if(!null_fields) {
				dbm_response = DatabaseMutator.tryLogin(username, password);
				
				if(dbm_response.equalsIgnoreCase("FAILED: NO_MATCHING_ACCOUNT")) {
					request.setAttribute("login_username", username);
					request.setAttribute("login_username_error", "No matching account for this username".replace(" ", "%20"));
					error = true;
					Util.printMessage("Login username does not exist");
				}
				else if(dbm_response.equalsIgnoreCase("FAILED: INCORRECT_PASSWORD")) {
					request.setAttribute("login_username", username);
					request.setAttribute("login_password_error", "Incorrect password".replace(" ", "%20"));
					error = true;
					Util.printMessage("Incorrect login password");
				}
				else if(dbm_response.equalsIgnoreCase("FAILED: SQL_ERROR")) {
					error = true;
					Util.printMessage("Login SQL error");
				}
				else if(dbm_response.equalsIgnoreCase("SUCCESS")) {
					session.setAttribute("session_username", username);
					Util.printMessage("Login success");
				}
			}
			
		}
		else if(type.equalsIgnoreCase("sign_up")) {
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			String confirm_password = request.getParameter("confirm_password");		
			
			if(username == null || username.equalsIgnoreCase("")) {
				request.setAttribute("signup_username_error", "Please fill in this field".replace(" ", "%20"));
				null_fields = true;
				Util.printMessage("Empty signup username");
			}
			
			if(password == null || password.equalsIgnoreCase("")) {
				request.setAttribute("signup_password_error", "Please fill in this field".replace(" ", "%20"));
				null_fields = true;
				Util.printMessage("Empty signup password");
			}
			
			if(confirm_password == null || confirm_password.equalsIgnoreCase("")) {
				request.setAttribute("confirm_password_error", "Please fill in this field".replace(" ", "%20"));
				null_fields = true;
				Util.printMessage("Empty signup confirm password");
			}
			
			if(!null_fields) {
				
				
				if(!password.equalsIgnoreCase(confirm_password)) {
					request.setAttribute("signup_username", username);
					request.setAttribute("confirm_password_error", "Passwords do not match".replace(" ", "%20"));
					error = true;
					Util.printMessage("Sign up passwords do not match");
				}
				else {
					dbm_response = DatabaseMutator.tryAddUser(username, password);
					
					if(dbm_response.equalsIgnoreCase("FAILED: ACCOUNT_EXISTS")) {
						request.setAttribute("signup_username_error", "This username is taken".replace(" ", "%20"));
						error = true;
						Util.printMessage("Signup username is taken");
					}
					else if(dbm_response.equalsIgnoreCase("FAILED: SQL_ERROR")) {
						error = true;
						Util.printMessage("Signup SQL Error");
					}
					else if(dbm_response.equalsIgnoreCase("SUCCESS")) {
						session.setAttribute("session_username", username);
						Util.printMessage("Signup success");
					}
				}
			}
			
		}
		else if(type.equalsIgnoreCase("play_as_guest")){
			String guest_name = null;
			
			do {
				guest_name = "guest_" + GuestNameGenerator.getAlphaNumericString();
			}
			while(!DatabaseMutator.tryAddUser(guest_name, "**GUEST_PASSWORD**").equalsIgnoreCase("SUCCESS"));
			
			
			session.setAttribute("session_username", guest_name);
			Util.printMessage("Playing as guest");
		}
		
		if(error || null_fields) {
			next_page = "/Landing.jsp";
			
			RequestDispatcher dispatch = getServletContext().getRequestDispatcher(next_page);
			dispatch.forward(request, response);
		}
		else {
			response.sendRedirect("User.jsp");
		}

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
