import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Spin } from "antd";
import { fetchItemById } from "../api/items";
import { AdvertisementDescriptions } from "../components/AnnouncementDescription";
import { AllTypesOfAdvertisements } from "../types/api";

const ItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ad, setAd] = useState<AllTypesOfAdvertisements | null>(null);
  const [loading, setLoading] = useState(false);

  const loadAd = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await fetchItemById(id);
      setAd(data);
    } catch (error) {
      console.error("Ошибка загрузки объявления:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadAd();
  }, [loadAd]);

  if (loading) return <Spin />;
  if (!ad) return <div>Объявление не найдено</div>;

  return (
    <Card
      title={ad.name}
      extra={
        <Button onClick={() => navigate(`/form?id=${ad.id}`)} type="primary">
          Редактировать
        </Button>
      }
    >
      {ad.photo ? (
        <img src={ad.photo} alt="Фото" style={{ maxWidth: "100%" }} />
      ) : (
        <div style={{ width: "400px", height: "200px", backgroundColor: "rgb(243 243 243)" }}></div>
      )}
      <p><strong>Описание:</strong> {ad.description}</p>
      <p><strong>Локация:</strong> {ad.location}</p>
      <p><strong>Категория:</strong> {ad.type}</p>
      <AdvertisementDescriptions advertisement={ad} />
    </Card>
  );
};

export default ItemPage;
