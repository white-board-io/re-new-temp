export type EditorialSummary = {
  slug: string;
  title: string;
  date: string;
  image: string;
  imageAlt: string;
  imagePlaceholder?: boolean;
};

export type EditorialArticleData = EditorialSummary & {
  content: string;
  category?: string;
  author?: string;
  publisher?: string;
  localPdf?: string;
};

export type EditorialFilter = {
  name: string;
  label: string;
  allLabel: string;
  options: string[];
  value: string;
};
