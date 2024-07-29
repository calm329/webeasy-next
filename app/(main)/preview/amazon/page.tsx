'use client';
import Loader from '@/components/ui/loader';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  appState as AS,
  fetchSiteById,
  loading as LD,
} from '@/lib/store/slices/site-slice';
import ProductTemplate from '@/templates/product-template/index';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const PreviewAmazon = () => {
  const appState = useAppSelector(AS);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(LD);
  useEffect(() => {
    if (searchParams.get('preview_site')) {
      // setLoading(true)
      dispatch(fetchSiteById({ id: searchParams.get('preview_site') ?? '' }));
      // getSiteDataById(searchParams.get('preview_site') as string).then((data)=>
      // {

      //   // const updatedData =
      //   dispatch(
      //     updateAmazonSite(JSON.parse(data?.aiResult??""))
      //   )
      //   setLoading(false)
      // })
    }
  }, [searchParams]);
  return (
    <div className="bg-white">
      {loading && <Loader text="Loading" />}
      <ProductTemplate data={appState.aiContent} />
    </div>
  );
};

export default PreviewAmazon;
