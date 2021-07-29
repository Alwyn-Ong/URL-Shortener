package URLShortener.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import URLShortener.service.URLService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/")
public class URLController {
	
	@Autowired
	private URLService service;
	
	//TODO: Change to POST
	@GetMapping("/create/{shortened}/{original}")
	public String createUrl(@PathVariable("shortened") String shortened, @PathVariable("original") String original){
		return service.createUrl(shortened, original);
	}

	// To get the shortened map based on original
	@GetMapping("/{shortened}")
	public String getUrl(@PathVariable("shortened") String shortened){
		return service.getUrl(shortened);
	}
}
