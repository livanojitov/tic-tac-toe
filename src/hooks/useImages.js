import { useState, useCallback } from "react";
import { IMAGES_PER_CATEGORY } from "../Constants";

function useImages(user = 0, computer = 1) {
  const [images, setImages] = useState({ user, computer });

  const randomImage = useCallback(() => {
    let image = Math.floor(Math.random() * IMAGES_PER_CATEGORY);
    while (image === images.computer || image === images.user) {
      image = Math.floor(Math.random() * IMAGES_PER_CATEGORY);
    }
    return image;
  }, [images.computer, images.user]);

  const refreshImage = useCallback(
    (e) => {
      setImages({
        ...images,
        [e.target.id]: randomImage(),
      });
    },
    [images, randomImage]
  );

  if (images.user === images.computer) {
    setImages({
      ...images,
      user: randomImage(),
    });
  }

  return { images, refreshImage };
}

export default useImages;
