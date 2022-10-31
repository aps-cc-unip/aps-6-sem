package com.unip.aps.users.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unip.aps.users.dto.UserLoginDto;
import com.unip.aps.users.dto.UserRegistrationDto;
import com.unip.aps.users.models.User;
import com.unip.aps.users.repositories.UserRepository;

@Service()
public class UserService {
  @Autowired()
  private UserRepository userRepository;

  public User registerUser(UserRegistrationDto userRegistrationDto, String password) {
    var user = new User();

    BeanUtils.copyProperties(userRegistrationDto, user);
    user.setPassword(password);

    return userRepository.save(user);
  }

  public User findUserByEmail(String email) {
    return userRepository.findOneByEmail(email);
  }
}
