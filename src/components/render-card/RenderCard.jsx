import {Button, Card} from "antd";

const {Meta} = Card

const RenderCard = ({product}) => {
  return (
    <div>
      <Card
        hoverable
        className="h-[350px] flex justify-center flex-col items-center"
        cover={<img className="max-w-[270px] h-[200px] object-cover" src={product.product_images[0]} alt={product.product_name}/>}
        actions={[
          <Button type="primary">Add to Cart</Button>,
          <Button type="link">More Info</Button>
        ]}
      >
        <Meta
          title={product.product_name}
          description={`$${product.original_price}`}
        />
      </Card>
    </div>
  )
}
export default RenderCard
