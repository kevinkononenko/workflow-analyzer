import { products } from "./products";
import { workflowStages } from "./workflowStages";

// Add supplied content here, one product and stage at a time. Every field is optional
// while drafting; only complete records appear in the homepage stage explorer.
export const workflowContent = {
  jira: {
    define: {
      featureName: "Kanban board",
      description:
        "The user scans high-priority work items that have not started and chooses what to take on next.",
      screenshot: {
        src: "https://images.ctfassets.net/zsv3d0ugroxu/yoOIa70UHh9M5uVM_lX1A/355ab70f2b38aa79390f2b99c6e3fe12/company-managed-card-cover-image.png",
        alt: "Jira board showing work item cards arranged in columns",
        objectPosition: "50% 45%",
        scale: 1.3,
      },
      article: {
        title: "Work with boards in Jira",
        url: "https://support.atlassian.com/jira-software-cloud/docs/work-with-boards-in-business-projects/",
      },
    },
    locate: {
      featureName: "Work item custom view",
      description:
        "The user opens the selected work item to review its description, priority, assignee, labels, and other relevant metadata in one place.",
      screenshot: {
        src: "https://images.ctfassets.net/zsv3d0ugroxu/7nmdn9lSPi6iCFYKFi9a7/a1c847870ad9cc235b23a9926aa43799/screenshot_IssueDetails.png",
        alt: "Jira work item view showing its description and contextual fields",
        objectPosition: "50% 40%",
        scale: 1.25,
      },
      article: {
        title: "Update a work item's details",
        url: "https://support.atlassian.com/jira-software-cloud/docs/update-a-work-items-details/",
      },
    },
    prepare: {
      outsideProduct: true,
      featureName: "Outside Jira",
      description:
        "The user gathers the context, tools, files, and working environment needed to complete the selected work item.",
      screenshot: {
        src: "https://images.unsplash.com/photo-1675098978602-8924eb1856aa?auto=format&fit=crop&w=1200&q=80",
        alt: "Person writing in a notebook beside a laptop",
        credit: "Carter Hightower / Unsplash",
        creditUrl: "https://unsplash.com/photos/a-person-writing-on-a-notebook-next-to-a-laptop-4GD9RphwnZA",
      },
    },
    confirm: {
      outsideProduct: true,
      featureName: "Outside Jira",
      description:
        "The user confirms that the requirements are clear and that dependencies, access, and approvals are ready before starting.",
      screenshot: {
        src: "https://images.unsplash.com/photo-1637979910474-38e3ad8d5cab?auto=format&fit=crop&w=1200&q=80",
        alt: "Coworkers reviewing work together around a table",
        credit: "Joao paulo m ramos paulo / Unsplash",
        creditUrl: "https://unsplash.com/photos/a-group-of-people-sitting-around-a-table-with-laptops-mYt2I8PIPN0",
      },
    },
    execute: {
      featureName: "Status",
      description:
        "The user changes the work item's status to In progress, signaling that active work has begun.",
      screenshot: {
        src: "https://images.ctfassets.net/zsv3d0ugroxu/1WrWWQOxvQpaoLlHTDpyO5/dce56463e124a7008c4ca3759893b5da/Screenshot_2025-04-15_at_10.46.31_AM.png",
        alt: "Jira status menu showing In progress and Done options",
        objectPosition: "75% 22%",
        scale: 1.5,
      },
      article: {
        title: "Transition a work item",
        url: "https://support.atlassian.com/jira-software-cloud/docs/transition-an-issue/",
      },
    },
    monitor: {
      featureName: "Comments",
      description:
        "The user checks the work item's comments and activity for new context, blockers, and progress updates.",
      screenshot: {
        src: "https://images.ctfassets.net/zsv3d0ugroxu/7nmdn9lSPi6iCFYKFi9a7/a1c847870ad9cc235b23a9926aa43799/screenshot_IssueDetails.png",
        alt: "Jira work item view with details and activity",
        objectPosition: "35% 80%",
        scale: 1.55,
      },
      article: {
        title: "Watch, share, and comment on a work item",
        url: "https://support.atlassian.com/jira-software-cloud/docs/watch-share-and-comment-on-a-work-item/",
      },
    },
    modify: {
      outsideProduct: true,
      featureName: "Outside Jira",
      description:
        "The user adjusts the work in the tool where it is being performed, then returns to Jira to record any relevant change.",
      screenshot: {
        src: "https://images.unsplash.com/photo-1697600827138-609c370d8e89?auto=format&fit=crop&w=1200&q=80",
        alt: "Person revising work on a laptop",
        credit: "Kawe Rodrigues / Unsplash",
        creditUrl: "https://unsplash.com/photos/a-person-holding-a-camera-in-front-of-a-laptop-eh96uvNfvkc",
      },
    },
    conclude: {
      featureName: "Status and Resolution",
      description:
        "The user moves the work item to Done; the configured workflow records a Resolution so Jira treats the work as closed.",
      screenshot: {
        src: "https://images.ctfassets.net/zsv3d0ugroxu/1WrWWQOxvQpaoLlHTDpyO5/dce56463e124a7008c4ca3759893b5da/Screenshot_2025-04-15_at_10.46.31_AM.png",
        alt: "Jira status menu showing the Done option",
        objectPosition: "75% 72%",
        scale: 1.6,
      },
      article: {
        title: "What is a Resolution in Jira?",
        url: "https://support.atlassian.com/jira-cloud-administration/docs/what-is-a-resolution-in-jira/",
      },
    },
  },
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
    outsideProduct: content.outsideProduct ?? false,
    screenshot: {
      src: screenshot.src ?? "",
      alt: screenshot.alt ?? "",
      objectPosition: screenshot.objectPosition ?? "50% 50%",
      scale: screenshot.scale ?? 1,
      credit: screenshot.credit ?? "",
      creditUrl: screenshot.creditUrl ?? "",
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
  const hasRequiredArticle =
    record.outsideProduct || (record.article.title && record.article.url);

  return Boolean(
    record.featureName &&
      record.description &&
      record.screenshot.src &&
      record.screenshot.alt &&
      hasRequiredArticle,
  );
}
