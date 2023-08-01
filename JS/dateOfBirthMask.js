

var dateMask = IMask(
  document.getElementById('account-date-of-birth'),
  {
    mask: Date,
    min: new Date(1930, 0, 1),
    max: new Date(2030, 0, 1),
    lazy: false
  });