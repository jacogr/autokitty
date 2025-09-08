// @ts-check

// jQuery
/** @typedef {{ append: (elem: jQuery) => jQuery, click: (fn?: () => unknown) => jQuery, css: (style: { [x: string]: string | number } | string, val?: string | number) => jQuery, filter: (fn: (index: number, elem: HTMLElement) => boolean) => jQuery, html: (html: string) => jQuery, length: number, text: () => string }} jQuery */
/** @typedef {(elem: HTMLElement | string) => jQuery} JQuery */

// Kittens Game
/** @typedef {'craft' | 'faith' | 'hunt' | 'trade'} KittensNamedConsFilt */
/** @typedef {'chronosphere' | 'unicornPasture' | 'ziggurat'} KittensNamedBldgBld */
/** @typedef {'blackCore' | 'blackLibrary' | 'blackNexus' | 'blackObelisk' | 'blackRadiance' | 'blazar' | 'darkNova' | 'holyGenocide' | 'mausoleum' | 'singularity'} KittensNamedBldgCrypto */
/** @typedef {'satellite'} KittensNamedBldgSpace */
/** @typedef {'blackPyramid' | 'unicornTomb' | 'ivoryTower' | 'ivoryCitadel' | 'skyPalace' | 'unicornUtopia' | 'sunspire'} KittensNamedBldgZU */
/** @typedef {'heatMax' | 'riftChance' | 'unicornsGlobalRatio' | 'unicornsPerTickBase' | 'unicornsRatioReligion'} KittensNamedEffect */
/** @typedef {KittensNamedBldgBld | KittensNamedBldgCrypto | KittensNamedBldgSpace | KittensNamedBldgZU} KittensNamedBldg */
/** @typedef {'numeromancy' | 'unicornmancy'} KittensNamedPerk */
/** @typedef {'dragons' | 'griffins' | 'leviathans' | 'lizards' |'nagas' | 'sharks' | 'spiders' | 'zebras'} KittensNamedRace */
/** @typedef {'alloy' | 'beam' | 'bloodstone' | 'blueprint' | 'compedium' | 'concrate' | 'eludium' | 'gear' | 'kerosene' | 'manuscript' | 'megalith' |'parchment' | 'plate' | 'scaffold' |  'ship' | 'slab' | 'steel' | 'tMythril' | 'thorium'} KittensNamedResCraft */
/** @typedef {'blackcoin' | 'coal' | 'culture' | 'furs' | 'iron' | 'ivory' | 'karma' | 'kittens' |  'minerals' | 'necrocorn' | 'oil' | 'relic' | 'science' | 'starchart' | 'sorrow' | 'tears' | 'timeCrystal' | 'titanium' | 'unicorns' | 'unobtainium' | 'uranium' | 'wood' | 'zebras' | KittensNamedResCraft} KittensNamedRes */
/** @typedef {'common' | 'exotic' | 'rare'} KittensNamedResType */
/** @typedef {'bldTab' | 'diplomacyTab' | 'libraryTab' | 'religionTab' | 'spaceTab' | 'timeTab' | 'villageTab' | 'workshopTab'} KittensNamedTab */
/** @typedef {{ id: string, render: () => void, tabId: string, tabName: string, visible: boolean }} KittensTab */
/** @typedef {{ children: KittensBtn[] }} KittensBtnPanel */
/** @typedef {{ cathPollution: number, getBuildingExt: (name: KittensNamedBldgBld) => KittensBldg }} KittensBld */
/** @typedef {KittensBtnPanel & KittensTab} KittensBldTab */
/** @typedef {{ effects: KittensEffects, label: string, name: string, on: number, unlocked: boolean, val: number }} KittensBldgMetadata */
/** @typedef {{ enabled: boolean, metadata: KittensBldgMetadata, on: number, prices: KittensPrice[], visible: boolean }} KittensBldgModel */
/** @typedef {{ effects?: KittensEffects, meta: KittensBldgMetadata, model?: KittensBldgModel, val?: number }} KittensBldg */
/** @typedef {{ loadout: { pinned: boolean }, name: string }} KittensBtnOpts */
/** @typedef {{ domNode: HTMLElement, id: string, model: KittensBldgModel, opts?: KittensBtnOpts }} KittensBtn */
/** @typedef {{ festivalEffects: { unicorns: number } }} KittensCalendarCycle */
/** @typedef {{ cryptoPrice: number, cycle: string,  cycles: KittensCalendarCycle[], festivalDays: number, year: number }} KittensCalendar */
/** @typedef {{ filters: { [x in KittensNamedConsFilt]: { enabled: boolean } }, maxMessages: number }} KittensConsole */
/** @typedef {{ name: KittensNamedRace, unlocked: boolean }} KittensDiplomacyRace */
/** @typedef {{ get: (name: KittensNamedRace) => KittensDiplomacyRace, unlockElders: () => void }} KittensDiplomacy */
/** @typedef {{ embassyButton: KittensBtn, race: KittensDiplomacyRace, feedBtn?: KittensBtn, tradeBtn: { tradeAllHref: { link: HTMLElement } } }} KittensDiplomacyRacePanel */
/** @typedef {KittensTab & { exploreBtn: KittensBtn, racePanels: KittensDiplomacyRacePanel[], leviathansInfo: unknown }} KittensDiplomacyTab */
/** @typedef {{ cathPollutionPerTickProd?: number, riftChance?: number, unicornsPerTickBase?: number, unicornsRatioReligion?: number }} KittensEffects */
/** @typedef {{ noConfirm: boolean }} KittensOpts */
/** @typedef {{ researched: boolean }} KittensPerk */
/** @typedef {{ getParagonProductionRatio: () => number, getPerk: (name: KittensNamedPerk) => KittensPerk }} KittensPrestige */
/** @typedef {{ name: KittensNamedRes, val: number }} KittensPrice */
/** @typedef {{ _getTranscendNextPrice: () => number, faithRatio: number, getSolarRevolutionRatio: () => number, getZU: (name: KittensNamedBldgZU) => KittensBldg, praise: () => void, resetFaith: (n: number, b: boolean) => void }} KittensReligion */
/** @typedef {KittensTab & { ctPanel: { children: KittensBtnPanel[] }, praiseBtn: KittensBtn, rUpgradeButtons: KittensBtn[], sacrificeBtn: { model: { allLink: { handler: () => void } } }, zgUpgradeButtons: KittensBtn[] }} KittensReligionTab */
/** @typedef {{ maxValue: number, name: KittensNamedRes, perTickCached: number, type: KittensNamedResType, unlocked: boolean, value: number, visible: boolean }} KittensRes */
/** @typedef {{ get: (name: KittensNamedRes) => KittensRes, resources: KittensRes[] }} KittensResPool */
/** @typedef {KittensTab & { GCPanel: KittensBtnPanel, planetPanels: KittensBtnPanel[] }} KittensSpaceTab */
/** @typedef {{ heat: number }} KittensTime */
/** @typedef {KittensTab & { cfPanel: { children: KittensBtnPanel[] }, vsPanel: { children: KittensBtnPanel[] } }} KittensTimeTab */
/** @typedef {{ activeTabId: string }} KittensUI */
/** @typedef {{ huntAll: () => void }} KittensVillage */
/** @typedef {KittensTab & { buttons: KittensBtn[], promoteKittensBtn: KittensBtn }} KittensVillageTab */
/** @typedef {{  craft: (name: KittensNamedRes, count: number) => void, craftAll: (name: KittensNamedRes) => void, getCraftAllCount: (name: KittensNamedRes) => number }} KittensWorkshop */
/** @typedef {KittensTab & { buttons: KittensBtn[] }} KittensWorkshopTab */
/** @typedef {{ bld: KittensBld, bldTab: KittensBldTab, calendar: KittensCalendar, console: KittensConsole, diplomacy: KittensDiplomacy, diplomacyTab: KittensDiplomacyTab, getEffect: (name: KittensNamedEffect) => number, getTicksPerSecondUI: () => number, msg: (text?: string) => { span: HTMLElement }, opts: KittensOpts, prestige: KittensPrestige, religion: KittensReligion, religionTab: KittensReligionTab, resPool: KittensResPool, time: KittensTime, timeTab: KittensTimeTab, spaceTab: KittensSpaceTab, ui: KittensUI, village: KittensVillage, villageTab: KittensVillageTab, workshop: KittensWorkshop, workshopTab: KittensWorkshopTab }} KittensGame */

