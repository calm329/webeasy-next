import ImageGallery from '@/components/image-gallery';
import ProductCategory from '@/components/product-category';
import ProductInfo from '@/components/product-info';

type TProps = {
  data: any;
};
const ProductTemplate = (props: TProps) => {
  const { data } = props;
  return (
    <div className={` mx-auto overflow-auto mt-10`}>
      <ProductCategory />
      <main className="">
        {/* <ProductBreadCrumbs /> */}
        {data && (
          <>
            <ImageGallery data={data} />

            <ProductInfo data={data} />
          </>
        )}
        {/* 
        <SuggestedProducts /> */}
      </main>
    </div>
  );
};

export default ProductTemplate;
