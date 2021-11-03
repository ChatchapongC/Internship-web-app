package com.vannessp.developer.restservice.repository;

import com.vannessp.developer.restservice.model.Company.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    @Query(value = "select * from jobs j where j.avaliable_position LIKE %?1%", nativeQuery = true)
    List<Job> findByAvaliablePosition(String position);

    @Query(value = "select * from jobs j where j.type LIKE %?1%", nativeQuery = true)
    List<Job> findByJobType(String word);

    @Query(value = "select * from jobs j where j.jobtype LIKE %?1%", nativeQuery = true)
    List<Job> findByTags(String tags);

    @Query(value = "select * from jobs j where j.title LIKE %?1% order by j.title", nativeQuery = true)
    List<Job> findByJobTitle(String word);

    @Query(value = "select * from jobs j where j.title LIKE %?1% order by j.title", nativeQuery = true)
    List<Job> findByKeyword(String word);

    //Find by string
    @Query(value = "select * from jobs j where j.upload_date = ?1", nativeQuery = true)
    List<Job> findByUploadDate(String dtime);

    //Find by LocalDate format /*LocalDate.parse("2019-12-31")*/
    @Query(value = "select * from jobs j where j.upload_date = ?1", nativeQuery = true)
    List<Job> findByUploadDate(LocalDate dtime);

    @Query(value = "select * from jobs j where j.benefit = ?1", nativeQuery = true)
    List<Job> findByBenefit(String benefit);

    @Query(value = "select * from jobs j where j.location LIKE %?1%", nativeQuery = true)
    List<Job> findByLocation(String location);

    @Query(value = "select * from jobs j where j.is_recommend = 1", nativeQuery = true)
    List<Job> findByRecommend();

    @Query(value = "SELECT * FROM jobs j WHERE j.category IN :categories", nativeQuery = true)
    List<Job> findByCategory(Collection<String> categories);

    Optional<Job> findByIdAndCompanyId(Long id, Long companyId);

    List<Job> findByCompanyId(Long companyId);

    @Query("SELECT j FROM Job j WHERE (:type is null or j.type = :type  ) and (:category is null"
            + " or j.category = :category) and (:location is null or j.location = :location )")
    List<Job> findJobByTypeAndCategoryAndLocation(String type, String category, String location);

    @Query("SELECT location FROM Job")
    List<String> findAllJobLocation();

    @Query("SELECT category FROM Job")
    List<String> findAllJobCategory();

}
