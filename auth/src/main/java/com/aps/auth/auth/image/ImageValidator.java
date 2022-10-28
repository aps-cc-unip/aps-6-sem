package com.aps.auth.auth.image;

import java.awt.image.BufferedImage;
import org.springframework.stereotype.Component;

@Component()
public class ImageValidator {
  /**
   * Validates wether two images match comparing each pixel of the image.
   * 
   * @param original Original image to be compared.
   * @param request  Requested image to compare with the original.
   * @return True if the images match, false otherwise.
   */
  public boolean validate(BufferedImage original, BufferedImage request) {
    if (original.getHeight() != request.getHeight() || original.getWidth() != request.getWidth()) {
      return false;
    }

    for (int i = 0; i < original.getWidth(); i++) {
      for (int j = 0; j < original.getHeight(); j++) {
        if (original.getRGB(i, j) != request.getRGB(i, j)) {
          return false;
        }
      }
    }

    return true;
  }
}
