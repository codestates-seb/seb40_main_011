package seb.project.Codetech.snackreview.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.jpa.impl.JPAQueryFactory;

import seb.project.Codetech.snackreview.dto.SnackReviewResponseDto;
import seb.project.Codetech.snackreview.dto.SnackReviewServiceDto;

@Repository
@Transactional(readOnly = true)
public class CustomSnackReviewRepositoryImpl implements CustomSnackReviewRepository {

	private final JPAQueryFactory queryFactory;

	public CustomSnackReviewRepositoryImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}

	@Override
	public List<SnackReviewResponseDto.Card> findCardsByProductIdAndSorted(SnackReviewServiceDto.Search cond) {
		return null;
	}
}
