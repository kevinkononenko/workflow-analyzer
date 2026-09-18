# Workflow relationship diagram standard

This guide defines the visual language and Eraser JSON patterns for every Workflow Inspector
diagram. Use the Procore diagram in `procore-feature-dependency.json` as the reference
implementation.

The workflow map explains **what the user does over time**. The diagram explains **which durable
product objects are involved, how those objects change, and what they pass to one another**. It
should not be a second version of the workflow map.

## 1. Model the product before drawing

Make a short inventory from current product documentation before editing JSON:

| Question | What to record |
| --- | --- |
| What records persist in the product? | Durable objects such as a Change Event, RFQ, or Commitment Change Order |
| Which labels are only lifecycle states? | Open, Under Review, Approved, Rejected, Closed, and similar statuses |
| Which values explain an important mutation? | IDs, totals, derived amounts, linked-record collections, and other consequential fields |
| What creates, references, or updates what? | The source, exact target, and business result of every relationship |
| What begins outside the product? | Conversations, observations, requests, files, or other optional origins |
| Which job-map stage explains each moment? | Define, Locate, Prepare, Confirm, Execute, Monitor, Modify, or Conclude |

Do not infer the data model from screen proximity. Verify relationships in current documentation.
If a relationship is uncertain, omit it until it can be named precisely.

## 2. Semantic grammar

### Durable product objects

Use a bordered `Group` with a title bar and one icon for a durable concept or record that can be
created, selected, linked, updated, or revisited. A useful test is: “Could this have its own ID,
detail page, or lifecycle?”

Examples: Change Event, Request for Quote, Commitment Change Order, Purchase Order.

- Give each object one unique, recognizable Lucide icon.
- Use the product's noun, not the user's action, as the title.
- Do not give icons to statuses, fields, people, actions, or job-map stages.
- A large container is not evidence of a parent/child data relationship. Nest only states or fields
  that genuinely belong to that object.

### States of an object

Use equal neutral `Shape` boxes inside the object's `Group` when the same record moves through a
lifecycle. Connect the boxes with neutral arrows.

Examples: Open → Closed; Pending → Approved; Rejected → Pending - Revised.

- State boxes use the same fill, border, type size, and text color.
- Do not emphasize the happy path with a brighter fill or larger type.
- A return to an earlier state is a dashed neutral arrow.
- Do not turn reviewers, actions, or conditions into states. “Designated reviewer” is a role;
  “revise and resubmit” is an action; neither receives a state box.

### Fields and derived data

Use an ERD-like object when the important question is what data belongs to an object or what a
workflow changes on it. The object is still a `Group`; each field is a full-width, square-cornered
row with a monospace label.

Examples:

- `commitment_id` identifies the selected commitment.
- `approved_change_orders[]` is a collection appended to after approval.
- `revised_contract_amount` is a derived value changed by approved orders.

Only show fields that explain the workflow. This is not a complete schema. Target an incoming
arrow at the exact row it references or mutates—not at the general object and never at an unrelated
field. Highlight changed or derived rows with the relationship accent; leave stable context fields
neutral.

When a job-map stage applies to an ERD row, place the stage label on the same horizontal line as
the field: field name left aligned, stage label right aligned. Do not stack the stage label above
the field or make the row taller to accommodate it. This compact Jira-style treatment is the
universal convention for stage labels on fields. State boxes continue to place their stage label
above the state name because those labels describe a lifecycle moment, not a field.

### External or optional origins

Use a small, light, dashed shape outside the product objects for an off-system trigger or optional
origin. It may name examples, but it does not get a product-object icon.

Examples: field conversation, RFI, observation, uploaded file, manual entry.

### Actions, people, and decisions

Do not create standalone nodes for human actions, roles, or prose explanations. Put them in the
workflow map. In the diagram, use a short edge label only when the action is necessary to explain
an object relationship. A true persisted decision status may be shown as a state.

## 3. Deciding which representation to use

Use this decision order:

1. **Can it persist independently and have its own identity or lifecycle?** Use an object `Group`.
2. **Is it a status of an existing object?** Use a state `Shape` inside that object's group.
3. **Is it a stored, linked, collected, or calculated value on an object?** Use an ERD-style field
   row inside the object.
4. **Is it an external trigger or input?** Use a dashed origin shape.
5. **Is it a person, user action, or explanation?** Usually omit it; otherwise use a concise edge
   label.

Do not represent one concept twice. For example, if “Approved” is a state inside a Change Order,
do not also create an “Approval” object unless the product truly stores a separate approval record.

## 4. Relationship grammar

Every arrow must answer a sentence of the form: **source + verb + exact target/result**.

