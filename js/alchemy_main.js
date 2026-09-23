// alchemy_main.js: Application entry point, initialization, URL state, module coordination

let isHandlingPopstate = false;

function init() {
    const localData = localStorage.getItem(STORAGE_KEY);
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const urlTab = urlParams.get('tab');    
    const urlItem = urlParams.get('item');
    const urlRate = urlParams.get('rate');
    const urlFuel = urlParams.get('fuel');
    const urlFert = urlParams.get('fert');
    const urlSetupgrades = urlParams.get('setupgrades');
    

    if (!window.ALCHEMY_DB) { alert("Error: alchemy_db.js not found!"); }
    if (!window.ALCHEMY_I18N) { alert("Error: alchemy_i18n.js not found!"); }

    const lang = resolveLanguage(urlLang);
    window.ALCHEMY_LANG = lang;
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = { ja: 'ja', zh: 'zh-Hans', en: 'en' }[lang];
    const langSelect = document.getElementById('ui-lang-select');
    if (langSelect) langSelect.value = lang;
    // English has no pack: keep the default pack loaded but disabled
    window.ALCHEMY_I18N = getLanguagePack(lang) ?? getLanguagePack(DEFAULT_LANG);

    const localTranslation = localStorage.getItem(i18nDataKey());
    if (localTranslation) {
        try {
            console.log("Loading local translation data...");
            window.ALCHEMY_I18N = JSON.parse(localTranslation);
        } catch (e) {
            console.error("Local translation data corrupt, resetting...");
            window.ALCHEMY_I18N = JSON.parse(JSON.stringify(window.ALCHEMY_I18N));
        }
    } else {
        console.log("Loading remote translation data...");
        window.ALCHEMY_I18N = JSON.parse(JSON.stringify(window.ALCHEMY_I18N));
    }
    window.ALCHEMY_I18N.enabled = (lang !== 'en');

    const fileDB = window.ALCHEMY_DB;
    if (localData) {
        try {
            console.log("Loading local database...");
            DB = JSON.parse(localData);
            const localVersion = DB.version || 0;
            const fileVersion = fileDB.version || 0;

            if (fileVersion != localVersion) {
                console.log(fileVersion);
                showUpdateBanner(localVersion, fileVersion);
            }
        } catch (e) {
            console.error("Local data corrupt, resetting...");
            DB = JSON.parse(JSON.stringify(fileDB));
        }
    } else {
        console.log("Loading remote database...");
        DB = JSON.parse(JSON.stringify(fileDB));
    }

    const baseSettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) {
        try {
            console.log("Loading user settings...");
            const parsed = JSON.parse(savedSettings);
            DB.settings = Object.assign(baseSettings, parsed);
        } catch (e) {
            console.error("Settings corrupt, using defaults");
            DB.settings = baseSettings;
        }
    } else {
        console.log("Loading default settings...");
        DB.settings = baseSettings;
    }
    
    if(!DB.items) DB.items = {};
    if(!DB.settings.preferredRecipes) DB.settings.preferredRecipes = {};
    if(!DB.settings.nodeRecipeOverrides) DB.settings.nodeRecipeOverrides = {};
    if(!DB.settings.recipeModifiers)  DB.settings.recipeModifiers = {};
    if(!DB.settings.activeRecyclers) DB.settings.activeRecyclers = {};
    if(!DB.settings.customCosts) DB.settings.customCosts = {};
    if(!DB.settings.expandCatalystInputs) DB.settings.expandCatalystInputs = { unstable: false, fertile: false, resonant: false, eternal: false };
    if(DB.settings.thermalExtractorHeight === undefined) DB.settings.thermalExtractorHeight = 255;

    translateDatabase(DB, true); // Translate DB item key

    prepareComboboxData();
    populateSelects(); 
    loadSettingsToUI();
    renderSlider(); // Initialize the slider logic
    
    if (urlItem) {
        document.getElementById('targetItemInput').value = decodeURIComponent(urlItem);
        updateComboIcon();
    }    
    if (urlRate) {
        document.getElementById('targetRate').disabled = false;
        document.getElementById('targetRate').value = urlRate;
    } else if (!DB.settings.targetItem) {
        // 沒有指定 rate、也沒有已儲存設定時，默認啟用 "Set by Machine Count" 模式，machine count = 1
        const machineModeToggle = document.getElementById('machineModeToggle');
        machineModeToggle.checked = true;
        toggleControlMode(false); // 切換 UI 狀態（禁用 rate 輸入、啟用 machine 輸入）
    }
    
    if (urlFuel && document.querySelector(`#fuelSelect option[value="${urlFuel}"]`)) {
        document.getElementById('fuelSelect').value = urlFuel;
    }
    if (urlFert && document.querySelector(`#fertSelect option[value="${urlFert}"]`)) {
        document.getElementById('fertSelect').value = urlFert;
    }
    if (urlSetupgrades) {
        /*
        [0]Logistics Efficiency
        [1]Throwing Efficiency
        [2]Factory Efficiency
        [3]Alchemy Skill
        [4]Fuel Efficiency
        [5]Fertilizer Efficiency
        [6]Sales Ability
        [7]Negotiation Skill
        [8]Customer Management
        [9]Relic Knowledge
        */
        const upgrades = urlSetupgrades.split(',').map(Number) || [];
        if (upgrades.length > 5) {
            console.log(urlSetupgrades);
            DB.settings.lvlBelt = upgrades[0];
            DB.settings.lvlSpeed = upgrades[2];
            DB.settings.lvlAlchemy = upgrades[3];
            DB.settings.lvlFuel = upgrades[4];
            DB.settings.lvlFert = upgrades[5];
            loadSettingsToUI();
            persist();
        }
    }

    // Import caldron recipes (if exist)
    try {
        loadCauldronSettings();
        syncCauldronToMainDB();
    } catch (e) {
        console.error(e);
    }

    calculate();
    
    if (urlTab) switchTab(urlTab, false);

    document.getElementById('db-gameversion-text').innerText = t("Game version : ") + DB.gameVersion ?? 0;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = {
            zh: "游戏《炼金工厂》(Alchemy Factory) 1.0 的生产规划计算器。支持多目标生产树、炼金锅配方搜索、节点图编辑器，百科与数据库编辑。",
            ja: "ゲーム「Alchemy Factory」1.0 向けの生産計画計算ツール。複数目標の生産ツリー、錬金釜レシピ検索、ノードグラフエディタ、図鑑、データベース編集に対応。",
            en: "A production planning tool for the game Alchemy Factory 1.0 version. Supports cauldron recipes, multi-targets production trees, node graph editor, wiki, and database editing"
        }[lang];
    }
}

