// @ts-check

// jQuery
/** @typedef {{ addClass: (classes: string) => jQuery, append: (elem: jQuery | string) => jQuery, click: (fn?: () => unknown) => jQuery, css: (style: { [x: string]: string | number } | string, val?: string | number) => jQuery, filter: (fn: (index: number, elem: HTMLElement) => boolean) => jQuery, html: (html: string) => jQuery, length: number, removeClass: (classes: string) => jQuery, text: () => string }} jQuery */
/** @typedef {(elem: HTMLElement | string) => jQuery} JQuery */

// Kittens Game
/** @typedef {'blackCore' | 'blackLibrary' | 'blackNexus' | 'blackObelisk' | 'blackRadiance' | 'blazar' | 'darkNova' | 'holyGenocide' | 'mausoleum' | 'singularity'} KittensNamedBldgCrypto */
/** @typedef {'blackPyramid' | 'unicornTomb' | 'ivoryTower' | 'ivoryCitadel' | 'skyPalace' | 'unicornUtopia' | 'sunspire'} KittensNamedBldgZU */
/** @typedef {'tenErasLink' | 'previousCycleLink' | 'nextCycleLink'} KittensNamedCombustLink */

/** @typedef {'alloy' | 'beam' | 'bloodstone' | 'blueprint' | 'compedium' | 'concrate' | 'eludium' | 'gear' | 'kerosene' | 'manuscript' | 'megalith' |'parchment' | 'plate' | 'scaffold' |  'ship' | 'slab' | 'steel' | 'tMythril' | 'tanker' | 'thorium' | 'wood'} KittensNamedResCraft */
/** @typedef {'blackcoin' | 'coal' | 'culture' | 'furs' | 'iron' | 'ivory' | 'karma' | 'kittens' |  'minerals' | 'necrocorn' | 'oil' | 'relic' | 'science' | 'starchart' | 'sorrow' | 'tears' | 'timeCrystal' | 'titanium' | 'unicorns' | 'unobtainium' | 'uranium' | 'zebras' | KittensNamedResCraft} KittensNamedRes */
/** @typedef {'bldTab' | 'diplomacyTab' | 'libraryTab' | 'religionTab' | 'spaceTab' | 'timeTab' | 'villageTab' | 'workshopTab'} KittensNamedTab */
/** @typedef {{ effects: { cathPollutionPerTickProd?: number, riftChance?: number, unicornsPerTickBase?: number, unicornsRatioReligion?: number }, label: string, name: string, on: number, unlocked: boolean, val: number }} KittensMetadata */
/** @template {{}} [E={}] @typedef {{ domNode: HTMLElement, id: string, model: { enabled: boolean, metadata?: KittensMetadata, on: number, prices: KittensPrice[] | [KittensPrice], visible: boolean }, opts?: { loadout: { pinned: boolean }, name: string } } & E} KittensBtn */
/** @typedef {{ children: KittensBtn[] }} KittensBtnPanel */
/** @typedef {{ name: 'dragons' | 'griffins' | 'leviathans' | 'lizards' |'nagas' | 'sharks' | 'spiders' | 'zebras', unlocked: boolean }} KittensDiplomacyRace */
/** @template {{}} [E={}] @typedef {{ embassyButton: KittensBtn, race: KittensDiplomacyRace, feedBtn?: KittensBtn, tradeBtn: { tradeAllHref: { link: HTMLElement } } } & E} KittensDiplomacyRacePanel */
/** @typedef {KittensDiplomacyRacePanel<{ buyBcoin: KittensBtn, sellBcoin: KittensBtn }>} KittensDiplomacyRacePanelLeviathans */
/** @typedef {{ name: KittensNamedRes, val: number }} KittensPrice */
/** @typedef {{ isHidden: boolean, maxValue: number, name: KittensNamedRes, perTickCached: number, type: 'common' | 'exotic' | 'rare', unlocked: boolean, value: number }} KittensRes */
/** @template {{}} [E={}] @typedef {{ render: () => void, tabId: string, tabName: string, visible: boolean } & E} KittensTab */
/** @typedef {{ bld: { cathPollution: number, getBuildingExt: (name: 'chronosphere' | 'unicornPasture' | 'ziggurat') => { meta: KittensMetadata} }, bldTab: KittensTab<KittensBtnPanel>, calendar: { cryptoPrice: number, cycle: number,  cycles: { festivalEffects: { unicorns: number } }[], festivalDays: number, year: number }, console: { filters: { [x in 'craft' | 'faith' | 'hunt' | 'trade']: { enabled: boolean } }, maxMessages: number }, diplomacy: { get: (name: KittensDiplomacyRace['name']) => KittensDiplomacyRace, unlockElders: () => void }, diplomacyTab: KittensTab<{ exploreBtn: KittensBtn, racePanels: KittensDiplomacyRacePanel[], leviathansInfo: unknown }>, getEffect: (name: 'heatMax' | 'riftChance' | 'unicornsGlobalRatio' | 'unicornsPerTickBase' | 'unicornsRatioReligion') => number, getTicksPerSecondUI: () => number, libraryTab: KittensTab, msg: (text?: string) => { span: HTMLElement }, opts: { noConfirm: boolean }, prestige: { getParagonProductionRatio: () => number, getPerk: (name: 'numeromancy' | 'unicornmancy') => { researched: boolean } }, religion: { _getTranscendNextPrice: () => number, faithRatio: number, getSolarRevolutionRatio: () => number, getZU: (name: KittensNamedBldgZU) => KittensMetadata, praise: () => void, resetFaith: (n: number, b: boolean) => void }, religionTab: KittensTab<{ ctPanel: { children: [KittensBtnPanel] }, praiseBtn: KittensBtn, rUpgradeButtons: KittensBtn[], sacrificeBtn: { model: { allLink: { handler: (...args: unknown[]) => void } } }, zgUpgradeButtons: KittensBtn[] }>, resPool: { get: (name: KittensNamedRes) => KittensRes, resources: KittensRes[] }, time: { heat: number }, timeTab: KittensTab<{ cfPanel: { children: [{ children: KittensBtn<{ model: { [x in KittensNamedCombustLink]: { handler: (...args: unknown[]) => unknown } } }>[] }] }, vsPanel: { children: [KittensBtnPanel] } }>, spaceTab: KittensTab<{ GCPanel: KittensBtnPanel, planetPanels: KittensBtnPanel[] }>, ui: { activeTabId: string }, village: { huntAll: () => void }, villageTab: KittensTab<{ buttons: KittensBtn[], promoteKittensBtn: KittensBtn }>, workshop: {  craft: (name: KittensNamedResCraft, count: number) => void, craftAll: (name: KittensNamedResCraft) => void, getCraft: (name: KittensNamedResCraft) => { prices: KittensPrice[] }, getCraftAllCount: (name: KittensNamedResCraft) => number }, workshopTab: KittensTab<{ buttons: KittensBtn[] }> }} KittensGame */