| Meaning | Line treatment | Target | Label example |
| --- | --- | --- | --- |
| Normal state transition | Neutral gray, solid | Next state | Usually none |
| Rework/return loop | Neutral gray, dashed | Earlier state | Usually none |
| Creates or derives an object | Lime, solid | New object container | `creates RFQ` |
| Supplies data to a new object | Lime, solid | New object container or exact field | `accepted RFQ amount populates CCO SOV` |
| Mutates/appends to an existing object | Lime, solid | Exact ERD row | `approved CCO is added to the commitment` |
| References existing context | Blue, dashed | Exact ID/reference row | `references selected commitment for vendor / contract context` |
| Optional external origin | Neutral gray, dashed | First product object | Usually none |

Rules:

- Point to the left, right, top, or bottom edge of the semantically correct target.
- An arrow to an ID means “references this record”; it must not imply that the source creates the ID.
- An approved downstream object may update a parent; a draft or quote should not point to a changed
  total unless the product actually applies it at that stage.
- Use one arrowhead at the destination. Keep inter-object lines at `1` or `0.75` width so arrowheads
  remain restrained.
- Put labels close to their lines, near the midpoint of the meaningful segment. Labels have no
  background pill, use at most two short lines, and must not overlap nodes or other arrows.
- Route around objects. Increase spacing before accepting crossed lines or unreadable labels.

## 5. Job-map stage labels

The canonical stages are `DEFINE`, `LOCATE`, `PREPARE`, `CONFIRM`, `EXECUTE`, `MONITOR`, `MODIFY`,
and `CONCLUDE`.

- A stage label is context, not a product feature or state. Render it as small uppercase monospace
  text above the relevant state name.
- Keep the actual product state in larger clean type below it.
- If two adjacent job stages occur in one product state, combine them with a centered dot, for
  example `EXECUTE · MONITOR`.
- If a stage describes selecting a record or field rather than entering a state (often `LOCATE`),
  place the label beside the exact reference relationship or field. Do not invent a state box.
- Account for all eight stages in the model, but do not force eight boxes. Several stages may map to
  one state, and a stage may be expressed by a relationship or field.
- Stage labels do not determine layout. Object lineage and state transitions determine layout.

## 6. Visual system

The rendered PNG has a transparent canvas so it sits directly on the site's dark background.

### Color tokens

| Use | Value |
| --- | --- |
| Object body | `#11151a` |
| State fill | `#1a2028` |
| Field-row fill | `#151a20` |
| Field-row border | `#343b45` |
| State border | `#69727e` |
| Primary text | `#f5f7fa` or `#ffffff` |
| Secondary/stage text | `#b9c0ca` |
| Relationship-label text | `#cbd1d8` |
| Neutral transitions | `#8f98a4` |
| Optional-origin line | `#7b8490` |
| Blue object/reference accent | `#5f9dff` |
| Lime object/data accent | `#dfff2f` (line variant `#a8c900`) |
| Orange object accent | `#ffb84d` |

Use no more than three object accents in one diagram. An accent identifies an object and its
important relationships; it does not indicate that one state is more important than another.
Tint title bars with a very dark version of their object's accent.

### Type and sizing

| Element | Standard |
| --- | --- |
| Object title | Clean, `16–17px`, left aligned |
| Object icon | Lucide `lg`, matching border accent |
| State name | Clean, `14–16px`, white |
| Job-map stage | Mono, `12px`, uppercase, secondary color |
| Field | Mono, `14px`, left aligned |
| Relationship label | Clean, `11px`, centered |
| Object border | `2px` |
| State/field border | `1px` |
| Inter-object line | `0.75–1px` |
| Internal transition | `0.75px` |

### Layout and spacing

- Prefer a wide landscape composition.
- Size every group to its content; remove empty bottom or right space.
- Keep at least `90px` between major objects and more where an edge label needs room.
- Use consistent internal margins of roughly `20–30px`.
- Make comparable state boxes the same size.
- ERD rows span the full usable width of their object; they do not float on a larger background.
- Keep the main object lineage readable from left to right. Put an existing parent/reference object
  above the lineage when that reduces crossings.
- Judge readability at the size used on the website, not only in a zoomed image preview.

## 7. Eraser JSON patterns

All IDs use lowercase kebab case and describe semantics, not coordinates: `rfq-object`,
`rfq-review`, `commitment-row-id`. Children repeat their parent's prefix.

### Object container

```json
{
  "tag": "Group",
  "id": "record-object",
  "x": 400,
  "y": 340,
  "width": 315,
  "height": 250,
  "bgColor": "#11151a",
  "borderColor": "#dfff2f",
  "borderWidth": 2,
  "cornerRadius": "round",
  "styleMode": "plain",
  "title": {
    "text": "Record Name",
    "icon": "send",
    "iconProps": { "color": "#dfff2f", "size": "lg" },
    "width": "full",
    "bgColor": "#20270f",
    "color": "#f5f7fa",
    "fontSize": 17,
    "typeface": "clean",
    "hAlign": "left"
  }
}
```

