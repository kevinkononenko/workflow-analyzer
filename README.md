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
    },
    article: {
      title: "Knowledge base article title",
      url: "https://example.com/article",
    },
  },
},
```

Store local screenshots in `public/screenshots/`. `objectPosition` selects the focal point and
`scale` controls the zoom. A stage appears in the homepage explorer once every required field is
filled in.
