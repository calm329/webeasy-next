'use client';
import Loader from '@/components/ui/loader';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  appState as AS,
  fetchSiteById,
  loading as LD,
} from '@/lib/store/slices/site-slice';
import { TemplatesData as TD } from '@/lib/store/slices/template-slice';
import BasicTemplate from '@/templates/basic-template';
import BlueBasedTemplate from '@/templates/blue-based-template/blue-based-template-csr';
import General from '@/templates/general-template/general-template-csr';
import PostBasedTemplate from '@/templates/post-based-template/post-based-template-csr';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type TProps = {
  params: { template: string };
};

const Preview = (props: TProps) => {
  const appState = useAppSelector(AS);
  const templates = useAppSelector(TD);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(LD);

  useEffect(() => {
    if (searchParams.get('preview_site')) {
      dispatch(fetchSiteById({ id: searchParams.get('preview_site') ?? '' }));
    }
  }, [searchParams, dispatch]);

  const selectedTemplate = templates?.find(
    (template) => template.id === appState.templateId
  );

  if (loading) {
    return <Loader text="loading" />;
  }

  if (appState?.aiContent?.banner) {
    switch (selectedTemplate?.name) {
      case 'Basic template':
        return (
          <BasicTemplate
            aiContent={appState?.aiContent}
            posts={appState.iPosts}
          />
        );
      case 'Blue-Based template':
        return (
          <BlueBasedTemplate
            banner={appState.aiContent['banner']}
            hero={appState.aiContent['hero']}
            colors={appState.aiContent['colors']}
            services={appState.aiContent['services']['list']}
            posts={appState.iPosts}
          />
        );
      case 'Post-Based template':
        return (
          <PostBasedTemplate
            banner={appState.aiContent['banner']}
            hero={appState.aiContent['hero']}
            colors={appState.aiContent['colors']}
            services={appState.aiContent['services']['list']}
            posts={appState.iPosts}
          />
        );
      case 'General template':
        return (
          <General
            banner={appState.aiContent['banner']}
            hero={appState.aiContent['hero']}
            colors={appState.aiContent['colors']}
            services={appState.aiContent['services']['list']}
            posts={appState.iPosts}
          />
        );
      default:
        return (
          <BasicTemplate
            aiContent={appState.aiContent}
            posts={appState.iPosts}
          />
        );
    }
  }

  return null;
};

export default Preview;
