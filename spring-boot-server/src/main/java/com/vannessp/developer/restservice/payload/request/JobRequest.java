package com.vannessp.developer.restservice.payload.request;

public class JobRequest {

    private String title;

    private String type;

    private String category;

    private String availablePosition;

    private String allowance;

    private String workingTime;

    private String workingHoliday;

    private String location;

    private String description;

    private String contactNumber;

    private String contactPersonName;

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
}