// Kitty Cheat
/** @template {{}} [E={}] @typedef {{ active?: boolean, btn: jQuery, delay?: number, end?: boolean, excl?: string[], fn?: (group: string, name: string, opts: CheatOpt) => void, group?: 'actions' | 'crafting' | 'trading', noFill?: boolean, noMinCraft?: boolean, noShow?: boolean } & E} CheatOpt */
/** @template {{ [x: string]: CheatOpt }} T @template {{}} [E={}] @typedef {{ active?: boolean, all: T, div?: jQuery, noExec?: boolean } & E} CheatMapEntry */
/** @typedef {{ actions: CheatMapEntry<{ [x: string]: Omit<CheatOpt<{ fn: (group: string, name: string, opts: CheatOpt) => void }>, 'btn' | 'group'> }>, control: CheatMapEntry<{ [x in 'build' | 'upgrade' | 'craft' | 'trade' | 'exec' | 'zig' | 'crypto' | 'pollute' | 'uncap' | 'resources' | 'x10']: Omit<CheatOpt, 'btn' | 'delay' | 'fn' | 'noFill'> }, { noExec: true }>, crafting: CheatMapEntry<{ [x in KittensNamedResCraft]?: Omit<CheatOpt, 'btn' | 'delay' | 'fn' | 'excl' | 'group'> }>, tabs: CheatMapEntry<{ [x: string]: Omit<CheatOpt<{ tab: KittensNamedTab }>, 'btn' | 'delay' | 'fn' | 'excl' | 'group' | 'end' | 'noFill'> }, { noExec: true }>, trading: CheatMapEntry<{ [x in KittensDiplomacyRace['name']]: Omit<CheatOpt, 'btn' | 'delay' | 'fn' | 'excl' | 'group' | 'end'> }> }} CheatMap */
/** @typedef {{ [x in 'build' | 'crypto' | 'upgrade' | 'zig']?: string[] }} CheatStats */

// Window
/** @typedef {Window & typeof globalThis & { $: JQuery, game: KittensGame }} WindowExt */

