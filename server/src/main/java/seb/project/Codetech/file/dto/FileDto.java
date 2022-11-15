package seb.project.Codetech.file.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class FileDto {
	@Getter
	@NoArgsConstructor
	public static class Upload {
		private MultipartFile file;
		private List<MultipartFile> files;
	}
}
