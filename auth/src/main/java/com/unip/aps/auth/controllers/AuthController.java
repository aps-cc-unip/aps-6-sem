package com.unip.aps.auth.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.nio.file.Paths;
import java.util.Date;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import com.unip.aps.util.HttpError;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.unip.aps.SecurityConstants;
import com.unip.aps.auth.dto.TokenPayload;
import com.unip.aps.users.dto.UserLoginDto;
import com.unip.aps.users.dto.UserRegistrationDto;
import com.unip.aps.users.services.UserService;
import com.unip.aps.util.images.ImageService;

import lombok.extern.slf4j.Slf4j;

@Slf4j()
@RestController()
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {
  @Autowired()
  private UserService userService;

  @Autowired()
  private ImageService imageService;

  private static String rootPath = Paths.get(System.getProperty("user.dir"), "uploads").toString();

  @PostMapping("/register")
  @ExceptionHandler(HttpClientErrorException.class)
  public ResponseEntity<?> register(@ModelAttribute() @Valid() UserRegistrationDto userRegistrationDto)
      throws Exception {
    var image = userRegistrationDto.getPassword();
    var imageResult = imageService.isValid(image);

    if (imageResult.isErr()) {
      var err = imageResult.unwrapErr();
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new HttpError(400, err.getMessage()));
    }

    var filename = imageService.getImageFilename(image);
    var imagePath = Paths.get(rootPath, filename);

    if (!imageService.saveImage(image, imagePath)) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new HttpError(500, "Error saving image"));
    }

    userService.registerUser(userRegistrationDto, imagePath.toString());

    return ResponseEntity.status(HttpStatus.CREATED).body(null);
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@ModelAttribute() @Valid() UserLoginDto userLoginDto) {
    log.info("Attempting to login user '{}'", userLoginDto.getEmail());

    var user = userService.findUserByEmail(userLoginDto.getEmail());

    if (user == null) {
      log.warn("Could not find user with email '{}'", userLoginDto.getEmail());
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new HttpError(400, "Invalid email or password"));
    }

    var isValid = imageService.compareImagePassword(user.getPassword(), userLoginDto.getPassword());

    if (!isValid) {
      log.warn("The attempt to login user '{}' with the given password is invalid", userLoginDto.getEmail());

      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new HttpError(400, "Invalid email or password"));
    }

    log.info("Successfully logged in user '{}'", userLoginDto.getEmail());

    var token = JWT.create()
        .withSubject(user.getEmail())
        .withSubject(user.getId().toString())
        .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
        .sign(Algorithm.HMAC512(SecurityConstants.SECRET));

    var payload = new TokenPayload(token);

    return ResponseEntity.status(HttpStatus.OK).body(payload);
  }
}
