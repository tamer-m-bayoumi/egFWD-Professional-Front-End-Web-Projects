/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Begin Global Variables
 *
 */

const navList = document.querySelector("#navbar__list");
const menuHeader = document.querySelector(".page__header");
const mainBody = document.querySelector("main");
const scrollToTopBtn = document.querySelector("#scroll__to__top");
var menuVisibilityTimeout = null;

/**
 * End Global Variables
 * Begin Helper Functions
 *
 */

// Set viewed section to be active in menu
function setViewedSectionToActiveInMenu() {
  let sections = document.querySelectorAll(".section__container");
  let menuListItemsLinks = document.querySelectorAll(".menu__link");
  let headerHight = document
    .querySelector(".page__header")
    .getBoundingClientRect().height;

  // show menu during scrolling
  menuHeader.classList.remove("hide__nav__menu");

  // show or hide the "scroll to top" button
  scrollToTopAdjust();

  // locate the viewed section and set the relative menu item to active
  sections.forEach(function (currentSection, index) {
    let sectionVerticalPosition =
      currentSection.getBoundingClientRect().height +
      currentSection.getBoundingClientRect().top -
      headerHight;

    menuListItemsLinks[index].classList.remove("your_active_class");
    sections[index].classList.remove("your_active_class");

    if (
      sectionVerticalPosition > 0 &&
      sectionVerticalPosition < currentSection.getBoundingClientRect().height
    ) {
      menuListItemsLinks[index].classList.add("your_active_class");
      sections[index].classList.add("your_active_class");
      if (index > 0) {
        menuListItemsLinks[index - 1].classList.remove("your_active_class");
        sections[index - 1].classList.remove("your_active_class");
      }
    }
  });

  // hide menu after scroll ending
  setMenuVisbility();
}

// show or hide the "scroll to top" button
function scrollToTopAdjust() {
  window.scrollY > window.innerHeight
    ? scrollToTopBtn.classList.add("show")
    : scrollToTopBtn.classList.remove("show");
}

// hide menu after scroll ending
function setMenuVisbility() {
  if (menuVisibilityTimeout) {
    clearTimeout(menuVisibilityTimeout);
    menuVisibilityTimeout = setTimeout(toggleMenuVisibility, 100);
  } else {
    menuVisibilityTimeout = setTimeout(toggleMenuVisibility, 100);
  }
}

// toggle menu visibilty
function toggleMenuVisibility() {
  let isMenuHidden = menuHeader.classList.contains("hide__nav__menu");
  if (window.scrollY == 0 && isMenuHidden) {
    menuHeader.classList.remove("hide__nav__menu");
    return;
  }

  if (window.scrollY > 0 && !isMenuHidden) {
    menuHeader.classList.add("hide__nav__menu");
    return;
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// Build Nav Menu from Sections
function buildNav() {
  let sections = document.querySelectorAll(".section__container");
  const menuListItemsContainer = document.createDocumentFragment();

  // build menu items based on sections
  sections.forEach(function (currentSection) {
    let landingDiv = currentSection.querySelector(".landing__container");
    let collabseSpan = currentSection.querySelector(
      ".material-symbols-outlined"
    );
    let menuListItem = document.createElement("li");
    let menuListItemLink = document.createElement("a");

    menuListItemLink.classList.add("menu__link");
    menuListItemLink.innerText = currentSection.getAttribute("data-nav");

    // handle click on menu item to go to the realtive section
    menuListItemLink.addEventListener("click", function (event) {
      event.preventDefault();
      currentSection.scrollIntoView({ behavior: "smooth" });
    });

    // handle collabse button click
    handleCollabseButtonClickEvent(collabseSpan, landingDiv);

    menuListItem.appendChild(menuListItemLink);
    menuListItemsContainer.appendChild(menuListItem);
  });
  navList.appendChild(menuListItemsContainer);
}

// handle collabse button click
function handleCollabseButtonClickEvent(collabseSpan, landingDiv) {
  collabseSpan.addEventListener("click", () => {
    let isCollabsed = collabseSpan.innerText == "expand_more";
    if (isCollabsed) {
      collabseSpan.innerText = "expand_less";
    } else {
      collabseSpan.innerText = "expand_more";
    }
    landingDiv.querySelectorAll("article").forEach(function (currentArticle) {
      currentArticle.classList.toggle("hide_Content");
    });
  });
}

buildNav();

/**
 * End Main Functions
 * Begin Events
 *
 */

// handle scrolling on the document
document.addEventListener("scroll", setViewedSectionToActiveInMenu);

// handle clicking on "scroll to top" button
scrollToTopBtn.addEventListener("click", function () {
  if (window.scrollY > 0) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});

/**
 * End Events
 *
 */
