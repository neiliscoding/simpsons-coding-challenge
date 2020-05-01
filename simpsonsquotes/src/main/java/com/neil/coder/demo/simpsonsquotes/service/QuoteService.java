package com.neil.coder.demo.simpsonsquotes.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.neil.coder.demo.simpsonsquotes.repository.QuoteRepository;

import com.neil.coder.demo.simpsonsquotes.domain.Quote;

@Service
public class QuoteService {
	
	private QuoteRepository quoteRepository;
	

	public QuoteService(QuoteRepository quoteRepository) {
		this.quoteRepository = quoteRepository;
	}

	public Iterable<Quote> list(){
		return quoteRepository.findAll();
	}
	
	public Quote save(Quote quote) {
		return quoteRepository.save(quote);
	}

	public Iterable<Quote> save(List<Quote> quotes) {
		return quoteRepository.saveAll(quotes);
	}
	
	public void deleteById(String id) {
		quoteRepository.deleteById(id);
	}
	
	public void deleteQuote(Quote quote) {
		quoteRepository.delete(quote);
	}

	
}
