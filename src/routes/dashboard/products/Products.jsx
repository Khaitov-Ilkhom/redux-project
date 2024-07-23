import {ContentTitle} from "../../../utils/Index.jsx";
import {Button, Modal} from "antd";
import {useState} from "react";
import ProductForm from "../../../components/product-form/ProductForm.jsx";


const Products = () => {

  // Modal
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  }

  return (
    <div>
      <div className="flex justify-between">
        <ContentTitle>Products</ContentTitle>
        <Button onClick={showModal} type="primary">Add new product</Button>
        <Modal
          title="Add new product"
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          maskClosable={false}
        >
          <ProductForm/>
        </Modal>
      </div>
    </div>
  )
}
export default Products
