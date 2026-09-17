import procoreFeatureDependency from "../assets/procore/feature-dependency.png";

export const productDiagrams = {
  procore: {
    src: procoreFeatureDependency,
    alt: "Object and state diagram showing how a Procore change event creates an RFQ and commitment change order, moves through review and revision states, and updates the purchase order",
    source: "diagrams/procore-feature-dependency.json",
  },
};

export function getProductDiagram(productSlug) {
  return productDiagrams[productSlug] ?? null;
}
