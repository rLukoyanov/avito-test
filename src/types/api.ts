export enum Categories {
  REAL_ESTATE = "Недвижимость",
  AUTO = "Авто",
  SERVICES = "Услуги",
}

export type Advertisement = {
  id: number;
  name: string;
  description: string;
  location: string;
  type: Categories;
  photo?: string;
};

export type RealEstateAdvertisement = Advertisement & {
  type: Categories.REAL_ESTATE;
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
};

export type AutoAdvertisement = Advertisement & {
  type: Categories.AUTO;
  brand: string;
  model: string;
  year: number;
  mileage?: number;
};

export type ServiceAdvertisement = Advertisement & {
  type: Categories.SERVICES;
  serviceType: string;
  experience: number;
  cost: number;
  workSchedule?: string;
};

export type AllTypesOfAdvertisements = RealEstateAdvertisement | AutoAdvertisement | ServiceAdvertisement;
export type AllFieldsOfAdvertisements = keyof RealEstateAdvertisement | keyof AutoAdvertisement | keyof ServiceAdvertisement;
