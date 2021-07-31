package url.shortener.helper;

import java.util.Random;

import org.apache.commons.validator.routines.UrlValidator;

import url.shortener.exception.ParameterException;
import url.shortener.model.URL;

public class Helper {

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

	public static void validateShortenedUrl(String url) {
		return;
	}

	public static String generateShortened(String original, int length) {

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

//		// Convert to base 10 (numeric)
//		for (int i = 0; i < original.length(); i++) {
//			num += ALPHANUMERIC.indexOf(original.charAt(i));
//		}
//
//		// Convert to base 62 (alphanumeric)
//		StringBuilder result = new StringBuilder();
//		while (num > 0) {
//			int temp = num % 62;
//			result.append(ALPHANUMERIC.charAt(temp));
//			num /= 62;
//		}

//		return result.reverse().toString();
//		return Base62.toBase10(original);

//		return original + "abc";
	}
}
