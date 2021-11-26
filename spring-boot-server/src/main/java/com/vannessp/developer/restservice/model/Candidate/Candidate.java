package com.vannessp.developer.restservice.model.Candidate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.vannessp.developer.restservice.model.Candidate.Resume.Resume;
import com.vannessp.developer.restservice.model.Company.Job;
import com.vannessp.developer.restservice.model.User.Role;
import com.vannessp.developer.restservice.model.User.User;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "candidates")
public class Candidate implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NotNull
    @NotEmpty
    @NotBlank
    @Size(min = 2, max = 50, message = "Please provide first size between 2 - 100")
    private String firstName;

    @Column
    @NotNull
    @NotEmpty
    @NotBlank
    @Size(min = 2, max = 100, message = "Please provide lastName size between 2 - 100")
    private String lastName;

    @Column
    private String firstNameTH;

    @Column
    private String lastNameTH;

    @Column(name = "phone_number")
    @Size(max = 15)
    @NotNull
    @NotEmpty
    @NotBlank
    private String mobileNumber;

    @Column(length = 10)
    private String gender;

    @Column
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDate dateOfBirth;

    @Size(max = 100)
    @NotNull
    @NotEmpty
    @NotBlank
    private String address;

    @Column
    private String nationality;

    @Column
    private String religion;

    @Column
    private Integer age;

    @Column
    @Nullable
    private Integer weight;

    @Column
    @Nullable
    private Integer height;

    @Column
    private String typeOfWork;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "candidate")
    @JsonBackReference
    List<JobApplication> jobApplications;

    @OneToMany(mappedBy = "candidate")
    @JsonBackReference
    List<FavoriteJob> favoriteJobs;

    @OneToOne(  fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            mappedBy = "candidate")
    @JsonManagedReference
    private Resume resume;


    public Candidate() {

    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstNameTH() {
        return firstNameTH;
    }

    public void setFirstNameTH(String firstNameTH) {
        this.firstNameTH = firstNameTH;
    }

    public String getLastNameTH() {
        return lastNameTH;
    }

    public void setLastNameTH(String lastNameTH) {
        this.lastNameTH = lastNameTH;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<JobApplication> getJobApplications() {
        return jobApplications;
    }

    public void setJobApplications(List<JobApplication> jobApplications) {
        this.jobApplications = jobApplications;
    }

    public Resume getResume() {
        return resume;
    }

    public void setResume(Resume resume) {
        this.resume = resume;
    }

    public List<FavoriteJob> getFavoriteJobs() {
        return favoriteJobs;
    }

    public void setFavoriteJobs(List<FavoriteJob> favoriteJobs) {
        this.favoriteJobs = favoriteJobs;
    }

    public String getTypeOfWork() {
        return typeOfWork;
    }

    public void setTypeOfWork(String typeOfWork) {
        this.typeOfWork = typeOfWork;
    }
}
