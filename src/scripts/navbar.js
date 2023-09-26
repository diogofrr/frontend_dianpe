(function () {
  const button = document.getElementById("hamburguerIcon");
  const menu = document.getElementById("menu");

  function activeMenu() {
    button.classList.toggle("hamburguerIcon--active");
    menu.classList.toggle("pageHeader__navList--active");

    const menusIsActive = button.classList.contains("hamburguerIcon--active");
    event.currentTarget.setAttribute("aria-expanded", menusIsActive);
  }

  button.addEventListener("click", activeMenu); //Evento de touch
})();
