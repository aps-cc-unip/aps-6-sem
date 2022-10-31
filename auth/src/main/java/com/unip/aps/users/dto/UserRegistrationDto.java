package com.unip.aps.users.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data()
public class UserRegistrationDto {
  @NotBlank()
  private String name;

  @NotBlank()
  @Email()
  private String email;

  @NotNull()
  private MultipartFile password;
}