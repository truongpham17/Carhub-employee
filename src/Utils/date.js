import moment from 'moment';

export function formatDate(date: Date) {
  return moment(date).format('MMM DD YYYY');
}
export function substractDate(fromDate, toDate) {
  return moment(toDate).diff(fromDate, 'days');
}

export function formatPrice(price) {
  return `$ ${price}`;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
