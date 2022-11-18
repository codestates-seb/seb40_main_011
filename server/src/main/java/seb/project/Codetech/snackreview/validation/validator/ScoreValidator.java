package seb.project.Codetech.snackreview.validation.validator;

import java.lang.reflect.Field;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import seb.project.Codetech.snackreview.entity.ReviewScore;
import seb.project.Codetech.snackreview.validation.annotation.ValidScore;

public class ScoreValidator implements ConstraintValidator<ValidScore, ReviewScore> {
	@Override
	public void initialize(ValidScore constraintAnnotation) {
		ConstraintValidator.super.initialize(constraintAnnotation);
	}

	@Override
	public boolean isValid(ReviewScore score, ConstraintValidatorContext context) {
		final int lower = 1;
		final int upper = 5;

		for (Field field : score.getClass().getDeclaredFields()) {
			if (field.getName().equals("this$0")) {
				continue;
			}
			field.setAccessible(true);
			int value = 0;

			try {
				value = field.getInt(score);
			} catch (IllegalAccessException e) {
			}

			if (value < lower || value > upper) {
				return false;
			}
		}

		return true;
	}
}
