import { array, InferType, number, object, string } from "yup";

const defaultMedia = object({
  height: number().required("Height is required"),
  url: string().required("Url is required"),
  width: number().required("Width is required"),
});

export type ValidatedVideo = InferType<typeof video>;
const video = array().of(defaultMedia).min(1, "Image array is empty");

export type ValidatedImage = InferType<typeof image>;
const image = object({
  candidates: array()
    .of(defaultMedia)
    .min(1, "Image array is empty")
    .required("Image array is required"),
})

export type ValidatedCarousel = InferType<typeof carousel>;
const carousel = array()
  .of(
    object({
      image_versions2: image,
      video_versions: video.optional(),
    })
  )
  .min(1, "Carousel array is empty");

export const ResponseValidation = {
  video,
  image,
  carousel,
};
