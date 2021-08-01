package url.shortener.helper;

import org.apache.commons.validator.routines.UrlValidator;

import url.shortener.exception.ParameterException;
import url.shortener.model.URL;

public class Validator {

	// To validate original url
	public static void validateUrlRequest(URL url) {

		// Checks if URL is present
		if (url.getOriginal() == null || url.getOriginal().length() == 0) {
			throw new ParameterException("No URL found!");
		}

		// Checks if URL is valid
		UrlValidator urlValidator = new UrlValidator(new String[] { "http", "https" });
		if (!urlValidator.isValid(url.getOriginal())) {
			throw new ParameterException("Invalid URL!");
		}

		return;
	}

	// To validate shortened url
	public static void validateShortenedUrl(String url) {

		if (!url.matches("[0-9a-zA-Z]+")) {
			throw new ParameterException("Invalid shortened URL!");
		}

		if (url.length() > 8) {
			throw new ParameterException("URL is too long!");
		}

		return;
	}

}
