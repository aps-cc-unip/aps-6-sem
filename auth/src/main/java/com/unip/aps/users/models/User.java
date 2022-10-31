package com.unip.aps.users.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data()
@Entity()
@Table(name = "users")
@AllArgsConstructor()
@NoArgsConstructor()
public class User {
  @Id()
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(nullable = false)
  private String name;

  @Email()
  @Column(nullable = false, unique = true)
  private String email;

  @Enumerated(EnumType.STRING)
  private Role role = Role.USER;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  @CreationTimestamp()
  @Temporal(TemporalType.TIMESTAMP)
  private Date createdAt;

  @Column(nullable = false)
  @UpdateTimestamp()
  @Temporal(TemporalType.TIMESTAMP)
  private Date updatedAt;
}
