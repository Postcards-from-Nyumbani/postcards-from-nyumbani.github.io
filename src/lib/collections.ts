// src/lib/collections.ts
import { getCollection, type CollectionKey, type CollectionEntry } from 'astro:content';

export type Room = 'gallery' | 'library' | 'conservatory' | 'archive';

export const ROOMS: Record<Room, { label: string; path: string; colour: string; description: string }> = {
  gallery: {
    label:       'The Gallery',
    path:        '/gallery',
    colour:      'sienna',
    description: 'Images, art, and things made by hand.',
  },
  library: {
    label:       'The Library',
    path:        '/library',
    colour:      'ochre',
    description: 'Books read, words underlined, thoughts left behind.',
  },
  conservatory: {
    label:       'The Conservatory',
    path:        '/conservatory',
    colour:      'sage',
    description: 'Music listened to, chords practiced, silence between notes.',
  },
  archive: {
    label:       'The Archive',
    path:        '/archive',
    colour:      'navy',
    description: 'Essays on people, memory, and the texture of feeling.',
  },
};

export async function getPublished(room: CollectionKey) {
  const entries = await getCollection(room, (entry: CollectionEntry<CollectionKey>) => {
    return entry.data.status === 'published';
  });

  // Explicitly typing 'a' and 'b' to silence the strict compiler
  return entries.sort(
    (a: CollectionEntry<CollectionKey>, b: CollectionEntry<CollectionKey>) => 
      b.data.date.valueOf() - a.data.date.valueOf()
  );
}

export async function getAllPublished() {
  const [galleryPosts, libraryPosts, conservatoryPosts, archivePosts] =
    await Promise.all([
      getPublished('gallery'),
      getPublished('library'),
      getPublished('conservatory'),
      getPublished('archive'),
    ]);

  // Combine arrays and explicitly type the result before sorting
  const allPosts = [...galleryPosts, ...libraryPosts, ...conservatoryPosts, ...archivePosts] as CollectionEntry<CollectionKey>[];

  return allPosts.sort(
    (a: CollectionEntry<CollectionKey>, b: CollectionEntry<CollectionKey>) => 
      b.data.date.valueOf() - a.data.date.valueOf()
  );
}

export function formatPostmark(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day:   '2-digit',
    month: 'short',
    year:  'numeric',
  }).toUpperCase();
}

export function getRoomColour(room: Room): string {
  return ROOMS[room]?.colour ?? 'sepia';
}