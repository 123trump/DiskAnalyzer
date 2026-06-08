const state = {
  api: null,
  baseline: null,
  comparison: null,
  currentPath: ".",
  language: "en",
  snapshots: [],
  search: "",
  sortAsc: false,
  sortKey: "size",
  theme: "dark",
};

const charts = {
  bar: null,
  change: null,
};

const dom = {};
const sizeScale = ["#2d5be3", "#3b7bf5", "#45a5ed", "#4bcbaa", "#7fd467", "#d4c742", "#e8943a", "#e05545"];
const translations = {
  en: {
    all: "All",
    allDetails: "All details",
    allDirectories: "All Directories",
    baseline: "Baseline:",
    biggestChanges: "Biggest Changes",
    biggestChangesChart: "Biggest storage changes bar chart",
    biggestGrowth: "Biggest Growth",
    biggestShrink: "Biggest Shrink",
    browse: "Browse",
    breadcrumb: "Breadcrumb",
    cancelledReady: "Ready",
    change: "Change",
    changeSources: "Change Sources",
    changeView: "Change View:",
    children: "Children",
    chooseDirectoryFailed: "Choose directory failed",
    choosingDirectory: "Choosing directory",
    color: "Color:",
    compare: "Compare",
    compareLabel: "Compare:",
    comparison: "Comparison",
    comparingSnapshots: "Comparing snapshots",
    del: "DEL",
    deleteSnapshotConfirm: "Delete snapshot {id}?",
    depth: "Depth",
    depth1: "1 level",
    depth2: "2 levels",
    depth3: "3 levels",
    directCauses: "Direct causes",
    directory: "Directory",
    dirCount: "{count} dirs",
    directoryPickerNotReady: "Directory picker is not ready yet. Please try again in a moment.",
    directorySelected: "Directory selected",
    emptyHint: "Choose a directory to inspect its storage footprint.",
    elapsed: "Elapsed",
    enterDirectory: "Enter a directory path",
    file: "File",
    folder: "Folder",
    foldersSummary: "Folders summary",
    growth: "Growth",
    grow: "GROW",
    grew: "Grew",
    language: "Language",
    languageChinese: "中文",
    languageEnglish: "English",
    large: "Large",
    largestDirectories: "Largest Directories",
    largestDirectoriesChart: "Largest directories bar chart",
    load: "Load",
    netChange: "Net Change",
    new: "NEW",
    noChange: "No change",
    noChangedSources: "No changed folders or files in this view.",
    noData: "No data",
    noSavedSnapshots: "No saved snapshots yet",
    noScanLoaded: "No scan loaded",
    old: "Old",
    path: "Path",
    sameDirectoryRequired: "Please select two snapshots from the same directory path before comparing.",
    root: "Root",
    saveFailed: "Save failed",
    saveSnapshot: "Save Snapshot",
    scanned: "Scanned",
    scan: "Scan",
    scanControls: "Scan controls",
    scanFailed: "Scan failed",
    scanLoaded: "Scan loaded",
    scanning: "Scanning...",
    scanningDirectory: "Scanning directory",
    searchPlaceholder: "Search...",
    selectPlaceholder: "-- select --",
    selectBothSnapshots: "Select both baseline and comparison snapshots",
    selectDifferentSnapshots: "Select two different snapshots",
    snapshotNamePrompt: "Snapshot name:",
    snapshotUnavailable: "One of the selected snapshots is no longer available",
    shrink: "Shrink",
    shrinkStatus: "SHRINK",
    show: "Show:",
    small: "Small",
    size: "Size",
    skipResults: "Skip to results",
    source: "Source",
    statusReady: "Ready",
    tabBar: "Bar Chart",
    tabChanges: "Changes",
    tabTable: "Table",
    tabTreemap: "Treemap",
    theme: "Theme",
    themeDark: "Dark",
    themeLight: "Light",
    top15: "Top 15",
    top25: "Top 25",
    top50: "Top 50",
    totalSize: "Total Size",
    type: "Type",
    unknown: "Unknown",
  },
  zh: {
    all: "全部",
    allDetails: "全部明细",
    allDirectories: "全部目录",
    baseline: "基准：",
    biggestChanges: "最大变化",
    biggestChangesChart: "最大存储变化柱状图",
    biggestGrowth: "最大增长",
    biggestShrink: "最大减少",
    browse: "选择",
    breadcrumb: "路径导航",
    cancelledReady: "就绪",
    change: "变化",
    changeSources: "变化来源",
    changeView: "变化视图：",
    children: "子项",
    chooseDirectoryFailed: "选择目录失败",
    choosingDirectory: "正在选择目录",
    color: "颜色：",
    compare: "对比",
    compareLabel: "对比：",
    comparison: "对比值",
    comparingSnapshots: "正在对比快照",
    del: "删除",
    deleteSnapshotConfirm: "删除快照 {id}？",
    depth: "深度",
    depth1: "1 层",
    depth2: "2 层",
    depth3: "3 层",
    directCauses: "直接原因",
    directory: "目录",
    dirCount: "{count} 个目录",
    directoryPickerNotReady: "目录选择器尚未准备好，请稍后再试。",
    directorySelected: "已选择目录",
    emptyHint: "选择一个目录以查看它的空间占用。",
    elapsed: "耗时",
    enterDirectory: "请输入目录路径",
    file: "文件",
    folder: "文件夹",
    foldersSummary: "文件夹汇总",
    growth: "增长",
    grow: "增长",
    grew: "增长",
    language: "语言",
    languageChinese: "中文",
    languageEnglish: "English",
    large: "大",
    largestDirectories: "占用最大的目录",
    largestDirectoriesChart: "占用最大的目录柱状图",
    load: "加载",
    netChange: "净变化",
    new: "新增",
    noChange: "无变化",
    noChangedSources: "当前视图没有变化的文件夹或文件。",
    noData: "没有数据",
    noSavedSnapshots: "还没有保存的快照",
    noScanLoaded: "尚未加载扫描",
    old: "旧大小",
    path: "路径",
    sameDirectoryRequired: "请选择来自同一路径的两个快照再进行对比。",
    root: "根目录",
    saveFailed: "保存失败",
    saveSnapshot: "保存快照",
    scanned: "扫描时间",
    scan: "扫描",
    scanControls: "扫描控件",
    scanFailed: "扫描失败",
    scanLoaded: "已加载扫描",
    scanning: "扫描中...",
    scanningDirectory: "正在扫描目录",
    searchPlaceholder: "搜索...",
    selectPlaceholder: "-- 请选择 --",
    selectBothSnapshots: "请选择基准快照和对比快照",
    selectDifferentSnapshots: "请选择两个不同的快照",
    snapshotNamePrompt: "快照名称：",
    snapshotUnavailable: "所选快照中有一个已不可用",
    shrink: "减少",
    shrinkStatus: "减少",
    show: "显示：",
    small: "小",
    size: "大小",
    skipResults: "跳到结果",
    source: "来源",
    statusReady: "就绪",
    tabBar: "柱状图",
    tabChanges: "变化",
    tabTable: "表格",
    tabTreemap: "矩形图",
    theme: "主题",
    themeDark: "深色",
    themeLight: "白色",
    top15: "前 15",
    top25: "前 25",
    top50: "前 50",
    totalSize: "总大小",
    type: "类型",
    unknown: "未知",
  },
};

