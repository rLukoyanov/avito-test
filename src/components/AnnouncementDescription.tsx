import { AllTypesOfAdvertisements, Categories } from "../types/api";

type Props = {
  advertisement: AllTypesOfAdvertisements;
};

export const AdvertisementDescriptions = ({ advertisement }: Props) => {
  if (advertisement.type === Categories.AUTO) {
    return (
      <>
        <p>
          <strong>Модель:</strong> {advertisement.model}
        </p>
        <p>
          <strong>Марка:</strong> {advertisement.brand}
        </p>
        <p>
          <strong>Год выпуска:</strong> {advertisement.year}
        </p>
        <p>
          <strong>Пробег:</strong> {advertisement.mileage}
        </p>
      </>
    );
  }

  if (advertisement.type === Categories.REAL_ESTATE) {
    return (
      <>
        <p>
          <strong>Тип недвижимости:</strong> {advertisement.propertyType}
        </p>
        <p>
          <strong>Площадь:</strong> {advertisement.area}
        </p>
        <p>
          <strong>Цена:</strong> {advertisement.price}
        </p>
        <p>
          <strong>Кол-во комнат:</strong> {advertisement.rooms}
        </p>
      </>
    );
  }
  if (advertisement.type === Categories.SERVICES) {
    return (
      <>
        <p>
          <strong>Тип услуги:</strong> {advertisement.serviceType}
        </p>
        <p>
          <strong>Опыт работы:</strong> {advertisement.experience}
        </p>
        <p>
          <strong>Стоимость:</strong> {advertisement.cost}
        </p>
        <p>
          <strong>График работы:</strong> {advertisement.workSchedule}
        </p>
      </>
    );
  }
};
