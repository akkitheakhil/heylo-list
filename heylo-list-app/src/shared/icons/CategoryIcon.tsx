import React from "react";
import { IconPropsModel } from "./IconPropModel";
import { SvgXml } from "react-native-svg";

const CategoryIcon = ({ fill, secondaryFill }: IconPropsModel) => {
  const icon = `
  <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="layer-group" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-layer-group fa-w-16 fa-5x">
  <g class="fa-group">
    <path fill="${fill}" d="M12.41 236.31L70.51 210l161.63 73.27a57.64 57.64 0 0 0 47.72 0L441.5 210l58.09 26.33c16.55 7.5 16.55 32.5 0 40L266.64 381.9a25.68 25.68 0 0 1-21.29 0L12.41 276.31c-16.55-7.5-16.55-32.5 0-40z" class="fa-secondary"></path>
    <path fill="${
      secondaryFill ? secondaryFill : fill
    }" d="M12.41 148l232.94 105.7a25.61 25.61 0 0 0 21.29 0L499.58 148c16.55-7.51 16.55-32.52 0-40L266.65 2.32a25.61 25.61 0 0 0-21.29 0L12.41 108c-16.55 7.5-16.55 32.52 0 40zm487.18 216.11l-57.87-26.23-161.86 73.37a57.64 57.64 0 0 1-47.72 0L70.29 337.88l-57.88 26.23c-16.55 7.5-16.55 32.5 0 40L245.35 509.7a25.68 25.68 0 0 0 21.29 0l233-105.59c16.5-7.5 16.5-32.5-.05-40z" class="fa-primary"></path>
  </g>
</svg>

    `;

  const CategoryIconSVG = () => <SvgXml xml={icon} width={32} height={32} />;

  return <CategoryIconSVG />;
};

export default CategoryIcon;
