package com.neil.coder.demo.simpsonsquotes.rest;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.neil.coder.demo.simpsonsquotes.domain.Quote;
import com.neil.coder.demo.simpsonsquotes.domain.Townie;
import com.neil.coder.demo.simpsonsquotes.service.QuoteService;

@RestController
@RequestMapping("/quotes")
public class QuoteRestController {
	
	private QuoteService quoteService;
	
	public QuoteRestController (QuoteService quoteService) {
		this.quoteService = quoteService;
		
	}
	
	@GetMapping("/list")
	public Iterable<Quote> listQuotes() {
		return quoteService.list();
	}	

	@PutMapping("/{id}")
	public void saveQuote(@PathVariable("id") String id, @RequestBody Quote quote) {
		//return quoteService.list();
		quoteService.save(quote);
	}	

	/*
	 * 
	 * 	@PutMapping("/{id}")
	public void saveTownie(@PathVariable("id") String id, @RequestBody Townie townie) {
		//return quoteService.list();
		townieService.save(townie);
	}	*/

}
