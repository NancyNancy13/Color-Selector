"use strict";
// declaring all variables
const gethexValue = document.querySelector(".hexValue");
const getrgbValue = document.querySelector(".rgbValue");
const gethslValue = document.querySelector(".hslValue");
const wheel = document.querySelector("#wheel");
const selectColor = document.querySelector(".chooseColor");

window.addEventListener("DOMContentLoaded", start);
function start() {
  wheel.addEventListener("input", selectedColor);
}
// get select color
function selectedColor() {
  const hexValue = wheel.value.substring(1);
  const rgbValue = hexToRgb(hexValue);
  console.log(rgbValue);
  const hslValue = rgbToHsl(rgbValue);
  //   console.log(hslValue);
  displayValues(hexValue, rgbValue, hslValue);
  selectColor.style.backgroundColor = wheel.value;
}
// converting the values
// converting the hex to rgb
function hexToRgb(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5), 16);
  return { r, g, b };

  //   getrgbValue.textContent = `${r} ${g} ${b}`;
}
// convert rgb to hsl
function rgbToHsl(rgb) {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  //   paste the code from the assignment
  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  h = Math.round(h);
  s = Math.round(s);
  l = Math.round(l);

  return { h, s, l };
}
function displayValues(hex, rgb, hsl) {
  gethexValue.textContent = `#${hex}`;
  getrgbValue.textContent = `(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  gethslValue.textContent = `h:${hsl.h} s:${hsl.s} l:${hsl.l}`;
}
