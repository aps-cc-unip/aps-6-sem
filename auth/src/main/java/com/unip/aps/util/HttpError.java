package com.unip.aps.util;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data()
@AllArgsConstructor()
public class HttpError {
  private Integer status;
  private String message;
}
