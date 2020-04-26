package main;

import java.io.Serializable;

@SuppressWarnings("serial")
public class Message implements Serializable{
	public String text;
	
	public Message(String text) {
		this.text = text;
	}
}
