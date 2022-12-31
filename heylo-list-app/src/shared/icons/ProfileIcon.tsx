import React from "react";
import { IconPropsModel } from "./IconPropModel";
import { SvgXml } from "react-native-svg";

const ProfileIcon = ({ fill, secondaryFill }: IconPropsModel) => {
  const icon = `
  <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="user-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="svg-inline--fa fa-user-circle fa-w-16 fa-5x">
  <g class="fa-group">
    <path fill="${fill}"  d="M248,8C111,8,0,119,0,256S111,504,248,504,496,393,496,256,385,8,248,8Zm0,96a88,88,0,1,1-88,88A88,88,0,0,1,248,104Zm0,344a191.61,191.61,0,0,1-146.5-68.2C120.3,344.4,157.1,320,200,320a24.76,24.76,0,0,1,7.1,1.1,124.67,124.67,0,0,0,81.8,0A24.76,24.76,0,0,1,296,320c42.9,0,79.7,24.4,98.5,59.8A191.61,191.61,0,0,1,248,448Z" class="fa-secondary"></path>
    <path fill="${
      secondaryFill ? secondaryFill : fill
    }" d="M248,280a88,88,0,1,0-88-88A88,88,0,0,0,248,280Zm48,40a24.76,24.76,0,0,0-7.1,1.1,124.67,124.67,0,0,1-81.8,0A24.76,24.76,0,0,0,200,320c-42.9,0-79.7,24.4-98.5,59.8,68.07,80.91,188.84,91.32,269.75,23.25A192,192,0,0,0,394.5,379.8C375.7,344.4,338.9,320,296,320Z" class="fa-primary"></path>
  </g>
</svg>


    `;

  const ProfileIconSVG = () => <SvgXml xml={icon} width={32} height={32} />;

  return <ProfileIconSVG />;
};

export default ProfileIcon;