function cacheDom() {
  [
    "barChart",
    "breadcrumb",
    "btnCompare",
    "btnBrowse",
    "btnSave",
    "btnScan",
    "cards",
    "changeChart",
    "changeBody",
    "changeHead",
    "emptyState",
    "loading",
    "loadingMsg",
    "mainContent",
    "pBar",
    "pChanges",
    "pTable",
    "pTreemap",
    "scanDepth",
    "scanPath",
    "searchInput",
    "selBase",
    "selChangeView",
    "selColor",
    "selComp",
    "selTop",
    "scanMeta",
    "selLanguage",
    "selTheme",
    "snapBody",
    "snapCount",
    "snapList",
    "snapToggle",
    "statusText",
    "tabs",
    "tblBody",
    "tblHead",
    "treemap",
    "treemapLegend",
  ].forEach((id) => {
    dom[id] = document.getElementById(id);
  });
}

function t(key) {
  return translations[state.language]?.[key] || translations.en[key] || key;
}

function cssVar(name) {
  return getComputedStyle(document.body).getPropertyValue(name).trim();
}

function setStatus(key) {
  dom.statusText.textContent = t(key);
  dom.statusText.dataset.statusKey = key;
}

function applyTheme(theme) {
  state.theme = theme === "light" ? "light" : "dark";
  document.body.dataset.theme = state.theme;
  dom.selTheme.value = state.theme;
  localStorage.setItem("diskAnalyzer.theme", state.theme);
}

function applyTranslations() {
  document.documentElement.lang = state.language === "zh" ? "zh-CN" : "en";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAria));
  });

  if (dom.statusText.dataset.statusKey) {
    dom.statusText.textContent = t(dom.statusText.dataset.statusKey);
  }
}

function applyLanguage(language) {
  state.language = language === "zh" ? "zh" : "en";
  dom.selLanguage.value = state.language;
  localStorage.setItem("diskAnalyzer.language", state.language);
  applyTranslations();
}

function initPreferences() {
  const storedTheme = localStorage.getItem("diskAnalyzer.theme");
  const storedLanguage = localStorage.getItem("diskAnalyzer.language");
  const browserLanguage = navigator.language?.toLowerCase().startsWith("zh") ? "zh" : "en";

  applyTheme(storedTheme || "dark");
  applyLanguage(storedLanguage || browserLanguage);
  setStatus("statusReady");
}

function waitForApi(callback) {
  if (window.pywebview?.api) {
    state.api = window.pywebview.api;
    callback();
    return;
  }

  window.addEventListener("pywebviewready", () => {
    state.api = window.pywebview.api;
    callback();
  });
}

