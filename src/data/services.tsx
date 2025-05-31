export interface ServicePackage {
  id: number;
  title: string;
  features: string[];
  description: string;
}

export const ADDONS = [
    "On the map",
    "Easy to Google",
    "Email",
    "Premium Domain Security",
    "SSL",
    "Hosting",
    "Mobile Responsive Design",
    "Social Links"
]

export const PACKAGES: ServicePackage[] = [
  {
    id: 1,
    title: "Standard Website",
    description: "A clean, modern website to get your business online.",
    features: [
      "Basic DNS",
      "1–3 Pages",
    ],
  },
  {
    id: 2,
    title: "Basic Website",
    description: "A professional site with more features for growing businesses.",
    features: [
      "Everything from Standard",
      "Up to 6 Pages",
    ],
  },
  {
    id: 3,
    title: "Premium Package",
    description: "Full-featured online store with cart and payment integration.",
    features: [
      "Premium DNS",
    ],
  },
];
