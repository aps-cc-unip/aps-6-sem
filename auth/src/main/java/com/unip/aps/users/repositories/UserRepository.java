package com.unip.aps.users.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.unip.aps.users.models.User;

@Repository()
public interface UserRepository extends JpaRepository<User, Long> {
  public User findOneByEmail(String email);
}
