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
