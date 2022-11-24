package seb.project.Codetech.question.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import seb.project.Codetech.question.entity.Answer;
import seb.project.Codetech.question.entity.Question;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long>, CustomQuestionRepository {
    List<Question> findAllByAnswersIn(List<Answer> answers);
}
