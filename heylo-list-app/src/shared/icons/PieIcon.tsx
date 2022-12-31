import React from "react";
import { IconPropsModel } from "./IconPropModel";
import { SvgXml } from "react-native-svg";

const PieIcon = ({ fill, secondaryFill }: IconPropsModel) => {
  const icon = `
  <svg viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill="${fill}" d="M33.5186 39.1694C34.123 39.7739 34.0772 40.8001 33.3801 41.2942C29.8899 43.7761 25.7246 45.1323 21.4422 45.1811C10.1327 45.3214 0.397266 36.0493 0.012545 24.7424C-0.361588 13.7328 7.67697 4.54626 18.1915 3.06032C19.0254 2.94208 19.7657 3.63475 19.7657 4.47743V25.4156L33.5186 39.1694Z" />
  <path fill="${
    secondaryFill ? secondaryFill : fill
  }" fill-opacity="0.4" d="M45.1785 19.6977C44.4479 9.15671 36.0246 0.733428 25.4836 0.00281012C24.6788 -0.0492508 24.0012 0.629306 24.0012 1.43581V21.1801H43.7464C44.5529 21.1801 45.2305 20.5025 45.1785 19.6977ZM46.5718 25.4156H25.6336L39.5753 39.3573C40.1047 39.8868 40.9871 39.9335 41.5333 39.4173C45.0345 36.1281 47.3105 31.7441 47.9862 26.988C48.1071 26.1559 47.4145 25.4156 46.5718 25.4156Z" />
  </svg>
    `;

  const PieIconSVG = () => <SvgXml xml={icon} width={48} height={46} />;

  return <PieIconSVG />;
};

export default PieIcon;
