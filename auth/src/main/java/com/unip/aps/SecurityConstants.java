package com.unip.aps;

public class SecurityConstants {
  public static final byte[] SECRET = "S3cr4t>>k_4y>>1<<<@@@;_".getBytes();
  public static final long EXPIRATION_TIME = ((1000 * 60) * 60) * 24; // 1 day
  public static final String TOKEN_PREFIX = "Bearer ";
  public static final String HEADER_STRING = "Authorization";
}
