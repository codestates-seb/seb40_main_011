package seb.project.Codetech.file.service;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import seb.project.Codetech.file.entity.FileEntity;
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

		checkDir(filePath);

		FileEntity file = new FileEntity();
		if(uploadFile.isEmpty()) return null;

		// 업로드 한 파일 이름을 추출 한다.
		file.setName(uploadFile.getOriginalFilename());

		// 중복 방지를 위한 파일 UUID를 발급 한다.
		file.setUuid(UUID.randomUUID().toString());

		// 설정한 저장경로(filePath)와 파일 이름을 통해 저장 경로를 데이터로 삽입한다.
		file.setPath(filePath + uploadFile.getOriginalFilename());

		// 로컬에 파일을 저장한다.
		uploadFile.transferTo(new java.io.File(filePath + uploadFile.getOriginalFilename()));

		// 데이터베이스에 파일 정보를 저장한다.
		FileEntity saveFile = fileRepository.save(file);

		return saveFile.getId();
	}

	public void checkDir(String path) {
		File dir = new File(path);

		// 해당 디렉토리가 없다면 디렉토리를 생성.
		if (!dir.exists()) {
			try{
				dir.mkdir(); //폴더 생성합니다. ("새폴더"만 생성)
				System.out.println("폴더가 생성완료.");
			}
			catch(Exception e){
				e.getStackTrace();
			}
		}else {
			System.out.println("폴더가 이미 존재합니다..");
		}
	}
}
