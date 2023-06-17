$(function() {
  $.scrollify({
    section: ".section",
    easing: "easeOutExpo",
    scrollSpeed: 1100,
    offset: 0,
    scrollbars: false,
    setHeights: false,
    updateHash: false,
    before: function(index) {
      // Opcional: Realizar acciones antes de cambiar de sección
    },
    after: function(index) {
      // Opcional: Realizar acciones después de cambiar de sección
      updateIndicator(index);
    }
  });

  function updateIndicator(index) {
    var indicator = $('.indicator');
    var sections = $('.section');
    var currentSection = sections.eq(index);

    var topOffset = currentSection.offset().top;
    var sectionHeight = currentSection.outerHeight();

    var indicatorPosition = topOffset + sectionHeight / 2;

    indicator.css('top', indicatorPosition);
  }
  
  $('.face').click(function() {
    var sectionName = $(this).data('section-name');
    var sectionElement = document.querySelector('#' + sectionName);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      setTimeout(function() {
        $.scrollify.instantMove(sectionName);
        $.scrollify.update();
      }, 1000); // Ajusta el tiempo según sea necesario para que coincida con la duración del desplazamiento suave
      
    }
  });
});
