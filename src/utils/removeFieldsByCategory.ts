import { AllTypesOfAdvertisements, Categories } from "../types/api";
export const removeFieldsByCategory = (state: Partial<AllTypesOfAdvertisements>) => {
  if (state.type === Categories.REAL_ESTATE) {
    return {
      name: state.name,
      description: state.description,
      location: state.location,
      type: state.type,
      photo: state.photo,
      propertyType: state.propertyType,
      area: state.area,
      rooms: state.rooms,
      price: state.price,
    };
  }
  if (state.type === Categories.AUTO) {
    return {
      name: state.name,
      description: state.description,
      location: state.location,
      type: state.type,
      photo: state.photo,
      brand: state.brand,
      model: state.model,
      year: state.year,
      mileage: state.mileage,
    };
  }

  if (state.type === Categories.SERVICES) {
    return {
      name: state.name,
      description: state.description,
      location: state.location,
      type: state.type,
      photo: state.photo,
      serviceType: state.serviceType,
      experience: state.experience,
      cost: state.cost,
      workSchedule: state.workSchedule,
    };
  }
};
