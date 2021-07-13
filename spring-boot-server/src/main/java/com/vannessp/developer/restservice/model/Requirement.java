package com.vannessp.developer.restservice.model;

import javax.persistence.*;

@Entity
@Table(name = "jobs_requirement"
//        , uniqueConstraints = {
//            @UniqueConstraint(columnNames = "email")
//    }
)
public class Requirement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String age;

    @Column
    private String education;

    @Column
    private String detail;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }
}