function loadSettingsToUI() {
    if (DB.settings) {
        ['lvlBelt','lvlSpeed','lvlAlchemy','lvlFuel','lvlFert', 'lvlSell', 'lvlContract'].forEach(k => { if(DB.settings[k] !== undefined) document.getElementById(k).value = DB.settings[k]; });
        if(DB.settings.defaultFuel) document.getElementById('fuelSelect').value = DB.settings.defaultFuel; 
        if(DB.settings.defaultFert) document.getElementById('fertSelect').value = DB.settings.defaultFert;
        const heatingSel = document.getElementById('heatingDeviceSelect');
        if(DB.settings.selectedHeatingDevice) heatingSel.value = DB.settings.selectedHeatingDevice;
        if(!heatingSel.value) {
            heatingSel.value = heatingSel.querySelector('option[value="Stone Furnace"]') ? "Stone Furnace" : (heatingSel.options[0]?.value || "");
            DB.settings.selectedHeatingDevice = heatingSel.value;
        }
        if(DB.settings.nodeSize) {
            document.getElementById('nodeScaleSlider').value = DB.settings.nodeSize;
            setNodeScale(DB.settings.nodeSize);
        }
        if(DB.settings.showMaxCap) document.getElementById('showMaxCap').checked = DB.settings.showMaxCap;
        if(DB.settings.showFuelFert) document.getElementById('showFuelFert').checked = DB.settings.showFuelFert;
        if(DB.settings.showRawMachineCount) document.getElementById('showRawMachineCount').checked = DB.settings.showRawMachineCount;
        if(DB.settings.showHeatFert) document.getElementById('showHeatFert').checked = DB.settings.showHeatFert;
        if(DB.settings.showBeltCount) document.getElementById('showBeltCount').checked = DB.settings.showBeltCount;

        // --- Restore Calculator target/mode state ---
        if (DB.settings.targetItem) {
            document.getElementById('targetItemInput').value = DB.settings.targetItem;
            updateComboIcon();
        }
        if (DB.settings.targetRate !== undefined) {
            document.getElementById('targetRate').value = DB.settings.targetRate;
        }
        if (DB.settings.targetMachineCount !== undefined) {
            document.getElementById('targetMachine').value = DB.settings.targetMachineCount;
        }
        if (DB.settings.machineModeToggle) {
            document.getElementById('machineModeToggle').checked = true;
            toggleControlMode(false); // 套用禁用/啟用對應輸入框的 UI 效果
        }
        if (DB.settings.selfFuel) {
            const btn = document.getElementById('btnSelfFuel');
            btn.classList.remove('btn-inactive-red');
            btn.classList.add('btn-active-green');
        }
        if (DB.settings.selfFert) {
            const btn = document.getElementById('btnSelfFert');
            btn.classList.remove('btn-inactive-red');
            btn.classList.add('btn-active-green');
        }
    }
}

