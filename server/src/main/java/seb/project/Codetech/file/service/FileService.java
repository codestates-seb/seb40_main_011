package seb.project.Codetech.file.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.name.Rename;

import lombok.extern.log4j.Log4j2;
import seb.project.Codetech.file.entity.FileEntity;
import seb.project.Codetech.file.repository.FileRepository;
import seb.project.Codetech.global.exception.BusinessLogicException;
import seb.project.Codetech.global.exception.ExceptionCode;
import seb.project.Codetech.product.entity.Product;
import seb.project.Codetech.user.entity.User;

@Service
@Transactional
@Log4j2
public class FileService {
	private final FileRepository fileRepository;
	private final String rootPath = System.getProperty("user.dir"); // 현재 실행되고 있는 서버의 경로를 가져온다.
	@Value("${filePath}")
	private String filePath;

	public FileService(FileRepository fileRepository) {
		this.fileRepository = fileRepository;
	}

	public FileEntity saveFile(MultipartFile uploadFile) throws IOException {

		if (uploadFile.getSize() > 0) { // 너 파일이 실존해 ?

			if (!checkFile(uploadFile))
				throw new BusinessLogicException(ExceptionCode.FILE_NOT_ALLOW);

			checkDir(rootPath, filePath); // 파일을 업로드 처리하기 전에 폴더가 있는지 검사한다.

			FileEntity file = new FileEntity();

			String orgName = uploadFile.getOriginalFilename(); // 파일 이름 추출
			String uuidName = UUID.randomUUID().toString(); // UUID 이름 생성
			assert orgName != null;
			String ext = orgName.substring(orgName.lastIndexOf(".") + 1); // 확장자 추출

			// 원본 파일이름을 설정한다.
			file.setOrgName(orgName);

			// uuid 파일 이름을 설정한다.
			file.setUuidName(uuidName + "." + ext);

			// 설정한 저장경로(filePath)와 파일 이름을 통해 저장 경로를 데이터로 삽입한다.
			file.setPath(filePath + uuidName + "." + ext);

			// 로컬에 파일을 저장한다 파일 이름은 uuid로 저장.
			uploadFile.transferTo(new File(rootPath + filePath + uuidName + "." + ext));

			// 데이터베이스에 파일 정보를 저장한다.
			return fileRepository.save(file);
		}
		throw new BusinessLogicException(ExceptionCode.FILE_NOT_FOUND);
	}

	public String convertThumbnail(MultipartFile file, Integer width, Integer height) throws IOException {

		FileEntity saveFile = saveFile(file);

		Thumbnails.of(new File(rootPath + saveFile.getPath()))
			.size(width, height)
			.toFiles(Rename.PREFIX_HYPHEN_THUMBNAIL);

		return filePath + "thumbnail-" + saveFile.getUuidName();
	}

	public List<FileEntity> insertFiles(List<MultipartFile> files) throws IOException {

		List<FileEntity> fileEntities = new ArrayList<>();

		for (MultipartFile file : files) {
			FileEntity saved = saveFile(file);
			fileEntities.add(saved);
		}

		return fileEntities;
	}

	public void setUploadProduct(Product product, List<FileEntity> fileEntities) {
		for (FileEntity file : fileEntities) {
			file.setProduct(product);
			fileRepository.save(file);
		}
	}

	public FileEntity setUploadUser(User user, FileEntity file) {
		file.setUser(user);
		return fileRepository.save(file);
	}

	public void checkDir(String root, String path) {

		Path dir = Paths.get(root + path);

		try {
			// 디렉토리 생성
			Files.createDirectories(dir); // 폴더가 없으면 생성한다 폴더나 부모 폴더도 없으면 같이 생성해준다 다만 예외를 주지는 않는다.
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	public boolean checkFile(MultipartFile file) throws IOException {

		Tika tika = new Tika();
		String fileType = tika.detect(file.getInputStream());
		// getByte로 돌리게 된다면 문제가 생긴다, getInputStream을 통해서 헤더만 보내서 검사한다.

		return fileType.startsWith("image");
	}
}
