package com.vannessp.developer.restservice.model.Company;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.vannessp.developer.restservice.model.Candidate.FavoriteJob;
import com.vannessp.developer.restservice.model.Candidate.JobApplication;
import net.minidev.json.annotate.JsonIgnore;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "jobs")
public class Job implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long id;

    @NotNull
    @NotBlank
    private String title;

    @NotNull
    @NotBlank
    private String type;

    @NotNull
    @NotBlank
    private String category;

    private String availablePosition;

    private String allowance;

    @NotNull
    @NotBlank
    private String workingTime;

    private String workingHoliday;

    @NotNull
    @NotBlank
    private String location;

    @NotNull
    @NotBlank
    private String description;

    @NotNull
    @NotBlank
    private String contactNumber;

    @NotNull
    @NotBlank
    private String educationQualification;

    @NotNull
    @NotBlank
    private String gender;

    @NotNull
    @NotBlank
    private String experience;

    private String contactPersonName;

    @Column(columnDefinition = "boolean default false")
    private Boolean isRecommend;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Company company;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable = false)
    @CreatedDate
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    @LastModifiedDate
    private Date updatedAt;

    @OneToMany(mappedBy = "job", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JsonBackReference
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    List<JobApplication> jobApplications;

    @OneToMany(mappedBy = "job", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JsonBackReference
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    List<FavoriteJob> favoriteJobs;

    public Job() {

    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAvailablePosition() {
        return availablePosition;
    }

    public void setAvailablePosition(String availablePosition) {
        this.availablePosition = availablePosition;
    }

    public String getAllowance() {
        return allowance;
    }

    public void setAllowance(String allowance) {
        this.allowance = allowance;
    }

    public String getWorkingTime() {
        return workingTime;
    }

    public void setWorkingTime(String workingTime) {
        this.workingTime = workingTime;
    }

    public String getWorkingHoliday() {
        return workingHoliday;
    }

    public void setWorkingHoliday(String workingHoliday) {
        this.workingHoliday = workingHoliday;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getContactPersonName() {
        return contactPersonName;
    }

    public void setContactPersonName(String contactPersonName) {
        this.contactPersonName = contactPersonName;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Boolean getRecommend() {
        return isRecommend;
    }

    public void setRecommend(Boolean recommend) {
        isRecommend = recommend;
    }

    public List<JobApplication> getJobApplications() {
        return jobApplications;
    }

    public void setJobApplications(List<JobApplication> jobApplications) {
        this.jobApplications = jobApplications;
    }

    public String getEducationQualification() {
        return educationQualification;
    }

    public void setEducationQualification(String educationQualification) {
        this.educationQualification = educationQualification;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }
}


