package URLShortener.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import URLShortener.dao.URLDao;
import URLShortener.model.URL;

@Service
public class URLService {
	
	@Autowired
	private URLDao URLDao;
	
	public String createUrl(String shortened, String original){
		if (URLDao.findByShortened(shortened) != null) return "Duplicate Url"; 
 
		URLDao.save(new URL(shortened, original));
		return original;
	}

	// TODO: Add validation
	public String getUrl(String shortened){
		URL result = URLDao.findByShortened(shortened);
		return result.getOriginal();
	}
	
}
