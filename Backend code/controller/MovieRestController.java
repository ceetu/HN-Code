package com.project.moviebooking.controller;

import com.project.moviebooking.model.Movie;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/movies")
@CrossOrigin("*")
public class MovieRestController {


    @RequestMapping(method = RequestMethod.GET)
    public List<Movie> getMovies() String movieId){
      return bookRepository.findAll();

    }