function formatBytes(bytes) {
  if (bytes === 0 || bytes == null) return "0 B";
  const abs = Math.abs(bytes);
  if (abs >= 1e9) return `${(bytes / 1e9).toFixed(2)} GB`;
  if (abs >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
  if (abs >= 1e3) return `${(bytes / 1e3).toFixed(1)} KB`;
  return `${bytes} B`;
}

function parseHexColor(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function lerpColor(from, to, amount) {
  const t = Math.max(0, Math.min(1, amount));
  return from.map((value, index) => Math.round(value + (to[index] - value) * t));
}

function rgb(color) {
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

function sizeColor(value, max) {
  if (max <= 0) return sizeScale[0];

  const ratio = Math.log1p(value) / Math.log1p(max);
  const index = Math.min(ratio * (sizeScale.length - 1), sizeScale.length - 1);
  const low = Math.floor(index);
  const high = Math.min(low + 1, sizeScale.length - 1);
  return rgb(lerpColor(parseHexColor(sizeScale[low]), parseHexColor(sizeScale[high]), index - low));
}

function deltaColor(delta, max) {
  if (max <= 0) return "#3a3e4d";

  const ratio = Math.abs(delta) / max;
  if (delta > 0) return rgb(lerpColor([60, 65, 80], parseHexColor("#ef6b4b"), ratio));
  if (delta < 0) return rgb(lerpColor([60, 65, 80], parseHexColor("#4bcb8b"), ratio));
  return "#3a3e4d";
}

function setVisible(element, visible) {
  element.classList.toggle("hidden", !visible);
}

function showLoading(visible, message) {
  dom.loading.classList.toggle("show", visible);
  if (message) dom.loadingMsg.textContent = message;
}

function setScanning(isScanning, message = "") {
  dom.btnBrowse.disabled = isScanning;
  dom.btnScan.disabled = isScanning;
  dom.scanPath.disabled = isScanning;
  dom.scanDepth.disabled = isScanning;
  if (message) setStatus(message);
  else setStatus(isScanning ? "scanningDirectory" : "statusReady");
}

function selectedTopCount() {
  return Number.parseInt(dom.selTop.value, 10);
}

function normalizeSnapshotPath(path) {
  return (path || "")
    .trim()
    .replace(/\//g, "\\")
    .replace(/\\+$/g, "")
    .toLowerCase();
}

function getEntries(snapshot, path) {
  if (!snapshot?.Sizes) return [];

  const prefix = path === "." ? "" : `${path}\\`;
  const entries = new Map();

  Object.entries(snapshot.Sizes).forEach(([key, value]) => {
    let relativePath = "";

    if (path === ".") relativePath = key;
    else if (key.startsWith(prefix)) relativePath = key.slice(prefix.length);
    else return;

    if (!relativePath || relativePath === "." || key === path) return;

    const parts = relativePath.split("\\");
    const name = parts[0];
    const fullPath = `${prefix}${name}`;

    if (!entries.has(name)) {
      entries.set(name, { name, path: fullPath, size: 0, children: 0 });
    }

    const entry = entries.get(name);
    if (parts.length === 1) entry.size = value;
    else entry.children += 1;
  });

  return [...entries.values()].sort((a, b) => b.size - a.size);
}

function squarify(items, x, y, width, height) {
  if (!items.length || width <= 0 || height <= 0) return [];

  const total = items.reduce((sum, item) => sum + item.size, 0);
  if (total <= 0) return items.map((item) => ({ ...item, x, y, width: 0, height: 0 }));

  const result = [];

  function layout(nodes, rectX, rectY, rectWidth, rectHeight) {
    if (!nodes.length || rectWidth <= 0 || rectHeight <= 0) return;

    if (nodes.length === 1) {
      result.push({
        ...nodes[0],
        x: rectX,
        y: rectY,
        width: rectWidth,
        height: rectHeight,
      });
      return;
    }

    const nodeTotal = nodes.reduce((sum, item) => sum + item.size, 0);
    let runningTotal = 0;
    let splitIndex = 1;

    for (let index = 0; index < nodes.length - 1; index += 1) {
      const nextTotal = runningTotal + nodes[index].size;
      if (Math.abs(nodeTotal / 2 - nextTotal) <= Math.abs(nodeTotal / 2 - runningTotal)) {
        runningTotal = nextTotal;
        splitIndex = index + 1;
      } else {
        break;
      }
    }

    const first = nodes.slice(0, splitIndex);
    const second = nodes.slice(splitIndex);
    const firstTotal = first.reduce((sum, item) => sum + item.size, 0);
    const ratio = firstTotal / nodeTotal;

    if (rectWidth >= rectHeight) {
      const firstWidth = rectWidth * ratio;
      layout(first, rectX, rectY, firstWidth, rectHeight);
      layout(second, rectX + firstWidth, rectY, rectWidth - firstWidth, rectHeight);
    } else {
      const firstHeight = rectHeight * ratio;
      layout(first, rectX, rectY, rectWidth, firstHeight);
      layout(second, rectX, rectY + firstHeight, rectWidth, rectHeight - firstHeight);
    }
  }

  layout(items, x, y, width, height);
  return result;
}

function comparisonEntryMap(path) {
  return new Map(getEntries(state.comparison, path).map((entry) => [entry.name, entry]));
}

function buildTreemap() {
  dom.treemap.innerHTML = "";
  const { width, height } = dom.treemap.getBoundingClientRect();
  const comparisonMap = state.comparison ? comparisonEntryMap(state.currentPath) : new Map();
  const items = getEntries(state.baseline, state.currentPath)
    .slice(0, selectedTopCount())
    .map((entry) => {
      const compared = comparisonMap.get(entry.name);
      return { ...entry, delta: compared ? compared.size - entry.size : 0 };
    })
    .filter((item) => item.size > 0);

  if (!items.length) {
    dom.treemap.innerHTML = `<div class="empty-state">${t("noData")}</div>`;
    return;
  }

  const maxSize = Math.max(...items.map((item) => item.size));
  const maxDelta = Math.max(...items.map((item) => Math.abs(item.delta)), 1);
  const colorMode = dom.selColor.value;
  const layout = squarify(items, 0, 0, width, height);

  layout.forEach((item) => {
    if (item.width < 2 || item.height < 2) return;

    const cell = document.createElement("button");
    cell.className = "tm-cell";
    cell.type = "button";
    cell.style.left = `${item.x}px`;
    cell.style.top = `${item.y}px`;
    cell.style.width = `${item.width}px`;
    cell.style.height = `${item.height}px`;

    if (colorMode === "growth" && state.comparison) {
      cell.style.background = item.delta > 0 ? deltaColor(item.delta, maxDelta) : "#252836";
    } else if (colorMode === "shrink" && state.comparison) {
      cell.style.background = item.delta < 0 ? deltaColor(item.delta, maxDelta) : "#252836";
    } else {
      cell.style.background = sizeColor(item.size, maxSize);
    }

    const inner = document.createElement("div");
    inner.className = "tm-inner";

    const name = document.createElement("div");
    name.className = "tm-name";
    name.textContent = item.name;
    inner.appendChild(name);

    if (item.width > 45 && item.height > 28) {
      const size = document.createElement("div");
      size.className = "tm-size";
      size.textContent = formatBytes(item.size);
      inner.appendChild(size);
    }

    if (state.comparison && item.width > 70 && item.height > 42) {
      const delta = document.createElement("div");
      delta.className = "tm-size";
      delta.style.color = item.delta > 0 ? "#ef6b4b" : item.delta < 0 ? "#4bcb8b" : "#8b8fa3";
      delta.textContent = `${item.delta >= 0 ? "+" : ""}${formatBytes(item.delta)}`;
      inner.appendChild(delta);
    }

    cell.title = `${item.name}\n${t("size")}: ${formatBytes(item.size)}${
      state.comparison ? `\n${t("change")}: ${item.delta >= 0 ? "+" : ""}${formatBytes(item.delta)}` : ""
    }${item.children ? `\n${t("children")}: ${item.children}` : ""}`;
    cell.appendChild(inner);

    cell.addEventListener("click", () => {
      if (!item.children) return;
      state.currentPath = item.path;
      render();
    });

    dom.treemap.appendChild(cell);
  });

  if (state.comparison) {
    dom.treemapLegend.innerHTML = [
      `<span><span class="dot" style="background: var(--grow)"></span>${t("grew")}</span>`,
      `<span><span class="dot" style="background: var(--shrink)"></span>${t("shrink")}</span>`,
      `<span><span class="dot" style="background: #3a3e4d"></span>${t("noChange")}</span>`,
    ].join("");
  } else {
    dom.treemapLegend.innerHTML = `<span>${t("small")} <span class="size-ramp"></span> ${t("large")}</span>`;
  }
}

function chartOptions(valueFormatter) {
  return {
    indexAxis: "y",
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (context) => valueFormatter(context.raw) } },
    },
    scales: {
      x: {
        grid: { color: cssVar("--chart-grid") },
        ticks: {
          color: cssVar("--chart-tick"),
          callback: (value) => {
            const prefix = value < 0 ? "-" : "";
            const abs = Math.abs(value);
            return abs >= 1000 ? `${prefix}${(abs / 1000).toFixed(1)} GB` : `${value} MB`;
          },
        },
      },
      y: {
        grid: { display: false },
        ticks: { color: cssVar("--chart-label"), font: { size: 11 } },
      },
    },
  };
}

function buildBarChart() {
  const entries = getEntries(state.baseline, state.currentPath).slice(0, selectedTopCount());
  const labels = entries.map((entry) => entry.name);
  const data = entries.map((entry) => Number((entry.size / 1e6).toFixed(1)));
  const colors = entries.map((entry) => sizeColor(entry.size, entries[0]?.size || 1));

  charts.bar?.destroy();
  charts.bar = new Chart(dom.barChart.getContext("2d"), {
    type: "bar",
    data: { labels, datasets: [{ data, backgroundColor: colors, borderRadius: 5, barThickness: 20 }] },
    options: chartOptions((value) => formatBytes(value * 1e6)),
  });
}

function snapshotSourceRows(snapshot, path) {
  const rows = [];
  const prefix = path === "." ? "" : `${path}\\`;

  Object.entries(snapshot?.Sizes || {}).forEach(([sourcePath, size]) => {
    if (sourcePath === ".") return;
    if (path !== "." && sourcePath !== path && !sourcePath.startsWith(prefix)) return;
    rows.push({ type: "Folder", path: sourcePath, size });
  });

  Object.entries(snapshot?.Files || {}).forEach(([sourcePath, size]) => {
    if (path !== "." && !sourcePath.startsWith(prefix)) return;
    rows.push({ type: "File", path: sourcePath, size });
  });

  return rows;
}

function changeKey(row) {
  return `${row.type}:${row.path}`;
}

function typeLabel(type) {
  return type === "File" ? t("file") : t("folder");
}

function statusLabel(status) {
  if (status === "grow") return t("grow");
  if (status === "shrink") return t("shrinkStatus");
  if (status === "new") return t("new");
  if (status === "del") return t("del");
  return status.toUpperCase();
}

function pathHasChangedDescendant(row, changedRows) {
  const prefix = `${row.path}\\`;
  return changedRows.some((candidate) => (
    candidate.path.startsWith(prefix)
    && Math.sign(candidate.delta) === Math.sign(row.delta)
    && Math.abs(candidate.delta) >= Math.abs(row.delta)
  ));
}

function filterChangeRows(rows) {
  const view = dom.selChangeView.value;

  if (view === "all") return rows;
  if (view === "folders") return rows.filter((row) => row.type === "Folder");

  const files = rows.filter((row) => row.type === "File");
  const folders = rows.filter((row) => row.type === "Folder");
  const directRows = [...files];
  const directKeys = new Set(files.map(changeKey));

  folders.forEach((folder) => {
    if (pathHasChangedDescendant(folder, rows)) return;
    const key = changeKey(folder);
    if (!directKeys.has(key)) {
      directRows.push(folder);
      directKeys.add(key);
    }
  });

  return directRows.sort((a, b) => {
    if (a.delta > 0 && b.delta <= 0) return -1;
    if (a.delta <= 0 && b.delta > 0) return 1;
    return Math.abs(b.delta) - Math.abs(a.delta);
  });
}

function getChangeRows() {
  if (!state.comparison) return [];

  const baselineSources = snapshotSourceRows(state.baseline, state.currentPath);
  const comparisonSources = snapshotSourceRows(state.comparison, state.currentPath);
  const baselineMap = new Map(baselineSources.map((row) => [`${row.type}:${row.path}`, row]));
  const comparisonMap = new Map(comparisonSources.map((row) => [`${row.type}:${row.path}`, row]));
  const keys = new Set([...baselineMap.keys(), ...comparisonMap.keys()]);

  return [...keys]
    .map((key) => {
      const oldRow = baselineMap.get(key);
      const newRow = comparisonMap.get(key);
      const type = oldRow?.type || newRow?.type || "Folder";
      const path = oldRow?.path || newRow?.path || "";
      const oldSize = oldRow?.size || 0;
      const newSize = newRow?.size || 0;
      const delta = newSize - oldSize;
      let status = "same";

      if (!oldRow) status = "new";
      else if (!newRow) status = "del";
      else if (delta > 0) status = "grow";
      else if (delta < 0) status = "shrink";

      return {
        type,
        path,
        name: path.split("\\").pop() || path,
        old: oldSize,
        now: newSize,
        delta,
        status,
      };
    })
    .filter((row) => row.delta !== 0)
    .sort((a, b) => {
      if (a.delta > 0 && b.delta <= 0) return -1;
      if (a.delta <= 0 && b.delta > 0) return 1;
      return Math.abs(b.delta) - Math.abs(a.delta);
    });
}

function getVisibleChangeRows() {
  return filterChangeRows(getChangeRows());
}

function buildChangeChart() {
  if (!state.comparison) {
    charts.change?.destroy();
    charts.change = null;
    dom.changeHead.innerHTML = "";
    dom.changeBody.innerHTML = "";
    return;
  }

  const topChanges = getVisibleChangeRows().slice(0, selectedTopCount());

  charts.change?.destroy();
  charts.change = new Chart(dom.changeChart.getContext("2d"), {
    type: "bar",
    data: {
      labels: topChanges.map((change) => `${typeLabel(change.type)}: ${change.name}`),
      datasets: [{
        data: topChanges.map((change) => Number((change.delta / 1e6).toFixed(2))),
        backgroundColor: topChanges.map((change) => (change.delta > 0 ? "#ef6b4b" : "#4bcb8b")),
        borderRadius: 5,
        barThickness: 20,
      }],
    },
    options: chartOptions((value) => `${value >= 0 ? "+" : ""}${formatBytes(value * 1e6)}`),
  });

  buildChangeTable(topChanges);
}

function buildChangeTable(rows) {
  const viewLabels = {
    direct: t("directCauses"),
    folders: t("foldersSummary"),
    all: t("allDetails"),
  };

  dom.changeHead.innerHTML = `
    <tr>
      <th>${t("source")} (${viewLabels[dom.selChangeView.value] || t("directCauses")})</th>
      <th>${t("type")}</th>
      <th>${t("old")}</th>
      <th>${t("new")}</th>
      <th>${t("change")}</th>
    </tr>
  `;

  if (!rows.length) {
    dom.changeBody.innerHTML = `<tr><td colspan="5">${t("noChangedSources")}</td></tr>`;
    return;
  }

  dom.changeBody.innerHTML = "";
  rows.forEach((row) => {
    const tableRow = document.createElement("tr");
    const changeClass = row.delta > 0 ? "grow" : "shrink";
    tableRow.innerHTML = `
      <td><div class="source-main"></div><div class="source-path"></div></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="${changeClass}"></td>
    `;
    tableRow.querySelector(".source-main").textContent = row.name;
    tableRow.querySelector(".source-path").textContent = row.path;
    tableRow.children[1].textContent = typeLabel(row.type);
    tableRow.children[2].textContent = formatBytes(row.old);
    tableRow.children[3].textContent = formatBytes(row.now);
    tableRow.children[4].textContent = `${row.delta >= 0 ? "+" : ""}${formatBytes(row.delta)}`;

    const badge = document.createElement("span");
    badge.className = `badge badge-${row.status}`;
    badge.textContent = statusLabel(row.status);
    tableRow.children[4].appendChild(badge);
    dom.changeBody.appendChild(tableRow);
  });
}

function getTableRows() {
  const baselineEntries = getEntries(state.baseline, state.currentPath);
  const comparisonEntries = state.comparison ? getEntries(state.comparison, state.currentPath) : [];
  const comparisonMap = new Map(comparisonEntries.map((entry) => [entry.name, entry]));

  const rows = baselineEntries.map((entry) => {
    const compared = comparisonMap.get(entry.name);
    const newSize = compared ? compared.size : entry.size;
    const delta = newSize - entry.size;
    let status = "same";

    if (state.comparison && !compared) status = "del";
    else if (entry.size === 0 && newSize > 0) status = "new";
    else if (delta > 0) status = "grow";
    else if (delta < 0) status = "shrink";

    return {
      name: entry.name,
      path: entry.path,
      old: entry.size,
      now: newSize,
      delta,
      status,
      children: entry.children,
    };
  });

  if (state.comparison) {
    comparisonEntries.forEach((entry) => {
      if (rows.some((row) => row.name === entry.name)) return;
      rows.push({
        name: entry.name,
        path: entry.path,
        old: 0,
        now: entry.size,
        delta: entry.size,
        status: "new",
        children: entry.children,
      });
    });
  }

  const search = state.search.toLowerCase();
  const filtered = search ? rows.filter((row) => row.name.toLowerCase().includes(search)) : rows;

  return filtered.sort((a, b) => {
    if (state.sortKey === "name") {
      return state.sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }

    const valueA = state.sortKey === "delta" ? Math.abs(a.delta) : state.sortKey === "now" ? a.now : a.old;
    const valueB = state.sortKey === "delta" ? Math.abs(b.delta) : state.sortKey === "now" ? b.now : b.old;
    return state.sortAsc ? valueA - valueB : valueB - valueA;
  });
}

function buildTableHead(columns) {
  dom.tblHead.innerHTML = "";
  const row = document.createElement("tr");

  columns.forEach(([key, label]) => {
    const header = document.createElement("th");
    header.dataset.key = key;
    header.textContent = label;

    const arrow = document.createElement("span");
    arrow.className = "sort-arrow";
    arrow.textContent = state.sortKey === key ? (state.sortAsc ? "▲" : "▼") : "";
    header.appendChild(arrow);

    header.addEventListener("click", () => {
      if (state.sortKey === key) state.sortAsc = !state.sortAsc;
      else {
        state.sortKey = key;
        state.sortAsc = key === "name";
      }
      buildTable();
    });

    row.appendChild(header);
  });

  dom.tblHead.appendChild(row);
}

function buildTable() {
  const columns = state.comparison
    ? [["name", t("source")], ["size", t("old")], ["now", t("new")], ["delta", t("change")]]
    : [["name", t("source")], ["size", t("size")]];
  const rows = getTableRows().slice(0, selectedTopCount());

  buildTableHead(columns);
  dom.tblBody.innerHTML = "";

  rows.forEach((row) => {
    const tableRow = document.createElement("tr");
    const nameCell = document.createElement("td");
    const path = document.createElement("div");
    path.className = "cell-path";
    path.innerHTML = `<span class="icon">${row.children ? "&#9654;" : ""}</span>`;

    const pathText = document.createElement("span");
    pathText.className = "path-text";
    pathText.textContent = row.name;
    path.appendChild(pathText);
    nameCell.appendChild(path);
    tableRow.appendChild(nameCell);

    const oldCell = document.createElement("td");
    oldCell.textContent = formatBytes(row.old);
    tableRow.appendChild(oldCell);

    if (state.comparison) {
      const nowCell = document.createElement("td");
      nowCell.textContent = formatBytes(row.now);
      tableRow.appendChild(nowCell);

      const deltaCell = document.createElement("td");
      deltaCell.style.color = row.delta > 0 ? "var(--grow)" : row.delta < 0 ? "var(--shrink)" : "var(--muted)";
      deltaCell.textContent = `${row.delta >= 0 ? "+" : ""}${formatBytes(row.delta)}`;

      if (row.status !== "same") {
        const badge = document.createElement("span");
        badge.className = `badge badge-${row.status}`;
        badge.textContent = statusLabel(row.status);
        deltaCell.appendChild(badge);
      }

      tableRow.appendChild(deltaCell);
    }

    if (row.children) {
      tableRow.addEventListener("click", () => {
        state.currentPath = row.path;
        render();
      });
    }

    dom.tblBody.appendChild(tableRow);
  });
}

function buildScanMeta() {
  dom.scanMeta.innerHTML = "";
  if (!state.baseline) return;

  [
    [t("path"), state.baseline.Path || t("unknown")],
    [t("depth"), state.baseline.Depth || "-"],
    [t("scanned"), state.baseline.Timestamp || "-"],
    [t("elapsed"), state.baseline.Elapsed || "-"],
  ].forEach(([label, value]) => {
    const pill = document.createElement("span");
    pill.className = "meta-pill";
    pill.innerHTML = "<strong></strong> <span></span>";
    pill.querySelector("strong").textContent = `${label}:`;
    pill.querySelector("span").textContent = value;
    dom.scanMeta.appendChild(pill);
  });
}

function statCard(label, value, subtext = "", className = "") {
  const card = document.createElement("div");
  card.className = "stat-card";
  card.innerHTML = `
    <div class="lbl"></div>
    <div class="val ${className}"></div>
    <div class="sub"></div>
  `;
  card.querySelector(".lbl").textContent = label;
  card.querySelector(".val").textContent = value;
  card.querySelector(".sub").textContent = subtext;
  return card;
}

function buildCards() {
  dom.cards.innerHTML = "";
  const baselineEntries = getEntries(state.baseline, state.currentPath);
  const total = baselineEntries.reduce((sum, entry) => sum + entry.size, 0);
  dom.cards.appendChild(statCard(t("totalSize"), formatBytes(total), t("dirCount").replace("{count}", baselineEntries.length)));

  if (!state.comparison) return;

  const comparisonEntries = getEntries(state.comparison, state.currentPath);
  const comparisonTotal = comparisonEntries.reduce((sum, entry) => sum + entry.size, 0);
  const delta = comparisonTotal - total;
  const deltaClass = delta > 0 ? "grow" : delta < 0 ? "shrink" : "";

  dom.cards.appendChild(statCard(t("comparison"), formatBytes(comparisonTotal)));
  dom.cards.appendChild(statCard(t("netChange"), `${delta >= 0 ? "+" : ""}${formatBytes(delta)}`, "", deltaClass));

  const baselineMap = new Map(baselineEntries.map((entry) => [entry.name, entry]));
  const comparisonMap = new Map(comparisonEntries.map((entry) => [entry.name, entry]));
  const names = new Set([...baselineMap.keys(), ...comparisonMap.keys()]);
  let biggestGrowth = null;
  let biggestShrink = null;

  names.forEach((name) => {
    const oldSize = baselineMap.get(name)?.size || 0;
    const newSize = comparisonMap.get(name)?.size || 0;
    const change = { name, delta: newSize - oldSize };
    if (!biggestGrowth || change.delta > biggestGrowth.delta) biggestGrowth = change;
    if (!biggestShrink || change.delta < biggestShrink.delta) biggestShrink = change;
  });

  if (biggestGrowth?.delta > 0) {
    dom.cards.appendChild(statCard(t("biggestGrowth"), `+${formatBytes(biggestGrowth.delta)}`, biggestGrowth.name, "grow"));
  }

  if (biggestShrink?.delta < 0) {
    dom.cards.appendChild(statCard(t("biggestShrink"), formatBytes(biggestShrink.delta), biggestShrink.name, "shrink"));
  }
}

function buildBreadcrumb() {
  dom.breadcrumb.innerHTML = "";

  if (state.currentPath === ".") {
    const label = document.createElement("span");
    label.className = "root-label";
    label.textContent = t("root");
    dom.breadcrumb.appendChild(label);
    return;
  }

  const rootButton = document.createElement("button");
  rootButton.type = "button";
  rootButton.textContent = t("root");
  rootButton.addEventListener("click", () => {
    state.currentPath = ".";
    render();
  });
  dom.breadcrumb.appendChild(rootButton);

  let accumulator = "";
  state.currentPath.split("\\").forEach((part) => {
    accumulator = accumulator ? `${accumulator}\\${part}` : part;

    const separator = document.createElement("span");
    separator.className = "sep";
    separator.textContent = "/";
    dom.breadcrumb.appendChild(separator);

    const item = document.createElement("button");
    item.type = "button";
    item.textContent = part;
    item.dataset.path = accumulator;
    item.addEventListener("click", () => {
      state.currentPath = item.dataset.path;
      render();
    });
    dom.breadcrumb.appendChild(item);
  });
}

function render() {
  setVisible(dom.mainContent, true);
  setVisible(dom.emptyState, false);
  setVisible(dom.btnSave, true);
  setStatus(state.comparison ? "comparingSnapshots" : "scanLoaded");
  buildBreadcrumb();
  buildScanMeta();
  buildCards();
  buildTreemap();
  buildBarChart();
  buildChangeChart();
  buildTable();
}

async function loadSnapshots() {
  try {
    state.snapshots = await state.api.get_snapshots();
  } catch {
    state.snapshots = [];
  }
  renderSnapshotList();
}

function renderSnapshotList() {
  dom.snapCount.textContent = state.snapshots.length ? `(${state.snapshots.length})` : "";
  dom.snapList.innerHTML = "";

  if (!state.snapshots.length) {
    dom.snapList.innerHTML = `<div class="snap-empty">${t("noSavedSnapshots")}</div>`;
    updateSnapshotSelects();
    return;
  }

  state.snapshots.forEach((snapshot) => {
    const item = document.createElement("div");
    item.className = "snap-item";

    const info = document.createElement("div");
    info.className = "snap-info";
    info.innerHTML = '<div class="snap-name"></div><div class="snap-meta"></div>';
    info.querySelector(".snap-name").textContent = snapshot._id;
    info.querySelector(".snap-meta").textContent = `${snapshot.Timestamp || ""} | ${snapshot.Path || ""}`;

    const actions = document.createElement("div");
    actions.className = "snap-actions";

    const loadButton = document.createElement("button");
    loadButton.className = "btn-outline btn-small";
    loadButton.type = "button";
    loadButton.textContent = t("load");
    loadButton.addEventListener("click", () => loadSnapshot(snapshot._id));

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn-danger btn-small";
    deleteButton.type = "button";
    deleteButton.textContent = t("del");
    deleteButton.addEventListener("click", () => deleteSnapshot(snapshot._id));

    actions.append(loadButton, deleteButton);
    item.append(info, actions);
    dom.snapList.appendChild(item);
  });

  updateSnapshotSelects();
}

function updateSnapshotSelects() {
  [dom.selBase, dom.selComp].forEach((select) => {
    select.innerHTML = `<option value="">${t("selectPlaceholder")}</option>`;
    state.snapshots.forEach((snapshot) => {
      const option = document.createElement("option");
      option.value = snapshot._id;
      option.textContent = `${snapshot._id} (${snapshot.Timestamp || ""})`;
      select.appendChild(option);
    });
  });
}

function loadSnapshot(id) {
  const snapshot = state.snapshots.find((item) => item._id === id);
  if (!snapshot) return;
  state.baseline = snapshot;
  state.comparison = null;
  state.currentPath = ".";
  render();
}

async function deleteSnapshot(id) {
  if (!window.confirm(t("deleteSnapshotConfirm").replace("{id}", id))) return;
  try {
    await state.api.delete_snapshot(id);
  } finally {
    loadSnapshots();
  }
}

async function saveSnapshot() {
  if (!state.baseline) return;
  const now = new Date();
  const timestamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-") + "_" + [
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
  ].join("-");
  const defaultName = `${state.baseline.Path?.replace(/[\\/:*?"<>|]/g, "_")}_${timestamp}`;
  const name = window.prompt(t("snapshotNamePrompt"), defaultName);
  if (!name) return;

  try {
    dom.btnSave.disabled = true;
    await state.api.save_snapshot(name, state.baseline);
    loadSnapshots();
  } catch (error) {
    window.alert(`${t("saveFailed")}: ${error}`);
  } finally {
    dom.btnSave.disabled = false;
  }
}

