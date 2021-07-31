package url.shortener.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import url.shortener.dao.URLDao;
import url.shortener.exception.APIException;
import url.shortener.helper.Helper;
import url.shortener.model.URL;

@Service
public class URLService {

	@Autowired
	private URLDao URLDao;

	public ResponseEntity createUrl(URL url) {

		Helper.validateUrlRequest(url);

		String shortened = url.getShortened();
		if (shortened != null) {

			// If specified short url has already been registered
			if (URLDao.findByShortened(shortened) != null) {
				throw new APIException("Duplicate URL!");
			}
		} else {

			// Generate shortened url
			String generatedShortened = Helper.generateShortened(url.getOriginal());
			url.setShortened(generatedShortened);
		}

		// Add to db
		URLDao.save(url);

		// Returns new shortened url to user
		return new ResponseEntity(url.getShortened(), HttpStatus.OK);
	}

	// TODO: Add validation
	public String getUrl(String shortened) {

		// Validate incoming shortened url
		Helper.validateShortenedUrl(shortened);

		System.out.println("shortened: " + shortened);

		// Retrieve from database
		URL result = URLDao.findByShortened(shortened);

		System.out.println("Result is: -------------");
		System.out.println(result);
		System.out.println("------------");

		if (result.getOriginal() == null || result.getOriginal().length() == 0) {
			throw new APIException("Error retrieving original URL.");
		}

		return result.getOriginal();

//		return new ModelAndView("redirect:" + result.getOriginal());/

//		HttpHeaders headers = new HttpHeaders();
//		headers.add("location", result.getOriginal());
//		headers.setLocation(URI.create(result.getOriginal()));

		// Returns original url to user
//		return new ResponseEntity(result.getOriginal(), HttpStatus.OK);
//		return new ResponseEntity(headers, HttpStatus.FOUND);
	}

}
