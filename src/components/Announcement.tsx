import { Card } from "antd";
import { AllTypesOfAdvertisements } from "../types/api";

const { Meta } = Card;

export const Announcement = ({
  name,
  photo,
  type,
  location,
}: AllTypesOfAdvertisements) => {
  return (
    <Card
      hoverable
      style={{ width: 400 }}
      cover={
        photo ? (
          <img
            style={{ maxHeight: 200, objectFit: "cover" }}
            alt={name}
            src={photo}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "200px",
              backgroundColor: "rgb(243 243 243)",
            }}
          ></div>
        )
      }
    >
      <Meta title={name} description={`Категория: ${type ? type : 'Нет категории'}`} />
      <Meta description={`Местоположение: ${location ? location : 'Местоположение не указано'}`}/>
    </Card>
  );
};
