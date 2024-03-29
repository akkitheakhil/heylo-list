import { View, Text } from "react-native";
import React from "react";
import { IconPropsModel } from "./IconPropModel";
import { SvgXml } from "react-native-svg";

const GoogleIcon = ({ fill }: IconPropsModel) => {
  const icon = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="${fill}" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.6129 12.2806C23.6129 19.1274 18.9242 24 12 24C5.36129 24 0 18.6387 0 12C0 5.36129 5.36129 0 12 0C15.2323 0 17.9516 1.18548 20.0468 3.14032L16.7806 6.28064C12.5081 2.15806 4.5629 5.25484 4.5629 12C4.5629 16.1855 7.90645 19.5774 12 19.5774C16.7516 19.5774 18.5323 16.171 18.8129 14.4048H12V10.2774H23.4242C23.5355 10.8919 23.6129 11.4823 23.6129 12.2806Z" fill="white" fill-opacity="0.9" />
    </svg>
    `;

  const GoogleIconSVG = () => <SvgXml xml={icon} width={24} height={24} />;

  return <GoogleIconSVG />;
};

export default GoogleIcon;
