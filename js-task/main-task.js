console.log('Hello~~');

// document.querySelector('h1').style.color = 'blue';

$('h1').css('color', 'blue');

// Tooltip 초기화
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});