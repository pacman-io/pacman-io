package main;

/*
 * Class to contain the data for statistics, to be returned by 
 * DatabaseMutator.tryGetStats()
 * */
public class StatWrapper {
	public String wins;
	public String losses;
	public String games_played;
	public String kills;
	public String deaths;
	public String kill_death_ratio;
	public String score;
	public String high_score;
	
	public String response_message;
	
	public StatWrapper (String wins, String losses, String games_played, String kills, String deaths,
			String kill_death_ratio, String score, String high_score, String response_message){
		this.wins = wins;
		this.losses = losses;
		this.games_played = games_played;
		this.kills = kills;
		this.deaths = deaths;
		this.kill_death_ratio = kill_death_ratio;
		this.score = score;
		this.high_score = high_score;
		this.response_message = response_message;
	}
}
