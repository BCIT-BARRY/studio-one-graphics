import { getGalleryItems } from '@/lib/supabase/queries';
import { GalleryManager } from './GalleryManager';

export const dynamic = 'force-dynamic';

export default async function GalleryManagerPage() {
  const items = await getGalleryItems();

  return <GalleryManager items={items} />;
}
