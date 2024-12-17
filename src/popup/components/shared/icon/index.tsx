import React from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IconBaseProps, IconType } from "react-icons";
import CheckCircleFilled from "@components/shared/icon/checkCircleFilled";
import {
  FiChevronLeft,
  FiChevronRight,
  FiLayers,
  FiYoutube,
  FiCheckCircle,
  FiArrowLeft,
  FiMoreVertical,
  FiExternalLink,
  FiMaximize,
  FiArrowDownCircle,
  FiX,
  FiXCircle,
  FiSearch,
  FiMoon,
  FiSun,
  FiInstagram,
  FiImage,
} from "react-icons/fi";

export enum IconNames {
  previous = "FiChevronLeft",
  next = "FiChevronRight",
  gallery = "FiLayers",
  video = "FiYoutube",
  checkCircle = "FiCheckCircle",
  checkCircleFilled = "CheckCircleFilled",
  back = "FiArrowLeft",
  options = "FiMoreVertical",
  externalLink = "FiExternalLink",
  maximize = "FiMaximize",
  download = "FiArrowDownCircle",
  close = "FiX",
  closeCircle = "FiXCircle",
  search = "FiSearch",
  darkMode = "FiMoon",
  lightMode = "FiSun",
  instagram = "FiInstagram",
  image = "FiImage",
  twitterX = "FaSquareXTwitter",
}
export interface IconProps extends IconBaseProps {
  icon: keyof typeof IconNames;
}

export default function Icon({ icon, ...props }: IconProps) {
  let RenderIcon: IconType | React.JSX.Element;

  switch (IconNames[icon]) {
    case IconNames.previous:
      RenderIcon = FiChevronLeft;
      break;

    case IconNames.next:
      RenderIcon = FiChevronRight;
      break;

    case IconNames.gallery:
      RenderIcon = FiLayers;
      break;

    case IconNames.video:
      RenderIcon = FiYoutube;
      break;

    case IconNames.checkCircle:
      RenderIcon = FiCheckCircle;
      break;

    case IconNames.checkCircleFilled:
      RenderIcon = CheckCircleFilled;
      break;

    case IconNames.back:
      RenderIcon = FiArrowLeft;
      break;

    case IconNames.options:
      RenderIcon = FiMoreVertical;
      break;

    case IconNames.externalLink:
      RenderIcon = FiExternalLink;
      break;

    case IconNames.maximize:
      RenderIcon = FiMaximize;
      break;

    case IconNames.download:
      RenderIcon = FiArrowDownCircle;
      break;

    case IconNames.close:
      RenderIcon = FiX;
      break;

    case IconNames.search:
      RenderIcon = FiSearch;
      break;

    case IconNames.darkMode:
      RenderIcon = FiMoon;
      break;

    case IconNames.lightMode:
      RenderIcon = FiSun;
      break;

    case IconNames.closeCircle:
      RenderIcon = FiXCircle;
      break;

    case IconNames.twitterX:
      RenderIcon = FaSquareXTwitter;
      break;

    case IconNames.instagram:
      RenderIcon = FiInstagram;
      break;

    case IconNames.image:
      RenderIcon = FiImage;
      break;
  }

  return <RenderIcon {...props} />;
}
