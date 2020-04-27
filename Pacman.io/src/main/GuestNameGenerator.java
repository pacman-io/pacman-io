package main;

//code adapted from https://www.geeksforgeeks.org/generate-random-string-of-given-size-in-java/
public class GuestNameGenerator {
	
	/*
	 * Generates and returms a random 6 character string for guest users
	 * */
	public static String getAlphaNumericString() 
	{ 

		String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
									+ "abcdefghijklmnopqrstuvxyz"; 

		StringBuilder sb = new StringBuilder(6); 

		for (int i = 0; i < 6; i++) { 
			int index = (int)(AlphaNumericString.length() * Math.random()); 
			sb.append(AlphaNumericString.charAt(index)); 
		} 
		
		return sb.toString(); 
	}
} 
