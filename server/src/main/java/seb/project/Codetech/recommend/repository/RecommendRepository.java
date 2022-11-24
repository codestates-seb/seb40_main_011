package seb.project.Codetech.recommend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import seb.project.Codetech.recommend.entity.Recommend;

@Repository
public interface RecommendRepository extends JpaRepository<Recommend, Long> {

    @Query(value = "select * from recommend r where r.user_id = ? and r.review_id = ?",nativeQuery = true)
    Recommend findByUserAndReview(Long userId, Long reviewId);
}
