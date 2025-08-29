// Navbar START.........................

const navbarMenu = document.getElementById("navbar");
const burgerMenu = document.getElementById("burger");
const overlayMenu = document.querySelector(".overlay");
const closeIcon = document.getElementById("close-icon"); // New close icon reference

// Show and Hide Navbar Function
const toggleMenu = () => {
  navbarMenu.classList.toggle("active");
  overlayMenu.classList.toggle("active");
};

// Close Navbar Function
const closeNavbar = () => {
  navbarMenu.classList.remove("active");
  overlayMenu.classList.remove("active");
};

// Collapse Mobile Submenu Function
const toggleSubMenu = (e) => {
  const menuDropdown = e.target.closest(".menu-dropdown"); // Updated to target `.menu-dropdown`
  const isInsideSubMenu = e.target.closest(".submenu");
  const submenuLink = e.target.closest(".submenu-link");

  // Check screen width (Mobile view < 0px)
  const isMobileView = window.innerWidth < 0;

  // If mobile view, do not collapse the submenu
  if (isMobileView) {
    return;
  }

  // Check if the click was on a menu-dropdown (not inside the submenu)
  if (menuDropdown && !isInsideSubMenu && !submenuLink) {
    e.preventDefault();

    const subMenu = menuDropdown.querySelector(".submenu");
    const menuLink = menuDropdown.querySelector(".menu-link");

    // If the clicked menu is already active, close it
    if (menuDropdown.classList.contains("active")) {
      menuDropdown.classList.remove("active");
      if (menuLink) menuLink.style.color = ""; // Reset text color
      if (subMenu) subMenu.style.maxHeight = null; // Collapse submenu
    } else {
      // Collapse all other active menus first
      collapseAllMenus();

      // Mark the clicked menu-dropdown as active and change text color to red
      menuDropdown.classList.add("active");

      // Expand the submenu if it's there
      if (subMenu) {
        subMenu.style.maxHeight = `${subMenu.scrollHeight}px`; // Expand submenu
      }
    }
  } else if (submenuLink) {
    // If a submenu link is clicked, activate the submenu item
    const submenuItem = submenuLink.closest(".submenu-item");
    activateSubmenuItem(submenuItem);

    // Ensure the parent menu-dropdown stays active (so submenu remains visible)
    const menuDropdown = submenuItem.closest(".menu-dropdown");
    menuDropdown.classList.add("active");

    // Collapse any other active menus (except the current one)
    collapseAllMenusExcept(menuDropdown);
  }
};

// Function to activate a submenu item (keeping the color and background changes)
const activateSubmenuItem = (submenuItem) => {
  // Deactivate all submenu items within the current dropdown
  const subMenu = submenuItem.parentElement;
  const allSubmenuItems = subMenu.querySelectorAll(".submenu-item");
  allSubmenuItems.forEach((item) => {
    item.classList.remove("active");
    const link = item.querySelector(".submenu-link");
    if (link) link.style.color = ""; // Reset text color
    item.style.backgroundColor = ""; // Reset background color
  });

  // Deactivate all other menu items (reset their color)
  const allMenuItems = document.querySelectorAll(".menu-item");
  allMenuItems.forEach((menuItem) => {
    const menuLink = menuItem.querySelector(".menu-link");
    if (menuLink) {
      menuLink.style.color = ""; // Reset color for other menu items
    }
  });
};

// Collapse all menus
const collapseAllMenus = () => {
  const activeMenus = document.querySelectorAll(".menu-dropdown.active"); // Only collapse `.menu-dropdown`
  activeMenus.forEach((menu) => {
    const menuLink = menu.querySelector(".menu-link");
    const subMenu = menu.querySelector(".submenu");
    menu.classList.remove("active");
    if (menuLink) menuLink.style.color = ""; // Reset text color
    if (subMenu) subMenu.style.maxHeight = null; // Reset submenu height
  });

  // Reset all submenu links and items
  const submenuItems = document.querySelectorAll(".submenu-item.active");
  submenuItems.forEach((item) => {
    item.classList.remove("active");
    item.style.backgroundColor = ""; // Reset background color
  });

  const submenuLinks = document.querySelectorAll(".submenu-link");
  submenuLinks.forEach((link) => {
    link.style.color = ""; // Reset submenu link text color
  });
};

// Collapse all menus except the current one
const collapseAllMenusExcept = (exceptMenu) => {
  const activeMenus = document.querySelectorAll(".menu-dropdown.active");
  activeMenus.forEach((menu) => {
    if (menu !== exceptMenu) {
      // Only collapse if it's not the menu we're keeping open
      const menuLink = menu.querySelector(".menu-link");
      const subMenu = menu.querySelector(".submenu");
      menu.classList.remove("active");
      if (menuLink) menuLink.style.color = ""; // Reset text color
      if (subMenu) subMenu.style.maxHeight = null; // Reset submenu height
    }
  });

  // Reset all submenu links and items
  const submenuItems = document.querySelectorAll(".submenu-item.active");
  submenuItems.forEach((item) => {
    item.classList.remove("active");
    item.style.backgroundColor = ""; // Reset background color
  });

  const submenuLinks = document.querySelectorAll(".submenu-link");
  submenuLinks.forEach((link) => {
    link.style.color = ""; // Reset submenu link text color
  });
};

// Initialize Event Listeners
burgerMenu.addEventListener("click", toggleMenu);
overlayMenu.addEventListener("click", toggleMenu);
navbarMenu.addEventListener("click", toggleSubMenu);
closeIcon.addEventListener("click", closeNavbar);

// Navbar End.........................

// Back to top button Start....................
var btn = $("#back_to_top");

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass("show");
  } else {
    btn.removeClass("show");
  }
});

btn.on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, "300");
});
// Back to top button End.........
