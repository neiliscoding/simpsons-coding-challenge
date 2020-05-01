package com.neil.coder.demo.simpsonsquotes.rest;

import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.neil.coder.demo.simpsonsquotes.domain.Quote;
import com.neil.coder.demo.simpsonsquotes.domain.Townie;
import com.neil.coder.demo.simpsonsquotes.service.TownieService;

@RestController
@RequestMapping("/townies")
public class TownieRestController {
	
	private TownieService townieService;
	
	public TownieRestController (TownieService townieService) {
		this.townieService = townieService;
	}
	
	@GetMapping("/list")
	public Iterable<Townie> listTownies() {
		return townieService.list();
	}	

	@DeleteMapping("/{id}")
	//@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteTownieById(@PathVariable("id") String id) {
		System.out.println("id " + id);
		townieService.deleteById(id);
	}	
	

	@PutMapping("/{id}")
	public void saveTownie(@PathVariable("id") String id, @RequestBody Townie townie) {
		//return quoteService.list();
		townieService.save(townie);
	}	

	

}
