package main;

public class StatWrapper {
	public String wins;
	public String losses;
	public String games_played;
	public String kills;
	public String deaths;
	public String kill_death_ratio;
	
	public String response_message;
	
	public StatWrapper (String wins, String losses, String games_played, String kills, String deaths,
			String kill_death_ratio, String response_message){
		this.wins = wins;
		this.losses = losses;
		this.games_played = games_played;
		this.kills = kills;
		this.deaths = deaths;
		this.kill_death_ratio = kill_death_ratio;
	}
}
