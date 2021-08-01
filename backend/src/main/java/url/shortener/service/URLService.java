package url.shortener.service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import url.shortener.dao.URLDao;
import url.shortener.exception.APIException;
import url.shortener.helper.Generator;
import url.shortener.helper.Validator;
import url.shortener.model.URL;

@Service
public class URLService {

	@Autowired
	private URLDao URLDao;

	@Value("${url.shortened.generated.length}")
	private int generatedShortenedLength;

	public ResponseEntity createUrl(URL url) {

		Validator.validateUrlRequest(url);

		System.out.println("Received URL:");
		System.out.println(url);

		String shortened = url.getShortened();

		// If specified short url has already been registered
		if (shortened != null && URLDao.findByShortened(shortened) != null) {
			throw new APIException("Duplicate URL!");
		}

		// Check if record already exists
		URL urlFromDB = URLDao.findByOriginal(url.getOriginal());

		if (urlFromDB != null) {

			// Return existing shortened url from db
			url = urlFromDB;

		} else {

			System.out.println("Generating new shortened string");

			if (shortened == null) {
				// Generate shortened url
				String generatedShortened = Generator.generateShortened(url.getOriginal(), generatedShortenedLength);
				url.setShortened(generatedShortened);
			}

			// Add to db
			URLDao.save(url);

		}

		// Returns new shortened url to user
		return new ResponseEntity(url.getShortened(), HttpStatus.OK);
	}

	// TODO: Add validation
	public ResponseEntity getUrl(String shortened) {

		// Validate incoming shortened url
		Validator.validateShortenedUrl(shortened);

		System.out.println("shortened: " + shortened);

		// Retrieve from database
		URL result = URLDao.findByShortened(shortened);

		System.out.println("Result is: -------------");
		System.out.println(result);
		System.out.println("------------");

		if (result.getOriginal() == null || result.getOriginal().length() == 0) {
			throw new APIException("Error retrieving original URL.");
		}

//		return result.getOriginal();
		return new ResponseEntity(result.getOriginal(), HttpStatus.OK);

//		return new ModelAndView("redirect:" + result.getOriginal());/

//		HttpHeaders headers = new HttpHeaders();
//		headers.add("location", result.getOriginal());
//		headers.setLocation(URI.create(result.getOriginal()));

		// Returns original url to user
//		return new ResponseEntity(result.getOriginal(), HttpStatus.OK);
//		return new ResponseEntity(headers, HttpStatus.FOUND);
	}

	private String generateShortened(String original, int length) {

		String ALPHANUMERIC = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		int ALPHANUMERIC_LENGTH = ALPHANUMERIC.length();

		int num = 0;
		Random random = new Random(original.length());
		StringBuilder result = new StringBuilder("");

		for (int i = 0; i < length; i++) {
			int temp = random.nextInt(ALPHANUMERIC_LENGTH);
			result.append(ALPHANUMERIC.charAt(temp));
		}

		return result.toString();
	}

}
