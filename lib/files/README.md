# lib/files

Files owns file, image, document, media, download, path, metadata, optimization, and storage contracts.

Belongs here:

- Public path helpers for images, icons, files, and Open Graph assets
- File and image metadata helpers
- Document, media, and download contracts
- Storage provider interfaces and local URL helpers
- Responsive image size and format helpers

Does not belong here:

- Upload UI
- Direct AWS S3, Cloudinary, ImageKit, UploadThing, or Payload clients
- Analytics tracking
- CRM or communication logic

Future storage adapters should implement `StorageProvider` so UI and content code do not change when storage moves away from `public/`.
