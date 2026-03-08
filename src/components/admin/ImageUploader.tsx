import { useState, useRef, DragEvent, ChangeEvent } from 'react';

type Props = {
  label: string;
  currentUrl: string | null;
  onUpload: (file: File) => Promise<string>;
  onRemove: () => void;
  aspectHint?: string;
};

export default function ImageUploader({ label, currentUrl, onUpload, onRemove, aspectHint }: Props) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be under 10MB');
      return;
    }
    setError(null);
    setUploading(true);
    try {
      await onUpload(file);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  return (
    <div className="image-uploader">
      <label className="image-uploader-label">{label}</label>
      {aspectHint && <span className="image-uploader-hint">{aspectHint}</span>}

      {currentUrl ? (
        <div className="image-uploader-preview">
          <img src={currentUrl} alt={label} />
          <button type="button" className="image-uploader-remove" onClick={onRemove}>
            Remove
          </button>
        </div>
      ) : (
        <div
          className={`image-uploader-dropzone ${dragging ? 'dragging' : ''} ${uploading ? 'uploading' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            style={{ display: 'none' }}
          />
          {uploading ? (
            <div className="image-uploader-uploading">
              <div className="admin-loading-spinner" />
              <span>Uploading...</span>
            </div>
          ) : (
            <>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span>Drop image here or click to browse</span>
            </>
          )}
        </div>
      )}

      {error && <p className="image-uploader-error">{error}</p>}
    </div>
  );
}
