package com.vannessp.developer.restservice.payload.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class CompanyProfileRequest {

    @NotNull
    @NotBlank
    private String companyName;

    @NotNull
    @NotBlank
    private String companyNameTH;

    @NotNull
    @NotBlank
    private String typeOfBusiness;

    @NotNull
    @NotBlank
    private String telephoneNumber;

    private String logo;

    @NotNull
    @NotBlank
    private String address;

    private String contactEmail;

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyNameTH() {
        return companyNameTH;
    }

    public void setCompanyNameTH(String companyNameTH) {
        this.companyNameTH = companyNameTH;
    }

    public String getTypeOfBusiness() {
        return typeOfBusiness;
    }

    public void setTypeOfBusiness(String typeOfBusiness) {
        this.typeOfBusiness = typeOfBusiness;
    }

    public String getTelephoneNumber() {
        return telephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }
}
