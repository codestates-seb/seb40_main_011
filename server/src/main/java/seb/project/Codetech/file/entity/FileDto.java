package seb.project.Codetech.file.entity;

import javax.validation.constraints.Positive;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class FileDto {

	@Positive
	private Integer width;

	@Positive
	private Integer height;
}
