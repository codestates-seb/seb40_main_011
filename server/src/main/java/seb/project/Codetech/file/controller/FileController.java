package seb.project.Codetech.file.controller;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import seb.project.Codetech.file.dto.FileDto;
import seb.project.Codetech.file.entity.File;
import seb.project.Codetech.file.service.FileService;

@Controller
@RequestMapping("/api")
public class FileController {
	private final FileService fileService;

	public FileController(FileService fileService) {
		this.fileService = fileService;
	}

	@GetMapping("/upload")
	public String testUploadForm() {

		return "upload";
	}

	@PostMapping("/upload")
	public ResponseEntity<File> uploadFile(@RequestBody @Valid FileDto.Upload fileDto) throws IOException {
		fileService.saveFile(fileDto.getFile());

		for (MultipartFile multipartFile : fileDto.getFiles()) {
			fileService.saveFile(multipartFile);
		}

		return ResponseEntity.ok().build();
	}
}
