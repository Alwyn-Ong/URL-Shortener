package url.shortener.helper;

import java.util.Random;

public class Generator {

	private static Random random = new Random();

	public static String generateShortened(String original, int length) {

		String ALPHANUMERIC = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		int ALPHANUMERIC_LENGTH = ALPHANUMERIC.length();

		int num = 0;
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
