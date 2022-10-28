package com.aps.auth.auth.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.aps.auth.auth.image.ImageValidator;

@RestController()
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  private ImageValidator validator;

  @PostMapping("/login")
  public String auth(@RequestParam("email") String email, @RequestParam("image") MultipartFile file) {
    return "Hello, world!";
  }
}
