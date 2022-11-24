package seb.project.Codetech.review.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import seb.project.Codetech.recommend.entity.Recommend;
import seb.project.Codetech.review.dto.ReviewResponseDto;
import seb.project.Codetech.review.entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>, CustomReviewRepository {
    List<Review> findAllByRecommendsIn(List<Recommend> recommends);

	List<ReviewResponseDto.Post> findByReviewResponseDto(Review review);
}
