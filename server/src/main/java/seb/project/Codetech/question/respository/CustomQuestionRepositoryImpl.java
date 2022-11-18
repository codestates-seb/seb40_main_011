package seb.project.Codetech.question.respository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)
public class CustomQuestionRepositoryImpl implements CustomQuestionRepository {
}
