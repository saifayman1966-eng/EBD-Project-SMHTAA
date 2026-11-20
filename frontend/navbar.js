
export function createNavbar() {
  const navbar = document.createElement("nav");
  navbar.className = "mysta-navbar";

  navbar.innerHTML = `
    <a class="mysta-logo" href="#home">MYSTA</a>

    <button
      class="mysta-menu-toggle"
      aria-label="Toggle navigation"
      aria-expanded="false"
    >
      ☰
    </button>

    <div class="mysta-nav-links">
      <a href="#home">Home</a>
      <a href="#products">Perfumes</a>
      <a href="#about">About Us</a>
      <a href="#contact">Contact</a>
    </div>

    <a class="mysta-cart" href="#cart">Shopping Bag</a>
  `;

  const menuButton = navbar.querySelector(".mysta-menu-toggle");
  const links = navbar.querySelector(".mysta-nav-links");

  menuButton.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  return navbar;
}

export function renderNavbar() {
  if (document.querySelector(".mysta-navbar")) return;

  document.body.prepend(createNavbar());
}
