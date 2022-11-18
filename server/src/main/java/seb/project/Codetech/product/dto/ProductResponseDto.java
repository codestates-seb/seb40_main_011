package seb.project.Codetech.product.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import seb.project.Codetech.file.entity.FileEntity;
import seb.project.Codetech.product.entity.Type;

@Getter
@Setter
@NoArgsConstructor
public class ProductResponseDto {

	private String name;
	private Type type;
	private String detail;
	private String writer;
	private String modifier;
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;

	private FileEntity file;
}
