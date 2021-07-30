package url.shortener.helper;

import url.shortener.exception.ParameterException;
import url.shortener.model.URL;

public class Helper {

	public static void validateUrlRequest(URL url) {

		if (url.getOriginal() == null || url.getOriginal().length() == 0) {
			throw new ParameterException("No URL found!");
		}

		return;
	}

	public static void validateShortenedUrl(String url) {
		return;
	}

	public static String generateShortened(String original) {

		return original + "abc";
	}
}
