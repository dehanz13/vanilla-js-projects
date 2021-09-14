// Access a css variable from JS
const box = document.querySelector(".box");
const boxStyles = getComputedStyle(box);
const boxMainColor = boxStyles.getPropertyValue("--box-main-color");

// change the header color to the --box-main-color from css in JS
const header = document.querySelector("#main-header");
header.style.setProperty("--header-bg-color", boxMainColor);

console.log(boxMainColor);