// Kitty Cheat
/** @typedef {{ active?: boolean, btn: jQuery, delay?: number, end?: boolean, excl?: string[], fn?: (group: string, name: string, opts: CheatOpt) => void, group?: 'actions' | 'crafting' | 'trading', noFill?: boolean }} CheatOpt */
/** @typedef {Omit<CheatOpt, 'btn' | 'group'> & { fn: (group: string, name: string, opts: CheatOpt) => void }} CheatOptPartialAction */
/** @template {{ [x: string]: CheatOpt }} T @typedef {{ active: boolean, all: T, div?: jQuery }} CheatMapEntry */
/** @typedef {{ actions: CheatMapEntry<{ [x: string]: CheatOptPartialAction }>, control: CheatMapEntry<{ [x: string]: Omit<CheatOpt, 'btn' | 'delay' | 'fn' | 'noFill'> }> & { active: true }, crafting: CheatMapEntry<{ [x in KittensNamedResCraft]?: Omit<CheatOpt, 'btn' | 'delay' | 'fn' | 'excl' | 'group'> }>, tabs: CheatMapEntry<{ [x: string]: Omit<CheatOpt, 'btn' | 'delay' | 'fn' | 'excl' | 'group' | 'end' | 'noFill'> & { tab: KittensNamedTab } }> & { active: true }, trading: CheatMapEntry<{ [x in KittensNamedRace]: Omit<CheatOpt, 'btn' | 'delay' | 'fn' | 'excl' | 'group' | 'end'> }> }} CheatMap */
/** @typedef {{ frac: number, raw: number, text: string }} CheatPercent */
/** @typedef {{ [x in 'build' | 'crypto' | 'upgrade' | 'zig']?: string[] }} CheatStats */

