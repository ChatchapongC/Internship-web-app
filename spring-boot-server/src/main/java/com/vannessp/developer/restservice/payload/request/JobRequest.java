package com.vannessp.developer.restservice.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class JobRequest {

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

    private String description;

    @NotNull
    @NotBlank
    private String contactNumber;

    private String contactPersonName;

    @NotNull
    @NotBlank
    private String educationQualification;

    @NotNull
    @NotBlank
    private String gender;

    @NotNull
    @NotBlank
    private String experience;

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
