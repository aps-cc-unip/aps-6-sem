package com.unip.aps.util.images;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.unip.aps.util.functional.Result;

import lombok.extern.slf4j.Slf4j;

@Slf4j()
@Service()
public class ImageService {
  static Pattern imagePattern = Pattern.compile("image/(jpg|jpeg|png)");

  public Result<Boolean, Exception> isValid(MultipartFile image) {
    if (image == null) {
      return Result.err(new Exception("An image is required"));
    }

    if (image.getContentType() == null) {
      return Result.err(new Exception("The provided mimetype for the image is not a valid image"));
    }

    var matcher = imagePattern.matcher(image.getContentType());

    if (!matcher.matches()) {
      return Result.err(new Exception("The provided mimetype for the image is not a valid image"));
    }

    return Result.ok(true);
  }

  @SuppressWarnings("null")
  public String getImageFilename(MultipartFile image) {
    var imageId = UUID.randomUUID().toString();
    var filename = imageId + "." + image.getContentType().split("/")[1];

    return filename;
  }

  public boolean saveImage(MultipartFile image, Path basePath) {
    try {
      Files.write(basePath, image.getBytes());
      return true;
    } catch (Exception _exception) {
      return false;
    }
  }

  private boolean compareImagePassword(BufferedImage original, BufferedImage current) {
    log.info("Comparing images");
    if (original.getWidth() != current.getWidth() || original.getHeight() != current.getHeight()) {
      return false;
    }

    log.info("Images have the same size");
    for (int x = 0; x < original.getWidth(); x++) {
      for (int y = 0; y < original.getHeight(); y++) {
        if (original.getRGB(x, y) != current.getRGB(x, y)) {
          return false;
        }
      }
    }

    log.info("Images are the same");
    return true;
  }

  public boolean compareImagePassword(BufferedImage original, MultipartFile rawCurrent) {
    try {
      InputStream inputStream = new ByteArrayInputStream(rawCurrent.getBytes());
      BufferedImage current = ImageIO.read(inputStream);

      return compareImagePassword(original, current);
    } catch (Exception _exception) {
      return false;
    }
  }

  public boolean compareImagePassword(String original, MultipartFile rawCurrent) {
    try {
      File originalFile = new File(original);
      BufferedImage originalImage = ImageIO.read(originalFile);

      return compareImagePassword(originalImage, rawCurrent);
    } catch (Exception _exception) {
      log.error("Error while comparing images", _exception);
      return false;
    }
  }
}
