import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import axios from "../../api/Index.jsx";
import {useFetch} from "../../hooks/useFetch.jsx";

const DashboardContent = ({columns, url, tableParams, setTableParams}) => {
  const getProductParams = (params) => ({
    limit: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });

  // const [data, loading] = useFetch("/product/all")
  //
  // console.log(data)

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const fetchData = () => {
    setLoading(true);
    axios(url, {
      params: getProductParams(tableParams)
    })
      .then(response => {
        setLoading(false)
        setData(response.data?.payload)
        console.log(response)
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: response.data?.total,
          },
        });
      })
  };
  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  return (
    <Table
      columns={columns}
      rowKey={(record) => record.key}
      dataSource={data?.map(product => ({key: product._id, ...product}))}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};
export default DashboardContent;