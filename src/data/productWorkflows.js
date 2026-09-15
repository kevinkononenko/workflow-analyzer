import { products } from "./products";
import { workflowStages } from "./workflowStages";

// Add supplied content here, one product and stage at a time. Every field is optional
// while drafting; only complete records appear in the homepage stage explorer.
export const workflowContent = {
  jira: {},
  "google-drive": {},
  github: {},
  salesforce: {},
  zoom: {},
};

function createEmptyStageRecord(productSlug, stage) {
  const content = workflowContent[productSlug]?.[stage.id] ?? {};
  const screenshot = content.screenshot ?? {};
  const article = content.article ?? {};

  return {
    id: `${productSlug}-${stage.id}`,
    productSlug,
    stageId: stage.id,
    featureName: content.featureName ?? "",
    description: content.description ?? "",
    screenshot: {
      src: screenshot.src ?? "",
      alt: screenshot.alt ?? "",
      objectPosition: screenshot.objectPosition ?? "50% 50%",
      scale: screenshot.scale ?? 1,
    },
    article: {
      title: article.title ?? "",
      url: article.url ?? "",
    },
  };
}

export const productWorkflows = Object.fromEntries(
  products.map((product) => [
    product.slug,
    workflowStages.map((stage) => createEmptyStageRecord(product.slug, stage)),
  ]),
);

export function getProductWorkflow(productSlug) {
  return productWorkflows[productSlug] ?? [];
}

export function isWorkflowStageReady(record) {
  return Boolean(
    record.featureName &&
      record.description &&
      record.screenshot.src &&
      record.screenshot.alt &&
      record.article.title &&
      record.article.url,
  );
}
