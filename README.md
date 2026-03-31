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

| Image | File name | Location | Scenario |
|-------|-----------|----------|----------|
| Good pizza | `good_pizzas.png` | `src/assets/images/good_pizzas.png` | Main flow — AI detection + labeling |
| Bad pizza (banana) | `pizza_banana.png` | `src/assets/images/pizza_banana.png` | AI error flow |
| Bad pizza (sardine) | `pizza_sardine.png` | `src/assets/images/pizza_sardine.png` | AI error flow |

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

| Color | Confidence | What to do |
|-------|-----------|------------|
| 🟢 Green | High — likely correct | Accept |
| 🟠 Orange | Medium — needs check | Review carefully, then accept or decline |
| 🔴 Red | Low — most likely incorrect | Decline or correct |

**Accepting a label:** click the label → click **Accept** to keep it as-is (converts to a manual label).

**Declining a label:** click the label → click **Decline** to remove it.

**Accepting all at once:** click **Accept all** in the AI Annotation Summary panel on the right to confirm all AI labels in one step.

You can also freely edit any label — move it, resize it, or change its defect category — before or after accepting.

> After 3 overrides of high-confidence (green) labels, a feedback prompt appears asking why you overrode the AI.

---

## Logging

The backend server (port `9090`) records all user interactions to a JSON log file in the `backend/` folder. Log files are named `log_<timestamp>.json`.
