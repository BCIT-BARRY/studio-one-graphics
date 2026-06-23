import { getProjects } from '@/lib/supabase/queries';
import { ProjectsList } from './ProjectsList';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsList projects={projects} />;
}
