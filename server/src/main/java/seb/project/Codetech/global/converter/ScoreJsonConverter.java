package seb.project.Codetech.global.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import seb.project.Codetech.snackreview.entity.SnackReview;

@Converter
@RequiredArgsConstructor
public class ScoreJsonConverter implements AttributeConverter<SnackReview.Score, String> {
	private final ObjectMapper objectMapper;

	@Override
	public String convertToDatabaseColumn(SnackReview.Score attribute) {
		try {
			return objectMapper.writeValueAsString(attribute);
		} catch (JsonProcessingException e) {
			return null;
		}
	}

	@Override
	public SnackReview.Score convertToEntityAttribute(String dbData) {
		try {
			return objectMapper.readValue(dbData, SnackReview.Score.class);
		} catch (JsonProcessingException e) {
			return null;
		}
	}
}
