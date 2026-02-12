package com.brijwasi.profile.utils;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StandardizedApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private int statusCode;
}
