// alchemy_readme.js: Embedded README content (EN + ZH + JA) so the "Full Documentation"
// wiki view works even when the app is opened locally via file:// (fetch() is
// blocked by browsers under file:// for local resources).
// NOTE: Keep this in sync manually with README.md / README.zh-CN.md / README.ja.md when those change.

window.ALCHEMY_README = {

en: `[EN](README.md) | [简体中文](README.zh-CN.md) | [日本語](README.ja.md)

# Alchemy Factory Calculator

A browser-based production planning tool for the game **Alchemy Factory**.
Precisely calculates raw material consumption, machine counts, heat/nutrient loads, and profitability for any production chain.

**Live version:** [https://suguru-toyohara.github.io/AlchemyFactoryCalculator](https://suguru-toyohara.github.io/AlchemyFactoryCalculator)

---

## ✨ Features at a Glance

| Feature | Description |
|---|---|
| 🌲 **Production Tree** | Recursive tree from raw ore to finished product, with per-node machine counts and rates |
| 🔄 **Recipe Switching** | Swap between alternative recipes per node; Advanced Athanor catalyst selection |
| ♻️ **Byproduct Recycling** | Route byproducts back into the chain to reduce imports |
| 📦 **Multi-target Mode** | Plan multiple production goals simultaneously with shared infrastructure |
| 🗺️ **Planner** | Free-form node-graph editor for designing factory layouts, with modules, auto-layout, and live flow resolution |
| ⚗️ **Cauldron Calculator** | Brute-force cauldron combination search with favorites and DB sync |
| 📖 **Wiki** | Built-in item and machine database browser with recipe cross-references |
| 🛠️ **Database Editor** | Edit recipes, items, and translations directly in the browser |
| 💾 **Persistent Storage** | All settings, recipes, and lists auto-saved to browser \`localStorage\` |
| 🌐 **Bilingual UI** | Toggle between English and Simplified Chinese; fully customizable translations |
| 🔗 **Shareable URLs** | Current item and rate are reflected in the URL for easy sharing |

---

## 🚀 Getting Started

#### Online
Open [https://suguru-toyohara.github.io/AlchemyFactoryCalculator](https://suguru-toyohara.github.io/AlchemyFactoryCalculator) in any modern browser. No installation required.

#### Local
1. Download or clone this repository.
2. Open \`index.html\` directly in your browser.
3. No server, build step, or dependencies required.

---

## 📐 Calculator Tab

### Setting a Target

Type an item name into the search box (supports partial match) or click **☰** to open the **Item Picker**. The picker supports category browsing, a Tier slider, and attribute filters for Sell Price, Wholesale Price, and Cauldron Target.

**Single-target mode**:
- Use the **Belt Load Fraction** slider to set the target as a fraction of belt capacity (1/12 to Full).
- Or enter a precise **Rate (Items/Min)** directly.
- Toggle **Set by Machine Count** to reverse the calculation — enter a number of machines and the rate is computed for you.

**Multi-target mode**:
- Add as many target rows as needed; each is independent, and rows can be reordered by dragging the handle.
- Use **💾 Save List / 📂 Load List** to persist multi-target sets in the browser.
- Enable **Self-Fuel** or **Self-Fert** to automatically deduct factory consumption from the net output of the fuel/fertilizer item itself. The engine iterates to a stable equilibrium.
- **⚡ Fuel/Fert 1-Machine Quick Set** instantly fills the list with two rows (the selected fuel and fertilizer items), each set to a single fully-loaded machine's rate.
- If Self-Fuel or Self-Fert cannot converge because supply is too low or the calculation diverges, an equilibrium warning is shown above the production tree.

### Upgrades

Enter your current research levels in the **Upgrades** panel on the right:

| Field | Effect |
|---|---|
| **Logistics Efficiency** | Increases belt speed (items/min per belt) |
| **Factory Efficiency** | Multiplies all machine processing speeds |
| **Alchemy Skill** | Increases yield on Extractors, Alembics, and Thermal Extractors |
| **Fuel Efficiency** | Increases the heat value of fuel |
| **Fert Efficiency** | Increases the nutrient value of fertilizer |

Upgrade levels and logistics settings are saved automatically whenever they change; no manual save button is required.

### Logistics

| Setting | Description |
|---|---|
| **Heating Device** | Choose the furnace type (Stone Furnace / Blast Furnace / Steam Heating Pad); affects slot sharing and heat output |
| **Fuel Source** | The item used as fuel; also used to express total heat load as item counts |
| **Fertilizer Source** | The item used as fertilizer; used for nursery calculations |
| **Manage Custom Costs** | Set a custom gold cost per item, used in place of buy price / to price external inputs that have no buy price |
| **Node Size** | Scale the production tree cards up or down |
| **Show Belt Count** | Display belt usage alongside each node's rate |
| **Show Machine Usage** | Display fuel/fertilizer consumption on each node |
| **Show Machine Max Cap** | Show maximum capacity of the ceiled machine count |
| **Show Machine Heat & Nutr** | Show per-machine heat (P/s) and nutrient (V/s) on each node |
| **Show Raw Machine Count** | Show fractional machine counts (up to two decimals) instead of rounded-up counts |

### Reading the Production Tree

Each node shows:
- **Rate** (items/min) — click this number to open the **Scale Modal**
- **Belt count** (if enabled)
- **Machine count** (ceiled) with a tooltip showing cycle time, throughput, and speed multiplier
- **Byproducts** in purple
- **Heat** and **Nutrient** costs in their respective colors
- **Gold cost** for purchased raw materials
- Catalyst nodes may show a toggle to expand or collapse their catalyst input subtree.
- Click an item name to open a drill-down in a new tab with that item and rate as URL parameters.

Rate numbers shown in **red** mean belt capacity is exceeded.

**Controls on each node:**
- **▼/▶ arrow** — collapse/expand the subtree (state is remembered)
- **🔄 button** — open the recipe selector to switch production methods
- **♻️ button** — enable byproduct recycling for that node (appears when a byproduct is consumed elsewhere in the chain)
- **☐ checkbox** — mark demand as **External Input**; the node will not be produced internally and appears in the External Inputs summary instead

Use **Recycle All / Un-recycle All** at the top of each production chain section to toggle all recyclers at once, and the **💠** icon to expand/collapse the whole first level at once.

Below the tree, a **Common Nodes** section lists any item+machine combination that appears more than once across the chain (e.g. shared intermediates), with links back to every occurrence, and a **Byproducts** section summarises unconsumed byproducts with links to their producers.

### Switching Recipes & Catalysts

Click **🔄** on any node to open the recipe selector:
- Choose an alternative recipe (e.g., Athanor vs. Advanced Athanor for Coke).
- For **Advanced Athanor** recipes, select one or more **catalysts** (Unstable / Fertile / Resonant / Eternal) to change output ratios or input requirements.
- For the **Paradox Crucible**'s custom-input recipe, pick which item to feed in via the Item Picker.
- Recipe overrides can be applied **Globally** or **This Node Only**, via the scope toggle at the top of the modal (only shown when switching a recipe on a specific tree node).
- Items with a \`cauldronTarget\` also show an **+ Add Cauldron Recipe** button to open the [Cauldron Recipe Modal](#cauldron-recipe-modal).

### Scale Modal

Click any **rate number** to open the Scale Modal. Three linked fields update each other in real time:
- **Output Rate (/min)**
- **Belt Count** — at current belt speed
- **Machine Count**

Edit any field; the **Scaling Ratio** updates automatically. Click **Apply** to rescale the entire production tree proportionally.

### Summary Box

The bar above the tree shows four blocks:

| Block | Content |
|---|---|
| **Gross Output** | Total production rate before internal consumption |
| **Total Load** | Factory heat (P/min) and nutrient (V/min) demand, plus fuel/fert item equivalents |
| **Unit Cost** | Coin, heat, and nutrient cost per output item (or, with exactly two multi-targets set to the fuel and fertilizer items, the solved gold-equivalent value of the fuel/fertilizer itself) |
| **Unit Value** | Conversion cost vs. Retail Price and Wholesale Price, as a ratio |

### Construction List

The right panel lists every machine type and count required. Click a machine name to expand and see the **total raw materials** needed to build all machines of that type. The **Total Materials Required** section at the bottom also shows estimated **inventory slot** counts based on max stack sizes, plus total machine count and flat/compact footprint tile counts.

### Send to Planner

The **Send to Planner** button (in the Save/Reset panel) exports the current calculator production tree straight into the Planner tab as a node graph — see [Importing from the Calculator](#importing-from-the-calculator) below.

---

## 🗺️ Planner Tab

The Planner is a free-form, Satisfactory-Modeler-style node-graph editor: instead of a single recursive tree rooted at one target item, you place recipe nodes freely, wire their input/output ports together, and the tool resolves how much of each item actually flows across every connection.

### Plan Library

The Planner can hold multiple independent **plans**, each with its own set of nodes and connections.

- The dropdown in the toolbar switches between plans; **📁 Manage Plans** opens a modal listing every plan.
- In the manager you can **drag to reorder**, **rename in place** (double-click the name field that appears), **duplicate**, **delete**, or **export** a single plan as a \`.json\` file. **New Plan** creates a blank plan, and **⭱ Import** loads a previously exported \`.json\`.
- **📦 Import as Module** inserts a selected existing plan directly as a module node in the current canvas.
- Every plan keeps its own **undo/redo history** and remembers the **viewport** (pan/zoom) you last left it at for the current browser session.

### Canvas Basics

- **+ Add Node** or **right-click** an empty area of the canvas opens the Item Picker; picking an item with a recipe drops a new node there.
- **Drag a node's header** to move it; drag empty canvas to pan the view.
- **▭ Select Mode** switches the canvas into box-select: drag a rectangle to select multiple nodes, then drag any selected node's header to move the whole group together, or press **Delete/Backspace** to remove them all at once.
- **Ctrl/Cmd+click** toggles a single node selection outside Select Mode. **Shift+drag** on empty canvas temporarily box-selects without changing modes.
- **Zoom** with the mouse wheel, pinch-to-zoom on touch devices, or the **+ / −** buttons; **⤢ Fit to View** (or the **F** key) frames all nodes.
- The **⊞ Grid Snap** button cycles node-dragging snap between three grid sizes and off.
- **↺ Undo / ↻ Redo** (or **Ctrl+Z / Ctrl+Y**) step through that plan's edit history.

### Nodes & Ports

Each node represents one recipe at a chosen **machine count** (which can be fractional) and shows its input ports on the left and output ports on the right:

- **Port dot colors** — gray: unconnected; green: connected and balanced; yellow (output): surplus beyond what's connected; red (input): still short of what's needed after connections.
- Hovering a node's header shows a tooltip with that recipe's full input/output/fuel/fertilizer rates **per single machine**.
- Drag from a port's dot to another compatible port (same item, opposite direction) to connect them; dragging onto empty canvas instead opens a small recipe picker (filtered to recipes that produce/consume that item) and creates a new connected node in one step.
- Clicking a connection's flow-rate label opens an **Edge Modal** showing source/target, current flow, and lets you type an exact target flow (which resizes the machine counts on both ends to match) or delete the connection.
- The Edge Modal lets you reorder multiple connections on the same port with source/target priority ▲/▼ controls, and set or reset an edge color.

### Node Settings (⚙)

Opens a modal with:
- The current recipe's full input/output breakdown, plus **catalyst toggles** for Advanced Athanor recipes or an **input-item picker** for the Paradox Crucible's custom recipe.
- A **recipe-switch list**, grouped by the node's main output item, to swap to any alternative recipe for that item.
- A **Port Balance** section (only shown when at least one connected port is unbalanced) with one-click buttons per item to adjust the node's machine count so a specific connected input/output exactly matches what its connections need.
- **Graph Tools**: Select All Upstream, Auto-Layout Upstream (tidies all upstream nodes into a tree layout), Populate All Upstream (recursively auto-generates missing upstream production, see below), and Clear All Upstream.

### Fuel, Fertilizer & Steam (dock ports)

A machine's fuel, fertilizer and steam demands are shown as **dock ports** on the bottom edge of its card (orange = fuel, green = fertilizer, blue = steam). They behave like any input port: drag from a dock to a producer's output, drop on empty canvas or press ⚡ to auto-create the producer, and the flow counts toward port balance and link mode. An unconnected dock shows as a shortage.
- **Defaults** for the heating device, fuel and fertilizer are chosen in the Planner toolbar (🔥 / 🧪 / 🌿); they are the same values as the Calculator's Logistics panel.
- **Per node**, override them under **Node Settings → Heating Device / Fuel / Fertilizer** (default: follow the global setting).
- A machine on a **Steam Heating Pad** burns no fuel; its heat demand becomes a **Steam** demand instead (1 Steam = 20 P). The **Steam Boiler** sits on a Stone/Blast Furnace itself and has three output levels (Low 300 / Mid 1,500 / High 9,000 Steam per minute at 100 / 500 / 3,000 P/s), selectable from its recipe list. Pipe capacity is not modelled.

### Auto-Generating Upstream Production

The **⚡ button** on a node's machine-count row inspects that node's unmet input demand and auto-creates one upstream node per missing input (using its preferred recipe), sized and pre-connected to exactly cover the shortfall, laid out to the node's left. **Populate All Upstream** (in the Node Settings modal) repeats this recursively until the whole upstream chain has no more shortages, skipping recipes that would recurse into themselves.

### Linking Machine Counts

The chain-link button next to a node's machine-count input toggles **Link Mode**. While active, changing one node's machine count (or setting an exact flow value in the Edge Modal) proportionally scales the machine counts of every node connected to it, so an entire sub-chain can be resized together instead of one node at a time.

### Module Nodes

A node can also reference an entire other plan as a **module**: it exposes that plan's *net* unconnected inputs/outputs as its own ports (i.e. whatever that plan doesn't already produce/consume internally), plus its total fuel/fertilizer draw. Its Node Settings modal shows a **📦 Load Module** button that switches the Planner to that referenced plan. The tool detects circular module references and flags them as an error on the node instead of resolving them.

Select a group of nodes and click **📦 Encapsulate** to create a new plan from the selection and replace it with a module node. The internal connections are retained inside the new module.

Use **🔀 Optimize Port Order** in the lower-right canvas controls to optimize all port orders; dropping a node also performs a single-node port-order optimization.

### Portal Nodes

The **+ 🌀 Portal** tool adds a portal node for external item movement. Set its item by clicking its title and use **⇄** to switch the visual input/output direction.

### Summary Panel

A collapsible floating panel (top-left of the canvas) totals the whole current plan into four sections: **Total Load** (gold/fuel/fertilizer consumption), **Output** (unconnected output surplus), **Input** (unmet input shortage), and **Machines** (machine counts by type). Each section can be collapsed independently, and the whole panel can be minimized to a small button.

### Importing from the Calculator

The Calculator tab's **Send to Planner** button converts its current production tree into a Planner node graph inside the active plan: recipe nodes are aggregated by recipe id (with machine counts summed), parent/child edges are created for the main flows, and any byproduct recycling in the calculator is translated into extra recycle edges. New nodes are laid out automatically (upstream tree layout) and the view is fit to show them; edges left with essentially zero flow after resolution are dropped.

---

## ⚗️ Cauldron Tab

### Cauldron Types

- **Standard Cauldron (3-slot):** \`T = (Cost₁ + Cost₂ + Cost₃) × Ratio\`
  - All different → ×1.0, Two same → ×0.65, All same → ×0.5
  - Output is the item whose \`cauldronTarget\` is nearest to T.
- **Advanced Cauldron (2-slot):**
  - Same + Same → \`T = Cost₁\`, searches **upward** for the nearest product.
  - A + B (different) → \`T = |Cost₁ − Cost₂|\`, searches for the nearest product whose target value is less than the maximum of the two cauldron costs.

Switch type with the **Cauldron / Advanced Cauldron** toggle at the top.

### Candidate Pool & Profiles

The left panel lists all items eligible as cauldron ingredients (must have a \`cauldronCost\` and not be a liquid). Check or uncheck items to include them in the search.

Three independent **Profiles** let you store different candidate sets:
- **Profile 1** — All valid ingredients (default)
- **Profile 2** — Herb-chain items (auto-generated from herbal production chains)
- **Profile 3** — Gold/currency-based items

Use **Select All / Deselect All** to bulk-configure the active profile. The **🌿** button resets the pool to a herb-focused preset, and **💰** resets it to a gold/currency-focused preset.

Sort the pool by cauldron cost with **Sort by Value** and toggle ascending/descending with **🔼/🔽**.

### Slot Filters & Search

Lock up to three **Set Input** slots to restrict the search to combinations containing a specific item at a fixed position. Use the **+/−** arrows below each slot to cycle through items in cost order. **Set Target Output** can restrict results to one selected product.

Filter by ratio type with the checkboxes: **2 Diff, 3 Diff, 2 Same, 3 Same**.

Results recalculate immediately whenever a filter or slot condition changes.

### Results & Favorites

Results are grouped by output item and collapsed by default. Click an item to expand its compatible ingredient combinations. Items that cannot be produced by any combination appear in the **Unattainable Targets** section.

Click **★** on any recipe row to save it to **Saved Recipes** (right panel). From there:
- **Export** — save all favorites as a \`.txt\` file (format: \`Item1 + Item2 (+ Item3) = Product\`)
- **Import** — load a \`.txt\` file to bulk-import recipes
- **Sync DB** — inject all saved cauldron recipes into the main production database so the Calculator can include cauldron steps in full production chains
- **Show Estimated Cost** displays estimated costs in single-step results, and **Order by Est. Cost** sorts them by that estimate.

### Cauldron Recipe Modal

From the Calculator's recipe selector, items with a \`cauldronTarget\` show a shortcut button to open the **Cauldron Recipe Modal**. Here you can:
- Pick ingredients for each slot with the Item Picker or cycle with **+/−** arrows.
- See the computed T value, valid range \`[lower, upper]\`, and distance to each bound in real time.
- Green = combination hits the target; Red = it does not.
- Click **★** to save to favorites, or **Apply** (only enabled on a hit) to instantly register the recipe in the Calculator and set it as preferred.

### Multi-Step Optimization

Switch to **Multiple Steps** (next to **Single Step** at the top of the Cauldron tab) to search for cheaper *multi-stage* cauldron chains — recipes that themselves consume the output of an earlier cauldron combination — instead of a single combination search.

- The table shows one row per item and one column per optimization round (**Step 0** through **Step 4**). **Step 0** is the base cost of each candidate item; each subsequent step re-runs the cauldron search using the previous step's items as ingredients, keeping only combinations that are *cheaper* than what's already known for that item.
- Costs that didn't improve over the previous step are grayed out, so you can see at a glance which items actually benefited from another round of optimization.
- Click the **▲** button on any cell to highlight and filter the table down to just that item and its full upstream ingredient chain — every cell that was actually used to reach that result lights up. Click the same **▲** again to clear the filter.
- Click **★** on any cell to save that step's recipe to **Saved Recipes**, same as the Single Step results.
- Hover the cost number for a per-item **Ingredients Cost** / **Heat Cost** breakdown (in coins), and hover an ingredient icon to see its name and the cost value used in that calculation.
- **⚙ Cost Settings** lets you set the Heat-to-coin and Nutrient-to-coin conversion rates used to estimate costs throughout the Cauldron tab (also shown as an editable, searchable list of every item's estimated base cost).
- **Max Intermediate Items** (1–3) limits the number of intermediate products retained in multi-step optimization chains.

---

## 📖 Wiki Tab

Four sub-views accessible from the top navigation:

| View | Description |
|---|---|
| **Items** | Searchable icon grid of all items, with chip-based filters (Category, Tier, Sell Price, Wholesale Price, Cauldron Target); click any item for stats, production recipes, and usage |
| **Machines** | Searchable machine list; click any machine for properties, build cost, and all associated recipes |
| **Contracts** | Contract reward and production limits calculator with configurable daily work time and upgrade boosts |
| **Full Documentation** | Embedded README viewer with the complete documentation, rendered by the built-in Markdown renderer |

Both Items and Machines views provide chip filters; Machines can be filtered by Tier and Heat Cost. In the Items view, click **★** next to any recipe to set it as the preferred recipe for that item (synced with the Calculator).
Click any item in a recipe row to navigate directly to its detail page.

### Contracts View

The **Contracts** view lists the available contract items and calculates their daily limits and revenue. It provides three saved parameters:

- **Working Hours / Day** — the number of hours available for contract work (1 hour in-game = 1 minute real time). this controls **Units/min**.
- **Contract Amount Boost (%)** — increases the base daily contract limit.
- **Contract Profit Boost (%)** — increases each contract's base reward. The resulting reward is rounded down to a whole number before revenue is calculated.

The table shows the item, units per contract, reward coin type, daily maximum, units per minute, maximum daily revenue, required level, and dispatch requirement. Click any **Units/min** value to send that item and rate to the Calculator tab as the current target.

---

## 🛠️ Database Editor Tab

Select a target from the dropdown:
- **Database** — full item, machine, and recipe data
- **Translations** — the \`ALCHEMY_I18N\` object controlling all UI strings and item/machine names
- **Settings** — current user preferences as JSON
- **(\\*BACKUP)** variants — previous versions automatically saved before each apply

Edit the JSON directly in the textarea, then click **Apply Changes** to reload immediately. Use **Export to File** to save a copy.

> **Warning:** Applying a new Database reloads the page and overwrites the local copy. Keep backups via Export before applying.

---

## 🌐 Language & Localization

Click **🌐 EN/中文** in the header to toggle between English and Simplified Chinese.

The translation layer (\`alchemy_i18n.js\`) maps every item name, machine name, category, and UI string. You can customize it in the **Database Editor → Translations**. Changes persist in \`localStorage\`.

---

## 🔗 URL Parameters

The URL reflects the current state and can be bookmarked or shared:

| Parameter | Description | Example |
|---|---|---|
| \`item\` | Target item name | \`?item=Steel%20Ingot\` |
| \`rate\` | Production rate (items/min) | \`&rate=60\` |
| \`tab\` | Active tab on load | \`&tab=cauldron\` |
| \`lang\` | Force language (\`en\` to force English) | \`&lang=en\` |
| \`fuel\` | Override fuel source | \`&fuel=Coke\` |
| \`fert\` | Override fertilizer source | \`&fert=Basic%20Fertilizer\` |
| \`setupgrades\` | Comma-separated upgrade levels (indices 0–9) | \`&setupgrades=5,0,3,2,1,1,0,0,0,0\` |

> The \`setupgrades\` indices map to: \`[0]\` Logistics, \`[1]\` (unused), \`[2]\` Factory Efficiency, \`[3]\` Alchemy Skill, \`[4]\` Fuel Efficiency, \`[5]\` Fert Efficiency, \`[6]\` Sales Ability, \`[7–9]\` (unused).

---

## ⚙️ Reset Options

| Button | Effect |
|---|---|
| **Reset Recipes** | Clear the local database, restoring the bundled version (backup saved automatically) |
| **Reset Translations** | Clear local translation overrides (backup saved automatically) |
| **All Data Reset** | Clear all \`localStorage\` entries and reload with defaults |

When the bundled database (\`alchemy_db.js\`) has a newer version than your local copy, an **update banner** appears at the top. You can choose to **Update Now** (overwrites local data but preserves your settings) or **Skip Update**.

---

## 🏗️ Project Structure

\`\`\`
AlchemyFactoryCalculator/
├── index.html                      # Main HTML shell, tab layout, modals
├── style.css                       # All styles (CSS custom properties, dark theme)
├── js/
│   ├── alchemy_db.js              # Game data — items, machines, recipes
│   ├── alchemy_i18n.js            # Translation table (EN/ZH) + t() helper
│   ├── alchemy_state.js           # Global application state, default settings, persistence and localStorage
│   ├── alchemy_main.js            # Application entry point, initialization, URL state, module coordination
│   ├── alchemy_ui.js              # Shared UI logic: settings, combobox, item picker, slider, and modals
│   ├── alchemy_calc_engine.js     # Pure calculation engine (tree building, aggregation)
│   ├── alchemy_calc.js            # Calculator UI renderer (DOM, modals, tree nodes)
│   ├── alchemy_cauldron.js        # Cauldron simulation, favorites, sync
│   ├── alchemy_help.js            # Wiki (guides, item browser, machine browser)
│   ├── alchemy_planner.js         # Planner core: canvas, nodes, edges, plan library, view controls
│   ├── alchemy_planner_calc.js    # Planner flow-resolution engine, auto-layout, module/import logic
│   └── alchemy_planner_overlays.js # Planner overlays: plan manager, node settings, edge modal, summary panel
\`\`\`

No build tools, bundlers, or external dependencies. Pure HTML + CSS + vanilla JavaScript.

---

## 🤝 Contributing & Customization

- **Fork freely.** All data and logic are in plain text files.
- To add a new item or recipe, edit \`alchemy_db.js\` (or use the Database Editor in the browser).
- To add or fix a translation, edit \`alchemy_i18n.js\` or use Database Editor → Translations.
- The calculation engine (\`alchemy_calc_engine.js\`) is fully decoupled from the UI and can be used independently.

---

*This calculator is a fork of [AlchemyFactoryCalculator](https://github.com/starfi5h/AlchemyFactoryCalculator) by starfi5h, maintained by [suguru-toyohara](https://github.com/suguru-toyohara) with added Japanese localization and additional features. The starfi5h version is itself a fork of the original [AlchemyFactoryCalculator](https://joejoesgit.github.io/AlchemyFactoryCalculator/) by JoeJoesGit, with added Chinese localization, the Cauldron Calculator, the Wiki, the Planner, incremental database update notifications, and various UI enhancements.*  
`,

zh: `[English](README.md) | [简体中文](README.zh-CN.md) | [日本語](README.ja.md)

# 炼金工厂计算器

专为游戏 **《炼金工厂》(Alchemy Factory)** 打造的浏览器端生产规划工具。
可精确计算任意生产链的原料消耗、机器数量、热值/肥力负载与利润。

**在线使用：** [https://suguru-toyohara.github.io/AlchemyFactoryCalculator](https://suguru-toyohara.github.io/AlchemyFactoryCalculator)

---

## ✨ 功能一览

| 功能 | 说明 |
|---|---|
| 🌲 **生产树** | 从原矿到成品的完整递归树，每个节点显示机器数与速率 |
| 🔄 **配方切换** | 按节点切换备选配方；高级炼金炉支持催化剂选择 |
| ♻️ **副产物回收** | 将副产物导回生产链，减少外部输入 |
| 📦 **多目标模式** | 同时规划多个生产目标，共享基础设施 |
| 🗺️ **规划器** | 自由节点图编辑器，用于设计工厂布局，支持模块、自动排版与即时流量计算 |
| ⚗️ **炼金锅计算器** | 暴力搜索炼金锅配方组合，支持收藏与同步到计算器 |
| 📖 **百科** | 内置物品与机器数据库，支持配方交叉查询 |
| 🛠️ **数据库编辑器** | 在浏览器中直接编辑配方、物品和翻译 |
| 💾 **持久化存储** | 所有设置、配方和列表自动保存至浏览器 \`localStorage\` |
| 🌐 **双语界面** | 中英文一键切换，翻译内容完全可自定义 |
| 🔗 **可分享链接** | 当前物品和速率反映在 URL 中，方便分享 |

---

## 🚀 快速开始

### 在线使用
在任意现代浏览器中打开 [https://suguru-toyohara.github.io/AlchemyFactoryCalculator](https://suguru-toyohara.github.io/AlchemyFactoryCalculator)，无需安装。

### 本地使用
1. 下载或克隆本仓库。
2. 直接用浏览器打开 \`index.html\`。
3. 无需服务器、构建步骤或任何依赖。

---

## 📐 计算器页面

### 设定生产目标物品与速率

在**搜索框**输入物品名称（支持模糊匹配），或点击 **☰** 打开**物品选择器**。选择器支持按分类浏览以及属性过滤。

**单目标模式**：
- 拖动**传送带负载比例**滑块，设定为传送带运力的某个分数（1/12 至 Full）。
- 或直接输入精确的**速率（个/分钟）**。
- 开启**按机器数量设置**可反向计算——输入机器台数，自动推算产出速率。

**多目标模式**：
- 可添加任意数量的目标行，每行独立设置，并可拖曳把手调整顺序。
- 使用 **💾 保存列表 / 📂 加载列表** 将多目标方案持久化到浏览器。
- 开启**自供燃料**或**自供肥料**后，引擎会自动迭代至稳定平衡，将工厂自身消耗从净产出中扣除。
- **⚡ 快速设定燃料/肥料(单机器)** 会立即建立两行目标（所选燃料与肥料物品），速率各自设为单台满载机器的产量。
- 当自供燃料或自供肥料因供应不足或发散而无法收敛时，生产树上方会显示平衡警告。

### 升级等级

在右侧 **升级** 面板填入当前游戏中的研究等级：

| 字段 | 效果 |
|---|---|
| **物流效率** | 提升传送带速度（个/分钟） |
| **工厂效率** | 提升所有机器的处理速度 |
| **炼金技术** | 提升萃取机、蒸馏器和热能萃取机的产量 |
| **燃料效率** | 提升燃料的热值 |
| **肥料效率** | 提升肥料的营养值 |

升级等级和物流设置会在变更时自动保存，无需手动保存。

### 物流设置

| 设置 | 说明 |
|---|---|
| **加热设备** | 选择热源类型（石炉 / 高温炉 / 蒸气加热板），影响格位共享与热值产出 |
| **燃料来源** | 用作燃料的物品；热值负载也会换算为该物品的消耗量 |
| **肥料来源** | 用作肥料的物品；用于育苗圃计算 |
| **管理自订成本** | 为物品设定自订金币成本，用于取代买入价，或为没有买入价的外部输入定价 |
| **版面大小** | 缩放生产树卡片的显示大小 |
| **显示传送带需求** | 在每个节点旁显示传送带占用数 |
| **显示机器消耗用量** | 在每个节点显示燃料/肥料消耗量 |
| **显示机器产能上限** | 显示取整后机器数的最大产能 |
| **显示机器热值&肥力用量** | 在每个节点显示每台机器的热值（P/s）和肥力（V/s）消耗 |
| **显示原始机器数量** | 显示最多两位小数的机器数量，而不是向上取整后的数量 |

### 解读生产树

每个节点显示：
- **速率**（个/分钟）——点击该数字打开**比例缩放窗口**
- **传送带占用数**（开启后）
- **机器数量**（取整后），悬停可查看循环时间、单台机器产量和速度倍率
- 紫色的**副产品**
- 对应颜色的**热值**和**肥力**消耗
- 购买原材料的**金币成本**
- 催化剂节点可显示开关，用于展开或收起催化剂输入子树。
- 点击物品名称可在新分页打开该物品与速率的钻取页面。

速率数字显示为**红色**表示已超过传送带上限。

**每个节点的操作：**
- **▼/▶ 箭头** — 折叠/展开子树（折叠状态会被记住）
- **🔄 按钮** — 打开配方选择器，切换生产方式
- **♻️ 按钮** — 开启该节点的副产物回收（当副产物在生产链其他地方被生产时出现）
- **☐ 复选框** — 标记为**外部输入**；该节点将不会被内部生产，汇总到"外部输入"区域

使用每条生产链顶部的**全部回收 / 全部不回收**按钮，一次性切换所有回收器状态，**💠** 图标可一次展开/折叠整个第一层节点。

生产树下方的 **共同节点** 区块会列出生产链中出现超过一次的物品+机器组合（例如共用的中间产物），并附上跳转到每个出现位置的链接；**副产品** 区块则汇总未被消耗的副产物，并附上跳转到生产来源节点的链接。

### 切换配方与催化剂

点击任意节点上的 **🔄** 打开配方选择器：
- 选择备用配方（例如：用炼金炉还是高级炼金炉生产焦炭）。
- 对于**高级炼金炉**配方，可选择一个或多个**催化剂**（不稳定 / 丰饶 / 共振 / 永恒），改变输出比例或输入原料要求。
- 对于**悖论坩埚**的自订输入配方，可透过物品选择器指定要投入的物品。
- 配方切换可选择套用**全局**范围，或**仅此节点**范围，透过弹窗上方的范围切换开关设定（只有在从生产树节点切换配方时才会显示）。
- 可炼金的物品还会显示 **+ 新增炼金锅配方** 按钮，用于打开[炼金锅配方编辑窗](#炼金锅配方快捷编辑窗)。

### 比例缩放窗口

点击任意节点的**速率数字**，打开比例缩放窗口。三个字段实时联动：
- **产能（/分钟）**
- **传送带数**（按当前传送带速度换算）
- **机器数量**

修改任一字段，**缩放比**自动更新。点击**应用**后，整棵生产树按此比例等比缩放。

### 概览栏

生产树顶部显示四个数据块：

| 数据块 | 内容 |
|---|---|
| **总产出** | 扣除内部自耗前的总生产速率 |
| **总负载** | 工厂热值（P/min）和肥力（V/min）消耗，并换算为燃料/肥料物品用量 |
| **单位成本** | 每个产出物品所需的铜币、热值和肥力成本（若多目标模式恰好指定燃料和肥料两个目标，则改为显示求解出的燃料/肥料自身的金币等值价值） |
| **单位价值** | 总转换成本与零售价/批发价的对比，显示为百分比 |

### 建造清单

右侧面板列出当前方案所需的全部机器种类及数量。点击机器名称可展开，查看建造这些机器所需的**原材料总计**。底部的**总计材料需求**区域还会根据堆叠上限估算所需的**库存格数**，并显示机器总数及平铺/紧凑占地地板数。

### 送往规划器

**发送到规划器** 按钮（位于保存/重置面板）会将目前计算器的生产树，直接汇入规划器分页并转换为节点图——详见下方[从计算器汇入](#从计算器汇入)。

---

## 🗺️ 规划器页面

规划器是一个类似 Satisfactory Modeler 的自由节点图编辑器：与以单一目标为根的递归生产树不同，你可以自由摆放配方节点，把各节点的输入/输出接口连起来，工具会依连线关系解算出每条连线实际的流量。

### 方案管理（Plan Library）

规划器可以同时保存多个独立的 **方案（Plan）**，每个方案各自拥有一套节点与连线。

- 工具列上的下拉选单可在方案间切换；**📁 管理方案** 打开一个列出所有方案的弹窗。
- 在管理窗口中可以**拖曳排序**、**就地重新命名**（点击后出现的输入框）、**复制**、**删除**，或将单一方案**导出**为 \`.json\` 文件。**新方案** 建立一个空白方案，**⭱ 导入** 可载入先前导出的 \`.json\` 文件。
- **📦 导入为模块**可将选中的既有方案直接作为模块节点插入当前画布。
- 每个方案都拥有各自独立的**复原/取消复原（Undo/Redo）历史**，并会记住你在本次浏览器会话中最后离开该方案时的**视角**（平移/缩放）。

### 画布基本操作

- **+ 新增节点**，或在画布空白处**按右键**，会打开物品选择器；选取一个有配方的物品即可在该处建立新节点。
- **拖曳节点的标题列**可移动节点；拖曳空白画布可平移视角。
- **▭ 选取模式** 会将画布切换为框选状态：拖曳出一个矩形即可选取多个节点，之后拖曳任一已选节点的标题列可整组一起移动，或按 **Delete/Backspace** 一次性全部删除。
- 在非选择模式下使用 **Ctrl/Cmd+点击** 可切换单个节点选取；在空白画布上 **Shift+拖曳** 可临时框选。
- 用滑鼠滚轮、触控装置的双指手势，或 **+ / −** 按钮进行**缩放**；**⤢ 缩放至全部可见**（或按 **F** 键）会自动将所有节点纳入视野。
- **⊞ 网格吸附** 按钮会在三种网格大小与关闭之间循环切换节点拖曳时的吸附行为。
- **↺ 复原 / ↻ 重做**（或 **Ctrl+Z / Ctrl+Y**）可在该方案的编辑历史中前后移动。

### 节点与接口（Ports）

每个节点代表一个配方，搭配一个可为小数的**机器数量**，左侧显示输入接口、右侧显示输出接口：

- **接口圆点颜色** — 灰色：未连接；绿色：已连接且供需平衡；黄色（输出）：连接后仍有剩余产量；红色（输入）：连接后仍有缺口未被满足。
- 将鼠标悬停在节点标题列上，会显示该配方**单台机器**的完整输入/输出/燃料/肥料速率提示框。
- 从某个接口的圆点拖曳到另一个方向相反、物品相同的合法接口即可建立连线；若拖放到空白画布，则会打开一个依「生产/消耗该物品」过滤好的配方选单，选取后会一次建立新节点并自动连线。
- 点击连线上的流量标签会打开**连线弹窗（Edge Modal）**，显示来源/目标节点、目前流量，并可直接输入精确的目标流量（会连动调整两端节点的机器数量），或删除该连线。
- 连线窗口可用来源/目标优先级 ▲/▼ 调整同一端口上的多条连线顺序，并可设置或重置连线颜色。

### 节点设置（⚙）

打开的弹窗包含：
- 目前配方的完整输入/输出明细；高级炼金炉配方会显示**催化剂开关**，悖论坩埚的自订配方则显示**输入物品选择器**。
- 一份依节点主要输出物品分组的**配方切换清单**，可切换为该物品的任一其他配方。
- **端口平衡（Port Balance）** 区块（仅在至少有一个已连接接口供需不平衡时显示），会针对每个物品提供一键按钮，将节点机器数调整到该输入/输出恰好符合连线所需的量。
- **图形工具**：选取所有上游节点、自动排版上游节点（将所有上游节点整理成树状排版）、生成全部上游产线（递归自动生成缺少的上游生产，见下方说明）、清除所有上游节点。

### 燃料、肥料与蒸汽(插口)

机器的燃料、肥料与蒸汽需求显示为卡片底部的**插口(停靠端口)**(橙 = 燃料、绿 = 肥料、蓝 = 蒸汽)。它们与普通输入接口一样: 从插口拖到供应节点的输出口，拖到空白画布或点击 ⚡ 可自动生成供应节点，流量计入接口平衡与连动模式。未连接的插口显示为短缺。
- 加热设备、燃料、肥料的**默认值**在规划器工具栏(🔥 / 🧪 / 🌿)中选择，与计算器物流面板共用同一设置。
- **按节点**覆盖: 在**节点设置 → 加热设备 / 燃料 / 肥料**中选择(默认跟随全局设置)。
- 放在**蒸汽加热板**上的机器不消耗燃料，其热值需求转为**蒸汽**需求(1 蒸汽 = 20 P)。**蒸汽锅炉**本身放在石炉/高炉上，输出分三档(Low 300 / Mid 1,500 / High 9,000 蒸汽/分，耗热 100 / 500 / 3,000 P/s)，在配方列表中选择。不计算管道容量。

### 自动生成上游产线

节点机器数列旁的 **⚡ 按钮** 会检查该节点尚未满足的输入需求，并依其偏好配方，为每个缺口的输入物品自动建立一个上游节点（依缺口量设定机器数并预先连线），排列在该节点左侧。节点设置弹窗中的**生成全部上游产线**会递归重复此过程，直到整条上游产线不再有缺口为止，过程中会跳过会形成自我循环的配方。

### 连动机器数量（Link Mode）

节点机器数量输入框旁的链条图示按钮可切换**连动模式（Link Mode）**。开启后，更改某个节点的机器数量（或在连线弹窗中设定精确流量），会依比例连动缩放所有与它相连节点的机器数量，方便一次整条子链一起等比例调整，而不必逐一手动修改。

### 模块节点（Module Nodes）

节点也可以整个引用另一个方案作为**模块**：它会把该方案「净」未被内部消耗/产生的输入/输出（即该方案自己无法内部自给自足的部分）暴露成自己的接口，并累计其总燃料/肥料用量。该节点的节点设置弹窗中会显示 **📦 载入模块** 按钮，点击即可将规划器切换到所引用的方案。若侦测到模块间存在循环引用，工具会直接在节点上标示错误，而不会尝试解算。

选取一组节点并点击 **📦 封装**，可从选取内容建立新方案，并在原处替换为模块节点；内部连线会保留在新模块中。

使用画布右下角的 **🔀 优化端口顺序** 可优化全部端口顺序；拖放节点后也会自动执行单节点优化。

### 传送门节点

**+ 🌀 传送门**工具可新增用于外部物品运输的传送门节点。点击标题设置物品，使用 **⇄** 切换视觉上的输入/输出方向。

### 摘要面板（Summary Panel）

画布左上角有一个可折叠的浮动面板，汇总目前整个方案：**总负载**（金币/燃料/肥料消耗）、**输出**（未连接的产出剩余）、**输入**（未满足的输入缺口）、**机器**（依类型统计的机器数量）。每个区块都可各自折叠，整个面板也可以缩小成一个小按钮。

### 从计算器汇入

计算器分页的 **发送到规划器** 按钮，会将目前的生产树转换为规划器中的节点图，汇入目前作用中的方案：配方节点依配方 id 聚合（机器数相加），主要的父子流程会建立对应连线，计算器中启用的副产物回收也会转换成额外的回收连线。新节点会自动排版（上游树状排版）并将视角调整至可看到全部新节点；解算后流量趋近于零的连线会被自动移除。

---

## ⚗️ 炼金锅页面

### 炼金锅类型

- **普通炼金锅（3格）：** \`T = (Cost₁ + Cost₂ + Cost₃) × Ratio\`
  - 全不同 → ×1.0，两同 → ×0.65，三同 → ×0.5
  - 输出为 \`cauldronTarget\` 最接近 T 值的物品。
- **高级炼金锅（2格）：**
  - 相同 + 相同 → \`T = Cost₁\`，**向上**匹配最近的产物。
  - A + B（不同）→ \`T = |Cost₁ − Cost₂|\`，匹配最近的产物(且其目标值小于两者中的最大炼金价值)。

在顶部的**炼金锅 / 高级炼金锅**切换按钮之间切换类型。

### 原料候选池

左侧面板列出所有可作为炼金原料的物品（必须有 \`cauldronCost\` 且非液体）。勾选/取消勾选物品以决定是否纳入搜索。

三个独立的 **原料池** 可储存不同的候选集合：
- **原料池 1** — 全部有效原料（默认）
- **原料池 2** — 草药链物品（从草药生产链自动生成）
- **原料池 3** — 金币/货币基底物品

使用**全选 / 取消全选**批量配置。**🌿** 按钮将候选池重置为草药导向预设，**💰** 按钮则重置为金币/货币导向预设。

开启**以炼金价值排序**，用 **🔼/🔽** 切换升序/降序。

### 过滤条件与搜索

锁定最多三个**指定原料**格位，将搜索限定为特定物品在固定位置的组合。每个格位旁的 **+/−** 箭头按成本顺序循环切换物品。**设定目标产物**可将结果限制为单一选定产物。

用复选框按配方类型过滤：**2件不同、3件不同、2件相同、3件相同**。

任何筛选条件或格位条件变更时，结果都会即时重新计算。

### 结果与收藏

结果按产出物品分组，默认折叠。点击物品行展开查看所有相容的原料组合。无法被任何组合产出的物品出现在**无法达成的目标**区域。

点击任意配方行的 **★** 将其保存到**已保存配方**（右侧面板）。在该面板中：
- **导出** — 将全部收藏保存为 \`.txt\` 文件（格式：\`物品1 + 物品2 (+ 物品3) = 产物\`）
- **导入** — 加载 \`.txt\` 文件批量导入配方
- **同步数据库** — 将所有收藏的炼金锅配方注入主生产数据库，计算器即可规划包含炼金锅工序的完整生产链
- **显示预计成本**会在单步结果中显示预计成本，**按预计成本排序**可依该成本排序。

### 炼金锅配方快捷编辑窗

在计算器的配方选择器中，有 \`cauldronTarget\` 的物品会显示快捷按钮，可打开**炼金锅配方快捷编辑窗**：
- 通过物品选择器或 **+/−** 箭头为每个格位指定原料。
- 实时显示 T 值、有效区间 \`[下界, 上界]\` 以及与每个界的距离。
- 绿色 = 命中目标；红色 = 未命中。
- 点击 **★** 加入收藏，或点击**应用**（仅在命中时可用）将配方直接写入计算器并设为首选。

### 多步优化

点击炼金锅分页上方的 **多步搜索**（与 **单步搜索** 并列）切换到多阶段搜索模式：不同于单次组合搜索，这个模式会反覆用炼金锅配方合成，寻找「用上一阶产物再合成一次」是否能得到更低成本的链路。

- 表格每一列代表一个物品，每一栏代表一轮优化结果（**第 0 阶** 至 **第 4 阶**）。 **第 0 阶** 是每个候选物品的原始成本；之后每一阶都会用上一阶的物品作为原料重新搜索，只保留比目前已知成本更低的组合。
- 若某一阶的成本没有比上一阶更低，该格会以灰色显示，方便一眼看出哪些物品确实从多一阶优化中受益。
- 点击任意格子的 **▲** 按钮，可将表格过滤为只显示该物品及其完整上游原料链，且链路上实际用到的每一格都会一并标亮；再次点击同一个 **▲** 即可取消过滤。
- 点击任意格子的 **★** 可将该阶段的配方保存到 **已保存配方**，行为与单步搜索结果的收藏功能相同。
- 将鼠标悬停在成本数字上，可查看该格的 **原料成本** / **热耗成本** 明细（以铜币计）；悬停在原料图示上则会显示该原料名称及本次计算采用的成本值。
- **⚙ 成本设定** 可调整热值与肥力换算为铜币的比率，用于整个炼金锅分页的成本估算（同时也会列出每个物品估算基础成本的可搜索清单，供直接编辑）。
- **最大中间产物数量**（1–3）限制多步优化链中保留的中间产物数量。

---

## 📖 百科页面

顶部导航提供四个子视图：

| 视图 | 说明 |
|---|---|
| **物品** | 可搜索的物品图标网格，支持分类、等级、卖出价格、批发价格、炼金目标等筛选标签；点击任意物品查看属性、生产配方和使用情况 |
| **机器** | 可搜索的机器列表；点击任意机器查看属性、建造材料和所有相关配方 |
| **合约** | 合约奖励与产量上限计算器，可设置每日工作时间及升级加成 |
| **完整说明** | 内置 README 检视器，使用内建 Markdown 渲染器显示完整文件说明 |

物品和机器视图都提供 chip 筛选栏；机器视图可按 Tier 与 Heat Cost 筛选。在物品视图中，点击配方旁的 **★** 可将其设为该物品的首选配方（与计算器同步）。
点击配方行中的任意物品，可直接跳转到该物品的详情页。

### 合约页面

**合约**页面会列出可用的合约物品，并计算每日上限与最大收益。页面提供三个会保存的参数：

- **每日工作小时数** — 每日可用于合约工作的游戏小时数(游戏1小时=现实时间1分钟)，并用于计算 **单位/分钟**。
- **合约数量加成 (%)** — 提高每日基础合约数量上限。
- **合约收益加成 (%)** — 提高每份合约的基础奖励；计算后的奖励会先无条件舍去小数，再计算最大收益。

表格会显示物品、每合约单位数、奖励货币类型、每日上限、单位/分钟、每日最大收益、所需等级与派遣要求。点击任意 **单位/分钟** 数值，即可将该物品与速率设为计算器当前目标，并跳转到计算器页面。

---

## 🛠️ 数据库编辑器页面

从下拉菜单选择编辑对象：
- **Database** — 完整的物品、机器、配方数据
- **Translations** — 控制所有界面字符串及物品/机器名称的 \`ALCHEMY_I18N\` 对象
- **Settings** — 当前用户偏好（JSON 格式）
- **(\\*BACKUP)** 变体 — 每次应用前自动保存的上一个版本

在文本区直接编辑 JSON，点击**应用更改**立即重载。使用**导出到文件**保存副本。

> **注意：** 应用新数据库会重新加载页面并覆盖本地副本。应用前请先通过导出做好备份。

---

## 🌐 语言与本地化

点击页头的 **🌐 EN/中文** 在英文和简体中文之间切换。

翻译层（\`alchemy_i18n.js\`）映射了所有物品名称、机器名称、分类和界面字符串。可通过**数据库编辑器 → Translations** 自定义，修改结果持久化到 \`localStorage\`。

---

## 🔗 URL 参数

URL 反映当前状态，可收藏或分享：

| 参数 | 说明 | 示例 |
|---|---|---|
| \`item\` | 目标物品名称 | \`?item=Steel%20Ingot\` |
| \`rate\` | 生产速率（个/分钟） | \`&rate=60\` |
| \`tab\` | 加载时的激活标签页 | \`&tab=cauldron\` |
| \`lang\` | 强制语言（\`en\` 强制英文） | \`&lang=en\` |
| \`fuel\` | 覆盖燃料来源 | \`&fuel=Coke\` |
| \`fert\` | 覆盖肥料来源 | \`&fert=Basic%20Fertilizer\` |
| \`setupgrades\` | 逗号分隔的升级等级（索引 0–9） | \`&setupgrades=5,0,3,2,1,1,0,0,0,0\` |

> \`setupgrades\` 索引对应：\`[0]\` 物流效率，\`[1]\`（未用），\`[2]\` 工厂效率，\`[3]\` 炼金技术，\`[4]\` 燃料效率，\`[5]\` 肥料效率，\`[6]\` 销售能力，\`[7–9]\`（未用）。

---

## ⚙️ 重置选项

| 按钮 | 效果 |
|---|---|
| **重置配方数据** | 清除本地数据库，还原为内置版本（自动备份当前版本） |
| **重置翻译** | 清除本地翻译覆写（自动备份当前版本） |
| **全部重置** | 清除所有 \`localStorage\` 数据并以默认值重新加载 |

当内置数据库（\`alchemy_db.js\`）版本比本地版本更新时，页面顶部会显示**更新横幅**。选择**立即更新**（覆盖本地数据，但保留用户设置）或**略过更新**。

---

## 🏗️ 项目结构

\`\`\`
AlchemyFactoryCalculator/
├── index.html                      # 主 HTML 框架、标签页布局、模态框
├── style.css                       # 所有样式（CSS 自定义属性、暗色主题）
├── js/
│   ├── alchemy_db.js               # 游戏数据——物品、机器、配方
│   ├── alchemy_i18n.js             # 翻译表（英文/中文）及 t() 辅助函数
│   ├── alchemy_state.js            # 全局应用状态、默认设置、持久化及 localStorage
│   ├── alchemy_main.js             # 应用程序入口、初始化、URL 状态及模块协调
│   ├── alchemy_ui.js               # 通用 UI 逻辑：设置、下拉框、物品选择器、滑块及模态框
│   ├── alchemy_calc_engine.js      # 纯计算引擎（树构建、聚合计算）
│   ├── alchemy_calc.js             # 计算器 UI 渲染（DOM、模态框、树节点）
│   ├── alchemy_cauldron.js         # 炼金锅模拟、收藏管理、同步
│   ├── alchemy_help.js             # 百科（指南、物品浏览器、机器浏览器）
│   ├── alchemy_planner.js          # 规划器核心：画布、节点、连线、方案库、视图控制
│   ├── alchemy_planner_calc.js     # 规划器流量解算引擎、自动排版、模块/汇入逻辑
│   └── alchemy_planner_overlays.js # 规划器弹窗：方案管理、节点设置、连线弹窗、摘要面板
\`\`\`

无构建工具、打包器或外部依赖。纯 HTML + CSS + 原生 JavaScript。

---

## 🤝 贡献与自定义

- **欢迎 Fork。** 所有数据和逻辑均为纯文本文件。
- 新增物品或配方：编辑 \`alchemy_db.js\`，或在浏览器中使用数据库编辑器。
- 修正翻译：编辑 \`alchemy_i18n.js\`，或使用数据库编辑器 → Translations。
- 计算引擎（\`alchemy_calc_engine.js\`）与 UI 完全解耦，可单独使用。

---

*本计算器由 [suguru-toyohara](https://github.com/suguru-toyohara) Fork 自 starfi5h 的 [AlchemyFactoryCalculator](https://github.com/starfi5h/AlchemyFactoryCalculator)，新增了日文本地化及自定义功能。starfi5h 版本 Fork 自原作者 JoeJoesGit 的 [AlchemyFactoryCalculator](https://joejoesgit.github.io/AlchemyFactoryCalculator/)，新增了中文本地化、炼金锅计算器、百科、规划器、数据库版本更新提醒以及多项界面改进。*  
*数据来源于 faultyd3v 的 [AlchemyFactoryData](https://github.com/faultyd3v/AlchemyFactoryData)。*  
`,

ja: `[EN](README.md) | [简体中文](README.zh-CN.md) | [日本語](README.ja.md)

# Alchemy Factory 計算機

ゲーム **Alchemy Factory** 向けの、ブラウザで動作する生産計画ツールです。
任意の生産チェーンについて、原料の消費量、機械の台数、熱/栄養値の負荷、収益性を正確に計算します。

**公開版:** [https://suguru-toyohara.github.io/AlchemyFactoryCalculator](https://suguru-toyohara.github.io/AlchemyFactoryCalculator)

---

## ✨ 機能一覧

| 機能 | 説明 |
|---|---|
| 🌲 **生産ツリー** | 原料の鉱石から完成品までを再帰的にたどるツリー。ノードごとに機械の台数とレートを表示します |
| 🔄 **レシピ切り替え** | ノードごとに代替レシピへ切り替え可能。高性能錬金炉の触媒選択にも対応します |
| ♻️ **副産物の再利用** | 副産物をチェーン内に戻して、外部からの投入を減らします |
| 📦 **複数目標モード** | インフラを共有しながら、複数の生産目標を同時に計画できます |
| 🗺️ **プランナー** | 工場レイアウトを設計するための自由配置型ノードグラフエディター。モジュール、自動レイアウト、リアルタイムの流量解決を備えます |
| ⚗️ **錬金釜計算機** | 錬金釜の組み合わせを総当たりで検索。お気に入りとデータベース同期に対応します |
| 📖 **Wiki** | アイテムと機械のデータベースブラウザーを内蔵。レシピの相互参照付きです |
| 🛠️ **データベースエディター** | レシピ、アイテム、翻訳をブラウザ上で直接編集できます |
| 💾 **永続ストレージ** | すべての設定、レシピ、リストはブラウザの \`localStorage\` に自動保存されます |
| 🌐 **多言語 UI** | 英語、簡体字中国語、日本語を切り替え可能。翻訳は自由にカスタマイズできます |
| 🔗 **共有可能な URL** | 現在のアイテムとレートが URL に反映されるため、簡単に共有できます |

---

## 🚀 はじめに

#### オンライン
モダンなブラウザで [https://suguru-toyohara.github.io/AlchemyFactoryCalculator](https://suguru-toyohara.github.io/AlchemyFactoryCalculator) を開くだけです。インストールは不要です。

#### ローカル
1. このリポジトリをダウンロードまたはクローンします。
2. \`index.html\` をブラウザで直接開きます。
3. サーバー、ビルド手順、依存パッケージは一切不要です。

---

## 📐 計算機タブ

### 目標の設定

検索ボックスにアイテム名を入力する(部分一致に対応)か、**☰** をクリックして**アイテムピッカー**を開きます。ピッカーでは、カテゴリ別の閲覧、ティアのスライダー、売却価格・卸売価格・錬金目標による属性フィルターが使えます。

**単一目標モード**:
- **コンベア負荷の割合**スライダーで、コンベア容量に対する割合(1/12 ～ 全量)として目標を設定します。
- または、正確な**レート (個/分)** を直接入力します。
- **機械の台数で指定**をオンにすると計算が逆向きになり、機械の台数を入力するとレートが自動で算出されます。

**複数目標モード**:
- 目標の行は必要なだけ追加できます。各行は独立しており、ハンドルをドラッグして並べ替えられます。
- **💾 リストを保存 / 📂 リストを読み込み**で、複数目標のセットをブラウザに保存できます。
- **燃料自給**または**肥料自給**を有効にすると、工場での消費量が燃料/肥料アイテム自体の純生産量から自動的に差し引かれます。エンジンは安定した均衡に達するまで反復計算を行います。
- **⚡ 燃料/肥料をクイック設定(機械1台)** は、リストを 2 行(選択中の燃料アイテムと肥料アイテム)で即座に埋め、それぞれをフル稼働の機械 1 台分のレートに設定します。
- 供給が少なすぎる、または計算が発散するために燃料自給や肥料自給が収束しない場合は、生産ツリーの上に均衡に関する警告が表示されます。

### アップグレード

右側の**アップグレード**パネルに、現在の研究レベルを入力します:

| 項目 | 効果 |
|---|---|
| **物流効率** | コンベアの速度(コンベア 1 本あたりの個/分)が上がります |
| **工場効率** | すべての機械の処理速度に倍率がかかります |
| **錬金技術** | 抽出機、蒸留装置、熱エネルギー抽出機の生産量が増えます |
| **燃料効率** | 燃料の熱が増えます |
| **肥料効率** | 肥料の栄養値が増えます |

アップグレードのレベルと物流の設定は、変更のたびに自動保存されます。手動の保存ボタンは必要ありません。

### 物流

| 設定 | 説明 |
|---|---|
| **加熱設備** | 炉の種類(石炉 / 高温炉 / 蒸気加熱パッド)を選択します。マスの共有と熱出力に影響します |
| **燃料元** | 燃料として使うアイテム。総熱負荷をアイテム個数に換算する際にも使われます |
| **肥料元** | 肥料として使うアイテム。苗床の計算に使われます |
| **カスタムコストを管理** | アイテムごとに独自の金額コストを設定します。購入価格の代わりに使われるほか、購入価格のない外部入力の値付けにも使われます |
| **表示サイズ** | 生産ツリーのカードを拡大・縮小します |
| **必要コンベア数を表示** | 各ノードのレートの横にコンベアの使用数を表示します |
| **機械の消費量を表示** | 各ノードに燃料/肥料の消費量を表示します |
| **機械の最大生産量を表示** | 切り上げた機械台数での最大生産能力を表示します |
| **機械の熱・栄養値消費を表示** | 各ノードに機械 1 台あたりの熱 (P/s) と栄養値 (V/s) を表示します |
| **機械台数を小数で表示** | 切り上げた台数の代わりに、小数の機械台数(小数点以下 2 桁まで)を表示します |

### 生産ツリーの見方

各ノードには次の情報が表示されます:
- **レート**(個/分) — この数値をクリックすると**拡縮モーダル**が開きます
- **コンベア数**(有効にしている場合)
- **機械の台数**(切り上げ)。ツールチップにサイクル時間、1台あたり生産量、速度倍率が表示されます
- **副産物**(紫色)
- **熱**と**栄養値**のコスト(それぞれの色で表示)
- 購入する原料の**金額コスト**
- 触媒ノードには、触媒入力のサブツリーを展開/折りたたむトグルが表示されることがあります。
- アイテム名をクリックすると、そのアイテムとレートを URL パラメーターに持つ詳細表示が新しいタブで開きます。

**赤色**で表示されたレートの数値は、コンベア容量を超えていることを示します。

**各ノードの操作:**
- **▼/▶ 矢印** — サブツリーを折りたたむ/展開する(状態は記憶されます)
- **🔄 ボタン** — レシピセレクターを開いて生産方法を切り替える
- **♻️ ボタン** — そのノードの副産物の再利用を有効にする(副産物がチェーン内の別の場所で消費される場合に表示されます)
- **☐ チェックボックス** — 需要を**外部入力**としてマークする。そのノードは内部で生産されなくなり、代わりに外部入力の集計に表示されます

各生産チェーンセクション上部の**副産物をすべて再利用 / すべてリセット**で、すべての再利用設定を一括で切り替えられます。**💠** アイコンでは第 1 階層全体を一度に展開/折りたたみできます。

ツリーの下にある**共通ノード**セクションには、チェーン内に複数回現れるアイテム+機械の組み合わせ(共有される中間素材など)が、各出現箇所へのリンク付きで一覧表示されます。**副産物**セクションには、消費されなかった副産物が生産元へのリンク付きでまとめられます。

### レシピと触媒の切り替え

任意のノードの **🔄** をクリックすると、レシピセレクターが開きます:
- 代替レシピを選択します(例: コークスを錬金炉で作るか、高性能錬金炉で作るか)。
- **高性能錬金炉**のレシピでは、1 つ以上の**触媒**(不安定 / 豊穣 / 共振 / 永遠)を選択して、出力の比率や入力の必要量を変更できます。
- **パラドックス坩堝**のカスタム入力レシピでは、投入するアイテムをアイテムピッカーで選びます。
- レシピの上書きは、モーダル上部の適用範囲トグルで**全体**または**このノードのみ**に適用できます(ツリー上の特定のノードでレシピを切り替える場合にのみ表示されます)。
- \`cauldronTarget\` を持つアイテムには **+ 錬金釜レシピを追加** ボタンも表示され、[錬金釜レシピモーダル](#錬金釜レシピモーダル)を開けます。

### 拡縮モーダル

任意の**レートの数値**をクリックすると拡縮モーダルが開きます。連動する 3 つの項目が、リアルタイムで互いに更新されます:
- **生産量 (/分)**
- **コンベア数** — 現在のコンベア速度での値
- **機械の台数**

いずれかの項目を編集すると、**拡縮比**が自動的に更新されます。**適用**をクリックすると、生産ツリー全体が比例して拡縮されます。

### 概要ボックス

ツリーの上のバーには 4 つのブロックが表示されます:

| ブロック | 内容 |
|---|---|
| **総生産量** | 内部消費を差し引く前の総生産レート |
| **総負荷** | 工場の熱 (P/分) と栄養値 (V/分) の需要、および燃料/肥料アイテムへの換算値 |
| **単位コスト** | 生産物 1 個あたりの硬貨・熱・栄養値のコスト(複数目標がちょうど 2 つで、それぞれ燃料アイテムと肥料アイテムに設定されている場合は、燃料/肥料そのものの金額換算価値の解) |
| **単位価値** | 換算コストと小売価格・卸売価格との比率 |

### 建設リスト

右側のパネルには、必要な機械の種類と台数がすべて一覧表示されます。機械名をクリックして展開すると、その種類の機械をすべて建設するのに必要な**原料の合計**が表示されます。下部の**必要素材の合計**セクションには、最大スタック数にもとづく**インベントリのマス数**の見積もりに加え、機械の合計台数と、平置き/コンパクト配置時の床タイル数も表示されます。

### プランナーへ送る

**プランナーへ送る**ボタン(保存/リセットパネル内)は、計算機の現在の生産ツリーをノードグラフとしてプランナータブへそのまま書き出します。詳しくは下記の[計算機からのインポート](#計算機からのインポート)を参照してください。

---

## 🗺️ プランナータブ

プランナーは、Satisfactory Modeler のような自由配置型のノードグラフエディターです。1 つの目標アイテムを根とする単一の再帰ツリーではなく、レシピノードを自由に配置して入力/出力ポート同士を接続すると、各接続(エッジ)を実際にどれだけのアイテムが流れるかをツールが解決します。

### プランライブラリ

プランナーは独立した複数の**プラン**を保持でき、それぞれが独自のノードと接続のセットを持ちます。

- ツールバーのドロップダウンでプランを切り替えます。**📁 プラン管理**を押すと、すべてのプランを一覧するモーダルが開きます。
- 管理画面では、**ドラッグで並べ替え**、**その場で名前を変更**(表示される名前欄をダブルクリック)、**複製**、**削除**、または単一プランの \`.json\` ファイルへの**エクスポート**ができます。**新規プラン**は空のプランを作成し、**⭱ インポート**は以前エクスポートした \`.json\` を読み込みます。
- **📦 モジュールとして取り込む**は、選択した既存のプランを現在のキャンバスにモジュールノードとして直接挿入します。
- 各プランは独自の**元に戻す/やり直す履歴**を保持し、現在のブラウザセッションの間は、最後に離れたときの**ビューポート**(パン/ズーム)も記憶します。

### キャンバスの基本

- **+ ノードを追加**、またはキャンバスの空白部分の**右クリック**でアイテムピッカーが開きます。レシピのあるアイテムを選ぶと、その場所に新しいノードが配置されます。
- **ノードのヘッダーをドラッグ**するとノードを移動でき、キャンバスの空白をドラッグすると視点を移動できます。
- **▭ 範囲選択モード**はキャンバスを範囲選択に切り替えます。矩形をドラッグして複数のノードを選択し、選択中のいずれかのノードのヘッダーをドラッグするとグループ全体をまとめて移動できます。**Delete/Backspace** を押せば一括で削除できます。
- 範囲選択モード以外では、**Ctrl/Cmd+クリック**でノード単体の選択を切り替えられます。キャンバスの空白での **Shift+ドラッグ**は、モードを変えずに一時的に範囲選択を行います。
- **ズーム**はマウスホイール、タッチデバイスでのピンチ操作、または **+ / −** ボタンで行います。**⤢ Fit to View**(または **F** キー)で、全ノードが見えるように表示を調整します。
- **⊞ Grid Snap** ボタンは、ノードドラッグ時のスナップを 3 種類のグリッドサイズとオフの間で順に切り替えます。
- **↺ 元に戻す / ↻ やり直す**(または **Ctrl+Z / Ctrl+Y**)で、そのプランの編集履歴をたどれます。

### ノードとポート

各ノードは、指定した**機械の台数**(小数も可)で稼働する 1 つのレシピを表し、左側に入力ポート、右側に出力ポートが表示されます:

- **ポートの丸の色** — 灰色: 未接続。緑: 接続済みで収支が合っている。黄(出力): 接続先の需要を超える余剰がある。赤(入力): 接続してもなお必要量に足りない。
- ノードのヘッダーにカーソルを合わせると、そのレシピの入力/出力/燃料/肥料の全レートが**機械 1 台あたり**でツールチップに表示されます。
- ポートの丸から、互換性のある別のポート(同じアイテムで向きが逆)へドラッグすると接続できます。キャンバスの空白へドラッグした場合は、小さなレシピピッカー(そのアイテムを生産/消費するレシピに絞り込み済み)が開き、接続済みの新規ノードを一度に作成できます。
- 接続の流量ラベルをクリックすると**エッジモーダル**が開き、供給元/供給先と現在の流量が表示されます。正確な目標流量を入力する(両端の機械台数がそれに合わせて調整されます)ことも、接続を削除することもできます。
- エッジモーダルでは、同じポートにつながる複数の接続を供給元/供給先の優先度 ▲/▼ で並べ替えたり、エッジの色を設定・リセットしたりできます。

### ノード設定 (⚙)

次の内容を含むモーダルが開きます:
- 現在のレシピの入力/出力の完全な内訳。高性能錬金炉のレシピでは**触媒のトグル**、パラドックス坩堝のカスタムレシピでは**入力アイテムのピッカー**も表示されます。
- ノードの主な出力アイテムごとにグループ化された**レシピ切り替えリスト**。そのアイテムの任意の代替レシピに切り替えられます。
- **ポート収支**セクション(接続済みのポートのうち 1 つ以上で収支が合っていない場合にのみ表示)。アイテムごとのワンクリックボタンでノードの機械台数を調整し、特定の接続済み入力/出力を接続先の必要量にぴったり合わせられます。
- **グラフツール**: 上流ノードをすべて選択、上流ノードを自動レイアウト(上流のノードをすべてツリー状に整列)、上流ノードをすべて生成(不足している上流の生産を再帰的に自動生成。下記参照)、上流ノードをすべて削除。

### 燃料・肥料・蒸気 (差し込み口)

機械の燃料・肥料・蒸気の需要は、カード下辺の**差し込み口(ドックポート)**として表示されます(橙 = 燃料、緑 = 肥料、青 = 蒸気)。通常の入力ポートと同じように扱えます: 差し込み口から供給元の出力へドラッグ、空白にドロップまたは ⚡ で供給元を自動生成、流量はポート収支や連動モードに含まれます。未接続の差し込み口は不足として表示されます。
- 加熱設備・燃料・肥料の**既定**は、プランナーのツールバー(🔥 / 🧪 / 🌿)で選びます。計算機の物流パネルと同じ値を共有します。
- **ノードごと**に上書きするには、**ノード設定 → 加熱設備 / 燃料 / 肥料**で選びます(既定は全体設定に従う)。
- **蒸気加熱パッド**の上の機械は燃料を消費せず、熱需要が**蒸気**の需要になります(1蒸気 = 20 P)。**蒸気ボイラー**自体は石炉/高温炉の上に置き、出力は3段階(Low 300 / Mid 1,500 / High 9,000 蒸気/分、消費熱 100 / 500 / 3,000 P/s)でレシピ一覧から選びます。パイプの流量制限は扱いません。

### 上流の生産の自動生成

ノードの機械台数の行にある **⚡ ボタン**は、そのノードの満たされていない入力需要を調べ、不足している入力ごとに上流ノードを 1 つずつ(優先レシピを使って)自動作成します。作成されたノードは不足分をちょうど補う規模であらかじめ接続され、元のノードの左側に配置されます。**上流ノードをすべて生成**(ノード設定モーダル内)は、上流チェーン全体から不足がなくなるまでこれを再帰的に繰り返し、自分自身へ再帰してしまうレシピはスキップします。

### 機械台数の連動

ノードの機械台数入力の横にある鎖のボタンで、**連動モード**を切り替えます。有効な間は、あるノードの機械台数を変更する(またはエッジモーダルで正確な流量を設定する)と、そのノードに接続されたすべてのノードの機械台数が比例して拡縮されます。これにより、ノードを 1 つずつではなく、サブチェーン全体をまとめてサイズ変更できます。

### モジュールノード

ノードは、別のプラン全体を**モジュール**として参照することもできます。モジュールノードは、そのプランの未接続の入力/出力の*正味*(つまり、そのプランが内部で生産/消費しきれていない分)を自身のポートとして公開し、あわせて燃料/肥料の総消費量も持ちます。ノード設定モーダルには **📦 モジュールを読み込み** ボタンが表示され、プランナーを参照先のプランに切り替えられます。モジュールの循環参照は検出され、解決される代わりにそのノード上でエラーとして表示されます。

複数のノードを選択して **📦 モジュール化** をクリックすると、選択範囲から新しいプランが作成され、元の場所はモジュールノードに置き換えられます。内部の接続は新しいモジュールの中に保持されます。

キャンバス右下の操作ボタンにある **🔀 Optimize Port Order** を使うと、すべてのポートの並び順を最適化できます。ノードをドロップしたときにも、そのノード単体のポート順の最適化が行われます。

### ポータルノード

**+ 🌀 ポータル** ツールは、外部とのアイテムのやり取りを表すポータルノードを追加します。タイトルをクリックしてアイテムを設定し、**⇄** で表示上の入力/出力の向きを切り替えます。

### 概要パネル

折りたたみ可能なフローティングパネル(キャンバス左上)が、現在のプラン全体を 4 つのセクションに集計します: **総負荷**(金額/燃料/肥料の消費)、**出力**(未接続の出力の余剰)、**入力**(満たされていない入力の不足)、**機械**(種類ごとの機械台数)。各セクションは個別に折りたたむことができ、パネル全体を小さなボタンに最小化することもできます。

### 計算機からのインポート

計算機タブの**プランナーへ送る**ボタンは、現在の生産ツリーを、アクティブなプラン内のプランナーのノードグラフに変換します。レシピノードはレシピ ID ごとに集約され(機械台数は合算)、主要な流れには親子間のエッジが作成され、計算機での副産物の再利用は追加の再利用エッジに変換されます。新しいノードは自動的にレイアウトされ(上流ツリーレイアウト)、それらが見えるように表示が調整されます。解決後に流量が実質ゼロとなったエッジは削除されます。

---

## ⚗️ 錬金釜タブ

### 錬金釜の種類

- **通常の錬金釜(3 スロット):** \`T = (Cost₁ + Cost₂ + Cost₃) × Ratio\`
  - すべて別種 → ×1.0、2 個が同種 → ×0.65、すべて同種 → ×0.5
  - 生成物は、\`cauldronTarget\` が T に最も近いアイテムになります。
- **高性能錬金釜(2 スロット):**
  - 同種 + 同種 → \`T = Cost₁\`。最も近い生成物を**上方向**に探します。
  - A + B(別種) → \`T = |Cost₁ − Cost₂|\`。目標価値が 2 つの錬金価値の最大値より小さい生成物のうち、最も近いものを探します。

上部の**錬金釜 / 高性能錬金釜**トグルで種類を切り替えます。

### 候補プールとプロファイル

左側のパネルには、錬金釜の素材として使えるすべてのアイテムが一覧表示されます(\`cauldronCost\` を持ち、液体でないことが条件)。アイテムのチェックを入れたり外したりして、検索対象に含めるかどうかを決めます。

独立した 3 つの**プロファイル**に、それぞれ異なる候補セットを保存できます:
- **素材プール1** — 有効な素材すべて(デフォルト)
- **素材プール2** — 薬草チェーンのアイテム(薬草の生産チェーンから自動生成)
- **素材プール3** — 金/通貨ベースのアイテム

**すべて選択 / すべて解除**で、アクティブなプロファイルを一括設定できます。**🌿** ボタンはプールを薬草中心のプリセットにリセットし、**💰** は金/通貨中心のプリセットにリセットします。

**錬金価値順に並べる**でプールを錬金価値順に並べ替え、**🔼/🔽** で昇順/降順を切り替えます。

### スロットフィルターと検索

最大 3 つの**素材を指定**スロットを固定すると、特定のアイテムを決まった位置に含む組み合わせだけに検索を絞り込めます。各スロットの下にある **+/−** の矢印で、錬金価値の順にアイテムを切り替えられます。**目標の生成物を設定**を使うと、結果を選択した 1 つの生成物に限定できます。

チェックボックスで比率の種類を絞り込めます: **2個が別種、3個が別種、2個が同種、3個が同種**。

フィルターやスロットの条件を変更すると、結果はただちに再計算されます。

### 結果とお気に入り

結果は生成物ごとにグループ化され、初期状態では折りたたまれています。アイテムをクリックすると、対応する素材の組み合わせが展開されます。どの組み合わせでも作れないアイテムは、**達成できない目標**セクションに表示されます。

任意のレシピ行の **★** をクリックすると、**保存済みレシピ**(右側のパネル)に保存されます。そこから次の操作ができます:
- **エクスポート** — すべてのお気に入りを \`.txt\` ファイルとして保存します(形式: \`Item1 + Item2 (+ Item3) = Product\`)
- **インポート** — \`.txt\` ファイルを読み込んでレシピを一括インポートします
- **データベースと同期** — 保存済みの錬金釜レシピをすべてメインの生産データベースに注入し、計算機が生産チェーン全体に錬金釜の工程を含められるようにします
- **推定コストを表示**は単一ステップの結果に推定コストを表示し、**推定コスト順に並べる**はその推定値で並べ替えます。

### 錬金釜レシピモーダル

計算機のレシピセレクターでは、\`cauldronTarget\` を持つアイテムに**錬金釜レシピモーダル**を開くショートカットボタンが表示されます。ここでは次のことができます:
- 各スロットの素材をアイテムピッカーで選ぶか、**+/−** の矢印で切り替えます。
- 算出された T 値、有効範囲 \`[lower, upper]\`、各境界までの差をリアルタイムで確認できます。
- 緑 = 組み合わせが目標に命中している、赤 = 命中していない。
- **★** をクリックしてお気に入りに保存するか、**適用**(命中時のみ有効)をクリックして、レシピを計算機にその場で登録し、優先レシピに設定します。

### 複数ステップの最適化

**複数ステップ検索**(錬金釜タブ上部、**単一ステップ検索**の隣)に切り替えると、単一の組み合わせ検索ではなく、より安価な*多段階*の錬金釜チェーン、つまり前段の錬金釜の組み合わせで得た生成物をさらに消費するレシピを検索できます。

- 表には、アイテムごとに 1 行、最適化ラウンドごとに 1 列(**段階 0** ～ **段階 4**)が表示されます。**段階 0** は各候補アイテムの基本コストです。以降の各段階では、前の段階のアイテムを素材として錬金釜の検索を再実行し、そのアイテムについて既知のコストより*安い*組み合わせだけを残します。
- 前の段階から改善しなかったコストは灰色で表示されるため、もう 1 ラウンドの最適化で実際に恩恵を受けたアイテムが一目でわかります。
- 任意のセルの **▲** ボタンをクリックすると、そのアイテムと上流の素材チェーン全体だけをハイライトして表を絞り込みます。その結果に到達するために実際に使われたセルがすべて点灯します。同じ **▲** をもう一度クリックすると絞り込みが解除されます。
- 任意のセルの **★** をクリックすると、単一ステップの結果と同様に、その段階のレシピが**保存済みレシピ**に保存されます。
- コストの数値にカーソルを合わせると、アイテムごとの**素材コスト** / **熱消費**の内訳(硬貨換算)が表示されます。素材のアイコンにカーソルを合わせると、その名前と計算に使われたコスト値が表示されます。
- **⚙ コスト設定**では、錬金釜タブ全体のコスト見積もりに使われる、熱→硬貨および栄養値→硬貨の換算レートを設定できます(全アイテムの推定基本コストを編集・検索できるリストとしても表示されます)。
- **中間生成物の上限**(1～3)は、複数ステップの最適化チェーンで保持する中間生成物の数を制限します。

---

## 📖 Wiki タブ

上部のナビゲーションから 4 つのサブビューにアクセスできます:

| ビュー | 説明 |
|---|---|
| **アイテム** | 全アイテムを検索できるアイコングリッド。チップ式のフィルター(カテゴリ、ティア、売却価格、卸売価格、錬金目標)付きです。アイテムをクリックすると、ステータス、生産レシピ、使用先が表示されます |
| **機械** | 検索可能な機械リスト。機械をクリックすると、属性、建設素材、関連するすべてのレシピが表示されます |
| **契約** | 契約の報酬と生産上限の計算機。1 日の稼働時間とアップグレードによるボーナスを設定できます |
| **完全ドキュメント** | 埋め込みの README ビューアー。内蔵の Markdown レンダラーで描画された完全なドキュメントを表示します |

アイテムビューと機械ビューの両方にチップフィルターがあり、機械はティアと熱消費で絞り込めます。アイテムビューでは、任意のレシピの横にある **★** をクリックすると、そのアイテムの優先レシピに設定できます(計算機と同期されます)。
レシピ行の任意のアイテムをクリックすると、その詳細ページへ直接移動します。

### 契約ビュー

**契約**ビューは、利用可能な契約アイテムを一覧表示し、1 日の上限と収益を計算します。保存される 3 つのパラメーターがあります:

- **1日の稼働時間** — 契約の作業に使える時間数(ゲーム内の 1 時間 = 現実の 1 分)。これが**個/分**を左右します。
- **契約数量ボーナス (%)** — 1 日の契約上限の基本値を増やします。
- **契約報酬ボーナス (%)** — 各契約の基本報酬を増やします。算出された報酬は、収益を計算する前に整数へ切り捨てられます。

表には、アイテム、1契約あたりの個数、報酬の硬貨の種類、1日の上限、個/分、1日の最大収益、必要レベル、出荷条件が表示されます。任意の**個/分**の値をクリックすると、そのアイテムとレートが現在の目標として計算機タブに送られます。

---

## 🛠️ データベースタブ

ドロップダウンから対象を選択します:
- **Database** — アイテム、機械、レシピの全データ
- **Translations** — すべての UI 文字列とアイテム名/機械名を管理する \`ALCHEMY_I18N\` オブジェクト
- **Settings** — 現在のユーザー設定(JSON 形式)
- **(\\*BACKUP)** の各項目 — 適用のたびに自動保存される、直前のバージョン

テキストエリアで JSON を直接編集し、**変更を適用**をクリックすると即座に再読み込みされます。**ファイルにエクスポート**でコピーを保存できます。

> **警告:** 新しい Database を適用するとページが再読み込みされ、ローカルのコピーが上書きされます。適用する前に、エクスポートでバックアップを取っておいてください。

---

## 🌐 言語とローカライズ

ヘッダーの **🌐** 言語セレクターで、英語、簡体字中国語、日本語を切り替えます。

翻訳レイヤー(\`alchemy_i18n.js\`)は、すべてのアイテム名、機械名、カテゴリ、UI 文字列を対応付けています。**データベース → Translations** でカスタマイズでき、変更は \`localStorage\` に保持されます。

---

## 🔗 URL パラメーター

URL は現在の状態を反映しており、ブックマークや共有ができます:

| パラメーター | 説明 | 例 |
|---|---|---|
| \`item\` | 目標アイテム名 | \`?item=Steel%20Ingot\` |
| \`rate\` | 生産レート(個/分) | \`&rate=60\` |
| \`tab\` | 読み込み時にアクティブにするタブ | \`&tab=cauldron\` |
| \`lang\` | 言語を強制(\`en\` で英語を強制) | \`&lang=en\` |
| \`fuel\` | 燃料元を上書き | \`&fuel=Coke\` |
| \`fert\` | 肥料元を上書き | \`&fert=Basic%20Fertilizer\` |
| \`setupgrades\` | カンマ区切りのアップグレードレベル(インデックス 0～9) | \`&setupgrades=5,0,3,2,1,1,0,0,0,0\` |

> \`setupgrades\` のインデックスの対応: \`[0]\` 物流効率、\`[1]\`(未使用)、\`[2]\` 工場効率、\`[3]\` 錬金技術、\`[4]\` 燃料効率、\`[5]\` 肥料効率、\`[6]\` 販売能力、\`[7–9]\`(未使用)。

---

## ⚙️ リセットオプション

| ボタン | 効果 |
|---|---|
| **レシピデータをリセット** | ローカルのデータベースを消去し、同梱版に戻します(バックアップは自動保存されます) |
| **翻訳をリセット** | ローカルの翻訳の上書きを消去します(バックアップは自動保存されます) |
| **すべてリセット** | \`localStorage\` のすべての項目を消去し、デフォルトの状態で再読み込みします |

同梱のデータベース(\`alchemy_db.js\`)のバージョンがローカルのコピーより新しい場合、上部に**更新バナー**が表示されます。**今すぐ更新**(ローカルのデータは上書きされますが、設定は保持されます)または**更新をスキップ**を選択できます。

---

## 🏗️ プロジェクト構成

\`\`\`
AlchemyFactoryCalculator/
├── index.html                      # メインの HTML シェル、タブレイアウト、モーダル
├── style.css                       # すべてのスタイル (CSS カスタムプロパティ、ダークテーマ)
├── js/
│   ├── alchemy_db.js              # ゲームデータ — アイテム、機械、レシピ
│   ├── alchemy_i18n.js            # 翻訳テーブル (EN/ZH) + t() ヘルパー
│   ├── alchemy_state.js           # グローバルなアプリケーション状態、デフォルト設定、永続化と localStorage
│   ├── alchemy_main.js            # アプリケーションのエントリーポイント、初期化、URL 状態、モジュール間の連携
│   ├── alchemy_ui.js              # 共通 UI ロジック: 設定、コンボボックス、アイテムピッカー、スライダー、モーダル
│   ├── alchemy_calc_engine.js     # 純粋な計算エンジン (ツリー構築、集計)
│   ├── alchemy_calc.js            # 計算機の UI レンダラー (DOM、モーダル、ツリーノード)
│   ├── alchemy_cauldron.js        # 錬金釜のシミュレーション、お気に入り、同期
│   ├── alchemy_help.js            # Wiki (ガイド、アイテムブラウザー、機械ブラウザー)
│   ├── alchemy_planner.js         # プランナーのコア: キャンバス、ノード、エッジ、プランライブラリ、表示操作
│   ├── alchemy_planner_calc.js    # プランナーの流量解決エンジン、自動レイアウト、モジュール/インポートのロジック
│   └── alchemy_planner_overlays.js # プランナーのオーバーレイ: プラン管理、ノード設定、エッジモーダル、概要パネル
\`\`\`

ビルドツール、バンドラー、外部依存は一切ありません。純粋な HTML + CSS + バニラ JavaScript です。

---

## 🤝 コントリビュートとカスタマイズ

- **フォークはご自由に。** すべてのデータとロジックはプレーンテキストのファイルに収められています。
- 新しいアイテムやレシピを追加するには、\`alchemy_db.js\` を編集します(またはブラウザ上のデータベースエディターを使います)。
- 翻訳を追加・修正するには、\`alchemy_i18n.js\` を編集するか、データベース → Translations を使います。
- 計算エンジン(\`alchemy_calc_engine.js\`)は UI から完全に分離されており、単独で利用できます。

---

*この計算機は、[suguru-toyohara](https://github.com/suguru-toyohara) が starfi5h 氏の [AlchemyFactoryCalculator](https://github.com/starfi5h/AlchemyFactoryCalculator) をフォークし、日本語ローカライズと独自の機能追加を行っているものです。starfi5h 氏版は、JoeJoesGit 氏によるオリジナルの [AlchemyFactoryCalculator](https://joejoesgit.github.io/AlchemyFactoryCalculator/) をフォークし、中国語ローカライズ、錬金釜計算機、Wiki、プランナー、データベースの差分更新通知、各種 UI の改善を追加したものです。*  
`

};
