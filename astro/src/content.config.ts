import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";


const skills = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/content/skills"}),
});

const work = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/content/work"})
});

export const collections = { skills, work };