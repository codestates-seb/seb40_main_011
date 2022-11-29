package seb.project.Codetech.question.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import seb.project.Codetech.question.entity.Answer;
import seb.project.Codetech.question.entity.Question;
import seb.project.Codetech.user.entity.User;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findAllByWriterAndQuestion(User user, Question question);
}
