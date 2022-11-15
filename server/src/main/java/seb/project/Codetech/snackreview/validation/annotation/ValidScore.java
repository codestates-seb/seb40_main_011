package seb.project.Codetech.snackreview.validation.annotation;

import static java.lang.annotation.ElementType.*;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import org.hibernate.validator.internal.constraintvalidators.bv.NotNullValidator;

import seb.project.Codetech.snackreview.validation.validator.ScoreValidator;

@Target(TYPE_USE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {NotNullValidator.class, ScoreValidator.class})
public @interface ValidScore {
	String message() default "The score is not valid"; // (2)

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
