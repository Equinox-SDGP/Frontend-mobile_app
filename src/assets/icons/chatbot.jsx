import React from "react";
import Svg, { Path } from "react-native-svg";
import {Colors, IconProps, ICON_SIZE} from "./icon";

const chatIcon = ({active}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="23"
      fill="none"
      viewBox="0 0 25 23"
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9.03 7.176h.012m6.164 0h.012M19.53 1a3.706 3.706 0 013.706 3.706v9.882a3.706 3.706 0 01-3.706 3.706h-6.176L7.176 22v-3.706h-2.47A3.706 3.706 0 011 14.588V4.706A3.706 3.706 0 014.706 1h14.823zM9.03 12.118a4.326 4.326 0 006.176 0"
      ></path>
    </svg>
  );
}

export default chatIcon;