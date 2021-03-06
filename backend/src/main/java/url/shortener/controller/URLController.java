package url.shortener.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import url.shortener.model.URL;
import url.shortener.service.URLService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/")
public class URLController {

	@Autowired
	private URLService service;

	// To add url to database and create shortened if not specified
	@PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity createUrl(@RequestBody URL url) {
		return service.createUrl(url);
	}

	// To get the shortened map based on original
	@GetMapping("/{shortened}")
	public ResponseEntity getUrl(@PathVariable("shortened") String shortened) {
		return service.getUrl(shortened);
	}

}