// Window
/** @typedef {Window & typeof globalThis & { $: JQuery, game: KittensGame }} WindowExt */

((/** @type {JQuery} */ $, /** @type {KittensGame} */ game) => {
  const FRACTION = {
    // spend 1% maximum on any exotic
    EXOTIC: 0.01,
    // spend max 50% maximum on karma (no in-play increase)
    KARMA: 0.5,
    // only craft 92.5% of max - don't exhaust sources
    CRAFT: 0.925,
    // build uncapped buildings when we use only 10% of resources
    UNCAPPED: 0.1
  };

  const MAXVAL = {
    // buy bcoin below this value
    BCOIN_BUY: 950,
    // sell bcoin when it hits this amount (1100 is a crash)
    BCOIN_SELL: 1085,
    // build at most 25 HGs - this is optimal for paragon
    BLDG_GENOCIDE: 25
  };

  const INTERVAL = {
    ALL_OPT: 99,
    ALL_BLD: 999,
    ALL_TXT: 999,
    ADORE: 120000,
    BCOIN: 60000,
    CATNIP_GATHER: 5,
    CATNIP_REFINE: 1000,
    COMBUST: 1000,
    EXPLORE: 5000,
    FEED: 60000,
    PRAISE: 25,
    PROMOTE: 90000,
    SACRIFICE: 10000
  };

  /** @type {CheatMap} */
  const cheatMap = {
    control: {
      active: true,
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
      }
    },
    crafting: {
      active: false,
      all: {
        //wood: {},
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
        megalith: {},
        scaffold: { active: true },
        ship: {},
        eludium: {},
        thorium: { active: true },
        bloodstone: {},
        tMythril: {}
      }
    },
    'trading': {
      active: false,
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
    'actions': {
      active: false,
      all: {
        catnip: {
          fn: fnGather,
          active: true,
          delay: INTERVAL.CATNIP_GATHER,
          noFill: true
        },
        refine: {
          fn: fnRefine,
          active: true,
          delay: INTERVAL.CATNIP_REFINE,
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
      active: true,
      all: {
        bonfire: { active: true, tab: 'bldTab' },
        village: { active: true, tab: 'villageTab' },
        science: { active: true, tab: 'libraryTab' },
        workshop: { active: true, tab: 'workshopTab' },
        trade: { active: true, tab: 'diplomacyTab' },
        religion: { active: true, tab: 'religionTab' },
        space: { active: true, tab: 'spaceTab' },
        time: { active: true, tab: 'timeTab' }
      }
    }
  };

  const combustCycles = {
    tenErasLink: 500,
    previousCycleLink: 45,
    nextCycleLink: 5
  };

  let lastExploreTime = 0;
  let lastSacrificeTime = 0;

  /** @returns {void} */
  function noop () {}

  /** @returns {jQuery} */
  function jqAppend (/** @type {jQuery} */ parent, /** @type {jQuery} */ child) {
     parent.append(child);

     return child;
  }

  /** @returns {jQuery} */
  function activateBtn (/** @type {CheatOpt} */ opts, /** @type {boolean=} */ active = false) {
    opts.active = active;

    return opts.btn.css({
      'background': active ? 'red' : 'white',
      'color': active ? 'white' : 'black',
      'font-family': 'monospace',
      'font-size': 'small',
      'border-radius': '2px',
      'border-width': '1px',
      'padding-inline': '4px',
      'margin-right': opts.end ? '5px' : (opts.excl ? '-2px' : '2px'),
      'margin-bottom': '2px'
    });
  }

  /** @returns {jQuery} */
  function styleDiv (/** @type {jQuery} */ div, /** @type {boolean=} */ isSmall = false) {
    return div.css({ 'margin-bottom': isSmall ? '5px' : '20px' });
  }

  /** @returns {CheatPercent=} */
  function toPercent (/** @type {number} */ frac) {
    if (frac > 0 && frac < Number.MAX_SAFE_INTEGER) {
      const raw = 100 * frac;

      return {
        frac,
        text: `${raw >= 100 ? '>> 100' : raw.toFixed(3)}%`,
        raw
      };
    }
  }

  /** @returns {number} */
  function echo (/** @type {string?=} */ text, /** @type {number=} */ retval = 1) {
    !!retval && !!text && $(game.msg(text).span).css('opacity', 0.275);

    return retval;
  }

  /** @returns {string?=} */
  function getBtnName (/** @type {(KittensBtn | KittensBldg)?=} */ btn, /** @type {string?=} */ extra = null) {
    const name = /** @type {KittensBtn} */ (btn)?.opts?.name || btn?.model?.metadata?.label;

    return name && extra
      ? `${name} (${extra})`
      : name;
  }

  /** @returns {number} */
  function clickDom (/** @type {KittensBtn?=} */ btn, /** @type {{ isAll?: boolean, isBatch?: boolean }=} */ opts = {}) {
    if (btn?.domNode) {
      if (opts.isAll) {
        btn.domNode.dispatchEvent(new MouseEvent('click', { shiftKey: true }));
      } else if (opts.isBatch) {
        btn.domNode.dispatchEvent(new MouseEvent('click', { ctrlKey: true, metaKey: true }));
      } else {
        btn.domNode.click();
      }

      return 1;
    }

    return 0;
  }

  /** @returns {number} */
  function clickSpan (/** @type {string} */ label) {
    const elem = $('span').filter((_, e) => $(e).text().indexOf(label) === 0);

    return (elem.length && elem.click()) ? 1 : 0;
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
  function isPricesUncapped (/** @type {KittensPrice[]} */ prices, /** @type {string?} */ skip = null) {
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
  function checkPrices (/** @type {KittensPrice[]} */ prices, /** @type {string?} */ skip = null) {
    const isUncapped = isPricesUncapped(prices, skip);

    for (const p of prices) {
      if (p.name !== skip) {
        const r = game.resPool.get(p.name);
        const f =
          r.type === 'exotic'
            ? FRACTION.EXOTIC
            : r.name === 'karma' // type=rare, also affects neocorns
              ? FRACTION.KARMA
              : (isUncapped ? FRACTION.UNCAPPED : 1);

        if ((p.val / r.value) > f) {
          return { isUncapped, isInvalid: true };
        }
      }
    }

    return { isUncapped, isInvalid: false };
  }

  /** @returns {void} */
  function fillResources () {
    if (!cheatMap.control.all.resources.active && !cheatMap.control.all.x10.active) {
      return;
    }

    for (const r of game.resPool.resources) {
      if (r.maxValue && r.unlocked && r.visible && r.name !== 'kittens' && r.name !== 'zebras') {
        const max = r.maxValue * (cheatMap.control.all.x10.active ? 10 : 1);

        if (max && r.value < max) {
          r.value = max;
        }
      }
    }
  }

  /** @returns {KittensDiplomacyRacePanel=} */
  function findLeviathans () {
    return game.diplomacyTab.racePanels.find((p) => p.race.name === 'leviathans');
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
  /** @returns {{ err?: string, bestBuilding?: KittensNamedBldgZU | 'unicornPasture', bestPrices?: KittensPrice[], btn?: KittensBtn | KittensBldg | null, ratio: number }} */
  function calcZiggurats () {
    const /** @type {KittensNamedBldgZU[]} */ validBuildings = ['unicornTomb', 'ivoryTower', 'ivoryCitadel', 'skyPalace', 'unicornUtopia', 'sunspire'];
    const pastureImpl = game.bld.getBuildingExt('unicornPasture');
    const zigImpl = game.bld.getBuildingExt('ziggurat');
    const unicornsPerTickBase = pastureImpl?.meta.effects?.unicornsPerTickBase;

    if (!pastureImpl?.meta.unlocked || !pastureImpl.meta.on || !unicornsPerTickBase) {
      return { err: 'No pasture built', ratio: 0 };
    } else if (!zigImpl?.meta.unlocked || !zigImpl.meta.on) {
      return { err: 'No ziggurat built', ratio: 0 };
    }

    // How many unicorns are produced per second.
    const unicornsPerSecondBase = game.getEffect('unicornsPerTickBase') * game.getTicksPerSecondUI();
    // Unicorn ratio modifier. For example, through 'unicorn selection'.
    const globalRatio = game.getEffect('unicornsGlobalRatio') + 1;
    // The unicorn ratio modifier through religion buildings.
    const religionRatio = game.getEffect('unicornsRatioReligion') + 1;
    // The ratio modifier through paragon.
    const paragonRatio = game.prestige.getParagonProductionRatio() + 1;
    // Bonus from collected faith.
    const faithBonus = game.religion.getSolarRevolutionRatio() + 1;

    const currentCycle = game.calendar.cycles[game.calendar.cycle];

    // The modifier applied by the current cycle and holding a festival.
    let cycleBonus = 1;

    // If the current cycle has an effect on unicorn production during festivals
    if (currentCycle.festivalEffects.unicorns !== undefined) {
      // Numeromancy is the metaphysics upgrade that grants bonuses based on cycles.
      if (game.prestige.getPerk('numeromancy').researched && game.calendar.festivalDays) {
        cycleBonus = currentCycle.festivalEffects.unicorns;
      }
    }

    const unicornsPerSecond = unicornsPerSecondBase * globalRatio * religionRatio * paragonRatio * faithBonus * cycleBonus;

    // Based on how many ziggurats we have.
    const zigguratRatio = Math.max(zigImpl.meta.on, 1);

    // How many unicorns do we receive in a unicorn rift?
    const baseUnicornsPerRift = 500 * (1 + game.getEffect('unicornsRatioReligion') * 0.1);

    // How likely are unicorn rifts to happen? The unicornmancy metaphysics upgrade increases this chance.
    const riftChanceRatio = game.prestige.getPerk('unicornmancy').researched ? 1.1 : 1;

    // ?
    const unicornRiftChange = ((game.getEffect('riftChance') * riftChanceRatio) / (10000 * 2)) * baseUnicornsPerRift;

    // We now want to determine how quickly the cost of given building is neutralized
    // by its effect on production of unicorns.

    const pastureProduction = unicornsPerTickBase * game.getTicksPerSecondUI() * globalRatio * religionRatio * paragonRatio * faithBonus * cycleBonus;

    let /** @type {KittensNamedBldgZU | 'unicornPasture'} */ bestBuilding = 'unicornPasture';
    let bestAmortization = Number.POSITIVE_INFINITY;
    let bestPrices = [];
    let bestBtn = null;

    // If the unicorn pasture amortizes itself in less than infinity ticks,
    // set it as the default. This is likely to protect against cases where
    // production of unicorns is 0.
    if (pastureImpl.model?.prices) {
      const pastureAmortization = pastureImpl.model.prices[0].val / pastureProduction;

      if (pastureAmortization < bestAmortization) {
        bestAmortization = pastureAmortization;
        bestPrices = pastureImpl.model.prices;
        bestBtn = pastureImpl;
      }
    }

    for (let i = 0; i < validBuildings.length; i++) {
      const building = validBuildings[i];
      const buildingImpl = game.religionTab.zgUpgradeButtons[i];

      if (!buildingImpl?.model.metadata.unlocked) {
        continue;
      }

      // Determine a price value for this building.
      const unicornPrice = calcZigguratsPrices(buildingImpl.model.prices, zigguratRatio);

      // Determine the effect the building will have on unicorn production and unicorn rifts.
      const buildingInfo = game.religion.getZU(building);
      const religionBonus = religionRatio + (buildingInfo.effects?.unicornsRatioReligion || 0);
      const riftChance = game.getEffect('riftChance') + (buildingInfo.effects?.riftChance || 0);

      // The rest should be straight forward.
      const unicornsPerRift = 500 * ((religionBonus - 1) * 0.1 + 1);
      const riftBonus = (((riftChance * riftChanceRatio) / (10000 * 2)) * unicornsPerRift) - unicornRiftChange;
      const buildingProduction = (unicornsPerSecondBase * globalRatio * religionBonus * paragonRatio * faithBonus * cycleBonus) - unicornsPerSecond + riftBonus;

      const amortization = unicornPrice / buildingProduction;

      if ((amortization < bestAmortization) && (0 < riftBonus || (religionRatio < religionBonus && 0 < unicornPrice))) {
        bestAmortization = amortization;
        bestBuilding = building;
        bestPrices = buildingImpl.model.prices;
        bestBtn = buildingImpl;
      }
    }

    return { bestBuilding, bestPrices, btn: bestBtn, ratio: zigguratRatio };
  }

  /** @returns {{ action: 'buy' | 'hold' | 'sell', price: number, text: string }} */
  function calcBcoin () {
    const price = game.calendar.cryptoPrice;
    const action =
      price >= MAXVAL.BCOIN_SELL
        ? 'sell'
        : price <= MAXVAL.BCOIN_BUY
          ? 'buy'
          : 'hold';

    return {
      action,
      price,
      text: `${action} @ ${price.toFixed(3)}R`
    };
  }

  /** @returns {CheatPercent=} */
  function calcTranscend () {
    return toPercent(game.religion.faithRatio / game.religion._getTranscendNextPrice());
  }

  /** @returns {{ btn: KittensBtn, percent?: CheatPercent, text?: string | null }[]} */
  function calcTheology () {
    return game.religionTab.ctPanel.children[0].children
      .filter((a) => {
        if (!a.model?.prices.length || a.model.prices[0].name !== 'relic') {
          return false;
        } else if ((a.id === 'holyGenocide') && (a.model.on >= MAXVAL.BLDG_GENOCIDE)) {
          return false;
        }

        return !checkPrices(a.model.prices, 'relic').isInvalid;
      })
      .sort((a, b) => a.model.prices[0].val - b.model.prices[0].val)
      .map((btn) => {
        const percent = toPercent(game.resPool.get('relic').value / (btn.model.prices[0].val * (1 / FRACTION.EXOTIC)));
        const name = getBtnName(btn);

        return {
          btn,
          percent,
          text: name && `${getBtnName(btn)} ${percent?.text || ''}`
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

    for (const c in combustCycles) {
      if ((avail / combustCycles[c]) > 1) {
        const btn = renderBgTab(game.timeTab)?.cfPanel.children[0].children[0];

        btn && btn.model[c].handler.call(btn);

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
  function execTrade (/** @type {KittensNamedRace} */ name) {
    if ((name === 'leviathans') && !game.diplomacy.get('leviathans').unlocked && game.religion.getZU('blackPyramid').val) {
      game.diplomacy.unlockElders();
    }

    renderBgTab(game.diplomacyTab)
      ?.racePanels.find((p) => p.race.name === name)
      ?.tradeBtn.tradeAllHref.link.click();
  }

  /** @returns {void} */
  function execCraft (/** @type {KittensNamedRes} */ name) {
    const max = game.workshop.getCraftAllCount(name);

    if (max > 0 && max < Number.MAX_VALUE) {
      game.workshop.craft(name, Math.ceil(FRACTION.CRAFT * max));
    }
  }

  /** @returns {void} */
  function execOpt (/** @type {keyof CheatMap} */ group, /** @type {string} */ name, /** @type {CheatOpt} */ opts) {
    try {
      if (opts.active && cheatMap[group].active) {
        !opts.noFill && fillResources();

        if (group === 'actions') {
          /** @type {CheatOptPartialAction} */ (opts).fn(group, name, opts);
        } else if (group === 'crafting') {
          execCraft(/** @type {KittensNamedRes} */ (name));
        } else if (group === 'trading') {
          execTrade(/** @type {KittensNamedRace} */ (name));
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

  /** @returns {{ bld?: KittensBtn, isBuildable: boolean, tears?: KittensPrice }} */
  function getZigInfo (/** @type {string} */ id, /** @type {KittensBtn?} */ btn = null) {
    const bld = btn || game.religionTab.zgUpgradeButtons.find((b) => b.id === id);

    return {
      bld,
      isBuildable: !!bld?.model.visible && !checkPrices(bld.model.prices).isInvalid,
      tears: bld?.model.prices.find((p) => p.name === 'tears')
    };
  }

  /** @returns {number} */
  function buildZig (/** @type {boolean} */ dryRun, /** @type {string[]} */ completed) {
    if (!renderBgTab(game.religionTab)) {
      return 0;
    }

    const zig = calcZiggurats();

    if (!zig.bestBuilding) {
      return 0;
    }

    const blck = getZigInfo('blackPyramid');
    const mark = getZigInfo('marker');
    const best = getZigInfo(zig.bestBuilding);
    const next = zig.bestBuilding === 'unicornPasture'
      ? best
      : blck.isBuildable
        ? blck
        : (best.isBuildable && mark.tears) && (mark.isBuildable && best.tears)
          ? mark.tears.val <= best.tears.val
            ? mark
            : best
          : mark.isBuildable
            ? mark
            : best.isBuildable
              ? best
              : null;

    if (next?.bld) {
      const res = dryRun ? 1 : clickDom(next.bld);

      (res && !dryRun) && pushBtnName(completed, next.bld);

      return res;
    }

    const nowTears = game.resPool.get('tears').value;
    const finTears = nowTears + (zig.ratio * game.resPool.get('unicorns').value / 2500);

    // only sacrifice when we can create missing (only every 10 seconds)
    if (best.tears && nowTears < best.tears.val && finTears > best.tears.val) {
      const nowTime = Date.now();
      const nowDelta = nowTime - lastSacrificeTime;

      if (!dryRun && nowDelta > INTERVAL.SACRIFICE) {
        lastSacrificeTime = nowTime;
        game.religionTab.sacrificeBtn.model.allLink.handler.call(game.religionTab.sacrificeBtn, noop, noop);
      }
    }

    return 0;
  }

  /** @returns {number} */
  function buildTheologyBtn (/** @type {{ btn: KittensBtn, percent?: CheatPercent }} */ best, /** @type {boolean} */ dryRun) {
    if (!best.btn.model.visible || !best.btn.model.enabled || !best.percent || best.percent.frac < 1 || checkPrices(best.btn.model.prices).isInvalid) {
      return 0;
    }

    return dryRun ? 1 : clickDom(best.btn);
  }

  /** @returns {number}  */
  function buildTheology (/** @type {boolean} */ dryRun, /** @type {string[]} */ completed) {
    if (!renderBgTab(game.religionTab)) {
      return 0;
    }

    const avail = calcTheology();
    let count = 0;

    for (const best of avail) {
      if (!buildTheologyBtn(best, dryRun)) {
        break;
      } else if (dryRun) {
        return 1;
      }

      pushBtnName(completed, best.btn);
      count++;
    }

    return count;
  }

  /** @returns {number} */
  function unlockTabBtn (/** @type {boolean} */ dryRun, /** @type {KittensBtn} */ btn, /** @type {boolean=} */ isAll = false) {
    if (!btn?.model?.enabled || !btn.model.visible || !btn.model.metadata) {
      return 0;
    } else if (btn.id === 'cryochambers' && btn.model.on >= game.bld.getBuildingExt('chronosphere').meta.on) {
      return 0;
    }

    !dryRun && fillResources();

    if (checkPrices(btn.model.prices).isInvalid) {
      return 0;
    }

    return dryRun ? 1 : clickDom(btn, { isAll });
  }

  /** @returns {number} */
  function unlockTab (/** @type {boolean} */ dryRun, /** @type {string[]} */ completed, /** @type {KittensTab} */ tab) {
    if (!renderBgTab(tab)) {
      return 0;
    }

    const buttons =
      /** @type {KittensReligionTab} */ (tab).rUpgradeButtons ||
      /** @type {KittensSpaceTab} */ (tab).GCPanel?.children ||
      /** @type {KittensDiplomacyTab} */ (tab).racePanels?.map((r) => r.embassyButton) ||
      /** @type {KittensTimeTab} */ (tab).vsPanel?.children[0]?.children ||
      /** @type {KittensWorkshopTab} */ (tab).buttons;
    let count = 0;

    // multi for religion & embassy upgrades
    const isAll = !!(
      (/** @type {KittensReligionTab} */ (tab).rUpgradeButtons ||
      /** @type {KittensDiplomacyTab} */ (tab).racePanels
    )?.length);

    for (const btn of buttons) {
      if (unlockTabBtn(dryRun, btn, isAll)) {
        if (dryRun) {
          return 1;
        }

        pushBtnName(completed, btn, /** @type {{ race?: { title: string } }} */ (btn).race?.title);
        count++;
      }
    }

    const d = /** @type {KittensDiplomacyTab} */ (tab);

    // for trade, unlock new races to trade with
    if (d.exploreBtn && d.racePanels.length !== 8) {
      const maxRaces = d.leviathansInfo
        ? 8 - (findLeviathans()?.race.unlocked ? 0 : 1)
        : 7;

      if (d.racePanels.length !== maxRaces) {
        const nowTime = Date.now();
        const nowDelta = nowTime - lastExploreTime;

        if (nowDelta > INTERVAL.EXPLORE) {
          lastExploreTime = nowTime;
          count += dryRun ? 1 : clickDom(d.exploreBtn);
        }
      }
    }

    return count;
  }

  /** @returns {number} */
  function buildTabBtn (/** @type {boolean} */ dryRun, /** @type {KittensBtn} */ btn) {
    const model = btn?.model;

    if (!model?.visible || !model.enabled || !model.metadata || (model.metadata.on !== model.metadata.val)) {
      return 0;
    } else if (!cheatMap.control.all.pollute.active && model.metadata.effects?.cathPollutionPerTickProd) {
      return 0;
    }

    !dryRun && fillResources();

    const check = checkPrices(btn.model.prices);

    if (check.isInvalid || (check.isUncapped && !cheatMap.control.all.uncap.active)) {
      return 0;
    }

    return dryRun ? 1 : clickDom(btn, { isAll: !check.isUncapped && model.metadata.on >= 1 });
  }

  /** @returns {number} */
  function buildTab (/** @type {boolean} */ dryRun, /** @type {string[]} */ completed, /** @type {KittensTab} */ tab) {
    if (!renderBgTab(tab)) {
      return 0;
    }

    const areas =
      /** @type {KittensSpaceTab} */ (tab).planetPanels ||
      [/** @type {KittensBldTab} */ (tab)];
    let count = 0;

    for (const area of areas) {
      for (const btn of area.children) {
        if (buildTabBtn(dryRun, btn)) {
          if (dryRun) {
            return 1;
          }

          pushBtnName(completed, btn);
          count++;
        }
      }
    }

    return count;
  }

  /** @returns {number} */
  function loopTabs (/** @type {boolean} */ dryRun, /** @type {string[]} */ completed, /** @type {keyof CheatStats} */ type, /** @type {KittensNamedTab[]} */ tabs, /** @type (dryRun: boolean, completed: string[], tab: KittensTab) => number} */ fn, /** @type {CheatStats} */ stats) {
    const /** @type {KittensNamedTab[]} */ allowedTabs = [];
    const /** @type {string[]} */ indv = [];
    let total = 0;

    for (const t in cheatMap.tabs.all) {
      cheatMap.tabs.all[t].active && allowedTabs.push(cheatMap.tabs.all[t].tab);
    }

    for (const tab of tabs) {
      if (dryRun || allowedTabs.includes(tab)) {
        try {
          !dryRun && fillResources();

          const count = fn(dryRun, completed, game[tab]);

          if (count) {
            indv.push(game[tab].tabId);
            total += count;
          }
        } catch (e) {
          console.error('loopTabs', type, tab, e);
        }
      }
    }

    if (total) {
      stats[type] = indv;
    }

    return total;
  }

  /** @returns {CheatStats} */
  function execBuildAll (/** @type {number} */ delay, /** @type {boolean=} */ dryRun = false) {
    const /** @type {CheatStats} */ stats = {};
    const /** @type {string[]} */ completed = [];
    let total = 0;

    if (cheatMap.control.all.upgrade.active || dryRun) {
      total += loopTabs(dryRun, completed, 'upgrade', ['diplomacyTab', 'libraryTab', 'religionTab', 'spaceTab', 'timeTab', 'workshopTab'], unlockTab, stats);
    }

    if (cheatMap.control.all.build.active || dryRun) {
      total += loopTabs(dryRun, completed, 'build', ['bldTab', 'spaceTab'], buildTab, stats);
    }

    if (!dryRun) {
      if (cheatMap.control.all.zig.active) {
        total += loopTabs(dryRun, completed, 'zig', ['religionTab'], (dryRun, completed) => buildZig(dryRun, completed), stats);
      }

      if (cheatMap.control.all.crypto.active) {
        total += loopTabs(dryRun, completed, 'crypto', ['religionTab'], (dryRun, completed) => buildTheology(dryRun, completed), stats);
      }
    }

    if (!dryRun && delay > 0) {
      if (completed.length) {
        echo(completed.join(', '));
      }

      setTimeout(() => execBuildAll(delay), Math.ceil(delay / (total ? 2 : 1)));
    }

    return stats;
  }

  /** @returns {void} */
  function execTextInfo (/** @type {number} */ delay) {
    renderBgTab(game.religionTab);

    const nxt = execBuildAll(-1, true);
    const cry = calcTheology()[0];
    const zig = calcZiggurats();
    const trd = calcTranscend();
    const bcn = calcBcoin();

    let zigText = /** @type {string | undefined} */ (zig.bestBuilding);

    if (zig.bestBuilding && zig.bestPrices) {
      const name = zig.bestBuilding === 'unicornPasture'
        ? 'Unic. Pasture'
        : getBtnName(zig.btn);

      if (name) {
        zigText = `${name} ${toPercent((((game.resPool.get('tears').value * 2500) / zig.ratio) + game.resPool.get('unicorns').value) / calcZigguratsPrices(zig.bestPrices, zig.ratio))?.text || ''}`;
      }
    }

    $('div#kittycheat-txt-drybld').html(`Buildings: ${nxt.build?.join(', ') || '-'}`);
    $('div#kittycheat-txt-dryupg').html(`Upgrades : ${nxt.upgrade?.join(', ') || '-'}`);
    $('div#kittycheat-txt-relzig').html(`Ziggurat : ${zigText || zig.err || '-'}`);
    $('div#kittycheat-txt-relcry').html(`Theology : ${cry?.text || '-'}`);
    $('div#kittycheat-txt-rellvl').html(`Transcend: ${trd?.text || '-'}`);
    $('div#kittycheat-txt-bcoins').html(`Blackcoin: ${bcn?.text || '-'}`);

    setTimeout(() => execTextInfo(delay), delay);
  }

  /** @returns {boolean} */
  function isExecGroup (/** @type {string} */ group) {
    return group !== 'control' && group !== 'tabs';
  }

  /** @returns {void} */
  function execOpts (/** @type {number} */ delay) {
    for (const _group in cheatMap) {
      const group = /** @type {keyof CheatMap} */ (_group);
      const { active, all } = cheatMap[group];

      if (active && isExecGroup(group)) {
        for (const name in all) {
          const opts = /** @type {CheatOpt} */ (all[name]);

          if (opts.active && !opts.delay) {
            execOpt(/** @type {keyof CheatMap} */ (group), name, opts);
          }
        }
      }
    }

    setTimeout(() => execOpts(delay), delay);
  }

  /** @returns {void} */
  function activateGroup (/** @type {keyof CheatMap} */ group, /** @type {boolean=} */ active = false) {
    const opt = cheatMap[group];

    opt.active = active;
    opt.div?.css('opacity', active ? 1 : 0.33);
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
            activateBtn(/** @type {CheatOpt} */ (cheatMap[group].all[e]), false);
          }
        }

        if (isExecGroup(group)) {
          execOpt(group, name, opts);
        }
      }
    }
  }

  /** @returns {void} */
  function initCheat () {
    const divCont = jqAppend($('div#leftColumn'), $('<div id="kittycheat"></div>').css({
      'padding-bottom': '30px',
      'font-family': 'monospace',
      'font-size': 'small'
    }));
    const divActGroup = jqAppend(divCont, styleDiv($('<div id="kittycheat-act"></div>')));
    const divTxtGroup = jqAppend(divCont, styleDiv($('<div id="kittycheat-txt"></div>')));

    for (const _group in cheatMap) {
      const group = /** @type {keyof CheatMap} */ (_group);
      const { active, all } = cheatMap[group];
      const divGroup = cheatMap[group].div = jqAppend(divActGroup, styleDiv($(`<div id="kittycheat-act-${group}"></div>`)));

      if (group !== 'control') {
        jqAppend(divGroup, styleDiv($(`<div>${group}:</div>`), true));
      }

      activateGroup(group, active);

      for (const name in all) {
        const opts = /** @type {CheatOpt} */ (all[name]);

        opts.btn = jqAppend(divGroup, $(`<button>${name}</button>`).click(() => {
          clickOptBtn(group, name, opts);
        }));

        activateBtn(opts, opts.active);

        if (opts.delay) {
          execOptTimer(group, name, opts);
        }
      }
    }

    for (const id of ['drybld', 'dryupg', 'relzig', 'relcry', 'rellvl', 'bcoins']) {
      jqAppend(divTxtGroup, styleDiv($(`<div id="kittycheat-txt-${id}"></div>`), true));
    }
  }

  /** @returns {void} */
  function initGame () {
    game.console.maxMessages = 100;
    game.opts.noConfirm = true;

    for (const f of ['craft', 'faith', 'hunt', 'trade']) {
      game.console.filters[f].enabled = false;
    }
  }

  initGame();
  initCheat();
  execOpts(INTERVAL.ALL_OPT);
  execTextInfo(INTERVAL.ALL_TXT);
  execBuildAll(INTERVAL.ALL_BLD);
})(/** @type {WindowExt} */ (window).$, /** @type {WindowExt} */ (window).game);
