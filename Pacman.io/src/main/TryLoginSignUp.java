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
    
    /*
	 * Facilitates login and signup for the website
	 * Receives forms as POST requests from the Landing page
	 * Handles three types of form submissions: login, sign_up, play_as_guest
	 * */
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
		
		/*
		 * type == login
		 * Checks for empty fields
		 * Checks if login username exists
		 * 
		 * Handles errors and prints to console
		 * Uses DatabaseMutator class to send request to database and validate login
		 * Sets session username to logged in username
		 * */
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
		
		/*
		 * type == sign_up
		 * Checks for empty fields
		 * Checks for matching password and confirm password fields
		 * Checks if password is too short (less than 5 characters)
		 * 
		 * Checks via DatabaseMutator if username is taken
		 * Sets session username to signed up username
		 * */
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
					if(password.length() < 6) {
						request.setAttribute("signup_username", username);
						request.setAttribute("signup_password_error", "Password is too short".replace(" ", "%20"));
						error = true;
						Util.printMessage("Password is too short");
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
			
		}
		
		/*
		 * Generates a random username for the guest
		 * Sets the guest password as a fixed string "**GUEST_PASSWORD**"
		 * Sets session username to random guest username
		 * */
		else if(type.equalsIgnoreCase("play_as_guest")){
			String guest_name = null;
			
			do {
				guest_name = "guest_" + GuestNameGenerator.getAlphaNumericString();
			}
			while(!DatabaseMutator.tryAddUser(guest_name, "**GUEST_PASSWORD**").equalsIgnoreCase("SUCCESS"));
			
			
			session.setAttribute("session_username", guest_name);
			Util.printMessage("Playing as guest");
		}
		
		/*
		 * Redirects user to Login/Landing page if there are errors in either form
		 * Error based redirects are sent on the same entry form
		 * 
		 * Successful attempts are redirected to the User page
		 * */
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
