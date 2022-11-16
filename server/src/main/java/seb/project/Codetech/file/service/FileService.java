package seb.project.Codetech.file.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.log4j.Log4j2;
import seb.project.Codetech.file.entity.FileEntity;
import seb.project.Codetech.file.repository.FileRepository;

@Service
@Log4j2
public class FileService {
	private final FileRepository fileRepository;

	public FileService(FileRepository fileRepository) {
		this.fileRepository = fileRepository;
	}

	private final String rootPath = System.getProperty("user.dir"); // 현재 실행되고 있는 서버의 경로를 가져온다.

	@Value("${filePath}")
	private String filePath;

	public Long saveFile(MultipartFile uploadFile) throws IOException {

		if (!checkFile(uploadFile)) {
			log.info("파일 타입이 아닙니다.");
		}

		checkDir(rootPath ,filePath); // 파일을 업로드 처리하기 전에 폴더가 있는지 검사한다.

		FileEntity file = new FileEntity();
		if(uploadFile.isEmpty()) return null; // 파일이 비어있는 지 체크한다.

		String orgName = uploadFile.getOriginalFilename();
		String uuidName = UUID.randomUUID().toString();

		// 원본 파일이름을 설정한다.
		file.setOrgName(orgName);

		// uuid 파일 이름을 설정한다.
		file.setUuidName(uuidName);

		// 설정한 저장경로(filePath)와 파일 이름을 통해 저장 경로를 데이터로 삽입한다.
		file.setPath(filePath + uuidName);

		// 로컬에 파일을 저장한다 파일 이름은 uuid로 저장.
		uploadFile.transferTo(new File(rootPath + filePath + uuidName));

		// 데이터베이스에 파일 정보를 저장한다.
		FileEntity saveFile = fileRepository.save(file);

		return saveFile.getId();
	}

	public void checkDir(String root, String path) {

		Path dir = Paths.get(root + path);

		try {
			// 디렉토리 생성
			Files.createDirectories(dir); // 폴더가 없으면 생성한다 폴더나 부모 폴더도 없으면 같이 생성해준다 다만 예외를 주지는 않는다.
		}catch (IOException e) {
			e.printStackTrace();
		}

	}

	public boolean checkFile(MultipartFile file) throws IOException {
		Tika tika = new Tika();

		String fileType = tika.detect(file.getBytes());

		if (fileType.startsWith("image")) {
			return true;
		}
		else return false;
	}
}
