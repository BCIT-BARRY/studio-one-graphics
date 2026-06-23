import { getBusinessSettings } from '@/lib/supabase/queries';
import { SettingsForm } from './SettingsForm';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const settings = await getBusinessSettings();

  return <SettingsForm settings={settings} />;
}
