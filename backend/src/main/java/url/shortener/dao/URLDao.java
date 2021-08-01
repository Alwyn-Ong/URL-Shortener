package url.shortener.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import url.shortener.model.URL;

// To access database
public interface URLDao extends JpaRepository<URL, Integer> {

	URL findByOriginal(String original);

	URL findByShortened(String shortened);
}