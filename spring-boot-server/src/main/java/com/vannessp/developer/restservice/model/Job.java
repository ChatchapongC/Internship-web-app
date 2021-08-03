package com.vannessp.developer.restservice.model;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
// import java.util.Date;
import java.util.List;

@Entity
@Table(name = "jobs"
//        , uniqueConstraints = {
//            @UniqueConstraint(columnNames = "email")
//    }
)
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private String business_name;

    @NotNull
    @Enumerated(EnumType.STRING)
    private JobType jobtype;

    @Column
    private String avaliable_position;

    //May have more than 1 tag
    @ElementCollection
    private List<String> tags;

    @Column
    private Integer benefit;

//    Contact person is head office?
//    (Not Useful)
//    @Column
//    private boolean head_office;

    @Column
    private String location;

    //"2019-02-03"
    @Column
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDate upload_date;

    @ManyToOne
    @JoinColumn(name="business_id")
    private Company company;

    @Column
    private Boolean Recommended = false;

    @ElementCollection
    private List<String> job_requirement;
//    @Column
//    private Requirement job_requirement;

    @Column
    @ElementCollection
    private List<String> skill;

    @Column
    @ElementCollection
    private List<Long> user_apply;

    public Job() {

    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public List<Long> getUser_apply() {
        return user_apply;
    }

    public void setUser_apply(List<Long> user_apply) {
        this.user_apply = user_apply;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBusiness_name() {
        return business_name;
    }

    public void setBusiness_name(String business_name) {
        this.business_name = business_name;
    }

    public JobType getJobtype() {
        return jobtype;
    }

    public void setJobtype(JobType jobtype) {
        this.jobtype = jobtype;
    }

    public String getAvaliable_position() {
        return avaliable_position;
    }

    public void setAvaliable_position(String avaliable_position) {
        this.avaliable_position = avaliable_position;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public Integer getBenefit() {
        return benefit;
    }

    public void setBenefit(Integer benefit) {
        this.benefit = benefit;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDate getUpload_date() {
        return upload_date;
    }

    public void setUpload_date(LocalDate upload_date) {
        this.upload_date = upload_date;
    }

    public Company getBusiness() {
        return company;
    }

    public void setBusiness(Company company) {
        this.company = company;
    }

    public Boolean getRecommended() {
        return Recommended;
    }

    public void setRecommended(Boolean recommended) {
        Recommended = recommended;
    }

    public List<String> getJob_requirement() {
        return job_requirement;
    }

    public void setJob_requirement(List<String> job_requirement) {
        this.job_requirement = job_requirement;
    }

    public List<String> getSkill() {
        return skill;
    }

    public void setSkill(List<String> skill) {
        this.skill = skill;
    }
}
