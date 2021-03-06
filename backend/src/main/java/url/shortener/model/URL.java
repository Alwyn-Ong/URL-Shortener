package url.shortener.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@Entity
@Table(name = "urls")
@ApiModel(description = "URL Storage ")
public class URL {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ApiModelProperty(notes = "unique id of url")
	private int urlId;

	@Column(name = "shortened")
	@ApiModelProperty(notes = "new shortened url")
	private String shortened;

	@Column(name = "original")
	@ApiModelProperty(notes = "original url")
	private String original;

	@Column(name = "isDisabled")
	@ApiModelProperty(notes = "if url is disabled")
	private boolean isDisabled = false;

	public URL(String shortened, String original, boolean isDisabled) {
		this.shortened = shortened;
		this.original = original;
		this.isDisabled = isDisabled;
	}

	public URL() {

	}

	public int getUrlId() {
		return urlId;
	}

	public void setUrlId(int urlId) {
		this.urlId = urlId;
	}

	public String getShortened() {
		return shortened;
	}

	public void setShortened(String shortened) {
		this.shortened = shortened;
	}

	public String getOriginal() {
		return original;
	}

	public void setOriginal(String original) {
		this.original = original;
	}

	@Override
	public String toString() {
		return "URL [urlId=" + urlId + ", shortened=" + shortened + ", original=" + original + "]";
	}

	public boolean getIsDisabled() {
		return isDisabled;
	}

	public void setIsDisabled(boolean isDisabled) {
		this.isDisabled = isDisabled;
	}

}
