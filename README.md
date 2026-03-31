# PizzaScan

A Wizard of Oz annotation tool for pizza quality inspection research.

## Running the app

### Prerequisites

- Node.js (v18 or newer)

### Install dependencies

```sh
npm install
cd backend && npm install && cd ..
```

### Start the app

```sh
npm run dev
```

This starts both the frontend (Vite) and the backend logging server simultaneously.
Open your browser at `http://localhost:5173`.

---

## Supported images

PizzaScan is a **Wizard of Oz** prototype — the AI does not run a real model, it uses pre-defined annotations. The app only works correctly with specific image files. **The file names must match exactly.**

| Image               | File name           | Location                              | Scenario                            |
| ------------------- | ------------------- | ------------------------------------- | ----------------------------------- |
| Good pizza          | `good_pizzas.png`   | `src/assets/images/good_pizzas.png`   | Main flow — AI detection + labeling |
| Bad pizza (banana)  | `pizza_banana.png`  | `src/assets/images/pizza_banana.png`  | AI error flow                       |
| Bad pizza (sardine) | `pizza_sardine.png` | `src/assets/images/pizza_sardine.png` | AI error flow                       |

> Only `good_pizzas.png` supports the full workflow. The bad pizza images trigger the AI error screen (unsupported image).

---

## Testing scenarios

### Scenario 1 — Main flow (good pizza)

1. Upload `good_pizzas.png`
2. Click **Detect** in the toolbar — the pizza is split into 8 sub-images
3. Click **AI Labels** — the AI model annotates the image with defect boxes
4. Review the labels and apply the accept/decline rules below
5. Check the **Statistics** tab in the right sidebar

### Scenario 2 — Unsupported image (bad pizza)

1. Upload `pizza_banana.png` or `pizza_sardine.png`
2. Click **AI Labels** — the app shows an AI error screen (image not supported)

---

## Accept / Decline rules

Each AI label has a color indicating its confidence level:

| Color     | Confidence                  | What to do                               |
| --------- | --------------------------- | ---------------------------------------- |
| 🟢 Green  | High — likely correct       | Accept                                   |
| 🟠 Orange | Medium — needs check        | Review carefully, then accept or decline |
| 🔴 Red    | Low — most likely incorrect | Decline or correct                       |

**Accepting a label:** click the label → click **Accept** to keep it (converts to a manual label).

**Declining a label:** click the label → click **Decline** to remove it.

**Accepting all at once:** click **Accept all** in the AI Annotation Summary panel on the right.

> After 3 overrides of high-confidence (green) labels, a feedback prompt appears asking why you overrode the AI.

---

## Trust calibration

The app monitors how quickly you accept or decline labels and shows a nudge message if your behavior seems off:

- **5 accepts in a row within 12 seconds** → *"AI suggestions may not always be correct. Please review them before confirming."*
- **5 declines in a row within 12 seconds** (on medium or high confidence labels) → *"AI suggestions have a high success rate and can save you time. At least try to review them before rejecting them."*

The message appears as a banner at the top of the screen and disappears after 8 seconds or when closed manually.

---

## What the colleague implemented

- Privacy consent screen at startup (option to decline data collection)
- Trust calibration banner (described above)
- Onboarding / tutorial flow for AI detection and AI labeling
- Defect type examples modal (visual reference for each defect category)
- Removed "Other" category from defect types
- Unsupported pizza images trigger an AI error screen (banana, sardine)
- Feedback response after submitting override reason

---
