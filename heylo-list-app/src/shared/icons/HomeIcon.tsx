import React from "react";
import { IconPropsModel } from "./IconPropModel";
import { SvgXml } from "react-native-svg";

const HomeIcon = ({ fill, secondaryFill }: IconPropsModel) => {
  const icon = `
  <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="home-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-home-alt fa-w-18 fa-5x">
  <g class="fa-group">
    <path fill="${fill}" d="M336 463.58v-95.64a16 16 0 0 0-16-16h-64a16 16 0 0 0-16 16v95.71a16 16 0 0 1-15.92 16l-112.08.29a16 16 0 0 1-16-16V300.05L280.39 148.2a12.19 12.19 0 0 1 15.3 0L480 299.94v164a16 16 0 0 1-16 16l-112-.31a16 16 0 0 1-16-16.05z" class="fa-secondary"></path>
    <path fill="${
      secondaryFill ? secondaryFill : fill
    }" d="M530.92 300.94L295.69 107.2a12.19 12.19 0 0 0-15.3 0L45.17 300.94a12 12 0 0 1-16.89-1.64l-25.5-31a12 12 0 0 1 1.61-16.89l253.1-208.47a48 48 0 0 1 61 0l253.13 208.47a12 12 0 0 1 1.66 16.89l-25.5 31a12 12 0 0 1-16.86 1.64z" class="fa-primary"></path>
  </g>
</svg>

    `;

  const HomeIconSVG = () => <SvgXml xml={icon} width={32} height={32} />;

  return <HomeIconSVG />;
};

export default HomeIcon;
