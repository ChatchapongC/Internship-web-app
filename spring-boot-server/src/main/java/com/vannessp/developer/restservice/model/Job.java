package com.vannessp.developer.restservice.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

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
    @Column
    private String tags;

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
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date upload_date;


    public Job() {

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

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
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

    public Date getUpload_date() {
        return upload_date;
    }

    public void setUpload_date(Date upload_date) {
        this.upload_date = upload_date;
    }

}