package com.unip.aps.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data()
@AllArgsConstructor()
public class TokenPayload {
  private String token;
}
