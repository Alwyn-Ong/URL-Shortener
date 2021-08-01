package url.shortener.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import url.shortener.model.URL;

public interface URLDao extends JpaRepository<URL, Integer>{

	URL findByOriginal(String original);

	URL findByShortened(String shortened);
}