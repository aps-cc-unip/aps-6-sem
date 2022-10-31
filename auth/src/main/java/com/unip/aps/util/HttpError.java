package com.unip.aps.util;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data()
@AllArgsConstructor()
public class HttpError {
  private HttpStatus status;
  private String message;
}