/** Option labels show the EFFECTIVE value per item (after the Fuel / Fertilizer Efficiency upgrade, +10%/level),
 *  which is what the calculation uses. Called again whenever the upgrade levels change. */
function refreshFuelFertLabels() {
    const fuelMult = 1 + (DB.settings.lvlFuel || 0) * 0.10;
    const fertMult = 1 + (DB.settings.lvlFert || 0) * 0.10;
    document.querySelectorAll('#fuelSelect option').forEach(o => {
        const d = DB.items[o.value] || {};
        o.text = `${o.value} (${Math.round((d.heat || 0) * fuelMult).toLocaleString()} P)`;
    });
    document.querySelectorAll('#fertSelect option').forEach(o => {
        const d = DB.items[o.value] || {};
        o.text = `${o.value} (${Math.round((d.nutrientValue || 0) * fertMult).toLocaleString()} V)`;
    });
    const fuelSel = document.getElementById('fuelSelect'), fertSel = document.getElementById('fertSelect');
    if (fuelSel) fuelSel.title = `${t('Fuel Efficiency')} Lv${DB.settings.lvlFuel || 0}`;
    if (fertSel) fertSel.title = `${t('Fert Efficiency')} Lv${DB.settings.lvlFert || 0}`;
}

function populateSelects() {
    const fuelSel = document.getElementById('fuelSelect'); const fertSel = document.getElementById('fertSelect'); const heatingSel = document.getElementById('heatingDeviceSelect');
    fuelSel.innerHTML = ''; fertSel.innerHTML = ''; heatingSel.innerHTML = '';
    const fuels = []; const ferts = [];
    const allItems = new Set(Object.keys(DB.items || {}));
    if(DB.recipes) DB.recipes.forEach(r => Object.keys(r.outputs).forEach(k => allItems.add(k)));

    allItems.forEach(itemName => {
        const itemDef = DB.items[itemName] || {};
        if(itemDef.heat) fuels.push({ name: itemName, heat: itemDef.heat });
        if(itemDef.nutrientValue) ferts.push({ name: itemName, val: itemDef.nutrientValue });
    });

    fuels.sort((a,b) => b.heat - a.heat).forEach(f => { fuelSel.appendChild(new Option('', f.name)); });
    ferts.sort((a,b) => b.val - a.val).forEach(f => { fertSel.appendChild(new Option('', f.name)); });
    refreshFuelFertLabels();
    Object.entries(DB.machines || {})
        .filter(([, machine]) => machine.isGenerator)
        .sort(([nameA], [nameB]) => nameA.localeCompare(nameB))
        .forEach(([machineName, machine]) => {
            heatingSel.appendChild(new Option(`${t(machineName, 'machines')} (${machine.slots || 0} ${t('slots')})`, machineName));
        });
    heatingSel.value = DB.settings.selectedHeatingDevice || "Stone Furnace";
    if(!heatingSel.value) heatingSel.value = heatingSel.options[0]?.value || "";
}

/* ==========================================================================
   SECTION: Update Banner
   ========================================================================== */

function showUpdateBanner(oldV, newV) {
    const banner = document.getElementById('update-banner');
    banner.style.display = 'flex';
    document.getElementById('old-version-id').innerText = 'v' + oldV;
    document.getElementById('new-version-id').innerText = 'v' + newV;
    document.getElementById('ui-update-msg').innerText = t('New database version available', 'ui');
    document.getElementById('ui-update-local-msg').innerText = t('Current local version:', 'ui');
    document.getElementById('ui-btn-update').innerText = t('Update Now', 'ui');
    document.getElementById('ui-btn-later').innerText = t('Skip Update', 'ui');   
}

function closeUpdateBanner() {
    document.getElementById('update-banner').style.display = 'none';
    console.log("Bump local data version to " + window.ALCHEMY_DB.version);
    DB.version = window.ALCHEMY_DB.version;
    persist();
}

