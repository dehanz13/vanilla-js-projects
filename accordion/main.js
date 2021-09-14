const accordionHeaders = document.querySelectorAll(".accordion-item-header");
const accordionBodies = document.querySelectorAll(".accordion-item-body");

accordionHeaders.forEach((item) => {
  // add Event Listener
  item.addEventListener("click", (e) => {
    itemHeader = e.target;
    itemBody = e.target.nextElementSibling;
    itemHeader.classList.toggle("active");
    itemBody.classList.toggle("hide");
  });
});

// hide all when page loads / refreshes
document.addEventListener("DOMContentLoaded", () => {
  accordionBodies.forEach((item) => {
    item.classList.add("hide");
  });
});
