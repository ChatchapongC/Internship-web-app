package com.vannessp.developer.restservice.payload.request;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.Nullable;

import javax.persistence.Column;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.Set;

public class UserProfileRequest {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @NotNull
    @Size(min = 2, max = 50, message = "Please provide first size between 2 - 100")
    private String firstName;

    @NotBlank
    @NotNull
    @Size(min = 2, max = 50, message = "Please provide first size between 2 - 100")
    private String lastName;

    @Size(min = 2, max = 50, message = "Please provide first size between 2 - 100")
    private String firstNameTH;

    @Size(min = 2, max = 50, message = "Please provide first size between 2 - 100")
    private String lastNameTH;

    private Integer age;

    private String gender;

    private String nationality;

    private String religion;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDate dateOfBirth;

    @NotBlank
    @NotNull
    @NotEmpty
    private String mobileNumber;

    @NotBlank
    @NotNull
    private String address;

    @Nullable
    private Integer weight;

    @Nullable
    private Integer height;

    private  String typeOfWork;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
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

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
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

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public String getTypeOfWork() {
        return typeOfWork;
    }

    public void setTypeOfWork(String typeOfWork) {
        this.typeOfWork = typeOfWork;
    }
}
