package com.unip.aps.util.functional;

public class Result<T, E extends Exception> {
  private T value;
  private E error;

  public Result(T value) {
    this.value = value;
  }

  public Result(E error) {
    this.error = error;
  }

  public boolean isOk() {
    return value != null;
  }

  public boolean isErr() {
    return error != null;
  }

  public T unwrap() {
    if (isErr()) {
      return null;
    }

    return value;
  }

  public E unwrapErr() {
    if (isOk()) {
      return null;
    }

    return error;
  }

  public static <T, E extends Exception> Result<T, E> ok(T value) {
    return new Result<T, E>(value);
  }

  public static <T, E extends Exception> Result<T, E> err(E error) {
    return new Result<T, E>(error);
  }
}
