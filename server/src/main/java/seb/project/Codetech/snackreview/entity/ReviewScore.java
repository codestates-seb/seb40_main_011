package seb.project.Codetech.snackreview.entity;

import java.lang.reflect.Field;

import lombok.Getter;
import lombok.NoArgsConstructor;
import seb.project.Codetech.snackreview.validation.annotation.ValidScore;

@Getter
@ValidScore
@NoArgsConstructor
public class ReviewScore {
	private int costEfficiency;
	private int quality;
	private int satisfaction;
	private int design;
	private int performance;

	public float getGrade() {
		float totalScore = 0;
		int totalCount = 0;

		for (Field field : ReviewScore.class.getDeclaredFields()) {
			if (field.getName().equals("this$0")) {
				continue;
			}

			try {
				totalScore += field.getInt(this);
			} catch (IllegalAccessException e) {

			} finally {
				totalCount += 1;
			}
		}

		return totalScore / totalCount;
	}
}
