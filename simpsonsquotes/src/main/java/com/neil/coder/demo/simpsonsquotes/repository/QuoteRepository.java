package com.neil.coder.demo.simpsonsquotes.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.neil.coder.demo.simpsonsquotes.domain.Quote;

@Repository
public interface QuoteRepository extends CrudRepository<Quote, String> {

}
