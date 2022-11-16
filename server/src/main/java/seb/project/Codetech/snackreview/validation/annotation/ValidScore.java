package seb.project.Codetech.snackreview.validation.annotation;

import static java.lang.annotation.ElementType.*;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import seb.project.Codetech.snackreview.validation.validator.ScoreValidator;

@Target({TYPE, TYPE_USE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ScoreValidator.class)
public @interface ValidScore {
	String message() default "Invalid score";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
