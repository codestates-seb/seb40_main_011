package seb.project.Codetech.recommend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import seb.project.Codetech.recommend.entity.Recommend;

import java.util.Optional;

@Repository
public interface RecommendRepository extends JpaRepository<Recommend, Long> {
    Optional<Recommend> findByUserIdAndReviewId(Long userId, Long reviewId);
}
