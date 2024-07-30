import {useState, useEffect} from 'react';
import {useFetch} from '../../../hooks/useFetch';
import {Table, Image, Tooltip, Avatar} from 'antd';
import {v4 as uuidv4} from 'uuid';
import {ContentTitle} from "../../../utils/Index.jsx";

const LikedProducts = () => {
  const [{payload}, loading] = useFetch("/product/most-popular");
  const [data, setData] = useState([]);


  const [profileData] = useFetch("/auth/profile")
  console.log(profileData.payload)

  const userRole = profileData?.payload?.role

  useEffect(() => {
    if (userRole === "admin") {
      const filteredData = payload?.filter((product) => product.likes >= 1)
      setData(filteredData)
    } else {
      setData(payload?.filter((product) => product.likedby.includes(profileData?.payload?.username)))
    }
  }, [payload, profileData?.payload?.username, userRole])

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const columns = [
    {
      title: 'No.',
      key: "id",
      render: (_, __, index) => tableParams.pagination.pageSize * (tableParams.pagination.current - 1) + (index + 1),
    },
    {
      key: "Product_name",
      title: 'Product Name',
      dataIndex: 'product_name',
      sorter: true,
    },
    {
      key: "Category",
      title: 'Category',
      dataIndex: 'category',
      sorter: true,
    },
    {
      key: "Product_type",
      title: 'Product Type',
      dataIndex: 'product_type',
      sorter: true,
    },
    {
      key: "Oprice",
      title: 'Price',
      dataIndex: 'original_price',
      render: (price) => `$${price}`,
      sorter: true,
    },
    {
      key: "Sprice",
      title: 'Sale Price',
      dataIndex: 'sale_price',
      render: (price) => `$${price}`,
      sorter: true,
    },
    {
      key: "Liked_by",
      title: 'Liked By',
      dataIndex: 'likedby',
      render: (likedby) => {
        if (!likedby || likedby.length === 0) return 'No likes';

        const displayedUsers = likedby.length > 3 ? likedby.slice(0, 3) : likedby;
        const additionalCount = likedby.length > 3 ? `+${likedby.length - 3}` : '';

        return (
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            {displayedUsers.map((user, index) => (
              <Tooltip key={index} title={user} placement="top">
                <Avatar
                  style={{
                    backgroundColor: '#f56a00',
                    margin: '2px',
                  }}
                >
                  {user.slice(0, 1).toUpperCase()}
                </Avatar>
              </Tooltip>
            ))}
            {additionalCount && (
              <Tooltip title={`And ${likedby.length - 3} more`} placement="top">
                <Avatar
                  style={{
                    backgroundColor: '#87d068',
                    margin: '2px',
                  }}
                >
                  {additionalCount}
                </Avatar>
              </Tooltip>
            )}
          </div>
        );
      },
      sorter: true,
    },
    {
      key: "Image",
      title: "Product Images",
      dataIndex: "product_images",
      render: (images) => <Image.PreviewGroup preview={{
        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
      }}>
        <div key={uuidv4()} className='flex gap-4'>
          {
            images?.slice(0, 3).map((image) => (
              <Image key={image} width={50} src={image}/>
            ))
          }
        </div>
      </Image.PreviewGroup>,
      with: '30%',
    }
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <ContentTitle>Liked Products ❤️</ContentTitle>
      </div>
      <Table
        columns={columns}
        rowKey="_id"
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        maxHeight={500}
        minHeight={500}
        overflow="hidden"
      />
    </div>
  );
}

export default LikedProducts;

