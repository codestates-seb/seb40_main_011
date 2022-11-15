package seb.project.Codetech.global.converter;

import java.util.EnumSet;
import java.util.NoSuchElementException;

import javax.persistence.AttributeConverter;

import seb.project.Codetech.product.entity.Type;

public class TypeConverter implements AttributeConverter<Type, String> {
	@Override
	public String convertToDatabaseColumn(Type attribute) {
		return attribute.getValue();
	}

	@Override
	public Type convertToEntityAttribute(String dbData) {
		return EnumSet.allOf(Type.class).stream()
			.filter(e -> e.getValue().equals(dbData))
			.findAny()
			.orElseThrow(NoSuchElementException::new);
	}
}