((/** @type {JQuery} */ $, /** @type {KittensGame} */ game) => {
  /** @type {Readonly<{CRAFT: Readonly<{ MAX: number, MIN: number }>, RES: Readonly<{ NAME: Readonly<{ [x in KittensNamedRes]?: number }>, TYPE: Readonly<{ [x in KittensRes['type']]: number }> }>, UNCAPPED: number }>} */
  const FRACTION = {
    CRAFT: {
      MAX: 0.925, // 92.5% spent on crafting
      MIN: 0.0005 // 0.05% for all materials
    },
    RES: {
      NAME: { karma: 0.5, tears: 1 },
      TYPE: { exotic: 0.01, common: 0, rare: 0 } // exhaustive
    },
    UNCAPPED: 0.1, // 10% spent on uncapped
  };

  /** @type {Readonly<{ BCOIN: Readonly<{ [x in 'BUY' | 'SELL']: number }>, BUILD: Readonly<{ [x in KittensNamedBldgCrypto]?: number }> }>} */
  const MAXVAL = {
    BCOIN: { BUY: 899, SELL: 1089 }, // sell bcoin when it hits this amount (1100 is a crash)
    BUILD: { holyGenocide: 25 } // build at most 25 HGs - this is optimal for paragon
  };

  /** @readonly */
  const INTERVAL = {
    ALL: { OPT: 99, BLD: 999, TXT: 999 },
    ADORE: 120000,
    BCOIN: 60000,
    CATNIP: { GATHER: 5, REFINE: 1000 },
    COMBUST: 1000,
    EXPLORE: 5000,
    FEED: 60000,
    PRAISE: 25,
    PROMOTE: 90000,
    SACRIFICE: 10000
  };

  /** @type {Readonly<CheatMap>} */
  const cheatMap = {
    control: {
      all: {
        build: {},
        upgrade: { end: true },
        craft: { group: 'crafting' },
        trade: { group: 'trading' },
        exec: { group: 'actions', end: true },
        zig: {},
        crypto: { end: true },
        pollute: {},
        uncap: { active: true, end: true },
        resources: { excl: ['x10'] },
        x10: { excl: ['resources'], end: true }
      },
      noExec: true
    },
    crafting: {
      all: {
        wood: { noShow: true },
        beam: { active: true },
        slab: { active: true },
        steel: { active: true },
        plate: { active: true },
        gear: {},
        concrate: {},
        alloy: {},
        parchment: { active: true },
        manuscript: {},
        compedium: {},
        blueprint: {},
        kerosene: { active: true },
        thorium: { active: true },
        megalith: {},
        scaffold: { active: true },
        eludium: {},
        ship: { noMinCraft: true },
        tanker: { noMinCraft: true },
        bloodstone: { noMinCraft: true },
        tMythril: { noMinCraft: true}
      }
    },
    trading: {
      all: {
        leviathans: { active: true },
        dragons: { active: true },
        zebras: { active: true },
        nagas: {},
        spiders: {},
        griffins: { active: true },
        lizards: { active: true },
        sharks: { active: true }
      }
    },
    actions: {
      all: {
        catnip: {
          fn: fnGather,
          active: true,
          delay: INTERVAL.CATNIP.GATHER,
          noFill: true
        },
        refine: {
          fn: fnRefine,
          active: true,
          delay: INTERVAL.CATNIP.REFINE,
          end: true,
          noFill: true
        },
        praise: {
          fn: fnPraise,
          active: true,
          delay: INTERVAL.PRAISE
        },
        adore: {
          fn: fnAdore,
          active: true,
          delay: INTERVAL.ADORE,
          end: true
        },
        observe: {
          fn: fnObserve,
          active: true,
          noFill: true
        },
        hunt: {
          fn: fnHunt,
          active: true
        },
        promote: {
          fn: fnPromote,
          active: true,
          delay: INTERVAL.PROMOTE,
          noFill: true
        },
        loadout: {
          fn: fnLoadout,
          active: true,
          delay: INTERVAL.PROMOTE,
          end: true,
          noFill: true
        },
        feed: {
          fn: fnFeed,
          delay: INTERVAL.FEED,
          noFill: true
        },
        bcoin: {
          fn: fnTradeBcoin,
          active: true,
          delay: INTERVAL.BCOIN,
          end: true
        },
        combust: {
          fn: fnCombust,
          delay: INTERVAL.COMBUST,
          excl: ['40k'],
          noFill: true
        },
        '40k': {
          fn: fnCombust40k,
          delay: INTERVAL.COMBUST,
          excl: ['combust'],
          end: true,
          noFill: true
        }
      }
    },
    tabs: {
      all: {
        bonfire: { active: true, tab: 'bldTab' },
        village: { active: true, tab: 'villageTab' },
        science: { active: true, tab: 'libraryTab' },
        workshop: { active: true, tab: 'workshopTab' },
        trade: { active: true, tab: 'diplomacyTab' },
        religion: { active: true, tab: 'religionTab' },
        space: { active: true, tab: 'spaceTab' },
        time: { active: true, tab: 'timeTab' }
      },
      noExec: true
    }
  };

  /** @type {Readonly<{ [x in KittensNamedCombustLink]: number }>} */
  const combustCycles = {
    tenErasLink: 500,
    previousCycleLink: 45,
    nextCycleLink: 5
  };

  let lastExploreTime = 0;

  /** @returns {void} */
  function noop () {}

  /** @returns {jQuery} */
  function jqAppend (/** @type {jQuery} */ parent, /** @type {jQuery} */ child) {
     parent.append(child);

     return child;
  }

  /** @returns {void} */
  function activateBtn (/** @type {CheatOpt} */ opts, /** @type {boolean=} */ active = false) {
    opts.active = active;
    opts.btn[active ? 'addClass' : 'removeClass']('kittycheat-btn-active');
  }

  /** @returns {void} */
  function activateGroup (/** @type {keyof CheatMap} */ group, /** @type {boolean=} */ active = false) {
    const opt = cheatMap[group];

    opt.active = active;
    opt.div?.[active ? 'removeClass' : 'addClass']('kittycheat-div-disabled');
  }

  /** @returns {{ frac: number, raw: number, text: string } | null} */
  function toPercent (/** @type {number} */ frac) {
    if (frac < 0 || frac > Number.MAX_SAFE_INTEGER) {
      return null;
    }

    const raw = 100 * frac;

    return {
      frac,
      text: `${raw >= 100 ? '>> 100' : raw.toFixed(3)}%`,
      raw
    };
  }

  /** @returns {string?=} */
  function getBtnName (/** @type {(KittensBtn)?=} */ btn, /** @type {string?=} */ extra = null) {
    const name = btn?.model.metadata?.label || btn?.opts?.name;

    return name && extra ? `${name} ${extra}` : name;
  }

  /** @returns {boolean} */
  function clickDom (/** @type {KittensBtn?=} */ btn, /** @type {boolean=} */ isAll = false) {
    return btn?.domNode.dispatchEvent(new MouseEvent('click', isAll ? { shiftKey: true } : {})) || false;
  }

  /** @returns {boolean} */
  function clickSpan (/** @type {string} */ label) {
    return $('span').filter((_, e) => $(e).text().indexOf(label) === 0).click().length !== 0;
  }

  /** @template {KittensTab} T @returns {T | null | undefined} */
  function renderBgTab (/** @type {T?=} */ tab) {
    if (!tab?.visible) {
      return null;
    } else if (game.ui.activeTabId !== tab.tabId) {
      tab.render();
    }

    return tab;
  }

  /** @return {boolean} */
  function isPricesUncapped (/** @type {KittensPrice[]} */ prices, /** @type {KittensNamedRes?} */ skip = null) {
    for (const p of prices) {
      if (p.name !== skip) {
        const r = game.resPool.get(p.name);

        if (r.maxValue || r.perTickCached) {
          return false;
        }
      }
    }

    return true;
  }

  /** @returns {{ isUncapped: boolean, isInvalid: boolean }} */
  function checkPrices (/** @type {KittensPrice[]} */ prices, /** @type {KittensNamedRes?} */ skip = null) {
    const isUncapped = isPricesUncapped(prices, skip);

    for (const p of prices) {
      if (p.name !== skip) {
        const r = game.resPool.get(p.name);
        const f = FRACTION.RES.NAME[r.name] || FRACTION.RES.TYPE[r.type] || (isUncapped && FRACTION.UNCAPPED) || 1;

        if ((p.val / r.value) > f) {
          return { isUncapped, isInvalid: true };
        }
      }
    }

    return { isUncapped, isInvalid: false };
  }

  /** @returns {void} */
  function fillResources () {
    if (cheatMap.control.all.resources.active || cheatMap.control.all.x10.active) {
      for (const r of game.resPool.resources) {
        if (r.maxValue && r.unlocked && !r.isHidden && r.name !== 'kittens' && r.name !== 'zebras') {
          const max = r.maxValue * (cheatMap.control.all.x10.active ? 10 : 1);

          if (r.value < max) {
            r.value = max;
          }
        }
      }
    }
  }

  /** @returns {KittensDiplomacyRacePanelLeviathans=} */
  function findLeviathans () {
    return /** @type {KittensDiplomacyRacePanelLeviathans} */ (game.diplomacyTab.racePanels.find((p) => p.race.name === 'leviathans'));
  }

  /** @returns {number} */
  function calcZigguratsPrices (/** @type {KittensPrice[]} */ prices, /** @type {number} */ zigguratRatio) {
    let total = 0;

    for (const p of prices) {
      if (p.name === 'unicorns') {
        total += p.val;
      } else if (p.name === 'tears') {
        total += (p.val * 2500) / zigguratRatio;
      }
    }

    return total;
  }

  // Adapted from Kitten Scientists
  // https://github.com/kitten-science/kitten-scientists/blob/804104d4ddc8b64e74f1ad5b448e0ca334fa6479/source/ReligionManager.ts#L246-L395
  /** @returns {{ bestBuilding?: KittensNamedBldgZU | null, btn?: KittensBtn | null, ratio: number, text?: string | null }} */
  function calcZiggurats () {
    const /** @type {KittensNamedBldgZU[]} */ validBuildings = ['unicornTomb', 'ivoryTower', 'ivoryCitadel', 'skyPalace', 'unicornUtopia', 'sunspire'];
    const pastureImpl = game.bld.getBuildingExt('unicornPasture');
    const zigImpl = game.bld.getBuildingExt('ziggurat');
    const unicornsPerTickBase = pastureImpl?.meta.effects?.unicornsPerTickBase;

    if (!pastureImpl?.meta.unlocked || !pastureImpl.meta.on || !unicornsPerTickBase) {
      return { text: 'No pasture built', ratio: 0 };
    } else if (!zigImpl?.meta.unlocked || !zigImpl.meta.on) {
      return { text: 'No ziggurat built', ratio: 0 };
    }

    const unicornsPerSecondBase = game.getEffect('unicornsPerTickBase') * game.getTicksPerSecondUI();
    const globalRatio = game.getEffect('unicornsGlobalRatio') + 1;
    const religionRatio = game.getEffect('unicornsRatioReligion') + 1;
    const paragonRatio = game.prestige.getParagonProductionRatio() + 1;
    const faithBonus = game.religion.getSolarRevolutionRatio() + 1;
    const currentCycle = game.calendar.cycles[game.calendar.cycle];

    const cycleBonus = (currentCycle?.festivalEffects.unicorns !== undefined && game.prestige.getPerk('numeromancy').researched && game.calendar.festivalDays) ? currentCycle.festivalEffects.unicorns : 1;

    const unicornsPerSecond = unicornsPerSecondBase * globalRatio * religionRatio * paragonRatio * faithBonus * cycleBonus;
    const zigguratRatio = zigImpl.meta.on;
    const baseUnicornsPerRift = 500 * (1 + game.getEffect('unicornsRatioReligion') * 0.1);
    const riftChanceRatio = game.prestige.getPerk('unicornmancy').researched ? 1.1 : 1;
    const unicornRiftChange = ((game.getEffect('riftChance') * riftChanceRatio) / (10000 * 2)) * baseUnicornsPerRift;

    let /** @type {KittensBtn?} */ bestBtn = null;
    let /** @type {KittensNamedBldgZU?} */ bestBuilding = null;
    let bestPrice = Number.POSITIVE_INFINITY;
    let bestAmortization = Number.POSITIVE_INFINITY;

    for (let i = 0; i < validBuildings.length; i++) {
      const building = validBuildings[i];
      const buildingImpl = game.religionTab.zgUpgradeButtons[i];

      if (building && buildingImpl?.model.metadata?.unlocked) {
        const unicornPrice = calcZigguratsPrices(buildingImpl.model.prices, zigguratRatio);
        const buildingInfo = game.religion.getZU(building);
        const religionBonus = religionRatio + (buildingInfo.effects?.unicornsRatioReligion || 0);
        const riftChance = game.getEffect('riftChance') + (buildingInfo.effects?.riftChance || 0);
        const unicornsPerRift = 500 * ((religionBonus - 1) * 0.1 + 1);
        const riftBonus = (((riftChance * riftChanceRatio) / (10000 * 2)) * unicornsPerRift) - unicornRiftChange;
        const buildingProduction = (unicornsPerSecondBase * globalRatio * religionBonus * paragonRatio * faithBonus * cycleBonus) - unicornsPerSecond + riftBonus;
        const amortization = unicornPrice / buildingProduction;

        if ((amortization < bestAmortization) && (0 < riftBonus || (religionRatio < religionBonus && 0 < unicornPrice))) {
          bestAmortization = amortization;
          bestBuilding = building;
          bestBtn = buildingImpl;
          bestPrice = unicornPrice;
        }
      }
    }

    return { bestBuilding, btn: bestBtn, ratio: zigguratRatio, text: getBtnName(bestBtn, toPercent((((game.resPool.get('tears').value * 2500) / zigguratRatio) + game.resPool.get('unicorns').value) / bestPrice)?.text) };
  }

  /** @returns {{ action: 'buy' | 'hold' | 'sell', price: number, text: string }} */
  function calcBcoin () {
    const price = game.calendar.cryptoPrice;
    const action =
      price >= MAXVAL.BCOIN.SELL
        ? 'sell'
        : price <= MAXVAL.BCOIN.BUY
          ? 'buy'
          : 'hold';

    return {
      action,
      price,
      text: `${action} @ ${price.toFixed(3)}R`
    };
  }

  /** @returns {ReturnType<toPercent>} */
  function calcTranscend () {
    return toPercent(game.religion.faithRatio / game.religion._getTranscendNextPrice());
  }

  /** @returns {{ btn: KittensBtn, percent: ReturnType<toPercent>, text?: string | null }[]} */
  function calcTheology () {
    return game.religionTab.ctPanel.children[0].children
      .filter((a) => {
        if (a.model.prices[0].name !== 'relic' || (a.model.on >= (MAXVAL.BUILD[/** @type {KittensNamedBldgCrypto} */ (a.id)] || Number.MAX_SAFE_INTEGER))) {
          return false;
        }

        return !checkPrices(a.model.prices, 'relic').isInvalid;
      })
      .sort((a, b) => a.model.prices[0].val - b.model.prices[0].val)
      .map((btn) => {
        const percent = toPercent(game.resPool.get('relic').value / (btn.model.prices[0].val * (1 / FRACTION.RES.TYPE.exotic)));

        return {
          btn,
          percent,
          text: getBtnName(btn, percent?.text)
        };
      });
  }

  /** @returns {void} */
  function fnAdore () {
    game.religion.resetFaith(1.01, false);
    clickDom(renderBgTab(game.religionTab)?.praiseBtn);
  }

  /** @returns {void} */
  function fnPromote () {
    clickDom(renderBgTab(game.villageTab)?.promoteKittensBtn);
  }

  /** @returns {void} */
  function fnLoadout () {
    clickDom(renderBgTab(game.villageTab)?.buttons.find((b) => b?.opts?.loadout?.pinned));
  }

  /** @returns {void} */
  function fnGather () {
    clickSpan('Gather catnip');
  }

  /** @returns {void} */
  function fnRefine () {
    clickSpan('Refine catnip');
  }

  /** @returns {void} */
  function fnPraise () {
    game.religion.praise();
  }

  /** @returns {void} */
  function fnObserve () {
    $('input#observeBtn').click();
  }

  /** @returns {void} */
  function fnHunt () {
    game.village.huntAll();
  }

  /** @returns {void} */
  function fnCombust () {
    const avail = (game.getEffect('heatMax') - game.time.heat) / 10;

    for (const _c in combustCycles) {
      const c = /** @type {KittensNamedCombustLink} */ (_c);

      if ((avail / combustCycles[c]) > 1) {
        renderBgTab(game.timeTab)?.cfPanel.children[0].children[0]?.model[c].handler.call(noop);

        return;
      }
    }
  }

  /** @returns {void} */
  function fnCombust40k (/** @type {string} */ _group, /** @type {string} */ _name, /** @type {CheatOpt} */ opts) {
    if (game.calendar.year < 40000) {
      fnCombust();
    } else {
      activateBtn(opts, false);
    }
  }

  /** @returns {void} */
  function fnFeed () {
    if (game.resPool.get('necrocorn').value > 1 && renderBgTab(game.diplomacyTab)) {
      clickDom(findLeviathans()?.feedBtn);
    }
  }

  /** @returns {void} */
  function fnTradeBcoin () {
    const info = calcBcoin();

    if (info.price && info.action !== 'hold') {
      const bcoin = game.resPool.get('blackcoin').value;

      if (((info.action === 'sell' && bcoin > 0) || (info.action === 'buy' && bcoin === 0)) && renderBgTab(game.diplomacyTab)) {
        clickDom(findLeviathans()?.[`${info.action}Bcoin`]);
      }
    }
  }

  /** @returns {void} */
  function execTrade (/** @type {KittensDiplomacyRace['name']} */ name) {
    if ((name === 'leviathans') && !game.diplomacy.get('leviathans').unlocked && game.religion.getZU('blackPyramid').val) {
      game.diplomacy.unlockElders();
    }

    renderBgTab(game.diplomacyTab)?.racePanels.find((p) => p.race.name === name)?.tradeBtn.tradeAllHref.link.click();
  }

  /** @returns {void} */
  function execCraft (/** @type {KittensNamedResCraft} */ name, /** @type {boolean=} */ isMax = true) {
    const r = game.resPool.get(name);

    if (r.unlocked && r.value && !r.isHidden) {
      const val = Math.ceil(game.workshop.getCraftAllCount(name) * (isMax ? FRACTION.CRAFT.MAX : FRACTION.CRAFT.MIN));

      if (val > 1 && val < Number.MAX_VALUE) {
        game.workshop.craft(name, val);
      }
    }
  }

  /** @returns {void} */
  function execOpt (/** @type {keyof CheatMap} */ group, /** @type {string} */ name, /** @type {CheatOpt} */ opts) {
    try {
      if (opts.active && cheatMap[group].active && !cheatMap[group].noExec) {
        !opts.noFill && fillResources();

        if (group === 'actions') {
          /** @type {Required<CheatOpt>} */ (opts).fn(group, name, opts);
        } else if (group === 'crafting') {
          execCraft(/** @type {KittensNamedResCraft} */ (name));
        } else if (group === 'trading') {
          execTrade(/** @type {KittensDiplomacyRace['name']} */ (name));
        }

        !opts.noFill && fillResources();
      }
    } catch (e) {
      console.error('execOpt', group, name, e);
    }
  }

  /** @returns {void} */
  function execOptTimer (/** @type {keyof CheatMap} */ group, /** @type {string} */ name, /** @type {CheatOpt} */ opts) {
    execOpt(group, name, opts);

    setTimeout(() => execOptTimer(group, name, opts), opts.delay);
  }

  /** @returns {void} */
  function pushBtnName (/** @type {string[]} */ arr, /** @type {KittensBtn=} */ btn, /** @type {string?=} */ extra = null) {
    const n = getBtnName(btn, extra);

    n && arr.push(n);
  }

  /** @returns {{ btn?: KittensBtn, isBuildable: boolean, tears?: KittensPrice }} */
  function getZigInfo (/** @type {string} */ id, /** @type {KittensBtn?} */ inBtn = null) {
    const btn = inBtn || game.religionTab.zgUpgradeButtons.find((b) => b.id === id);

    return {
      btn,
      isBuildable: !!btn?.model.visible && !checkPrices(btn.model.prices).isInvalid,
      tears: btn?.model.prices.find((p) => p.name === 'tears')
    };
  }

  /** @returns {boolean} */
  function buildZig (/** @type {boolean} */ dryRun, /** @type {string[]} */ completed) {
    if (dryRun || !renderBgTab(game.religionTab)) {
      return false;
    }

    const blck = getZigInfo('blackPyramid');
    let hasSome = false;

    if (blck.isBuildable) {
      if (!clickDom(blck.btn, true)) {
        return false;
      }

      pushBtnName(completed, blck.btn);
      hasSome = true;
    }

    let zig = calcZiggurats();
    let count = 0;

    while (zig.bestBuilding && count < 7) {
      const mark = getZigInfo('marker');
      const best = getZigInfo(zig.bestBuilding, zig.btn);
      const next = (best.isBuildable && mark.tears) && (mark.isBuildable && best.tears)
        ? mark.tears.val <= best.tears.val
          ? mark
          : best
        : mark.isBuildable
          ? mark
          : best.isBuildable
            ? best
            : null;

      if (!next?.btn) {
        const nowTears = game.resPool.get('tears').value;
        const finTears = nowTears + (zig.ratio * game.resPool.get('unicorns').value / 2500);

        if (best.tears?.val && (nowTears < best.tears.val) && (finTears > best.tears.val)) {
          game.religionTab.sacrificeBtn.model.allLink.handler.call(noop, noop, noop);
          hasSome = true;
        }

        break;
      } else if (!clickDom(next.btn)) {
        break;
      }

      pushBtnName(completed, next.btn);
      zig = calcZiggurats();
      count = completed.length;
      hasSome = true;
    }

    return hasSome;
  }

  /** @returns {boolean} */
  function buildTheologyBtn (/** @type {ReturnType<calcTheology>[0]} */ best) {
    if (!best.btn.model.visible || !best.btn.model.enabled || !best.percent || best.percent.frac < 1 || checkPrices(best.btn.model.prices).isInvalid) {
      return false;
    }

    return clickDom(best.btn);
  }

  /** @returns {boolean}  */
  function buildTheology (/** @type {boolean} */ dryRun, /** @type {string[]} */ completed) {
    if (dryRun || !renderBgTab(game.religionTab)) {
      return false;
    }

    const avail = calcTheology();
    let hasSome = false;

    for (const best of avail) {
      if (!buildTheologyBtn(best)) {
        break;
      }

      pushBtnName(completed, best.btn);
      hasSome = true;
    }

    return hasSome;
  }

  /** @returns {boolean} */
  function unlockTabBtn (/** @type {boolean} */ dryRun, /** @type {KittensBtn} */ btn, /** @type {boolean=} */ isAll = false) {
    if (!btn?.model.enabled || !btn.model.visible || (btn.id === 'cryochambers' && btn.model.on >= game.bld.getBuildingExt('chronosphere').meta.on)) {
      return false;
    }

    !dryRun && fillResources();

    if (checkPrices(btn.model.prices).isInvalid) {
      return false;
    }

    return dryRun ? true : clickDom(btn, isAll);
  }

  /** @returns {boolean} */
  function unlockTab (/** @type {boolean} */ dryRun, /** @type {string[]} */ completed, /** @type {KittensTab} */ tab) {
    if (!renderBgTab(tab)) {
      return false;
    }

    const buttons =
      /** @type {KittensGame['religionTab']} */ (tab).rUpgradeButtons ||
      /** @type {KittensGame['spaceTab']} */ (tab).GCPanel?.children ||
      /** @type {KittensGame['diplomacyTab']} */ (tab).racePanels?.map((r) => r.embassyButton) ||
      /** @type {KittensGame['timeTab']} */ (tab).vsPanel?.children[0].children ||
      /** @type {KittensGame['workshopTab']} */ (tab).buttons;
    let hasSome = false;

    // multi for religion & embassy upgrades
    const isAll = !!((
      /** @type {KittensGame['religionTab']} */ (tab).rUpgradeButtons ||
      /** @type {KittensGame['diplomacyTab']} */ (tab).racePanels
    )?.length);

    for (const btn of buttons) {
      if (unlockTabBtn(dryRun, btn, isAll)) {
        if (dryRun) {
          return true;
        }

        pushBtnName(completed, btn, /** @type {{ race?: { title: string } }} */ (btn).race?.title);
        hasSome = true;
      }
    }

    const d = /** @type {KittensGame['diplomacyTab']} */ (tab);

    if (d.exploreBtn && d.racePanels.length !== 8) {
      if (d.racePanels.length !== (8 - (findLeviathans()?.race.unlocked ? 0 : 1))) {
        const nowTime = Date.now();
        const nowDelta = nowTime - lastExploreTime;

        if (nowDelta > INTERVAL.EXPLORE) {
          lastExploreTime = nowTime;
          hasSome ||= (dryRun ? true : clickDom(d.exploreBtn));
        }
      }
    }

    return hasSome;
  }

  /** @returns {boolean} */
  function buildTabBtn (/** @type {boolean} */ dryRun, /** @type {KittensBtn} */ btn) {
    const model = btn?.model;

    if (!model?.visible || !model.enabled || !model.metadata || (model.metadata.on !== model.metadata.val) || (!cheatMap.control.all.pollute.active && model.metadata.effects?.cathPollutionPerTickProd)) {
      return false;
    }

    !dryRun && fillResources();

    const check = checkPrices(btn.model.prices);

    if (check.isInvalid || (check.isUncapped && !cheatMap.control.all.uncap.active)) {
      return false;
    }

    return dryRun ? true : clickDom(btn, !check.isUncapped && model.metadata.on >= 1);
  }

  /** @returns {boolean} */
  function buildTab (/** @type {boolean} */ dryRun, /** @type {string[]} */ completed, /** @type {KittensTab} */ tab) {
    if (!renderBgTab(tab)) {
      return false;
    }

    const areas =
      /** @type {KittensGame['spaceTab']} */ (tab).planetPanels ||
      [/** @type {KittensGame['bldTab']} */ (tab)];
    let hasSome = false;

    for (const area of areas) {
      for (const btn of area.children) {
        if (buildTabBtn(dryRun, btn)) {
          if (dryRun) {
            return true;
          }

          pushBtnName(completed, btn);
          hasSome = true;
        }
      }
    }

    return hasSome;
  }

  /** @returns {CheatStats} */
  function execBuildAll (/** @type {number} */ delay, /** @type {boolean=} */ dryRun = false) {
    const /** @type {string[]} */ completed = [];
    const /** @type {CheatStats} */ stats = {};
    const /** @type {KittensNamedTab[]} */ allowedTabs = [];

    if (!dryRun && cheatMap.control.all.craft.active) {
      fillResources();

      for (const _name in cheatMap.crafting.all) {
        const name = /** @type {KittensNamedResCraft} */ (_name);

        if (!cheatMap.crafting.all[name]?.noMinCraft) {
          execCraft(name, false);
        }
      }
    }

    for (const t in cheatMap.tabs.all) {
      cheatMap.tabs.all[t]?.active && allowedTabs.push(cheatMap.tabs.all[t].tab);
    }

    const loopTabs = (/** @type {keyof CheatStats} */ type, /** @type {KittensNamedTab[]} */ tabs, /** @type {(dryRun: boolean, completed: string[], tab: KittensTab) => boolean} */ fn) => {
      for (const tab of tabs) {
        if (dryRun || (cheatMap.control.all[type].active && allowedTabs.includes(tab))) {
          try {
            !dryRun && fillResources();

            if (fn(dryRun, completed, game[tab])) {
              stats[type] = (stats[type] || []).concat(game[tab].tabId);
            }
          } catch (e) {
            console.error('loopTabs', type, tab, e);
          }
        }
      }
    };

    loopTabs('upgrade', ['libraryTab', 'spaceTab', 'timeTab', 'workshopTab'], unlockTab);
    loopTabs('build', ['bldTab', 'spaceTab'], buildTab);
    loopTabs('upgrade', ['diplomacyTab', 'religionTab'], unlockTab);

    if (!dryRun) {
      loopTabs('zig', ['religionTab'], buildZig);
      loopTabs('crypto', ['religionTab'], buildTheology);

      if (delay > 0) {
        completed.length && $(game.msg(completed.join(', ')).span).addClass('kittycheat-log');
        setTimeout(() => execBuildAll(delay), Math.ceil(delay / (completed.length ? 2 : 1)));
      }
    }

    return stats;
  }

  /** @returns {void} */
  function execTextInfo (/** @type {number} */ delay) {
    renderBgTab(game.religionTab);

    const bld = execBuildAll(0, true);

    $('div#kittycheat-txt-drybld').html(`Buildings: ${bld.build?.join(', ') || '-'}`);
    $('div#kittycheat-txt-dryupg').html(`Upgrades : ${bld.upgrade?.join(', ') || '-'}`);
    $('div#kittycheat-txt-relzig').html(`Ziggurat : ${calcZiggurats().text || '-'}`);
    $('div#kittycheat-txt-relcry').html(`Theology : ${calcTheology()[0]?.text || '-'}`);
    $('div#kittycheat-txt-rellvl').html(`Transcend: ${calcTranscend()?.text || '-'}`);
    $('div#kittycheat-txt-bcoins').html(`Blackcoin: ${calcBcoin()?.text || '-'}`);

    setTimeout(() => execTextInfo(delay), delay);
  }

  /** @returns {void} */
  function execOpts (/** @type {number} */ delay) {
    for (const _group in cheatMap) {
      const group = /** @type {keyof CheatMap} */ (_group);
      const { active, all, noExec } = cheatMap[group];

      if (active && !noExec) {
        for (const name in all) {
          const opts = /** @type {CheatOpt} */ (all[/** @type {keyof typeof all} */ (name)]);

          if (!opts.delay) {
            execOpt(group, name, opts);
          }
        }
      }
    }

    setTimeout(() => execOpts(delay), delay);
  }

  /** @returns {void} */
  function clickOptBtn (/** @type {keyof CheatMap} */ group, /** @type {string} */ name, /** @type {CheatOpt} */ opts) {
    activateBtn(opts, !opts.active);

    if (cheatMap[group].active) {
      if (opts.group) {
        activateGroup(opts.group, opts.active);
      } else if (opts.active) {
        if (opts.excl) {
          for (const e of opts.excl) {
            activateBtn(/** @type {CheatOpt} */ (cheatMap[group].all[/** @type {keyof CheatMap[group]['all']} */ (e)]), false);
          }
        }

        execOpt(group, name, opts);
      }
    }
  }

  $('head').append('<style type="text/css">#kittycheat { font-family: monospace; font-size: small; padding-bottom: 30px; } .kittycheat-btn { background: white; border-radius: 2px; border-width: 1px; font-family: monospace; font-size: small; padding-inline: 4px; margin-bottom: 2px; } .kittycheat-btn-active { background: red; color: white; } .kittycheat-btn-default { margin-right: 2px; } .kittycheat-btn-end { margin-right: 5px; } .kittycheat-btn-excl { margin-right: -2px; } .kittycheat-div { margin-bottom: 20px; } .kittycheat-div-small { margin-bottom: 5px; } .kittycheat-div-disabled { opacity: 0.33; } .kittycheat-log { opacity: 0.33; }</style>');

  const divAll = jqAppend($('div#leftColumn'), $('<div id="kittycheat"></div>'));
  const divAct = jqAppend(divAll, $('<div id="kittycheat-act" class="kittycheat-div"></div>'));
  const divTxt = jqAppend(divAll, $('<div id="kittycheat-txt" class="kittycheat-div"></div>'));

  for (const _group in cheatMap) {
    const group = /** @type {keyof CheatMap} */ (_group);
    const divGrp = cheatMap[group].div = jqAppend(divAct, $(`<div id="kittycheat-act-${group}" class="kittycheat-div"></div>`));

    if (group !== 'control') {
      jqAppend(divGrp, $(`<div class="kittycheat-div kittycheat-div-small">${group}:</div>`));
    }

    activateGroup(group, cheatMap[group].active || cheatMap[group].noExec);

    for (const name in cheatMap[group].all) {
      const opts = /** @type {CheatOpt} */ (cheatMap[group].all[/** @type {keyof CheatMap[group]['all']} */ (name)]);

      if (!opts.noShow) {
        opts.btn = jqAppend(divGrp, $(`<button class="kittycheat-btn kittycheat-btn-${opts.end ? 'end' : opts.excl ? 'excl' : 'default'}">${name}</button>`).click(() => {
          clickOptBtn(group, name, opts);
        }));

        activateBtn(opts, opts.active);

        if (opts.delay) {
          execOptTimer(group, name, opts);
        }
      }
    }
  }

  for (const id of ['drybld', 'dryupg', 'relzig', 'relcry', 'rellvl', 'bcoins']) {
    jqAppend(divTxt, $(`<div id="kittycheat-txt-${id}" class="kittycheat-div kittycheat-div-small"></div>`));
  }

  game.console.maxMessages = 100;
  game.opts.noConfirm = true;

  for (const f of ['craft', 'faith', 'hunt', 'trade']) {
    game.console.filters[/** @type {keyof KittensGame['console']['filters']} */ (f)].enabled = false;
  }

  execOpts(INTERVAL.ALL.OPT);
  execTextInfo(INTERVAL.ALL.TXT);
  execBuildAll(INTERVAL.ALL.BLD);
})(/** @type {WindowExt} */ (window).$, /** @type {WindowExt} */ (window).game);
