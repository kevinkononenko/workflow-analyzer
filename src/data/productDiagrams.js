import githubFeatureDependency from "../assets/github/feature-dependency.png";
import jiraFeatureDependency from "../assets/jira/feature-dependency.png";
import procoreFeatureDependency from "../assets/procore/feature-dependency.png";

export const productDiagrams = {
  github: {
    src: githubFeatureDependency,
    alt: "Object and state diagram showing how a GitHub issue is tracked in a project, how a branch becomes a pull request, how reviews and checks are monitored, and how merging the pull request closes the linked issue",
    source: "diagrams/github-feature-dependency.json",
  },
  jira: {
    src: jiraFeatureDependency,
    alt: "Object and state diagram showing how a Jira Kanban board surfaces a selected work item, how outside preparation enables work to begin, and how the work item moves from To Do through In Progress to Done while comments and resolution are updated",
    source: "diagrams/jira-feature-dependency.json",
  },
  procore: {
    src: procoreFeatureDependency,
    alt: "Object and state diagram showing how a Procore change event creates an RFQ and commitment change order, moves through review and revision states, and updates the purchase order",
    source: "diagrams/procore-feature-dependency.json",
  },
};

export function getProductDiagram(productSlug) {
  return productDiagrams[productSlug] ?? null;
}
