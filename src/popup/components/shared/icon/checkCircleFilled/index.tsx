import React from "react";
import { IconBaseProps } from "react-icons";
import { FiCheckCircle } from "react-icons/fi";

import * as styles from "./styles.module.css";

const CheckCircleFilled = ({ className, ...icon }: IconBaseProps) => (
  <FiCheckCircle {...icon} className={`${styles.filled} ${className}`} />
);

export default CheckCircleFilled;
