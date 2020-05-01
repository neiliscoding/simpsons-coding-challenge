package com.neil.coder.demo.simpsonsquotes.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Entity
public class Quote {


	
		@Id
		private String _id;
		private String character;
		private String phrase;
		
		

		public Quote() {
			
		}
		
		public String get_id() {
			return _id;
		}
		public void set_id(String _id) {
			this._id = _id;
		}
		public String getCharacter() {
			return character;
		}
		public void setCharacter(String character) {
			this.character = character;
		}
		public String getPhrase() {
			return phrase;
		}
		public void setPhrase(String phrase) {
			this.phrase = phrase;
		}
}