function compareSnapshots() {
  const baselineId = dom.selBase.value;
  const comparisonId = dom.selComp.value;

  if (!baselineId || !comparisonId) {
    window.alert(t("selectBothSnapshots"));
    return;
  }

  if (baselineId === comparisonId) {
    window.alert(t("selectDifferentSnapshots"));
    return;
  }

  const baseline = state.snapshots.find((snapshot) => snapshot._id === baselineId);
  const comparison = state.snapshots.find((snapshot) => snapshot._id === comparisonId);
  if (!baseline || !comparison) {
    window.alert(t("snapshotUnavailable"));
    return;
  }

  if (normalizeSnapshotPath(baseline.Path) !== normalizeSnapshotPath(comparison.Path)) {
    window.alert(t("sameDirectoryRequired"));
    return;
  }

  state.baseline = baseline;
  state.comparison = comparison;
  state.currentPath = ".";
  render();
}

async function scanDirectory() {
  const path = dom.scanPath.value.trim();
  if (!path) {
    window.alert(t("enterDirectory"));
    return;
  }

  showLoading(true, `${t("scanning")} ${path}`);
  setScanning(true, "scanningDirectory");
  try {
    const result = await state.api.scan(path, Number.parseInt(dom.scanDepth.value, 10));
    if (result.error) {
      window.alert(result.error);
      setStatus("scanFailed");
      return;
    }

    state.baseline = result;
    state.comparison = null;
    state.currentPath = ".";
    render();
  } catch (error) {
    window.alert(`${t("scanFailed")}: ${error}`);
    setStatus("scanFailed");
  } finally {
    showLoading(false);
    setScanning(false, state.baseline ? "scanLoaded" : "statusReady");
  }
}

