package main;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;

public class DatabaseMutator {
	private static String DB_URL = "jdbc:mysql://pacman-io-v1.ce3zlv348xfo.us-west-2.rds.amazonaws.com"
			+ "/PacMan_GreenLight?user=admin&password=greenlight201";
	public DatabaseMutator() {
	}
	
	/*
	 * Attempts to add user to MySQL Database
	 * Returns "FAILED: ACCOUNT_EXISTS" if an account already exists
	 * Returns "FAILED: SQL_ERROR" if there is an internal sql error
	 * Returns "SUCCESS" if there is no error
	 * */
	public static String tryAddUser(String username, String password) {
		
		Connection conn = null;
		Statement st = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
			
			conn = DriverManager.getConnection(DB_URL);
			
			st = conn.createStatement();
			rs = st.executeQuery("SELECT * from Users where userName='" + username +"'");
			
			if(rs.next() != false) {
				return "FAILED: ACCOUNT_EXISTS";
			}
			else {
				PreparedStatement insert_statement = conn.prepareStatement("INSERT INTO Users "
						+ "(userName, hashPass, timeOfSignUp) VALUES (?, ?, ?)");
				
				insert_statement.setString(1, username);
				insert_statement.setString(2, password);
				insert_statement.setTimestamp(3,  new Timestamp(System.currentTimeMillis()));
				
				insert_statement.executeUpdate();
			}
			
		} catch (SQLException sqle) {
			System.out.println("sqle: " + sqle.getMessage());
			return "FAILED: SQL_ERROR";
		}
		 catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (st != null) {
					st.close();
				}
				if (ps != null) {
					ps.close();
				}
				if (conn != null) {
					conn.close();
				}
			} catch (SQLException sqle) {
				System.out.println("sqle: " + sqle.getMessage());
			}
		}
		return "SUCCESS";
	}
	
	/*
	 * Attempts to login user to MySQL Database
	 * Returns "FAILED: NO_MATCHING_ACCOUNT" if no matching account exists
	 * Returns "FAILED: SQL_ERROR" if there is an internal sql error
	 *  Returns "FAILED: INCORRECT_PASSWORD" if the username is correct, but password is wrong
	 * Returns "SUCCESS" if there is no error
	 * */
	public static String tryLogin(String username, String password) {
		Connection conn = null;
		Statement st = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		try {
			try {
				Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
			} catch (InstantiationException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
			
			conn = DriverManager.getConnection(DB_URL);
			
			st = conn.createStatement();
			rs = st.executeQuery("SELECT * from Users where userName='" + username + "'");
			
			if(rs.next() == false) {
				return "FAILED: NO_MATCHING_ACCOUNT";
			}
			else {
				String response_password = rs.getString("hashPass");
				
				if(!response_password.equals(password)) {
					return "FAILED: INCORRECT_PASSWORD";
				}
				else {
					return "SUCCESS";
				}
			}
			
		} catch (SQLException sqle) {
			System.out.println("sqle: " + sqle.getMessage());
		}
		finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (st != null) {
					st.close();
				}
				if (ps != null) {
					ps.close();
				}
				if (conn != null) {
					conn.close();
				}
			} catch (SQLException sqle) {
				System.out.println("sqle: " + sqle.getMessage());
			}
		}
		return "SUCCESS";
	}
	
	/*
	 * Attempts to add results to MySQL Database
	 * Returns "FAILED: NO_MATCHING_ACCOUNT" if there is no matching account for user
	 * Returns "FAILED: SQL_ERROR" if there is an internal sql error
	 * Returns "SUCCESS" if there is no error
	 * */
	public static String tryAddResults(String username, String win_or_loss, Integer kills, Integer deaths, Integer score) {
		Connection conn = null;
		
		Statement st = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		ResultSet rs2 = null;
		
		Integer win = null;
		Integer loss = null;
		
		if(win_or_loss.equalsIgnoreCase("WIN")) {
			win = 1;
			loss = 0;
		}
		else if (win_or_loss.equalsIgnoreCase("LOSS")) {
			win = 0;
			loss = 1;
		}
		
		try {
			try {
				Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
			} catch (InstantiationException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
			
			conn = DriverManager.getConnection(DB_URL);
			
			st = conn.createStatement();
			rs = st.executeQuery("SELECT * from PlayerStats where userName='" + username + "'");
			
			Integer current_wins = null;
			Integer current_losses = null;
			Integer current_kills = null;
			Integer current_deaths = null;
			Integer high_score = null;
			
			if(rs.next()) {
				current_wins = rs.getInt("wins");
				current_losses = rs.getInt("losses");
				current_kills = rs.getInt("kills");
				current_deaths = rs.getInt("deaths");
				high_score = rs.getInt("highScore");
				rs.close();
				
				PreparedStatement update_statement = conn.prepareStatement("UPDATE PlayerStats "
						+ "Set wins = ?, losses = ?, kills = ?, deaths = ?, score = ?, highScore = ? Where userName = ?;");
				
				update_statement.setString(7, username);
				update_statement.setInt(1, current_wins + win);
				update_statement.setInt(2, current_losses + loss);
				update_statement.setInt(3, current_kills + kills);
				update_statement.setInt(4, current_deaths + deaths);
				update_statement.setInt(5, score);
				
				if(high_score == null) {
					update_statement.setInt(6, 0);
				}
				else if(high_score < score) {
					update_statement.setInt(6, score);
				}
				else {
					update_statement.setInt(6,  high_score);
				}
				
				update_statement.executeUpdate();
			}
			else {
				rs.close();
				PreparedStatement insert_statement = conn.prepareStatement("INSERT INTO PlayerStats "
						+ "(userName, wins, losses, kills, deaths, score, highScore) VALUES (?, ?, ?, ?, ?, ?, ?)");
				insert_statement.setString(1, username);
				insert_statement.setInt(2, win);
				insert_statement.setInt(3, loss);
				insert_statement.setInt(4, kills);
				insert_statement.setInt(5, deaths);
				insert_statement.setInt(6, score);
				insert_statement.setInt(7, score);
				insert_statement.executeUpdate();
			}
			
		} catch (SQLException sqle) {
			System.out.println("sqle: " + sqle.getMessage());
			sqle.printStackTrace();
			return "FAILED: SQL_ERROR";
		}
		finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (st != null) {
					st.close();
				}
				if (ps != null) {
					ps.close();
				}
				if (conn != null) {
					conn.close();
				}
			} catch (SQLException sqle) {
				System.out.println("sqle: " + sqle.getMessage());
			}
		}
		
		return "SUCCESS";
	}
	
	/*
	 * Attempts to get statistics from MySQL Database
	 * Returns "FAILED:NO_MATCHING_RECORD" if there is no matching account
	 * Returns "FAILED: SQL_ERROR" if there is an internal SQL error
	 * Returns "SUCCESS" if there are no errors
	 * */
	public static StatWrapper tryGetStats(String username) {
		Connection conn = null;
		Statement st = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		StatWrapper sw = null;
		
		try {
			try {
				Class.forName("com.mysql.cj.jdbc.Driver").newInstance();
			} catch (InstantiationException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
			
			conn = DriverManager.getConnection(DB_URL);
			
			st = conn.createStatement();
			rs = st.executeQuery("SELECT * from PlayerStats where userName='" + username + "'");
			
			String wins = null;
			String losses = null;
			String games_played = null;
			String kills = null;
			String deaths = null;
			String kill_death_ratio = null;
			String score = null;
			String high_score = null;
			
			if(rs.next() == false) {
				sw =  new StatWrapper(null, null, null, null, null, 
						null, null, null, "FAILED: NO_MATCHING_RECORD");
			}
			else {
				wins = Integer.toString(rs.getInt("wins"));
				losses = Integer.toString(rs.getInt("losses"));
				games_played = Integer.toString(rs.getInt("gamesPlayed"));
				kills = Integer.toString(rs.getInt("kills"));
				deaths = Integer.toString(rs.getInt("deaths"));
				kill_death_ratio = Float.toString(rs.getFloat("killDeathRatio"));
				score = Integer.toString(rs.getInt("score"));
				high_score = Integer.toString(rs.getInt("highScore"));
				
				sw = new StatWrapper(wins, losses, games_played, kills, deaths, 
						kill_death_ratio, score, high_score, "SUCCESS");
			}
			
		} catch (SQLException sqle) {
			System.out.println("sqle: " + sqle.getMessage());
			sqle.printStackTrace();
			sw = new StatWrapper(null, null, null, null, null, 
					null, null, null, "FAILED: SQL_ERROR");
		}
		finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (st != null) {
					st.close();
				}
				if (ps != null) {
					ps.close();
				}
				if (conn != null) {
					conn.close();
				}
			} catch (SQLException sqle) {
				System.out.println("sqle: " + sqle.getMessage());
			}
		}
		
		return sw;
	}
	
}

