import {ContentTitle} from "../../../utils/Index.jsx";
import {Button, Modal, notification} from "antd";
import {useState} from "react";
import ProductForm from "../../../components/product-form/ProductForm.jsx";
import DashboardContent from "../../../components/dashboardContent/DashboardContent.jsx";
import {useSelector} from "react-redux";


const Products = () => {
  const authData = useSelector(state => state)
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const [updateProduct, setUpdateProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateProduct = (product) => {
    setUpdateProduct(product)
    setOpen(true)
  }


  const deleteProduct = () => {
    setIsModalOpen(true)
    // fetch( `http://localhost:8000/product/${product._id}`,{
    //   method: "DELETE",
    //   headers: {
    //     "Authorization": "Bearer " + authData.token
    //   },
    //   body: {
    //     product_name: product.product_name,
    //     _id: product._id
    //   }
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     notification.success({
    //       message: "Product deleted"
    //     })
    //     console.log(data)
    //   })
    //   .catch(err => console.log(err))
  }
  // Delete modal
  const handleOkey = () => {
    setIsModalOpen(false);
  };
  const handleCancell = () => {
    setIsModalOpen(false);
  };

  // Modal update and create
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
    setUpdateProduct(null)
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);

  }

  const columns = [
    {
      title: "No",
      key: "id",
      render: (text, record, index) => index + 1
    },
    {
      key: "Name",
      title: 'Name',
      dataIndex: 'product_name',
      sorter: true,
      render: (name) => `${name}`,
      width: '20%',
    },
    {
      key: "Category",
      title: 'Category',
      dataIndex: 'category',
      sorter: true,
    },
    {
      key: "Oprice",
      title: 'Original price',
      dataIndex: 'original_price',
      sorter: true,
    },
    {
      key: "Sprice",
      title: 'Sale price',
      dataIndex: 'sale_price',
      sorter: true,
    },
    {
      key: "Stock",
      title: 'Stock',
      dataIndex: 'number_in_stock',
      sorter: true,
    },
    {
      title: 'Image',
      dataIndex: 'product_images',
      render: (images) => <img className="w-[50px] h-[30px] object-contain" src={images[0]} alt="image"/>,
    },
    {
      key: "Action",
      title: 'Action',
      render: (product) => (
        <div className="flex items-center gap-2 ">
          <Button type="primary" onClick={() => handleUpdateProduct(product)}>Edit</Button>
          <Button danger type="primary" onClick={() => deleteProduct(product)}>Delete</Button>
        </div>
      ),
      with: '10%',
    }
  ];

  return (
    <div>
      <div className="flex justify-between">
        <ContentTitle>Products</ContentTitle>
        <Button onClick={showModal} type="primary">Add new product</Button>
        <Modal
          title={updateProduct ? "Update product" : "Add new product"}
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          maskClosable={false}
          centered
          forceRender={true}
        >
          <ProductForm updateProduct={updateProduct} setUpdateProduct={setUpdateProduct} setOpen={setOpen}/>
        </Modal>

        <Modal title="Delete product"
               open={isModalOpen}
               onOk={handleOkey}
               onCancel={handleCancell}
        />
      </div>
      <DashboardContent columns={columns} url="/product/all" tableParams={tableParams} setTableParams={setTableParams}/>
    </div>
  )
}
export default Products