async function browseDirectory() {
  if (!state.api?.choose_directory) {
    window.alert(t("directoryPickerNotReady"));
    return;
  }

  dom.btnBrowse.disabled = true;
  setStatus("choosingDirectory");

  try {
    const result = await state.api.choose_directory(dom.scanPath.value);
    if (result?.error) {
      window.alert(result.error);
      return;
    }

    if (result?.path) {
      dom.scanPath.value = result.path;
      setStatus("directorySelected");
      dom.scanPath.focus();
    } else {
      setStatus(state.baseline ? "scanLoaded" : "statusReady");
    }
  } catch (error) {
    window.alert(`${t("chooseDirectoryFailed")}: ${error}`);
    setStatus(state.baseline ? "scanLoaded" : "statusReady");
  } finally {
    dom.btnBrowse.disabled = false;
  }
}

function bindEvents() {
  dom.btnBrowse.addEventListener("click", browseDirectory);
  dom.btnScan.addEventListener("click", scanDirectory);
  dom.scanPath.addEventListener("keydown", (event) => {
    if (event.key === "Enter") scanDirectory();
  });
  dom.btnSave.addEventListener("click", saveSnapshot);
  dom.btnCompare.addEventListener("click", compareSnapshots);

  dom.snapToggle.addEventListener("click", () => {
    const isOpen = !dom.snapBody.classList.contains("open");
    dom.snapToggle.classList.toggle("open", isOpen);
    dom.snapToggle.setAttribute("aria-expanded", String(isOpen));
    dom.snapBody.classList.toggle("open", isOpen);
  });

  dom.tabs.addEventListener("click", (event) => {
    const tab = event.target.closest(".tab");
    if (!tab) return;

    document.querySelectorAll(".tab").forEach((element) => element.classList.remove("active"));
    document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("visible"));

    tab.classList.add("active");
    const panelMap = { treemap: "pTreemap", bar: "pBar", changes: "pChanges", table: "pTable" };
    dom[panelMap[tab.dataset.tab]].classList.add("visible");

    if (tab.dataset.tab === "bar") buildBarChart();
    if (tab.dataset.tab === "changes") buildChangeChart();
  });

  dom.selTop.addEventListener("change", render);
  dom.selColor.addEventListener("change", render);
  dom.selChangeView.addEventListener("change", render);
  dom.selTheme.addEventListener("change", () => {
    applyTheme(dom.selTheme.value);
    if (state.baseline) render();
  });
  dom.selLanguage.addEventListener("change", () => {
    applyLanguage(dom.selLanguage.value);
    renderSnapshotList();
    if (state.baseline) render();
  });
  dom.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    buildTable();
  });

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(buildTreemap, 200);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cacheDom();
  initPreferences();
  bindEvents();
  waitForApi(loadSnapshots);
});
