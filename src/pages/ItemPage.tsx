import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Spin } from 'antd';
import { fetchItemById } from '../api/items';

const ItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ad, setAd] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAd();
  }, [id]);

  const loadAd = async () => {
    setLoading(true);
    try {
      const data = await fetchItemById(id!);
      setAd(data);
    } catch (error) {
      console.error('Ошибка загрузки объявления:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin />;

  if (!ad) return <div>Объявление не найдено</div>;

  return (
    <Card
      title={ad.title}
      extra={
        <Button onClick={() => navigate(`/form?id=${ad.id}`)} type="primary">
          Редактировать
        </Button>
      }
    >
      <p><strong>Описание:</strong> {ad.description}</p>
      <p><strong>Локация:</strong> {ad.location}</p>
      <p><strong>Категория:</strong> {ad.category}</p>
      {ad.photo && <img src={ad.photo} alt="Фото" style={{ maxWidth: '100%' }} />}
    </Card>
  );
};

export default ItemPage;
