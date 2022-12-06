package seb.project.Codetech.file.controller;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import seb.project.Codetech.file.entity.FileDto;
import seb.project.Codetech.file.entity.FileEntity;
import seb.project.Codetech.file.service.FileService;

@RestController
@RequestMapping("/api")
public class FileController {
	private final FileService fileService;

	public FileController(FileService fileService) {
		this.fileService = fileService;
	}

	@PostMapping("/upload")
	public ResponseEntity<String> uploadFile(@RequestPart MultipartFile file) throws IOException {

		FileEntity fileEntity = fileService.saveFile(file);

		return ResponseEntity.status(HttpStatus.OK).body(fileEntity.getPath());
	}

	@PostMapping("/thumbnail")
	public ResponseEntity<String> uploadThumbnail(
		@RequestPart MultipartFile file,
		@RequestPart @Valid FileDto request) throws
		IOException {

		String saveThumbnail = fileService.convertThumbnail(file, request.getWidth(), request.getHeight());

		return ResponseEntity.ok(saveThumbnail);
	}
}
