package com.vannessp.developer.restservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "jobs_requirement"
//        , uniqueConstraints = {
//            @UniqueConstraint(columnNames = "email")
//    }
)
public class Requirement {
    @Id
    private Long id;

    @Column
    private String work_experience;

    @Column
    private String min_age;

    @Column
    private String max_age;

    @Column
    private String education;

    @Column
    @ElementCollection
    private List<String> skill;

    @Column
    private String languages;

    @Column
    private String detail;

//    @OneToOne(mappedBy = "requirement")
//    @OneToOne
//    @MapsId
//    @JoinColumn(name = "requirement_id")
//        public Requirement(String work_experience, String min_age, String max_age, String education, List<String> skill, String languages, String detail) {
//        this.work_experience = work_experience;
//        this.min_age = min_age;
//        this.max_age = max_age;
//        this.education = education;
//        this.skill = skill;
//        this.languages = languages;
//        this.detail = detail;
//    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWork_experience() {
        return work_experience;
    }

    public void setWork_experience(String work_experience) {
        this.work_experience = work_experience;
    }

    public String getMin_age() {
        return min_age;
    }

    public void setMin_age(String min_age) {
        this.min_age = min_age;
    }

    public String getMax_age() {
        return max_age;
    }

    public void setMax_age(String max_age) {
        this.max_age = max_age;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public List<String> getSkill() {
        return skill;
    }

    public void setSkill(List<String> skill) {
        this.skill = skill;
    }

    public String getLanguages() {
        return languages;
    }

    public void setLanguages(String languages) {
        this.languages = languages;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

}
