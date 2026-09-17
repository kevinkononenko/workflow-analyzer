import { products } from "./products";
import { workflowStages } from "./workflowStages";
import procoreDefineChangeEvent from "../assets/procore/flow-define-change-event-2025.png";
import procoreLocateCommitment from "../assets/procore/flow-locate-commitment-2025.png";
import procorePrepareEvidence from "../assets/procore/flow-prepare-evidence-2025.png";
import procoreConfirmField from "../assets/procore/flow-confirm-field-2025.png";
import procoreExecuteChangeOrder from "../assets/procore/flow-execute-change-order-2025.png";
import procoreMonitorApproval from "../assets/procore/flow-monitor-approval-2025.png";
import procoreModifyChangeOrder from "../assets/procore/flow-modify-change-order-2025.png";
import procoreConcludeBudget from "../assets/procore/flow-conclude-budget-2025.png";

// Add supplied content here, one product and stage at a time. Every field is optional
// while drafting; only complete records appear in the homepage stage explorer.
export const workflowContent = {
  jira: {
    define: {
      featureName: "Kanban board",
      description:
        "The user scans high-priority work items that have not started and chooses what to take on next.",
      frictionRisk: "Priorities may be outdated or unclear.",
      screenshot: {
        src: "https://wac-cdn.atlassian.com/dam/jcr%3A9c540103-16c2-4875-b579-1deee54101d1/Screen-kanban%20board.png?cdnVersion=3672",
        alt: "Full Jira Kanban board with work items arranged across workflow columns",
        annotationKey: "jira-define-calibrated-v1",
        objectPosition: "35% 55%",
        scale: 1,
        focusLabel: "High priority + not started",
        highlights: [
          {
            x: 2.303,
            y: 19.837,
            width: 94.731,
            height: 72.939,
          },
        ],
        credit: "Atlassian",
        creditUrl: "https://www.atlassian.com/software/jira/features/kanban-boards",
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
      frictionRisk: "Important context may be incomplete, outdated, or scattered across other tools.",
      screenshot: {
        src: "https://images.ctfassets.net/zsv3d0ugroxu/7nmdn9lSPi6iCFYKFi9a7/a1c847870ad9cc235b23a9926aa43799/screenshot_IssueDetails.png",
        alt: "Jira work item view showing its description and contextual fields",
        annotationKey: "jira-locate-calibrated-v1",
        objectPosition: "52% 44%",
        scale: 1,
        focusLabel: "Work item details",
        highlights: [
          {
            x: 4.597,
            y: 7.26,
            width: 90.757,
            height: 53.932,
          },
        ],
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
      frictionRisk: "Missing access, files, or tools may not become apparent until the work begins.",
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
      frictionRisk: "Requirements or dependencies may be assumed ready without being explicitly verified.",
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
      frictionRisk: "The status may stop reflecting reality if it is not updated as the work changes.",
      screenshot: {
        src: "https://images.ctfassets.net/zsv3d0ugroxu/1WrWWQOxvQpaoLlHTDpyO5/dce56463e124a7008c4ca3759893b5da/Screenshot_2025-04-15_at_10.46.31_AM.png",
        alt: "Jira status menu showing In progress and Done options",
        annotationKey: "jira-execute-calibrated-v1",
        objectPosition: "75% 22%",
        scale: 1,
        focusLabel: "In progress status",
        highlights: [
          {
            x: 10.388,
            y: 3.025,
            width: 87.746,
            height: 45.33,
          },
        ],
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
      frictionRisk: "Important updates can be buried in comments or arrive too late to prevent a blocker.",
      screenshot: {
        src: "https://images.ctfassets.net/zsv3d0ugroxu/7nmdn9lSPi6iCFYKFi9a7/a1c847870ad9cc235b23a9926aa43799/screenshot_IssueDetails.png",
        alt: "Jira work item view with details and activity",
        annotationKey: "jira-monitor-calibrated-v1",
        objectPosition: "38% 78%",
        scale: 1.1,
        focusLabel: "Comments and activity",
        highlights: [
          {
            x: 4.373,
            y: 74.01,
            width: 52.191,
            height: 23.577,
          },
        ],
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
      frictionRisk: "Changes made outside Jira may never be reflected in the work item.",
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
      frictionRisk: "Work may be marked done before its acceptance criteria or intended outcome are actually met.",
      screenshot: {
        src: "https://images.ctfassets.net/zsv3d0ugroxu/1WrWWQOxvQpaoLlHTDpyO5/dce56463e124a7008c4ca3759893b5da/Screenshot_2025-04-15_at_10.46.31_AM.png",
        alt: "Jira status menu showing the Done option",
        annotationKey: "jira-conclude-calibrated-v1",
        objectPosition: "75% 72%",
        scale: 1,
        focusLabel: "Done status",
        highlights: [
          {
            x: 14.148,
            y: 48.979,
            width: 82.947,
            height: 17.874,
          },
        ],
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
  procore: {
    define: {
      featureName: "Change event",
      description:
        "After the field team reports that site conditions require more material or work, the project manager records the potential scope and cost change as a change event.",
      frictionRisk:
        "A vague description or missing field evidence can turn a legitimate need into an unreviewable request.",
      screenshot: {
        src: procoreDefineChangeEvent,
        alt: "Recent Procore Change Events line-items view populated with budget codes, quantities, unit costs, rough costs, and pricing statuses",
        annotationKey: "procore-define-change-event-2025-v1",
        objectPosition: "50% 50%",
        scale: 1.6,
        panX: 30.056,
        panY: 30.377,
        highlights: [
          {
            x: 1.106,
            y: 24.31,
            width: 52.205,
            height: 17.614,
          },
        ],
        credit: "Procore, April 2025",
        creditUrl: "https://www.procore.com/webinars/change-order-management-for-gcs",
      },
      article: {
        title: "Change event",
        url: "https://support.procore.com/products/online/user-guide/project-level/change-events/tutorials/edit-a-change-event",
      },
    },
    locate: {
      featureName: "Commitment and cost code",
      description:
        "The project manager links the change event to the affected purchase order, vendor, budget code, and schedule-of-values line instead of treating it as a disconnected cost.",
      frictionRisk:
        "Choosing the wrong commitment or cost code can place the additional cost against the wrong agreement or budget line.",
      screenshot: {
        src: procoreLocateCommitment,
        alt: "Recent Procore Change Events view showing populated budget codes, vendors, contract numbers, descriptions, and unit costs",
        annotationKey: "procore-locate-commitment-2025-v1",
        objectPosition: "50% 50%",
        scale: 1.3,
        panX: 14.995,
        panY: 15.38,
        highlights: [
          {
            x: 1.545,
            y: 31.048,
            width: 42.207,
            height: 37.249,
          },
        ],
        credit: "Procore, April 2025",
        creditUrl: "https://www.procore.com/webinars/change-order-management-for-gcs",
      },
      article: {
        title: "Commitment and cost code",
        url: "https://support.procore.com/products/online/user-guide/project-level/change-events/tutorials/edit-a-change-event",
      },
    },
    prepare: {
      featureName: "Request for Quote",
      description:
        "The project manager sends the purchase-order vendor an RFQ with the changed scope, field photos or drawings, and a due date for pricing the additional work.",
      frictionRisk:
        "If the RFQ omits quantities, constraints, or attachments, the vendor may price a different scope than the field team expects.",
      screenshot: {
        src: procorePrepareEvidence,
        alt: "Recent Procore Drawings view showing a populated first-floor dimension plan and its revision history as supporting evidence",
        annotationKey: "procore-prepare-evidence-2025-v1",
        objectPosition: "50% 58%",
        scale: 1.2,
        panX: 9.465,
        panY: 11.704,
        highlights: [],
        credit: "Procore, April 2025",
        creditUrl: "https://www.procore.com/webinars/change-order-management-for-gcs",
      },
      article: {
        title: "Request for Quote",
        url: "https://dev.support.procore.com/product-manuals/change-events-project/tutorials/create-rfqs-from-a-change-event",
      },
    },
    confirm: {
      featureName: "RFQ response",
      description:
        "The project manager speaks with the superintendent or field engineer to verify the need, then compares that reality with the vendor's quoted cost, schedule impact, comments, and attachments.",
      frictionRisk:
        "A plausible quote can still fund unnecessary work, the wrong quantity, or a condition that the field team has already resolved.",
      screenshot: {
        src: procoreConfirmField,
        alt: "Recent Procore RFI response with a specific material answer, responsible parties, cost code, and links to the related change events and drawing",
        annotationKey: "procore-confirm-field-2025-v1",
        objectPosition: "50% 50%",
        scale: 1,
        panX: -0.332,
        panY: 0.177,
        highlights: [
          {
            x: 1.631,
            y: 24.099,
            width: 94.549,
            height: 49.419,
          },
        ],
        credit: "Procore, April 2025",
        creditUrl: "https://www.procore.com/webinars/change-order-management-for-gcs",
      },
      article: {
        title: "RFQ response",
        url: "https://en-gb.support.procore.com/products/online/user-guide/project-level/change-events/tutorials/review-rfq-responses",
      },
    },
    execute: {
      featureName: "Commitment change order",
      description:
        "Once the scope and price are credible, the project manager creates a commitment change order from the change event and carries its latest cost into the change order's schedule of values.",
      frictionRisk:
        "Creating the change order before the quote is final can put an outdated amount into the approval workflow.",
      screenshot: {
        src: procoreExecuteChangeOrder,
        alt: "Recent Procore Change Order Reconciliation report connecting client potential change orders to commitment change orders, statuses, and amounts",
        annotationKey: "procore-execute-change-order-2025-v1",
        objectPosition: "50% 50%",
        scale: 1,
        panX: 0.257,
        panY: -0.103,
        highlights: [
          {
            x: 1.381,
            y: 28.851,
            width: 92.529,
            height: 20.601,
          },
        ],
        credit: "Procore, April 2025",
        creditUrl: "https://www.procore.com/webinars/change-order-management-for-gcs",
      },
      article: {
        title: "Commitment change order",
        url: "https://dev.support.procore.com/product-manuals/change-events-project/tutorials/create-a-commitment-change-order-from-a-change-event",
      },
    },
    monitor: {
      featureName: "Designated reviewer",
      description:
        "The project manager watches the Pending - In Review change order, follows up with its designated reviewer, and keeps the field from assuming unapproved work is authorized.",
      frictionRisk:
        "Approval can stall while schedule pressure encourages the field or vendor to proceed before authorization.",
      screenshot: {
        src: procoreMonitorApproval,
        alt: "Recent Procore Change Order Reconciliation report showing approved, pending, in-review, and draft statuses beside commitment change order numbers",
        annotationKey: "procore-monitor-approval-2025-v1",
        objectPosition: "50% 50%",
        scale: 1,
        panX: 0,
        panY: 0,
        highlights: [
          {
            x: 38.828,
            y: 21.786,
            width: 13.366,
            height: 72.677,
          },
        ],
        credit: "Procore, April 2025",
        creditUrl: "https://www.procore.com/webinars/change-order-management-for-gcs",
      },
      article: {
        title: "Designated reviewer",
        url: "https://support.procore.com/products/online/user-guide/project-level/change-orders/tutorials/approve-or-reject-commitment-change-orders",
      },
    },
    modify: {
      featureName: "Revise and Resubmit",
      description:
        "If the quote or change order is rejected, the project manager sends the vendor's response back for revision and updates the quantity, price, schedule impact, or supporting detail.",
      frictionRisk:
        "Manual revision numbering and conversations outside Procore can leave reviewers comparing the wrong version.",
      screenshot: {
        src: procoreModifyChangeOrder,
        alt: "Recent Procore Change Order Reconciliation report comparing commitment change order amounts, line-item amounts, variances, and current statuses",
        annotationKey: "procore-modify-change-order-2025-v1",
        objectPosition: "60% 50%",
        scale: 1,
        panX: 0,
        panY: 0,
        highlights: [
          {
            x: 59.335,
            y: 17.891,
            width: 34.989,
            height: 55.781,
          },
        ],
        credit: "Procore, April 2025",
        creditUrl: "https://www.procore.com/webinars/change-order-management-for-gcs",
      },
      article: {
        title: "Revise and Resubmit",
        url: "https://support.procore.com/products/online/user-guide/project-level/change-events/tutorials/submit-a-quote-as-a-collaborator",
      },
    },
    conclude: {
      featureName: "Revised Contract",
      description:
        "After approval, Procore preserves the original purchase-order amount, adds the approved change order, and shows their sum as the Revised Contract amount on the same purchase order.",
      frictionRisk:
        "Approving the wrong amount immediately overstates the purchase order and committed cost reported to the project team.",
      screenshot: {
        src: procoreConcludeBudget,
        alt: "Recent Procore Budget risk view showing current estimated cost, projected over-under, open and pending risk, and notes by cost type",
        annotationKey: "procore-conclude-budget-2025-v1",
        objectPosition: "50% 50%",
        scale: 1.4,
        panX: 16.577,
        panY: 10.109,
        highlights: [
          {
            x: 55.389,
            y: 16.948,
            width: 14.243,
            height: 55.533,
          },
        ],
        credit: "Procore, April 2025",
        creditUrl: "https://www.procore.com/webinars/change-order-management-for-gcs",
      },
      article: {
        title: "Revised Contract",
        url: "https://support.procore.com/products/online/user-guide/project-level/commitments/tutorials/view-a-purchase-order",
      },
    },
  },
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
    frictionRisk: content.frictionRisk ?? "",
    outsideProduct: content.outsideProduct ?? false,
    screenshot: {
      src: screenshot.src ?? "",
      alt: screenshot.alt ?? "",
      objectPosition: screenshot.objectPosition ?? "50% 50%",
      scale: screenshot.scale ?? 1,
      panX: screenshot.panX ?? 0,
      panY: screenshot.panY ?? 0,
      credit: screenshot.credit ?? "",
      creditUrl: screenshot.creditUrl ?? "",
      focusLabel: screenshot.focusLabel ?? "",
      annotationKey: screenshot.annotationKey ?? screenshot.src,
      highlights: (screenshot.highlights ?? []).map((highlight, index) => ({
        id: `${productSlug}-${stage.id}-highlight-${index}`,
        x: highlight.x ?? 0,
        y: highlight.y ?? 0,
        width: highlight.width ?? 0,
        height: highlight.height ?? 0,
      })),
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
