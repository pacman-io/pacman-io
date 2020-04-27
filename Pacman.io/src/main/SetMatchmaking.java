package main;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.PrintWriter;
import java.net.Socket;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/SetMatchmaking")
public class SetMatchmaking extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private ObjectInputStream ois;
	private ObjectOutputStream oos;
    
	public SetMatchmaking() {
        super();
    }
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		Socket s = new Socket("localhost", 9200);
		oos = new ObjectOutputStream(s.getOutputStream());
		System.out.println("new connection");
		ois = new ObjectInputStream(s.getInputStream());
		Message update = null;
			try {
			while(update == null) {
				update = (Message)ois.readObject();
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		PrintWriter out = response.getWriter();
		String p = update.text;
		out.println(p);
		out.flush();
		out.close();
	}

}
