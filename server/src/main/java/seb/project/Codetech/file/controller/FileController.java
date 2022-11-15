package seb.project.Codetech.file.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import seb.project.Codetech.file.entity.FileEntity;
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
	public ResponseEntity<FileEntity> uploadFile(@RequestParam("file") MultipartFile file,
		                                   @RequestParam("files") List<MultipartFile> files) throws IOException {
		fileService.saveFile(file);

		for (MultipartFile multipartFile : files) {
			fileService.saveFile(multipartFile);
		}

		return ResponseEntity.ok().build();
	}
}
