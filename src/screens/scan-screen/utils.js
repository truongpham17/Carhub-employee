import { RentalType, LeaseType, UserType } from 'types';
import moment from 'moment';

export function getRentalData(rental: RentalType, type: String) {
  return {
    data: [
      { att: '_id', label: 'ID', value: rental._id },
      {
        att: 'startDate',
        label: 'From date',
        value: moment(rental.startDate).format('DD/MMM/YYYY'),
      },
      {
        att: 'endDate',
        label: 'To date',
        value: moment(rental.endDate).format('DD/MMM/YYYY'),
      },
      {
        att: 'carId',
        label: 'Car model',
        value: rental.carModel.name,
      },
      { att: 'cost', label: 'Cost', value: rental.totalCost },
      {
        att: 'pickupLocation',
        label: 'Pick up location',
        value: rental.pickupHub.address,
      },
      { att: 'type', label: 'Type', value: 'Hiring request' },
    ],
    avatar: rental.customer.avatar,
    name: rental.customer.fullName,
    type,
  };
}

export function getLeaseData(lease: LeaseType, type: string) {
  return {
    data: [
      { att: '_id', label: 'ID', value: lease._id },
      {
        att: 'startDate',
        label: 'From date',
        value: moment(lease.startDate).format('DD/MMM/YYYY'),
      },
      {
        att: 'endDate',
        label: 'To date',
        value: moment(lease.endDate).format('DD/MMM/YYYY'),
      },
      {
        att: 'carId',
        label: 'Car model',
        value: lease.car.carModel.name,
      },
      // { att: 'cost', label: 'Cost', value: lease.totalCost },
      {
        att: 'pickupLocation',
        label: 'Hub location',
        value: lease.hub.address,
      },
      { att: 'type', label: 'Type', value: 'Lease request' },
    ],
    avatar: lease.customer.avatar,
    name: lease.customer.fullName,
    type,
  };
}
