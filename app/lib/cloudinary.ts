export function cloudinaryImage(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `https://res.cloudinary.com/dwxp1yq4b/image/upload/v1/${cleanPath}`;
}