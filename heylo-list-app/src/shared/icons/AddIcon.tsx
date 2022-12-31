import React from "react";
import { IconPropsModel } from "./IconPropModel";
import { SvgXml } from "react-native-svg";

const AddIcon = ({ fill, secondaryFill, height, width }: IconPropsModel) => {
  const icon = `
  <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-plus-circle fa-w-16 fa-5x">
  <g class="fa-group">
    <path fill="${fill}" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276a12 12 0 0 1-12 12h-92v92a12 12 0 0 1-12 12h-56a12 12 0 0 1-12-12v-92h-92a12 12 0 0 1-12-12v-56a12 12 0 0 1 12-12h92v-92a12 12 0 0 1 12-12h56a12 12 0 0 1 12 12v92h92a12 12 0 0 1 12 12z" class="fa-secondary"></path>
    <path fill="${
      secondaryFill ? secondaryFill : fill
    }" d="M400 284a12 12 0 0 1-12 12h-92v92a12 12 0 0 1-12 12h-56a12 12 0 0 1-12-12v-92h-92a12 12 0 0 1-12-12v-56a12 12 0 0 1 12-12h92v-92a12 12 0 0 1 12-12h56a12 12 0 0 1 12 12v92h92a12 12 0 0 1 12 12z" class="fa-primary"></path>
  </g>
</svg>


    `;

  const AddIconSVG = () => <SvgXml xml={icon} width={width} height={height} />;

  return <AddIconSVG />;
};

export default AddIcon;