function performUpdate() {
    console.log("Updating database v" + window.ALCHEMY_DB.version);    
    const newData = JSON.parse(JSON.stringify(window.ALCHEMY_DB));
    if (DB && DB.settings) {
        newData.settings = DB.settings;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    const localSourceData = localStorage.getItem(SOURCE_KEY);
    if (localSourceData) {
        localStorage.setItem(BACKUP_KEY, localSourceData);
    }
    localStorage.removeItem(SOURCE_KEY);
    location.reload();
}


/* ==========================================================================
   SECTION: Translation
   ========================================================================== */

function translateText() {
    const selectors = [
        'h1', '.panel h3', '.section-header', 
        'label', '.checkbox-row span', '.stat-label', '.scale-row-label',
        '.tab-btn', '.split-btn', '.save-btn', '.reset-btn', '.soild-btn', '.info'
    ].join(',');

    document.querySelectorAll(selectors).forEach(el => {
        const key = el.textContent.trim();
        el.textContent = t(key, 'ui');
    });

    const input = document.getElementById('targetItemInput');
    if (input) input.placeholder = t("Select or Type...", "ui");
    document.title = t("Alchemy Factory Calculator", "ui");
}

function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang) || lang === getCurrentLang()) return;
    const url = new URL(window.location.href);
    if (lang === DEFAULT_LANG) url.searchParams.delete('lang');
    else url.searchParams.set('lang', lang);
    localStorage.setItem(LANG_KEY, lang);

    // --- translate item names to match the new language ---
    const newPack = getLanguagePack(lang);
    const toNewLang = (name) => {
        if (!name) return name;
        const originName = toEnglishItemName(name);
        return newPack?.items?.[originName] ?? originName;
    };
    const itemParam = url.searchParams.get('item');
    if (itemParam) {
        url.searchParams.set('item', toNewLang(itemParam));
    }
    DB.settings.targetItem  = toNewLang(DB.settings.targetItem);
    DB.settings.defaultFuel = toNewLang(DB.settings.defaultFuel);
    DB.settings.defaultFert = toNewLang(DB.settings.defaultFert);
    saveSettings();
    
    window.location.href = url.toString();
}

/* ==========================================================================
   SECTION: URL
   ========================================================================== */

function switchTab(tabName, updateUrl = true) {
    let btnIndex = 0;
    switch (tabName) {
        case 'calc': btnIndex = 0; break;
        case 'cauldron': btnIndex = 1; break;
        case 'planner': btnIndex = 2; break;
        case 'help': btnIndex = 3; break;
        case 'db': btnIndex = 4; break;
        default: return;
    }
    document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
    document.getElementById('view-' + tabName).classList.add('active');

    const container = document.getElementById('page-tab-container');
    const tabBtns = container.querySelectorAll('.tab-btn');
    tabBtns.forEach(el => el.classList.remove('active'));
    if (tabBtns[btnIndex]) tabBtns[btnIndex].classList.add('active');

    if (updateUrl) {
        updateURL(tabName);
    }
    if (tabName === 'cauldron' && typeof initCauldron === 'function') {
        initCauldron();
    }
    if (tabName === 'help' && typeof initHelpPage === 'function') {
        initHelpPage();
    }
    if (tabName === 'planner' && typeof initPlannerPage === 'function') {
        initPlannerPage();
    }
    if (tabName === 'calc') {
        syncCauldronToMainDB(); // 回到計算器頁面時, 嘗試同步煉金鍋配方
    }
}

function updateURL(tabName = '') {
    const params = new URLSearchParams();
    if (getCurrentLang() !== DEFAULT_LANG) params.set('lang', getCurrentLang());

    if (tabName !== '' && tabName !== 'calc') {
        params.set('tab', tabName);        
    }

    const newUrl = window.location.pathname + '?' + params.toString();
    if (isHandlingPopstate) {        
        window.history.replaceState(null, '', newUrl);
    }
    else {
        window.history.pushState(null, '', newUrl);
    }
}

window.addEventListener('popstate', function(event) {
    isHandlingPopstate = true;
    const urlParams = new URLSearchParams(window.location.search);

    // 處理 tab（若無 tab 參數則切回預設 calc）
    if (urlParams.has('tab')) {
        switchTab(urlParams.get('tab'), false);
    } else {
        switchTab('calc', false);   // 預設頁籤
    }

    if (urlParams.has('item')) {
        document.getElementById('targetItemInput').value = urlParams.get('item');
        if (urlParams.has('rate')) document.getElementById('targetRate').value = urlParams.get('rate');
        if (urlParams.has('fuel')) document.getElementById('fuelSelect').value = urlParams.get('fuel');
        if (urlParams.has('fert')) document.getElementById('fertSelect').value = urlParams.get('fert');
        calculate(); 
    }
    isHandlingPopstate = false;
});

window.onload = init;