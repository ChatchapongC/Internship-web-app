package com.vannessp.developer.restservice.payload.request;

import java.util.List;

public class FilterRequest {

    private List<String> category;

    public List<String> getCategory() {
        return category;
    }

    public void setCategory(List<String> category) {
        this.category = category;
    }
}
