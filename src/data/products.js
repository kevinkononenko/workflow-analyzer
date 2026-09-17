import {
  siGithub,
  siGoogledrive,
  siJira,
  siSalesforce,
  siZoom,
} from "simple-icons/icons";
import procoreLogo from "../assets/procore-hex.svg";

export const products = [
  {
    name: "Jira",
    description: "Track my work from assignment to done.",
    persona: "Product & Engineering Teams",
    productType: "Project Management",
    icon: siJira,
    color: "#2684FF",
    code: "01",
    slug: "jira",
  },
  {
    name: "Google Drive",
    description: "Create, organize, and share the files my team needs.",
    persona: "All Employees",
    productType: "Cloud Storage & Collaboration",
    icon: siGoogledrive,
    color: "#4285F4",
    code: "02",
    slug: "google-drive",
  },
  {
    name: "GitHub",
    description: "Build, review, and ship software with my team.",
    persona: "Software Developers",
    productType: "Software Development Platform",
    icon: siGithub,
    color: "#F0F2F5",
    code: "03",
    slug: "github",
  },
  {
    name: "Salesforce",
    description: "Know which deal to advance and what I need to do next.",
    persona: "Sales Reps",
    productType: "Customer Relationship Management",
    icon: siSalesforce,
    color: "#00A1E0",
    code: "04",
    slug: "salesforce",
  },
  {
    name: "Zoom",
    description: "Meet with people, align quickly, and move decisions forward.",
    persona: "All Employees",
    productType: "Video Conferencing",
    icon: siZoom,
    color: "#2D8CFF",
    code: "05",
    slug: "zoom",
  },
  {
    name: "Procore",
    description: "Turn a field-driven cost change into an approved update to my purchase order.",
    persona: "Project Managers",
    productType: "Construction Management",
    logoSrc: procoreLogo,
    color: "#FF6B00",
    code: "06",
    slug: "procore",
    journey: "Manage a purchase order change",
  },
];

export function findProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}
