export type NavigationType = {
  pop: () => void,
  navigate: (screenName: string) => void,
  goBack: () => void,
};
export type RentDetailType = {
  leaser: UserType,
  startDate: Date,
  endDate: Date,
  price: Number,
  totalCost: Number,
  description: String,
  _id: String,
  car: CarType,
  pickupHub: HubType,
  status: String,
  type: String,
  __v: 0,
};
export type RentailCarDetailType = {
  id: String,
  carData: {
    name: SVGAnimatedString,
    image: String,
    type: String,
    rating: 5,
    pricePerDay: String,
    total: String,
    cancellationPolicy: String,
    libertyMutial: [String],
    description: String,
  },
  tripData: {
    startDate: Date,
    endDate: Date,
    pickupLocation: String,
    returnLocation: String,
  },
};

export type UserType = {
  _id: String,
  username: string,
  token: string,
  role: 'CUSTOMER' | 'EMPLOYEE' | 'MANAGER',
  isActive: Boolean,
  license: LicenseType,
  fullName: string,
  avatar: String,
  dateOfBirth: Date,
  email: String,
  phone: String,
  account: String,
};

export type GeoLocationType = {
  geometry: {
    lat: Number,
    lng: Number,
  },
  address: String,
};

export type HubType = {
  isActive: Boolean,
  _id: String,
  name: String,
  address: String,
  geometry: {
    lat: Number,
    lng: Number,
  },
  description: string,
  distance?: number,
};

export type CarType = {
  isActive: Boolean,
  _id: String,
  carModel: CarModel,
  customer: String,
  hub: HubType,
  currentHub: HubType,
  images: [String],
  description: String,
  odometer: Number,
  price: Number,
  licensePlates: String,
  feature: String,
  usingYear: number,
};

export type LicenseType = {
  number: string,
  fullname: string,
  dateOfBirth: Date,
  nationality: string,
  address: string,
  rank: string,
  expires: Date,
  image: string,
  isActive: boolean,
  // numb
};

export type CarModel = {
  fuelType: String,
  name: String,
  numberOfSeat: Number,
  numberOfBag: Number,
  type: String,
  images: [String],
  description: String,
  price: number,
  licensePlates: string,
  _id: String,
};

export type PaymentType = {
  amount: number,
  note: String,
  isActive: Boolean,
  _id: String,
  type: String,
};

export type RentalType = {
  leaser: UserType,
  startDate: Date,
  endDate: Date,
  price: number,
  totalCost: number,
  description: String,
  payment: PaymentType,
  customer: UserType,
  type: String,
  pickupHub: HubType,
  pickoffHub: HubType,
  carModel: CarModel,
  car: CarType,
};

export type CarModelReport = {
  carModel: CarModel,
  hubQuantity: number,
  currentQuantity: number,
  customerQuantity: number,
  otherHubQuantity: number,
  upCommingLeaving: number,
  upCommingReceive: number,
};

export type LeaseType = {
  _id: string,
  customer: UserType,
  car: CarType,
  startDate: Date,
  endDate: Date,
  hub: HubType,
  status:
    | 'PENDING'
    | 'ACCEPTED'
    | 'DECLINED'
    | 'AVAILABLE'
    | 'HIRING'
    | 'WAIT_TO_RETURN'
    | 'PAST',
};
