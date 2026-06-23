'use client';

import { useState, useTransition, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { FilterTabs } from '@/components/ui/FilterTabs';
import { FormField } from '@/components/ui/FormField';
import { deleteGalleryItem, uploadGalleryImage, addGalleryItem } from '@/app/actions/admin';

interface GalleryItem {
  id: string;
  project_id: string | null;
  image_url: string;
  title: string;
  description: string | null;
  category: string;
  featured: boolean;
  display_order: number;
  created_at: string;
}

const categories = ['All', 'Vinyl Wraps', 'Paint Protection Film (PPF)', 'Ceramic Coatings', 'Decals & Graphics', 'Commercial Wraps'];

export function GalleryManager({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState('All');
  const [isPending, startTransition] = useTransition();
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = items.filter((g) => filter === 'All' || g.category === filter);

  function handleDelete(id: string) {
    if (!confirm('Delete this gallery item?')) return;
    startTransition(async () => {
      await deleteGalleryItem(id);
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleUploadSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploadError('');
    setUploading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const file = formData.get('file') as File;

    if (!file || file.size === 0) {
      setUploadError('Please select an image.');
      setUploading(false);
      return;
    }

    const uploadData = new FormData();
    uploadData.set('file', file);
    const uploadResult = await uploadGalleryImage(uploadData);

    if (uploadResult.error) {
      setUploadError(uploadResult.error);
      setUploading(false);
      return;
    }

    const itemData = new FormData();
    itemData.set('image_url', uploadResult.url!);
    itemData.set('title', formData.get('title') as string);
    itemData.set('description', formData.get('description') as string);
    itemData.set('category', formData.get('category') as string);
    itemData.set('featured', formData.get('featured') ? 'true' : 'false');

    const itemResult = await addGalleryItem(itemData);

    if (itemResult.error) {
      setUploadError(itemResult.error);
      setUploading(false);
      return;
    }

    setShowUpload(false);
    setPreview(null);
    setUploading(false);
    form.reset();
  }

  return (
    <div>
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div>
          <h1 className="m-0 text-[28px] font-bold tracking-[-0.8px]" style={{ color: 'var(--color-ink)' }}>Gallery Manager</h1>
          <p className="mt-1.5 text-[15px]" style={{ color: 'var(--color-ink-muted)' }}>Manage project photos for the public gallery</p>
        </div>
        <Button size="sm" onClick={() => setShowUpload(true)}>+ Upload Photos</Button>
      </div>

      {/* Upload modal */}
      {showUpload && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => { setShowUpload(false); setPreview(null); setUploadError(''); }}>
          <div
            className="w-full max-w-[480px] mx-4"
            style={{ background: 'var(--color-surface-1)', border: '1px solid var(--color-hairline)', borderRadius: 'var(--radius-lg)', padding: '24px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="m-0 text-[20px] font-semibold" style={{ color: 'var(--color-ink)' }}>Upload Photo</h2>
              <button
                onClick={() => { setShowUpload(false); setPreview(null); setUploadError(''); }}
                className="bg-transparent border-none cursor-pointer p-1"
                style={{ color: 'var(--color-ink-subtle)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {uploadError && (
              <div className="text-[14px] py-3 px-4 rounded-[var(--radius-sm)] mb-4" style={{ background: 'rgba(239,68,68,0.12)', color: '#ef4444' }}>
                {uploadError}
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="flex flex-col gap-4">
              {/* File drop zone */}
              <div
                className="relative flex flex-col items-center justify-center gap-2 cursor-pointer transition-[border-color] duration-150 hover:border-[rgba(255,255,255,0.25)]"
                style={{
                  height: preview ? 'auto' : '160px',
                  background: 'var(--color-surface-2)',
                  border: '2px dashed var(--color-hairline-strong)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                }}
                onClick={() => fileRef.current?.click()}
              >
                {preview ? (
                  <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                    <Image src={preview} alt="Preview" fill className="object-cover" />
                  </div>
                ) : (
                  <>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-subtle)" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-[14px]" style={{ color: 'var(--color-ink-muted)' }}>Click to select image</span>
                    <span className="text-[12px]" style={{ color: 'var(--color-ink-subtle)' }}>JPG, PNG, WebP — max 10 MB</span>
                  </>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  name="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
              </div>

              <FormField label="Title" name="title" placeholder="e.g. Matte Black M4" required />

              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-semibold" style={{ color: 'var(--color-ink)' }}>Category</label>
                <select
                  name="category"
                  required
                  className="outline-none cursor-pointer"
                  style={{
                    background: 'var(--color-surface-2)',
                    color: 'var(--color-ink)',
                    fontSize: '15px',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-hairline-strong)',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <FormField label="Description (optional)" name="description" placeholder="Short caption for this photo" />

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="featured" value="true" className="accent-white" />
                <span className="text-[14px]" style={{ color: 'var(--color-ink-muted)' }}>Featured photo</span>
              </label>

              <Button fullWidth size="lg" type="submit" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload & Add to Gallery'}
              </Button>
            </form>
          </div>
        </div>
      )}

      <div className="mb-5">
        <FilterTabs options={categories} value={filter} onChange={setFilter} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Upload card */}
        <div
          className="flex flex-col items-center justify-center gap-2 cursor-pointer transition-[border-color] duration-150 hover:border-[rgba(255,255,255,0.25)]"
          style={{
            aspectRatio: '4/3',
            background: 'var(--color-surface-1)',
            border: '2px dashed var(--color-hairline-strong)',
            borderRadius: 'var(--radius-lg)',
          }}
          onClick={() => setShowUpload(true)}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-subtle)" strokeWidth="1.5" strokeLinecap="round">
            <path d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-[14px] font-medium" style={{ color: 'var(--color-ink-muted)' }}>Upload photo</span>
          <span className="text-[12px]" style={{ color: 'var(--color-ink-subtle)' }}>Click to upload</span>
        </div>

        {filtered.length === 0 && items.length > 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-[15px] m-0" style={{ color: 'var(--color-ink-muted)' }}>No gallery items match this filter.</p>
          </div>
        )}

        {filtered.length === 0 && items.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-[15px] m-0" style={{ color: 'var(--color-ink-muted)' }}>No gallery items yet. Upload your first photo above.</p>
          </div>
        )}

        {/* Gallery items */}
        {filtered.map((g) => (
          <div
            key={g.id}
            className="overflow-hidden transition-[border-color] duration-150 hover:border-[rgba(255,255,255,0.14)]"
            style={{
              background: 'var(--color-surface-1)',
              border: '1px solid var(--color-hairline)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <div className="relative flex items-center justify-center" style={{ aspectRatio: '4/3', background: 'var(--color-surface-2)' }}>
              {g.image_url ? (
                <Image src={g.image_url} alt={g.title} fill className="object-cover" />
              ) : (
                <span className="text-[13px]" style={{ color: 'var(--color-ink-subtle)' }}>No image</span>
              )}
              <div className="absolute top-2.5 left-2.5 flex gap-1">
                {g.featured && (
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 uppercase tracking-[0.5px]"
                    style={{ borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.9)', color: '#000' }}
                  >
                    Featured
                  </span>
                )}
              </div>
            </div>
            <div className="p-3.5 flex flex-col gap-1">
              <h4 className="m-0 text-[15px] font-semibold" style={{ color: 'var(--color-ink)' }}>{g.title}</h4>
              <span className="text-[12px]" style={{ color: 'var(--color-ink-muted)' }}>{g.category}</span>
              {g.description && (
                <span className="text-[12px]" style={{ color: 'var(--color-ink-subtle)' }}>{g.description}</span>
              )}
              <div className="flex gap-2 mt-2">
                <button
                  disabled={isPending}
                  onClick={() => handleDelete(g.id)}
                  className="flex-1 py-1.5 text-[12px] font-medium cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    background: 'transparent',
                    color: 'var(--color-ink-subtle)',
                    border: '1px solid var(--color-hairline)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
