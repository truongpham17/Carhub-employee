import { RentDetailType } from 'types';
import { formatDate, formatPrice } from 'Utils/date';
import { setPopUpData } from '@redux/actions';

export function getData(rental: RentDetailType, dispatch) {
  // console.log(rental.status, rental.sharing);
  const result = [
    {
      att: 'customer',
      label: 'Customer',
      detail: rental.customer.fullName,
      pressable: true,
      onItemPress() {
        setPopUpData(dispatch)({
          popupType: 'profile',
          description: rental.customer,
        });
      },
      nextIcon: 'next',
    },

    { att: '_id', label: 'ID', detail: rental._id, hide: true },
    {
      att: 'startDate',
      label: 'From date',
      detail: formatDate(rental.startDate),
    },
    {
      att: 'endDate',
      label: 'To date',
      detail: formatDate(rental.endDate),
    },
    {
      att: 'carId',
      label: 'Car model',
      detail: rental.carModel.name,
    },
    {
      att: 'cost',
      label: 'Price',
      detail: formatPrice(rental.totalCost),
    },
    {
      att: 'deposit',
      label: 'Deposit',
      detail: formatPrice(rental.deposit),
    },
    { detail: getStatus(rental.status), att: 'status', label: 'Type' },
  ];
  if (rental.status === 'SHARED') {
    result.push({
      att: 'shareto',
      label: 'Share to',
      detail: rental.sharing.customer.fullName,
      pressable: true,
      onItemPress() {
        setPopUpData(dispatch)({
          popupType: 'profile',
          description: rental.sharing.customer,
        });
      },
      nextIcon: 'next',
    });
  }
  return result;
}

function getStatus(status) {
  switch (status) {
    case 'UPCOMING':
      return 'Waiting for hire';
    case 'CURRENT':
      return 'Hired';
    default:
      return status;
  }
}

export function getActionType(rental: RentDetailType, ignoreTransaction) {
  const TRANSACTION_RENTAL = ['CURRENT', 'UPCOMING'];
  if (ignoreTransaction && rental.status === 'UPCOMING') return 'decline';
  if (ignoreTransaction) return '';
  if (rental.status === 'CURRENT' || rental.status === 'SHARED') {
    return 'transaction-accept';
  }
  if (TRANSACTION_RENTAL.includes(rental.status)) {
    return 'transaction';
  }
  return '';
}
