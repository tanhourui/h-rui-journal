import { defineCollection, z } from 'astro:content';

const journeysCollection = defineCollection({
  type: 'content',
  schema: z.object({
    country: z.enum(['malaysia', 'japan', 'thailand', 'vietnam', 'iceland']),
    countryName: z.string(),
    year: z.number().default(2025),
    eraTitle: z.string().optional(),
    camera: z.string().optional(),
    stateName: z.string(),
    title: z.string(),
    chapterTitle: z.string(),
    order: z.number().default(1),
    coords: z.tuple([z.number(), z.number()]),
    coordsText: z.string(),
    date: z.string(),
    time: z.string().optional(),
    desc: z.string(),
    exif: z.string(),
    hero: z.string(),
    heroCaption: z.string().optional(),
    heroAspect: z.enum(['landscape', 'portrait', 'auto']).default('auto').optional(),
    sub1: z.string().optional(),
    sub1Caption: z.string().optional(),
    sub1Exif: z.string().optional(),
    sub2: z.string().optional(),
    sub2Caption: z.string().optional(),
    sub2Exif: z.string().optional(),
    gallery: z.array(z.object({
      image: z.string(),
      caption: z.string(),
      exif: z.string().optional(),
      aspectRatio: z.string().optional()
    })).optional()
  })
});

export const collections = {
  journeys: journeysCollection,
};
