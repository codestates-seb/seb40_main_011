package seb.project.Codetech.file.service;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import seb.project.Codetech.file.entity.File;
import seb.project.Codetech.file.repository.FileRepository;

@Service
public class FileService {
	private final FileRepository fileRepository;

	public FileService(FileRepository fileRepository) {
		this.fileRepository = fileRepository;
	}

	@Value("${filePath}")
	private String filePath;

	public Long saveFile(MultipartFile uploadFile) throws IOException {

		File file = new File();
		if(uploadFile.isEmpty()) return null;

		// 업로드 한 파일 이름을 추출 한다.
		file.setName(uploadFile.getOriginalFilename());

		// 중복 방지를 위한 파일 UUID를 발급 한다.
		file.setUuid(UUID.randomUUID().toString());

		// 설정한 저장경로(filePath)와 파일 이름을 통해 저장 경로를 데이터로 삽입한다.
		file.setPath(filePath + uploadFile.getOriginalFilename());

		// 로컬에 파일을 저장한다.
		uploadFile.transferTo(new java.io.File(file.getPath()));

		// 데이터베이스에 파일 정보를 저장한다.
		File saveFile = fileRepository.save(file);

		return saveFile.getId();
	}
}
