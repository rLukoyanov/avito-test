import React, { useState, useEffect, useCallback } from "react";
import { Button, Input, Spin, Pagination, Flex, notification } from "antd";
import { useNavigate } from "react-router-dom";

import { fetchItems } from "../api/items";
import { AllTypesOfAdvertisements, Categories } from "../types/api";

import { CategorySelect, Announcement } from "../components";
import { usePagination, useQueryFilters, useFilters } from "../hooks";

const ListPage: React.FC = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [ads, setAds] = useState<AllTypesOfAdvertisements[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const { search, category, setSearch, setCategory } = useFilters();
  const { page, setPage, paginationProps } = usePagination({ total });
  useQueryFilters({ search, category });

  const loadAds = useCallback(async () => {
    setLoading(true);
    try {
      const { items, total } = await fetchItems({ page, search, category });
      setAds(items);
      setTotal(total);
    } catch (error) {
      api.error({
        message: "Ошибка загрузки объявлений:",
        description: String(error),
        duration: 0,
      });
    } finally {
      setLoading(false);
    }
  }, [page, search, category, api]);

  useEffect(() => {
    loadAds();
  }, [loadAds]);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
      setPage(1);
    },
    [setSearch, setPage]
  );

  const handleCategoryChange = useCallback(
    (value: Categories) => {
      setCategory(value);
      setPage(1);
    },
    [setCategory, setPage]
  );

  return (
    <div>
      {contextHolder}
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Поиск по названию"
          value={search}
          onChange={handleSearch}
          style={{ width: 200, marginRight: 16 }}
        />
        <CategorySelect value={category} onChange={handleCategoryChange} />
        <Button
          type="primary"
          style={{ marginLeft: 16 }}
          onClick={() => navigate("/form")}
        >
          Разместить объявление
        </Button>
      </div>

      {loading ? (
        <Flex justify="center" align="center" style={{ height: "50vh" }}>
          <Spin size="large" />
        </Flex>
      ) : (
        <Flex wrap gap="small">
          {ads.map((ad) => (
            <Announcement key={ad.id} {...ad} />
          ))}
        </Flex>
      )}

      <Flex
        justify="center"
        style={{
          marginTop: 16,
          textAlign: "center",
          position: "fixed",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Pagination {...paginationProps} />
      </Flex>
    </div>
  );
};

export default ListPage;
