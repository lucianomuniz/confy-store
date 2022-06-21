import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
  const { filtered_products: products } = useFilterContext();

  return (
    <>
      {/* <GridView products={products}>product list</GridView> */}
      <GridView products={products} />
      <ListView />
    </>
  );
};

export default ProductList;
