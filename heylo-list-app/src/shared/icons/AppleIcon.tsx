import { View, Text } from "react-native";
import React from "react";
import { IconPropsModel } from "./IconPropModel";
import { SvgXml } from "react-native-svg";

const AppleIcon = ({ fill }: IconPropsModel) => {
  const icon = `
  <svg width="21" height="24" viewBox="0 0 21 24"  fill="${fill}" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.862 12.6827C16.8513 10.7162 17.7407 9.23204 19.5411 8.13898C18.5337 6.69765 17.012 5.90465 15.0027 5.74926C13.1006 5.59923 11.0216 6.85839 10.2608 6.85839C9.45708 6.85839 7.61388 5.80284 6.16719 5.80284C3.17736 5.85106 0 8.1872 0 12.9399C0 14.3437 0.25719 15.7939 0.771569 17.2906C1.45741 19.2571 3.93286 24.0794 6.51547 23.999C7.86572 23.9669 8.81946 23.0399 10.5769 23.0399C12.2808 23.0399 13.1649 23.999 14.6705 23.999C17.2746 23.9615 19.5143 19.5786 20.168 17.6068C16.6745 15.9618 16.862 12.7845 16.862 12.6827ZM13.8293 3.88464C15.2921 2.14861 15.1581 0.56796 15.1152 0C13.8239 0.0750136 12.329 0.878731 11.4771 1.86998C10.5394 2.93089 9.98753 4.24363 10.1054 5.72247C11.5039 5.82963 12.7791 5.11164 13.8293 3.88464Z" fill="white" fill-opacity="0.9" />
  </svg>
    `;

  const AppleIconSVG = () => <SvgXml xml={icon} width={24} height={24} />;

  return <AppleIconSVG />;
};

export default AppleIcon;
