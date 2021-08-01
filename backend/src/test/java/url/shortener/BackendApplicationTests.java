package url.shortener;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import url.shortener.controller.URLController;
import url.shortener.model.URL;

@SpringBootTest
@AutoConfigureMockMvc
class BackendApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private URLController controller;

	// For valid urls
	@Test
	public void addValidUrl() throws Exception {

		URL url = new URL("google", "http://www.google.com");

		System.out.print(url);
		this.mockMvc.perform(
				MockMvcRequestBuilders.post("/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(url)))
				.andExpect(status().isOk());

	}

	// For valid urls with no custom shortened
	@Test
	public void addValidUrlWithoutCustom() throws Exception {

		URL url = new URL(null, "http://www.google.com");

		System.out.print(url);
		this.mockMvc.perform(
				MockMvcRequestBuilders.post("/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(url)))
				.andExpect(status().isOk());

	}

	// For invalid urls
	@Test
	public void addInvalidUrl() throws Exception {

		// Missing protocol
		URL url = new URL("google", "www.google.com");

		System.out.print(url);
		this.mockMvc.perform(
				MockMvcRequestBuilders.post("/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(url)))
				.andExpect(status().isBadRequest());

	}

	// For invalid urls with missing attributes
	@Test
	public void addValidUrlNullParams() throws Exception {

		URL url = new URL(null, null);

		System.out.print(url);
		this.mockMvc.perform(
				MockMvcRequestBuilders.post("/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(url)))
				.andExpect(status().isBadRequest());

	}

	// For invalid urls with empty attributes
	@Test
	public void addValidUrlEmptyOriginal() throws Exception {

		URL url = new URL(null, "");

		System.out.print(url);
		this.mockMvc.perform(
				MockMvcRequestBuilders.post("/").contentType(MediaType.APPLICATION_JSON).content(asJsonString(url)))
				.andExpect(status().isBadRequest());

	}

	// For url that is not in database
	@Test
	public void getInvalidUrl() throws Exception {

		this.mockMvc.perform(get("/invalid").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isInternalServerError());
	}

	public static String asJsonString(final URL url) {
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			return objectMapper.writeValueAsString(url);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
