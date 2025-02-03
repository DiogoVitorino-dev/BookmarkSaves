import React from "react";
import { IconBaseProps, IconType } from "react-icons";
import { FiX, FiSearch, FiMoon, FiSun, FiXCircle } from "react-icons/fi";

export enum IconNames {
  close = "FiX",
  closeCircle = "FiXCircle",
  search = "FiSearch",
  darkMode = "FiMoon",
  lightMode = "FiSun",
}
export interface IconProps extends IconBaseProps {
  icon: keyof typeof IconNames;
}

export default function Icon({ icon, ...props }: IconProps) {
  let RenderIcon: IconType | React.JSX.Element;

  switch (IconNames[icon]) {
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
  }

  return <RenderIcon {...props} />;
}
