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
		final float lower = 1.0f;
		final float upper = 5.0f;

		for (Field field : score.getClass().getDeclaredFields()) {
			if (field.getName().equals("this$0")) {
				continue;
			}
			field.setAccessible(true);
			float value = 0;

			try {
				value = field.getFloat(score);
			} catch (IllegalAccessException e) {
			}

			if (value < lower || value > upper) {
				return false;
			}
		}

		return true;
	}
}
