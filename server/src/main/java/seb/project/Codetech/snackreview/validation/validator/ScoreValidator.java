package seb.project.Codetech.snackreview.validation.validator;

import java.lang.reflect.Field;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import seb.project.Codetech.snackreview.entity.SnackReview;
import seb.project.Codetech.snackreview.validation.annotation.ValidScore;

public class ScoreValidator implements ConstraintValidator<ValidScore, SnackReview.Score> {
	@Override
	public void initialize(ValidScore constraintAnnotation) {
		ConstraintValidator.super.initialize(constraintAnnotation);
	}

	@Override
	public boolean isValid(SnackReview.Score score, ConstraintValidatorContext context) {
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

			if (value < 0 || value > 5) {
				return false;
			}
		}

		return true;
	}
}
