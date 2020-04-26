package main;

import java.util.Calendar;

public class Util {
	
	public static Calendar start_cal;
	public static Calendar current_time;
	
	public static void printMessage(String message) {
		Calendar cal = Calendar.getInstance();
		String datetime = "[";
		datetime += cal.get(Calendar.HOUR_OF_DAY);
		
		int m = cal.get(Calendar.MINUTE);
		datetime += ":";
		if(m < 10) {
			datetime += "0" + cal.get(Calendar.MINUTE);
		}
		else {
			datetime += cal.get(Calendar.MINUTE);
		}
		
		int s = cal.get(Calendar.SECOND);
		datetime += ":";
		if(s < 10) {
			datetime += "0" + cal.get(Calendar.SECOND);
		}
		else {
			datetime += cal.get(Calendar.SECOND);
		}
		
		int ms = cal.get(Calendar.MILLISECOND);
		datetime += ".";
		if(ms < 10) {
			datetime += "00";
		}
		else if(ms < 100) {
			datetime += "0";
		}
		datetime += cal.get(Calendar.MILLISECOND);
		System.out.println(datetime + "] " + message);
	}
}