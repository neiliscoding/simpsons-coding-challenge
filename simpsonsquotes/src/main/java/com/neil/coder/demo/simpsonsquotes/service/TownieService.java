package com.neil.coder.demo.simpsonsquotes.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.neil.coder.demo.simpsonsquotes.repository.TownieRepository;
import com.neil.coder.demo.simpsonsquotes.domain.Quote;
import com.neil.coder.demo.simpsonsquotes.domain.Townie;

@Service
public class TownieService {
	
	private TownieRepository townieRepository;
	

	public TownieService(TownieRepository townieRepository) {
		this.townieRepository = townieRepository;
	}

	public Iterable<Townie> list(){
		return townieRepository.findAll();
	}
	
	public Townie save(Townie townie) {
		return townieRepository.save(townie);
	}

	public Iterable<Townie> save(List<Townie> townies) {
		return townieRepository.saveAll(townies);
	}

	public void deleteById(String id) {
		townieRepository.deleteById(id);
	}
	
	public void deleteQuote(Townie townie) {
		townieRepository.delete(townie);
	}

}
