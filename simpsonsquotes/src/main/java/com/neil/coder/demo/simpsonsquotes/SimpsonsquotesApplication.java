package com.neil.coder.demo.simpsonsquotes;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.context.annotation.Bean;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.neil.coder.demo.simpsonsquotes.service.QuoteService;
import com.neil.coder.demo.simpsonsquotes.service.TownieService;
import com.neil.coder.demo.simpsonsquotes.domain.Townie;
import com.neil.coder.demo.simpsonsquotes.domain.Quote;


import java.util.List;
import java.io.IOException;
import java.io.InputStream;

@SpringBootApplication
@EnableAutoConfiguration(exclude={MongoAutoConfiguration.class})
public class SimpsonsquotesApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimpsonsquotesApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(TownieService townieService, QuoteService quoteService) {
		return args -> {
			ObjectMapper mapper = new ObjectMapper();
			TypeReference<List<Townie>> typeReference = new TypeReference<List<Townie>>() {};
			InputStream inputStream = TypeReference.class.getResourceAsStream("/json/characters.json");
			
			try {
				List<Townie> townies = mapper.readValue(inputStream, typeReference);
				townieService.save(townies);
				System.out.println("Townies Saved!");
			} catch (IOException e) {
				System.out.println("Unable to save Townies: " + e.getMessage());
			}
			
			ObjectMapper quoteMapper = new ObjectMapper();
			TypeReference<List<Quote>> quoteTypeReference = new TypeReference<List<Quote>>() {};
			InputStream quoteInputStream = TypeReference.class.getResourceAsStream("/json/phrases.json");
			
			try {
				List<Quote> quotes = quoteMapper.readValue(quoteInputStream, quoteTypeReference);
				quoteService.save(quotes);
				System.out.println("quotes Saved!");
			} catch (IOException e) {
				System.out.println("Unable to save quotes: " + e.getMessage());
			}
		};
		
	}
}
