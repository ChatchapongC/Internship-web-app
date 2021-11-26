package com.vannessp.developer.restservice.model.Candidate.Resume;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name="education")
public class Education implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long id;

    @NotNull
    @NotBlank
    private String educationLevel;

    @NotNull
    @NotBlank
    @DateTimeFormat(pattern = "MM-yyyy")
    private LocalDate fromDate;

    @NotNull
    @NotBlank
    @DateTimeFormat(pattern = "MM-yyyy")
    private LocalDate toDate;

    @NotNull
    @NotBlank
    private String institute;

    @NotNull
    @NotBlank
    private String curriculum;

    private float gpa;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Resume resume;

    public Education() {
    }

    public Long getId() {
        return id;
    }

    public String getEducationLevel() {
        return educationLevel;
    }

    public void setEducationLevel(String title) {
        this.educationLevel = title;
    }

    public LocalDate getFromDate() {
        return fromDate;
    }

    public void setFromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
    }

    public LocalDate getToDate() {
        return toDate;
    }

    public void setToDate(LocalDate toDate) {
        this.toDate = toDate;
    }

    public String getInstitute() {
        return institute;
    }

    public void setInstitute(String institute) {
        this.institute = institute;
    }

    public String getCurriculum() {
        return curriculum;
    }

    public void setCurriculum(String description) {
        this.curriculum = description;
    }

    public float getGpa() {
        return gpa;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setGpa(float gpa) {
        this.gpa = gpa;
    }

    public Resume getResume() {
        return resume;
    }

    public void setResume(Resume resume) {
        this.resume = resume;
    }
}
