export const Podcast = (entry) => ({
    name: entry['im:name']?.label ?? '',
    images: entry['im:image']?.map(img => ({
      url: img.label,
      height: img.attributes.height
    })) ?? [],
    summary: entry.summary?.label ?? '',
    price: entry['im:price']?.label ?? '',
    contentType: entry['im:contentType']?.attributes?.label ?? '',
    rights: entry.rights?.label ?? '',
    title: entry.title?.label ?? '',
    links: entry.link?.attributes ?? {},
    id: entry.id?.attributes?.['im:id'] ?? '',
    artist: entry['im:artist']?.label ?? '',
    category: {
      id: entry.category?.attributes?.['im:id'] ?? '',
      term: entry.category?.attributes?.term ?? '',
      label: entry.category?.attributes?.label ?? ''
    },
    releaseDate: entry['im:releaseDate']?.attributes?.label ?? ''
  });
  