package seb.project.Codetech.global.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import seb.project.Codetech.snackreview.entity.ReviewScore;

@Converter
@RequiredArgsConstructor
public class ScoreJsonConverter implements AttributeConverter<ReviewScore, String> {
	private final ObjectMapper objectMapper;

	@Override
	public String convertToDatabaseColumn(ReviewScore attribute) {
		try {
			return objectMapper.writeValueAsString(attribute);
		} catch (JsonProcessingException e) {
			return null;
		}
	}

	@Override
	public ReviewScore convertToEntityAttribute(String dbData) {
		try {
			return objectMapper.readValue(dbData, ReviewScore.class);
		} catch (JsonProcessingException e) {
			return null;
		}
	}
}
