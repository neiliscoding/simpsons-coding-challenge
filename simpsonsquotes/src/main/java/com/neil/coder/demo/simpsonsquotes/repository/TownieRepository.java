package com.neil.coder.demo.simpsonsquotes.repository;

import com.neil.coder.demo.simpsonsquotes.domain.Townie;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TownieRepository extends CrudRepository<Townie,String> {

}
