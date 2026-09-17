# Workflow Inspector

A pattern library of the customer workflows behind essential B2B products.

## Local development

```bash
npm install
npm run dev
```

The production build is configured for deployment at `/workflow-inspector/` on GitHub Pages.

## Adding workflow content

Product timeline content lives in `src/data/productWorkflows.js`. Add each supplied stage under
its product slug and stage id:

```js
jira: {
  define: {
    featureName: "Feature name",
    description: "One sentence explaining how the user applies it.",
    screenshot: {
      src: "/workflow-inspector/screenshots/jira-define.png",
      alt: "What the screenshot shows",
      objectPosition: "70% 35%",
      scale: 1.5,
      panX: 0,
      panY: 0,
    },
    article: {
      title: "Knowledge base article title",
      url: "https://example.com/article",
    },
  },
},
```

Store imported screenshots in `src/assets/<product>/` (or URL-served screenshots in
`public/screenshots/`). `objectPosition` selects the focal point and `scale` controls the zoom. A
stage appears in the homepage explorer once every required field is filled in.

## Workflow research standard

Every product flow should meet the level of detail established by the Procore purchase-order change
flow: describe one specific, end-to-end job rather than provide a tour of the product. Each of the
eight stages should identify the user's real-world trigger or input, the action they take, the
feature that supports it, the decision or handoff involved, the resulting outcome, and the most
important friction or risk. Include meaningful work that happens away from the screen, such as a
field conversation or approval, when that work is necessary to complete the job.

## Screenshot sourcing standard

Screenshots should make the flow feel like one continuous session in the current product:

- Every screenshot must come from the last four years.
- Within a workflow, prefer one official source set or screenshots captured during the same general
  time period. They should represent the same interface generation and visual design.
- Do not mix screenshots from before and after a major product redesign, even when every image is
  less than four years old. Check release notes and visible interface details before treating a
  help-center image as compatible with the rest of the flow.
- Prefer official documentation, release notes, and recent official product walkthrough videos.
- Use populated examples with realistic names, descriptions, statuses, quantities, and amounts.
  Avoid empty, heavily redacted, or generic setup screens when a detailed example exists.
- Match every image to the stage text and crop it consistently around the evidence that supports
  that stage.
- Record the source and its publication or recording date in the screenshot credit. If a current,
  relevant image cannot be verified, leave the gap visible rather than silently substituting a
  legacy screenshot.

## Feature relationship diagrams

Each completed workflow can include a wide object-and-state diagram above the workflow map. Keep
product concepts visually dominant, use the eight stage names as small contextual labels, and label
connections with the result one object supplies to the next. Include meaningful feedback loops
instead of forcing every relationship into a straight line.

Give icons only to durable system concepts or objects. States, fields, roles, and user actions belong
inside or alongside the object they affect and do not receive concept icons of their own. Make object
lineage visually explicit: distinguish records created from earlier records, references to existing
product objects, mutations to those objects, and state transitions such as review, rejection,
revision, and approval. The diagram's layout should follow these object relationships rather than
simply repeating the eight stages in chronological order.

Diagram source files live in `diagrams/` and are rendered with Eraser's open-source
`@eraserlabs/diagrams-cli` package. For example, regenerate the Procore diagram with:

```bash
npm run diagram:procore
```
