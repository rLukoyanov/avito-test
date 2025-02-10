import { useState, useEffect } from "react";
import { Button, Input, Spin, Pagination, Flex, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchItems } from "../api/items";
import { AllTypesOfAdvertisements, Categories } from "../types/api";
import { CategorySelect } from "../components/CategoriesSelect";
import { Announcement } from "../components/Announcement";

const { Search } = Input;

const ListPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const [ads, setAds] = useState<AllTypesOfAdvertisements[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Categories>();
  const navigate = useNavigate();

  useEffect(() => {
    loadAds();
  }, [page, search, category]);

  const loadAds = async () => {
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
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value: Categories) => {
    setCategory(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      {contextHolder}
      <div style={{ marginBottom: 16 }}>
        <Search
          placeholder="Поиск по названию"
          onSearch={handleSearch}
          style={{ width: 200, marginRight: 16 }}
        />
        <CategorySelect onChange={handleCategoryChange} />
        <Button
          type="primary"
          style={{ marginLeft: 16 }}
          onClick={() => navigate("/form")}
        >
          Разместить объявление
        </Button>
      </div>

      {loading ? (
        <Flex justify="center" align="center" style={{ height: "100vh" }}>
          <Spin size="large" />
        </Flex>
      ) : (
        <Flex wrap gap="small">
          {ads.map((ad) => (
            <Announcement key={ad.id} {...ad} />
          ))}
        </Flex>
      )}

      <div
        style={{
          marginTop: 16,
          textAlign: "center",
          position: "fixed",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Pagination
          current={page}
          total={total}
          pageSize={5}
          onChange={handlePageChange}
          showSizeChanger={false}
          style={{ marginTop: "20px" }}
        />
      </div>
    </div>
  );
};

export default ListPage;