### State and its stage label

Use a neutral shape plus separate textboxes. Separate textboxes give predictable typography and
alignment.

```json
{
  "tag": "Shape",
  "id": "record-review",
  "containerId": "record-object",
  "shape": "rectangle",
  "x": 425,
  "y": 410,
  "width": 140,
  "height": 68,
  "bgColor": "#1a2028",
  "borderColor": "#69727e",
  "borderWidth": 1,
  "cornerRadius": "round",
  "styleMode": "plain",
  "texts": []
},
{
  "tag": "Textbox",
  "id": "record-review-stage",
  "containerId": "record-object",
  "x": 425,
  "y": 422,
  "width": 140,
  "height": 18,
  "text": "MONITOR",
  "fontSize": 12,
  "color": "#b9c0ca",
  "typeface": "mono",
  "hAlign": "center",
  "fixedWidth": true
},
{
  "tag": "Textbox",
  "id": "record-review-name",
  "containerId": "record-object",
  "x": 425,
  "y": 445,
  "width": 140,
  "height": 22,
  "text": "Under Review",
  "fontSize": 15,
  "color": "#ffffff",
  "typeface": "clean",
  "hAlign": "center",
  "fixedWidth": true
}
```

### ERD-style field row

```json
{
  "tag": "Shape",
  "id": "record-row-total",
  "containerId": "record-object",
  "shape": "rectangle",
  "x": 402,
  "y": 500,
  "width": 311,
  "height": 41,
  "bgColor": "#151a20",
  "borderColor": "#343b45",
  "borderWidth": 1,
  "cornerRadius": "sharp",
  "styleMode": "plain",
  "texts": []
},
{
  "tag": "Textbox",
  "id": "record-total",
  "containerId": "record-object",
  "x": 420,
  "y": 510,
  "width": 275,
  "height": 22,
  "text": "revised_total",
  "fontSize": 14,
  "color": "#dfff2f",
  "typeface": "mono",
  "hAlign": "left",
  "fixedWidth": true
}
```

When the row needs a stage label, reserve space at the right and add a second textbox within the
same row:

```json
{
  "tag": "Textbox",
  "id": "record-total-stage",
  "containerId": "record-object",
  "x": 620,
  "y": 510,
  "width": 75,
  "height": 22,
  "text": "CONCLUDE",
  "fontSize": 12,
  "color": "#b9c0ca",
  "typeface": "mono",
  "hAlign": "right",
  "fixedWidth": true
}
```

### Connections

```json
{
  "from": "source-object",
  "to": "target-object",
  "color": "#a8c900",
  "lineWidth": 1,
  "fromPort": "right",
  "toPort": "left",
  "endArrowhead": "arrow"
}
```

Add `"lineStyle": "dashed"` only for references, optional origins, or rework loops. Prefer
explicit `fromPort` and `toPort` values to keep routing stable. Edge labels are separate `Textbox`
entities because their position is easier to control than automatic connection labels.

## 8. File and rendering convention

- Source: `diagrams/<product-slug>-feature-dependency.json`
- Output: `src/assets/<product-slug>/feature-dependency.png`
- Renderer: `scripts/render-diagram.mjs`

Render any diagram with:

```bash
node scripts/render-diagram.mjs \
  diagrams/<product-slug>-feature-dependency.json \
  src/assets/<product-slug>/feature-dependency.png
```

The renderer uses Eraser's open-source `@eraserlabs/diagrams-cli`, waits for fonts, captures only
the Eraser scene, renders at 2× density, and preserves transparency.

## 9. Review checklist

Before considering a diagram complete, verify:

- [ ] Every icon represents a durable product object, not a state, role, or action.
- [ ] Every state is visibly contained by the object whose lifecycle it describes.
- [ ] ERD rows show only fields that explain the job and use exact semantic arrow targets.
- [ ] Every arrow has a verified relationship and cannot be mistaken for creating an ID or changing
      a value too early.
- [ ] Every relationship can be read as source + verb + exact target/result.
- [ ] All eight job-map stages are accounted for without creating artificial boxes.
- [ ] State boxes share one visual convention; no state is highlighted as a special card.
- [ ] Labels sit close to their lines and remain readable at page scale.
- [ ] Lines do not cross text, nodes, or unrelated arrows.
- [ ] Object containers have no unexplained empty space.
- [ ] The PNG background is transparent and the diagram works on the site's dark background.
- [ ] The final render is consistent with the current Procore diagram.
