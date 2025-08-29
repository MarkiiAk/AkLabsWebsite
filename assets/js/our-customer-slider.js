$(document).ready(function () {
  var owl = $(".customer-carousel");

  owl.owlCarousel({
    items: 2,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: true,
    dotsEach: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
    onInitialized: updatePagination,
    onTranslated: updatePagination,
  });

  // Function to update the dot navigation dynamically
  function updatePagination(event) {
    var totalItems = event.item.count;
    var currentItem =
      event.item.index + 1 - event.relatedTarget._clones.length / 2;

    if (currentItem > totalItems) {
      currentItem = currentItem - totalItems;
    }

    // Custom code to modify dot style (optional)
    $(".owl-dot").removeClass("active-dot");
    $(".owl-dot:nth-child(" + currentItem + ")").addClass("active-dot");
  }
});
