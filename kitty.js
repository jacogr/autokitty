// @ts-check

// jQuery
/** @typedef {{ addClass: (classes: string) => jQuery, append: (elem: jQuery | string) => jQuery, click: (fn?: () => unknown) => jQuery, css: (style: { [x: string]: string | number } | string, val?: string | number) => jQuery, filter: (fn: (index: number, elem: HTMLElement) => boolean) => jQuery, html: (html: string) => jQuery, length: number, removeClass: (classes: string) => jQuery, text: () => string }} jQuery */
/** @typedef {(elem: HTMLElement | string) => jQuery} JQuery */

// Kittens Game
/** @typedef {'blackCore' | 'blackLibrary' | 'blackNexus' | 'blackObelisk' | 'blackRadiance' | 'blazar' | 'darkNova' | 'holyGenocide' | 'mausoleum' | 'singularity'} KittensNamedBldgCrypto */
/** @typedef {'blackPyramid' | 'unicornGraveyard' | 'unicornNecropolis' | 'unicornTomb' | 'ivoryTower' | 'ivoryCitadel' | 'skyPalace' | 'unicornUtopia' | 'sunspire'} KittensNamedBldgZU */
/** @typedef {'blastFurnace' | 'temporalAccelerator' | 'temporalImpedance' | 'timeBoiler' | 'ressourceRetrieval'} KittensNamedBldgTimeCF */
/** @typedef {KittensNamedBldgCrypto | KittensNamedBldgZU | KittensNamedBldgTimeCF} KittensNamedBldg */
/** @typedef {'tenErasLink' | 'previousCycleLink' | 'nextCycleLink'} KittensNamedCombustLink */
/** @typedef {'fractured' | 'pactOfCleansing' | 'pactOfDestruction' | 'pactOfExtermination' | 'pactOfPurity' | 'payDebt'} KittensNamedPact */
/** @typedef {'authocracy' | 'bigStickPolicy' | 'carnivale' | 'cityOnAHill' | 'clearCutting' | 'communism' | 'conservation' | 'cryochamberExtraction' | 'culturalExchange' | 'diplomacy' | 'dragonRelationsAstrologers' | 'dragonRelationsDynamicists' | 'dragonRelationsPhysicists' | 'environmentalism' | 'epicurianism' | 'expansionism' | 'extravagance' | 'fascism' | 'frugality' | 'fullIndustrialization' | 'griffinRelationsMachinists' | 'griffinRelationsMetallurgists' | 'griffinRelationsScouts' | 'isolationism' | 'knowledgeSharing' | 'liberalism' | 'liberty' | 'lizardRelationsDiplomats' | 'lizardRelationsEcologists' | 'lizardRelationsPriests' | 'militarizeSpace' | 'monarchy' | 'mysticism' | 'nagaRelationsArchitects' | 'nagaRelationsCultists' | 'nagaRelationsMasons' | 'necrocracy' | 'openWoodlands' | 'outerSpaceTreaty' | 'radicalXenophobia' | 'rationality' | 'rationing' | 'republic' | 'scientificCommunism' | 'sharkRelationsBotanists' | 'sharkRelationsMerchants' | 'sharkRelationsScribes' | 'siphoning' | 'socialism' | 'spiderRelationsChemists' | 'spiderRelationsGeologists' | 'spiderRelationsPaleontologists' | 'stoicism' | 'stripMining' | 'sustainability' | 'technocracy' | 'terraformingInsight' | 'theocracy' | 'tradition' | 'transkittenism' | 'zebraRelationsAppeasement' | 'zebraRelationsBellicosity'} KittensNamedPolicy */
/** @typedef {'alloy' | 'beam' | 'bloodstone' | 'blueprint' | 'compedium' | 'concrate' | 'eludium' | 'gear' | 'kerosene' | 'manuscript' | 'megalith' |'parchment' | 'plate' | 'scaffold' |  'ship' | 'slab' | 'steel' | 'tMythril' | 'tanker' | 'thorium' | 'wood'} KittensNamedResCraft */
/** @typedef {'blackcoin' | 'coal' | 'culture' | 'furs' | 'iron' | 'ivory' | 'karma' | 'kittens' |  'minerals' | 'necrocorn' | 'oil' | 'relic' | 'science' | 'starchart' | 'sorrow' | 'tears' | 'timeCrystal' | 'titanium' | 'unicorns' | 'unobtainium' | 'uranium' | 'zebras' | KittensNamedResCraft} KittensNamedRes */
/** @typedef {'bldTab' | 'diplomacyTab' | 'libraryTab' | 'religionTab' | 'spaceTab' | 'timeTab' | 'villageTab' | 'workshopTab'} KittensNamedTab */
/** @typedef {{ effects: { cathPollutionPerTickProd?: number, riftChance?: number, unicornsPerTickBase?: number, unicornsRatioReligion?: number }, label: string, limitBuild?: number, name: string, on: number, unlocked: boolean, val: number }} KittensMetadata */
/** @typedef {{ enabled: boolean, metadata?: KittensMetadata, name?: string, on: number, prices: KittensPrice[], stageLinks?: { title: '^' | 'v', enabled: boolean, handler: ((...args: unknown[]) => void) & { name: 'downgradeHandler' | 'upgradeHandler' } }[], visible: boolean }} KittensBtnModel */
/** @template {{}} [E={}] @typedef {{ controller: { sellInternal: (model: KittensBtnModel, remain: number, check: boolean) => void }, domNode: HTMLElement, id: string, model: KittensBtnModel, opts?: { loadout: { pinned: boolean }, name: string } } & E} KittensBtn */
/** @typedef {{ children: KittensBtn[] }} KittensBtnPanel */
/** @typedef {{ name: 'dragons' | 'griffins' | 'leviathans' | 'lizards' |'nagas' | 'sharks' | 'spiders' | 'zebras', unlocked: boolean }} KittensDiplomacyRace */
/** @template {{}} [E={}] @typedef {{ embassyButton: KittensBtn, race: KittensDiplomacyRace, tradeBtn: { tradeAllHref: { link: HTMLElement } } } & E} KittensDiplomacyRacePanel */
/** @typedef {KittensDiplomacyRacePanel<{ buyBcoin: KittensBtn, sellBcoin: KittensBtn, feedBtn: KittensBtn }>} KittensDiplomacyRacePanelLeviathans */
/** @typedef {{ name: KittensNamedRes, val: number }} KittensPrice */
/** @typedef {{ craftable: boolean, isHidden: boolean, maxValue: number, name: KittensNamedRes, perTickCached: number, type: 'common' | 'exotic' | 'rare', unlocked: boolean, value: number }} KittensRes */
/** @template {{}} [E={}] @typedef {{ render: () => void, tabId: string, tabName: string, visible: boolean } & E} KittensTab */
/** @typedef {{ bld: { cathPollution: number, getBuildingExt: (name: 'chronosphere' | 'unicornPasture' | 'ziggurat') => { meta: KittensMetadata} }, bldTab: KittensTab<KittensBtnPanel>, calendar: { cryptoPrice: number, cycle: number,  cycles: { festivalEffects: { unicorns: number } }[], festivalDays: number, year: number }, console: { filters: { [x in 'craft' | 'faith' | 'hunt' | 'trade']: { enabled: boolean } }, maxMessages: number }, challenges: { getChallenge: (name: '1000Years') => { researched: boolean } }, diplomacy: { get: (name: KittensDiplomacyRace['name']) => KittensDiplomacyRace, unlockElders: () => void }, diplomacyTab: KittensTab<{ exploreBtn: KittensBtn, racePanels: KittensDiplomacyRacePanel[], leviathansInfo: unknown }>, getEffect: (name: 'heatCompression' | 'heatEfficiency' | 'heatMax' | 'riftChance' | 'unicornsGlobalRatio' | 'unicornsPerTickBase' | 'unicornsRatioReligion') => number, getTicksPerSecondUI: () => number, libraryTab: KittensTab<{ policyPanel: KittensBtnPanel }>, msg: (text?: string) => { span: HTMLElement }, opts: { hideSell: boolean; noConfirm: boolean }, prestige: { getParagonProductionRatio: () => number, getPerk: (name: 'numeromancy' | 'unicornmancy') => { researched: boolean } }, religion: { _getTranscendNextPrice: () => number, faithRatio: number, getSolarRevolutionRatio: () => number, getZU: (name: KittensNamedBldgZU) => KittensMetadata, praise: () => void, resetFaith: (n: number, b: boolean) => void }, religionTab: KittensTab<{ ctPanel: { children: [KittensBtnPanel] }, ptPanel: { children: [KittensBtnPanel] }, praiseBtn: KittensBtn, rUpgradeButtons: KittensBtn[], sacrificeBtn: KittensBtn<{ model: { allLink: { handler: (...args: unknown[]) => void } } }>, zgUpgradeButtons: KittensBtn[] }>, resPool: { get: (name: KittensNamedRes) => KittensRes, resources: KittensRes[] }, time: { getCFU: (name: KittensNamedBldgTimeCF) => { heat: number }, heat: number, shatter: (amt: number) => void }, timeTab: KittensTab<{ cfPanel: { children: [{ children: KittensBtn<{ controller: { doShatterAmt: (model: unknown, amt: number) => void }, model: { [x in KittensNamedCombustLink]: { handler: (...args: unknown[]) => unknown } } }>[] }] }, vsPanel: { children: [KittensBtnPanel] } }>, space: { getProgram: (name: 'orbitalLaunch') => { val: number } }, spaceTab: KittensTab<{ GCPanel: KittensBtnPanel, planetPanels: KittensBtnPanel[] }>, ui: { activeTabId: string }, village: { holdFestival: (amt: number) => void, huntAll: () => void }, villageTab: KittensTab<{ buttons: KittensBtn[], festivalBtn: KittensBtn<{ x100: { link: HTMLElement } }>, promoteKittensBtn: KittensBtn }>, workshop: {  craft: (name: KittensNamedResCraft, count: number) => void, craftAll: (name: KittensNamedResCraft) => void, getCraft: (name: KittensNamedResCraft) => { prices: KittensPrice[] }, getCraftAllCount: (name: KittensNamedResCraft) => number }, workshopTab: KittensTab<{ buttons: KittensBtn[] }> }} KittensGame */

// Kitty Cheat
/** @template {{}} [E={}] @typedef {{ active?: boolean, btn: jQuery, danger?: boolean, delay?: number, end?: boolean, excl?: string[], fn?: (group: keyof CheatMap, name: string, opts: CheatOpt) => unknown, group?: Exclude<keyof CheatMap, 'control' | 'tabs'>, missing?: boolean; noFill?: boolean, noMinCraft?: boolean, noShow?: boolean } & E} CheatOpt */
/** @template {{ [x: string]: CheatOpt }} T @template {{}} [E={}] @typedef {{ active?: boolean, all: T, div?: jQuery, noExec?: boolean } & E} CheatMapEntry */
/** @typedef {{ actions: CheatMapEntry<{ [x: string]: Omit<CheatOpt<{ fn: (group: string, name: string, opts: CheatOpt) => void }>, 'btn' | 'group' | 'missing'> }>, control: CheatMapEntry<{ [x in 'build' | 'upgrade' | 'craft' | 'trade' | 'exec' | 'zig' | 'crypto' | 'time' | 'pact' | 'pollute' | 'uncap' | 'max' | 'max10' | 'sell']: Omit<CheatOpt, 'btn' | 'delay' | 'fn' | 'missing' | 'noFill'> }, { noExec: true }>, crafting: CheatMapEntry<{ [x in KittensNamedResCraft]?: Omit<CheatOpt, 'btn' | 'delay' | 'fn' | 'excl' | 'group'> }>, tabs: CheatMapEntry<{ [x: string]: Omit<CheatOpt<{ tab: KittensNamedTab }>, 'btn' | 'delay' | 'fn' | 'excl' | 'group' | 'end' | 'missing' | 'noFill'> }, { noExec: true }>, trading: CheatMapEntry<{ [x in KittensDiplomacyRace['name']]: Omit<CheatOpt, 'btn' | 'delay' | 'fn' | 'excl' | 'group' | 'end' | 'missing'> }> }} CheatMap */
/** @typedef {{ allowedTabs: string[], completed: string[], dryRun: boolean, invalids: { [x in KittensNamedRes]?: boolean }, stats: { [x in 'build' | 'crypto' | 'sell' | 'upgrade' | 'zig' | 'time' | 'pact']?: string[] } }} CheatCtrl */

// Window
/** @typedef {Window & typeof globalThis & { $: JQuery, game: KittensGame }} WindowExt */

((/** @type {JQuery} */ $, /** @type {KittensGame} */ game) => {
  /**
   * Resource spends for both crafting an uncapped buildings. These are quite
   * sensitive, for instance upping missing to around 12.5% has an adverse
   * effect of exhausting slabs in some case. For trickle the same could happen
   * with overspend in some areas and under elsewhere
   *
   * @type {Readonly<{ UNCAPPED: number, CRAFT: Readonly<{ [x in 'MAXIMUM' | 'MISSING' | 'TRICKLE']: number }> }>}
   **/
  const SPEND = {
    CRAFT: { MAXIMUM: 0.925, MISSING: 0.0925, TRICKLE: 0.00925 },
    UNCAPPED: 0.1,
  };

  /** @type {Readonly<{ LEAST: Readonly<{ [x in KittensNamedRes]?: number }>, NAME: Readonly<{ [x in KittensNamedRes]?: number }>, SKIP: Readonly<{ [x in KittensNamedRes]?: boolean }>, TYPE: Readonly<{ [x in KittensRes['type']]: number }> }>} */
  const RESOURCES = {
    LEAST: { necrocorn: 1 }, // have at least this left
    NAME: { karma: 0.5, tears: 1 }, // fractions for name spend
    SKIP: { kittens: true, zebras: true }, // skip these when maxing
    TYPE: {
      get exotic () {
        return Math.max(0.01, (game.bld.getBuildingExt('chronosphere').meta.on || 1) * 0.00015);
      },
      common: 0,
      rare: 0
    } // exhaustive fractions for type spend
  }

  /** @type {Readonly<{ BCOIN: Readonly<{ [x in 'BUY' | 'SELL']: number }>, BUILD: Readonly<{ [x in KittensNamedBldg]?: number }> }>} */
  const MAXVAL = {
    BCOIN: { BUY: 899, SELL: 1089 }, // sell bcoin when it hits this amount (1100 is a crash)
    BUILD: { holyGenocide: 25, temporalImpedance: 1 } // build at most 25 HGs - this is optimal for paragon
  };

  /** @type {Readonly<{ ALL: Readonly<{ [x in 'BUILD' | 'OPTION' | 'TEXT']: number}>, CATNIP: Readonly<{ [x in 'GATHER' | 'REFINE']: number }> } & { [x in 'ADORE' | 'BCOIN' | 'COMBUST' | 'EXPLORE' | 'FEED' | 'PRAISE' | 'PROMOTE' | 'SACRIFICE']: number }> }} */
  const INTERVAL = {
    ALL: { BUILD: 950, OPTION: 95, TEXT: 950 },
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
        build: { excl: ['sell'] },
        upgrade: { end: true },
        craft: { group: 'crafting' },
        trade: { group: 'trading' },
        exec: { group: 'actions', end: true },
        max: { excl: ['max10'] },
        max10: { excl: ['max'], end: true },
        zig: {},
        crypto: {},
        pact: {},
        time: { end: true },
        pollute: {},
        uncap: { active: true, end: true },
        sell: { danger: true, excl: ['build'] }
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
        tMythril: { noMinCraft: true }
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
          fn: () => clickBtn(renderBgTab(game.bldTab)?.children.find((b) => b.model.name === 'Gather catnip')),
          active: true,
          delay: INTERVAL.CATNIP.GATHER,
          noFill: true
        },
        refine: {
          fn: () => clickBtn(renderBgTab(game.bldTab)?.children.find((b) => b.model.name === 'Refine catnip')),
          active: true,
          delay: INTERVAL.CATNIP.REFINE,
          end: true,
          noFill: true
        },
        observe: {
          fn: () => $('input#observeBtn').click(),
          active: true,
          noFill: true
        },
        hunt: {
          fn: () => game.village.huntAll(),
          active: true
        },
        promote: {
          fn: () => clickBtn(renderBgTab(game.villageTab)?.promoteKittensBtn),
          active: true,
          delay: INTERVAL.PROMOTE,
          noFill: true
        },
        loadout: {
          fn: () => clickBtn(renderBgTab(game.villageTab)?.buttons.find((b) => b?.opts?.loadout?.pinned)),
          active: true,
          delay: INTERVAL.PROMOTE,
          end: true,
          noFill: true
        },
        praise: {
          fn: () => game.religion.praise(),
          active: true,
          delay: INTERVAL.PRAISE
        },
        adore: {
          fn: () => game.religion.resetFaith(1.01, false),
          active: true,
          delay: INTERVAL.ADORE,
          end: true
        },
        feed: {
          fn: fnFeed,
          delay: INTERVAL.FEED,
          noFill: true
        },
        bcoin: {
          fn: fnTradeBcoin,
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

  /**
   * @description There probably should not be much description on this: it is
   * simply a function that does nothing.
   *
   * @returns {void}
   **/
  function noop () {}

  /**
   * @description Appends a child element to a parent, an unlike the normal
   * jQuery.append(...) function, this returns the child, not the parent. This
   * allows us to streamline usage, where we can append and then immediately
   * assign the result.
   *
   * @returns {jQuery}
   **/
  function jqAppend (/** @type {jQuery} */ parent, /** @type {jQuery} */ child) {
     parent.append(child);

     return child;
  }

  /**
   * @description Makes a button active or inactive, based on the input. We
   * toggle both the actual button option and then reflect this state into the
   * UI, by adding/removing the "active" css class. Additionally we handle any
   * exclusions and toggle groups, if specified.
   *
   * @returns {void}
   **/
  function activateBtn (/** @type {keyof CheatMap} */ group, /** @type {string} */ _name, /** @type {CheatOpt} */ opts, /** @type {boolean=} */ active = false) {
    opts.active = active;
    opts.btn[active ? 'addClass' : 'removeClass']('active');

    if (active && opts.excl) {
      for (const excl of opts.excl) {
        activateBtn(group, excl, cheatMap[group].all[/** @type {keyof CheatMap[group]['all']} */ (excl)], false);
      }
    }

    if (opts.group) {
      activateGroup(opts.group, active);
    }
  }

  /**
   * @description Make a div/group either active or inactive, based on the
   * input. We toggle the actual group option as well as adding or removing the
   * "disabled" css class.
   *
   * @returns {void}
   **/
  function activateGroup (/** @type {keyof CheatMap} */ group, /** @type {boolean=} */ active = false) {
    const opt = cheatMap[group];

    opt.active = active;
    opt.div?.[active ? 'removeClass' : 'addClass']('disabled');
  }

  /**
   * @description Calculates the percentage value from a supplied fraction. It
   * returns the original fraction, the raw percentage value as well as the
   * text representation of the percentage (this is capped at 100%).
   *
   * In some cases where we have a very high value or something below 0, we
   * return an invalid (null) value. In our usage we only expect values within
   * this range.
   *
   * @returns {{ frac: number, raw: number, text: string } | null}
   **/
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

  /**
   * @description Extract the name of the button for the supplied button. In
   * this case it first deals with those with metadata (stuff that can be
   * built) and additionally, if not available, tries to extract from the
   * options.
   *
   * @returns {string?=}
   **/
  function getBtnName (/** @type {KittensBtn?=} */ btn, /** @type {string?=} */ extra = null) {
    const name = btn?.model.metadata?.label || btn?.opts?.name;

    return name && extra ? `${name} ${extra}` : name;
  }

  /**
   * @description Extracts the name of a button and if exisiting, places this
   * onto the result array that has been passed in. Returns a true/false to
   * indicate success.
   *
   * @returns {boolean}
   **/
  function pushBtnName (/** @type {string[]} */ arr, /** @type {KittensBtn=} */ btn, /** @type {string?=} */ extra = null) {
    const n = getBtnName(btn, extra);

    return !!(n && arr.push(n));
  }

  /**
   * @description Performs a click on a button. This could take the form of
   * doing a shift-click (which executes to the maxiumum possible) if the isAll
   * parameter is specified.
   *
   * @returns {boolean}
   **/
  function clickBtn (/** @type {KittensBtn?=} */ btn, /** @type {boolean=} */ isAll = false) {
    return !!btn && btn.domNode.dispatchEvent(new MouseEvent('click', isAll ? { shiftKey: true } : {}));
  }

  /**
   * @description Renders a tab that is in the background, if it does exist.
   * For foregound tabs, don't re-render (this is not needed and worse causes
   * some UI glitches). If the tab is existing and visible, return the actual
   * tab, otherwise null since any further operations are not valid.
   *
   * @template {KittensTab} T
   * @returns {T | null | undefined}
   **/
  function renderBgTab (/** @type {T?=} */ tab) {
    if (!tab?.visible) {
      return null;
    } else if (game.ui.activeTabId !== tab.tabId) {
      tab.render();
    }

    return tab;
  }

  /**
   * @description Checks the prices as associated with a model. Determines if
   * the prices are uncapped and whether the current resources are enough to
   * actually spend on the item. Internally it uses the definitions for the
   * resource values (uncapped, least, by-name, by-type) to do the
   * calculations.
   *
   * @returns {{ isUncapped: boolean, isInvalid: boolean }}
   **/
  function checkPrices (/** @type {KittensPrice[]} */ prices, /** @type {{ [x in KittensNamedRes]?: boolean }} */ invalids, /** @type {KittensNamedRes?} */ skip = null) {
    let isUncapped = true;
    let isInvalid = false;

    for (const p of prices) {
      if (p.name !== skip) {
        const r = game.resPool.get(p.name);

        // If we have a maxValue or there is a per-tick effect (see for
        // instance starcharts), we assume that we have a building that is
        // capped. Additionally we also bypass resource checks for those where
        // we want to spend (almost) all - necrocorns is the typical example.
        if (r.maxValue || r.perTickCached || RESOURCES.LEAST[r.name]) {
          isUncapped = false;
          break;
        }
      }
    }

    for (const p of prices) {
      if (p.name !== skip) {
        const r = game.resPool.get(p.name);
        const f = RESOURCES.NAME[r.name] || RESOURCES.TYPE[r.type] || (isUncapped && SPEND.UNCAPPED) || 1;
        const m = RESOURCES.LEAST[r.name] || 0;

        if (((r.value - p.val) < m) || ((p.val / r.value) > f)) {
          isInvalid = invalids[r.name] = true;
        }
      }
    }

    return { isUncapped, isInvalid };
  }

  /**
   * @description Checks to see if a building is able to be constructed. It
   * checks the visibility, the build limits, polution control and the actual
   * prices and availability of resources.
   *
   * @returns {{ isBuildable: boolean, isUncapped?: boolean }}
   **/
  function checkBuilding (/** @type {KittensBtn?=} */ btn, /** @type {{ [x in KittensNamedRes]?: boolean }} */ invalids, /** @type {{ withCap?: boolean, withFill?: boolean }} */ opts = {}) {
    if (!btn?.model?.visible || (btn.model.metadata?.limitBuild && btn.model.metadata.val >= btn.model.metadata.limitBuild) || (btn.model.metadata?.val && btn.model.metadata.on !== btn.model.metadata.val) || (!cheatMap.control.all.pollute.active && btn.model.metadata?.effects?.cathPollutionPerTickProd) || (btn.model.on >= (MAXVAL.BUILD[/** @type {KittensNamedBldg} */ (btn.id)] || Number.MAX_SAFE_INTEGER))) {
      return { isBuildable: false };
    }

    opts.withFill && fillResources();

    const check = checkPrices(btn.model.prices, invalids);

    return { isBuildable: btn.model.enabled && !(check.isInvalid || (opts.withCap && check.isUncapped && !cheatMap.control.all.uncap.active)), isUncapped: check.isUncapped };
  }

  /**
   * @description A major cheat. Ignore all production and max resources with
   * limits, e.g. catnip. This allow usage in construction and well as crafting
   * majorly shortcutting the actual game-play. Additionally it also allows for
   * bypassing the caps with the max10 option.
   *
   * @returns {void}
   **/
  function fillResources () {
    if (cheatMap.control.all.max.active || cheatMap.control.all.max10.active) {
      for (const r of game.resPool.resources) {
        if (r.maxValue && r.unlocked && !r.isHidden && !RESOURCES.SKIP[r.name]) {
          const max = r.maxValue * (cheatMap.control.all.max10.active ? 10 : 1);

          if (r.value < max) {
            r.value = max;
          }
        }
      }
    }
  }

  /**
   * @description Find the specific race panel for Leviathans.
   *
   * @returns {KittensDiplomacyRacePanelLeviathans?}
   **/
  function findLeviathans () {
    for (const p of game.diplomacyTab.racePanels) {
      if (p.race.name === 'leviathans') {
        return /** @type {KittensDiplomacyRacePanelLeviathans} */ (p);
      }
    }

    return null;
  }

  /**
   * @description Calculate the price of a building in terms of unicorns, both
   * taking "raw" unicorns into account as well as "converted" tears.
   *
   * @returns {number}
   **/
  function calcUnicornPrice (/** @type {KittensPrice[]} */ prices, /** @type {number} */ zigguratRatio) {
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

  /**
   * @description Adapted from Kitten Scientists to calculate the best Ziggurat
   * related building to build based on the returns in terms of unicorns. It has
   * been modified from the original (with the exact calculation logic) to
   * remove the unicornPasture application and to condense it somewhat. We also
   * return additional information to make usage logic easier down the chain.
   *
   * @see https://github.com/kitten-science/kitten-scientists/blob/804104d4ddc8b64e74f1ad5b448e0ca334fa6479/source/ReligionManager.ts#L246-L395
   *
   * @returns {{ bestBuilding?: KittensNamedBldgZU | null, btn?: KittensBtn | null, ratio: number, text?: string | null }}
   * */
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
        const unicornPrice = calcUnicornPrice(buildingImpl.model.prices, zigguratRatio);
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

  /**
   * @description Get the price of blackcoin and calculate the action to take
   * based on this price. We either want to buy (when the price is low), hold
   * or sell (when the price is close to 1100, the market top)
   *
   * @returns {{ action: 'buy' | 'hold' | 'sell', price: number, text: string }}
   **/
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

  /**
   * @description Calculate the percentage value of trancending, i.e. how much
   * we have spent in faith and how much we still need to reach the next tier
   *
   * @returns {ReturnType<toPercent>}
   **/
  function calcTranscend () {
    return toPercent(game.religion.faithRatio / game.religion._getTranscendNextPrice());
  }

  /**
   * @description Calculate the list of best buildings for Cryptotheology.
   * These are sorted by the cheapest price in terms of relics.
   *
   * @returns {{ btn: KittensBtn, percent: ReturnType<toPercent>, text?: string | null }[]}
   **/
  function calcTheology () {
    return game.religionTab.ctPanel.children[0].children
      .filter((btn) => {
        if (!btn.model.prices[0] || btn.model.prices[0].name !== 'relic' || (btn.model.on >= (MAXVAL.BUILD[/** @type {KittensNamedBldg} */ (btn.id)] || Number.MAX_SAFE_INTEGER))) {
          return false;
        }

        return !checkPrices(btn.model.prices, {}, 'relic').isInvalid;
      })
      .sort((a, b) => /** @type {KittensPrice} */ (a.model.prices[0]).val - /** @type {KittensPrice} */ (b.model.prices[0]).val)
      .map((btn) => {
        const percent = toPercent(game.resPool.get('relic').value / (/** @type {KittensPrice} */ (btn.model.prices[0]).val * (1 / RESOURCES.TYPE.exotic)));

        return {
          btn,
          percent,
          text: getBtnName(btn, percent?.text)
        };
      });
  }

  /**
   * @description Combust timeCrystals to move ahead in time. We find the max
   * amount (based on the available cycles) of TCs we can combust at a single
   * time without exhauting the heat limits.
   *
   * @returns {void}
   **/
  function fnCombust () {
    const avail = (game.getEffect('heatMax') - game.time.heat) / 10;
    const btn = renderBgTab(game.timeTab)?.cfPanel.children[0]?.children[0];

    for (const cycle in combustCycles) {
      const years = combustCycles[/** @type {KittensNamedCombustLink} */ (cycle)];

      if (btn && (avail / years) > 1) {
        btn.controller.doShatterAmt(btn.model, years);
        return;
      }
    }
  }

  /**
   * @description Combust time crystals until we have have 40,000 years into
   * the future. At this point start a festival to ensure that kittens arrive
   * as fast as possible.
   *
   * @returns {void}
   **/
  function fnCombust40k (/** @type {string} */ group, /** @type {string} */ name, /** @type {CheatOpt} */ opts) {
    if (game.calendar.year < 40000) {
      fnCombust();
    } else if (opts.active) {
      activateBtn(/** @type {keyof CheatMap} */ (group), name, opts, false);

      // Start a festival with a 100 year duration (aligning with the x100 button). During festivals
      // the kittens are happier and (most importantly) they arrive faster, i.e. we have shorter runs.
      if (!game.calendar.festivalDays) {
        game.village.holdFestival(100);
      }
    }
  }

  /**
   * @description Feed necrocorns to the elders. This means that they stay
   * longer and trades yield better results.
   *
   * @returns {void}
   **/
  function fnFeed () {
    if ((game.resPool.get('necrocorn').value > (RESOURCES.LEAST.necrocorn || 0)) && renderBgTab(game.diplomacyTab)) {
      clickBtn(findLeviathans()?.feedBtn);
    }
  }

  /**
   * @description Trade blackcoin. Buy at the bottom, hold, sell at the top.
   *
   * @returns {void}
   **/
  function fnTradeBcoin () {
    const info = calcBcoin();

    if (info.price && info.action !== 'hold') {
      const bcoin = game.resPool.get('blackcoin').value;

      if (((info.action === 'sell' && bcoin > 0) || (info.action === 'buy' && bcoin === 0)) && renderBgTab(game.diplomacyTab)) {
        clickBtn(findLeviathans()?.[`${info.action}Bcoin`]);
      }
    }
  }

  /**
   * @description Excecutes a trade with a race, sending all available. For
   * Leviathans, we do an additional check to see if they are unlocked and if
   * they are unlockable (we have Ziggurats) - if this is the case, we try and
   * unlock before we execute the trade.
   *
   * @returns {void}
   **/
  function execTrade (/** @type {KittensDiplomacyRace['name']} */ name) {
    if ((name === 'leviathans') && !game.diplomacy.get('leviathans').unlocked && game.religion.getZU('blackPyramid').val) {
      game.diplomacy.unlockElders();
    }

    renderBgTab(game.diplomacyTab)?.racePanels.find((p) => p.race.name === name)?.tradeBtn.tradeAllHref.link.click();
  }

  /**
   * @description Executes a craft for a specific craftable resource. We try
   * and craft a fraction (as passed in) of the maxiumum that we are able to
   * do. The fractional nature allows us to tweak where and when we call the
   * function. If we do so via an option, we do the maximum, if we doa. trickle
   * feed we do a minimum.
   *
   * @returns {void}
   **/
  function execCraft (/** @type {KittensNamedResCraft} */ name, /** @type {number} */ frac) {
    const r = game.resPool.get(name);

    if (r.craftable && r.unlocked && !r.isHidden) {
      const val = Math.ceil(game.workshop.getCraftAllCount(name) * frac);

      if (val > 0) {
        game.workshop.craft(name, val);
      }
    }
  }

  /**
   * @description Executes a specific option, either via function, crafting or
   * trading. We specifically check if the option is currently active and is in
   * an active group before execution and respect resource filling flags.
   *
   * @returns {void}
   **/
  function execOpt (/** @type {keyof CheatMap} */ group, /** @type {string} */ name, /** @type {CheatOpt} */ opts) {
    try {
      if (opts.active && cheatMap[group].active && !cheatMap[group].noExec) {
        !opts.noFill && fillResources();

        if (group === 'actions') {
          /** @type {Required<CheatOpt>} */ (opts).fn(group, name, opts);
        } else if (group === 'crafting') {
          execCraft(/** @type {KittensNamedResCraft} */ (name), SPEND.CRAFT.MAXIMUM);
        } else if (group === 'trading') {
          execTrade(/** @type {KittensDiplomacyRace['name']} */ (name));
        }

        !opts.noFill && fillResources();
      }
    } catch (e) {
      console.error('execOpt', group, name, e);
    }
  }

  /**
   * @description Executes an option that is assigned to a specific timer. Once
   * execution has been completed, re-schedule the exceution into the furture.
   * All logic with respect to option and group activity flags are handled by
   * the specific execOpt function.
   *
   * @returns {void}
   **/
  function execOptTimer (/** @type {keyof CheatMap} */ group, /** @type {string} */ name, /** @type {CheatOpt} */ opts) {
    execOpt(group, name, opts);

    setTimeout(() => execOptTimer(group, name, opts), opts.delay);
  }

  /**
   * @description Loops through groups of children and applies the supplied
   * function on each on them. For success, adds the button name to the list
   * of executions.
   *
   * @returns {boolean}
   **/
  function loopChildren (/** @type {CheatCtrl} */ ctrl, /** @type {{ children: KittensBtn[] }[]} */ areas, /** @type {(ctrl: CheatCtrl, btn: KittensBtn, isAll: boolean) => boolean} */ buttonFn, /** @type {{ allowedIds?: string[], isAll?: boolean, withMeta?: boolean }} */ opts = {}) {
    let hasSome = false;

    for (const area of areas) {
      for (const btn of area.children) {
        if ((!opts.withMeta || btn.model.metadata) && (!opts.allowedIds || (btn.id && opts.allowedIds.includes(btn.id))) && buttonFn(ctrl, btn, !!opts.isAll)) {
          if (ctrl.dryRun) {
            return true;
          }

          hasSome ||= pushBtnName(ctrl.completed, btn, /** @type {{ race?: { title: string } }} */ (btn).race?.title);
        }
      }
    }

    return hasSome;
  }

  /**
   * @description Loop through a set of tabs and execute the supplied function
   * on each of the tabs. On success, adds the tab id to a list of tabs
   * with actions.
   *
   * @returns {void}
   **/
  function loopTabs (/** @type {CheatCtrl} */ ctrl, /** @type {keyof CheatCtrl['stats']} */ type, /** @type {KittensNamedTab[]} */ tabIds, /** @type {(ctrl: CheatCtrl, tab: KittensTab, allowed: string[]) => boolean} */ execFn, /** @type {string[]} */ allowedIds = [], /** @type {() => boolean} */ checkFn = () => true) {
    if (checkFn()) {
      for (const tabId of tabIds) {
        if (ctrl.dryRun || (cheatMap.control.all[type].active && ctrl.allowedTabs.includes(tabId))) {
          try {
            !ctrl.dryRun && fillResources();

            if (renderBgTab(game[tabId]) && execFn(ctrl, game[tabId], allowedIds)) {
              ctrl.stats[type] = (ctrl.stats[type] || []).concat(game[tabId].tabId);
            }
          } catch (e) {
            console.error('loopTabs', type, tabId, e);
          }
        }
      }
    }
  }

  /**
   * @description From a Ziggurat related building, check if the building can
   * be constructed outright.
   *
   * @returns {{ btn?: KittensBtn, isBuildable: boolean, tears?: KittensPrice }}
   **/
  function getZigInfo (/** @type {string} */ id, /** @type {{ [x in KittensNamedRes]?: boolean }} */ invalids, /** @type {KittensBtn?} */ inBtn = null) {
    const btn = inBtn || game.religionTab.zgUpgradeButtons.find((b) => b.id === id);

    return {
      btn,
      isBuildable: checkBuilding(btn, invalids).isBuildable,
      tears: btn?.model.prices.find((p) => p.name === 'tears')
    };
  }

  /** @returns {boolean} */
  function buildZig (/** @type {CheatCtrl} */ ctrl) {
    const /** @type {KittensNamedBldgZU[]} */ extras = ['blackPyramid', 'unicornGraveyard', 'unicornNecropolis'];
    let hasSome = false;

    for (const name of extras) {
      const bldg = getZigInfo(name, ctrl.invalids);

      if (bldg.isBuildable && (ctrl.dryRun || clickBtn(bldg.btn, true))) {
        if (ctrl.dryRun) {
          return true;
        }

        hasSome ||= pushBtnName(ctrl.completed, bldg.btn);
      }
    }

    let zig = calcZiggurats();

    while (zig.bestBuilding && ctrl.completed.length < 7) {
      const mark = getZigInfo('marker', ctrl.invalids);
      const best = getZigInfo(zig.bestBuilding, ctrl.invalids, zig.btn);
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

        if (!ctrl.dryRun && best.tears?.val && (nowTears < best.tears.val) && (finTears > best.tears.val)) {
          game.religionTab.sacrificeBtn.model.allLink.handler.call(noop, noop, noop);
          return true;
        }

        break;
      } else if (ctrl.dryRun) {
        return true;
      } else if (!clickBtn(next.btn)) {
        break;
      }

      hasSome ||= pushBtnName(ctrl.completed, next.btn);
      zig = calcZiggurats();
    }

    return hasSome;
  }

  /** @returns {boolean} */
  function buildTheologyBtn (/** @type {CheatCtrl} */ ctrl, /** @type {ReturnType<calcTheology>[0]} */ best) {
    return !!best.percent && best.percent.frac >= 1 && checkBuilding(best.btn, ctrl.invalids).isBuildable && (ctrl.dryRun || clickBtn(best.btn));
  }

  /** @returns {boolean}  */
  function buildTheology (/** @type {CheatCtrl} */ ctrl) {
    const avail = calcTheology();
    let hasSome = false;

    for (const best of avail) {
      if (!buildTheologyBtn(ctrl, best)) {
        break;
      }

      hasSome ||= pushBtnName(ctrl.completed, best.btn);
    }

    return hasSome;
  }

  /** @returns {boolean} */
  function unlockTabBtn (/** @type {CheatCtrl} */ ctrl, /** @type {KittensBtn} */ btn, /** @type {boolean} */ isAll) {
    return checkBuilding(btn, ctrl.invalids, { withFill: !ctrl.dryRun }).isBuildable && (ctrl.dryRun || clickBtn(btn, isAll));
  }

  /** @returns {boolean} */
  function unlockTab (/** @type {CheatCtrl} */ ctrl, /** @type {KittensTab} */ tab) {
    const children =
      /** @type {KittensGame['diplomacyTab']} */ (tab).racePanels?.map((r) => r.embassyButton) ||
      /** @type {KittensGame['religionTab']} */ (tab).rUpgradeButtons ||
      /** @type {KittensGame['spaceTab']} */ (tab).GCPanel?.children ||
      /** @type {KittensGame['timeTab']} */ (tab).vsPanel?.children[0].children ||
      /** @type {KittensGame['workshopTab']} */ (tab).buttons;
    const isAll = !!((
      /** @type {KittensGame['diplomacyTab']} */ (tab).racePanels ||
      /** @type {KittensGame['religionTab']} */ (tab).rUpgradeButtons
    )?.length);

    let hasSome = loopChildren(ctrl, [{ children }], unlockTabBtn, { isAll });

    const d = /** @type {KittensGame['diplomacyTab']} */ (tab);

    if (!ctrl.dryRun && d.exploreBtn && d.racePanels.length !== 8 && d.racePanels.length !== (8 - (findLeviathans()?.race.unlocked ? 0 : 1))) {
      const nowTime = Date.now();
      const nowDelta = nowTime - lastExploreTime;

      if (nowDelta > INTERVAL.EXPLORE) {
        lastExploreTime = nowTime;
        hasSome ||= clickBtn(d.exploreBtn);
      }
    }

    return hasSome;
  }

  /** @returns {boolean} */
  function unlockNamedTab (/** @type {CheatCtrl} */ ctrl,  /** @type {KittensTab} */ tab, /** @type {string[]} */ allowedIds) {
    const children =
      /** @type {KittensGame['libraryTab']} */ (tab).policyPanel?.children ||
      /** @type {KittensGame['religionTab']} */ (tab).ptPanel?.children[0].children ||
      /** @type {KittensGame['timeTab']} */ (tab).cfPanel?.children[0].children;

    return loopChildren(ctrl, [{ children }], unlockTabBtn, { allowedIds, isAll: false });
  }

  /** @returns {boolean} */
  function buyTabBtn (/** @type {CheatCtrl} */ ctrl, /** @type {KittensBtn} */ btn) {
    if (!ctrl.dryRun && btn.model.enabled && btn.model.visible && btn.model.stageLinks?.find((l) => l.enabled && l.handler.name === 'upgradeHandler')?.handler.call(noop, noop, noop)) {
      return true;
    }

    const check = checkBuilding(btn, ctrl.invalids, { withCap: true, withFill: !ctrl.dryRun });

    return check.isBuildable && (ctrl.dryRun || clickBtn(btn, !check.isUncapped && !!btn.model.metadata && btn.model.metadata.on >= 1));
  }

  /** @returns {boolean} */
  function sellTabBtn (/** @type {CheatCtrl} */ ctrl, /** @type {KittensBtn} */ btn) {
    if (!ctrl.dryRun && btn.model.metadata?.val && btn.model.metadata.name !== 'chronosphere') {
      btn.controller.sellInternal(btn.model, 0, false);
      return true;
    }

    return false;
  }

  /** @returns {(ctrl: CheatCtrl, tab: KittensTab) => boolean} */
  function buildTab (/** @type {(ctrl: CheatCtrl, btn: KittensBtn) => boolean} */ buttonFn) {
    return (/** @type {CheatCtrl} */ ctrl, /** @type {KittensTab} */ tab) => {
      const areas =
        /** @type {KittensGame['spaceTab']} */ (tab).planetPanels ||
        [/** @type {KittensGame['bldTab']} */ (tab)];

      return loopChildren(ctrl, areas, buttonFn, { withMeta: true });
    }
  };

  /** @returns {CheatCtrl['stats']} */
  function execBuildAll (/** @type {number} */ delay, /** @type {boolean=} */ dryRun = false) {
    const /** @type {CheatCtrl} */ ctrl = { allowedTabs: [], completed: [], invalids: {}, dryRun, stats: {} };

    for (const t in cheatMap.tabs.all) {
      cheatMap.tabs.all[t]?.active && ctrl.allowedTabs.push(cheatMap.tabs.all[t].tab);
    }

    if (!dryRun && cheatMap.control.all.craft.active) {
      fillResources();

      for (const _name in cheatMap.crafting.all) {
        const name = /** @type {KittensNamedResCraft} */ (_name);
        const opt = cheatMap.crafting.all[name];

        if (opt && !opt.noMinCraft && !opt.active) {
          const craftFrac = SPEND.CRAFT[opt.missing ? 'MISSING' : 'TRICKLE'];

          if (opt.missing) {
            for (const p of game.workshop.getCraft(name).prices) {
              const pname = /** @type {KittensNamedResCraft} */ (p.name);

              if (game.resPool.get(pname).craftable) {
                const popt = cheatMap.crafting.all[pname];

                if (popt && !popt.noMinCraft && !popt.active && !popt.missing) {
                  execCraft(pname, craftFrac);
                }
              }
            }
          }

          execCraft(name, craftFrac);
        }
      }
    }

    loopTabs(ctrl, 'build', ['bldTab', 'spaceTab'], buildTab(buyTabBtn));
    loopTabs(ctrl, 'upgrade', ['diplomacyTab', 'libraryTab', 'religionTab', 'spaceTab', 'timeTab', 'workshopTab'], unlockTab);

    if (!dryRun) {
      const /** @type {KittensNamedPolicy[]} */ policies = ['authocracy', 'diplomacy', 'dragonRelationsAstrologers', 'epicurianism', 'extravagance', 'fascism', 'fullIndustrialization', 'griffinRelationsScouts', 'knowledgeSharing', 'lizardRelationsPriests', 'militarizeSpace', 'mysticism', 'nagaRelationsCultists', 'sharkRelationsScribes', 'siphoning', 'socialism', 'spiderRelationsPaleontologists', 'stripMining', 'technocracy', 'tradition', 'transkittenism', 'zebraRelationsBellicosity'];
      const /** @type {KittensNamedPact[]} */ pacts = ['pactOfCleansing', 'pactOfPurity', 'payDebt'];
      const /** @type {KittensNamedBldgTimeCF[]} */ cfbldgs = ['blastFurnace', 'ressourceRetrieval', 'temporalAccelerator', 'temporalImpedance', 'timeBoiler'];

      loopTabs(ctrl, 'sell', ['bldTab', 'spaceTab'], buildTab(sellTabBtn));
      loopTabs(ctrl, 'zig', ['religionTab'], buildZig);
      loopTabs(ctrl, 'crypto', ['religionTab'], buildTheology);
      loopTabs(ctrl, 'upgrade', ['libraryTab'], unlockNamedTab, policies);
      loopTabs(ctrl, 'pact', ['religionTab'], unlockNamedTab, pacts);
      loopTabs(ctrl, 'time', ['timeTab'], unlockNamedTab, cfbldgs, () =>
        game.getEffect('heatMax') < (40000 * (game.challenges.getChallenge('1000Years').researched ? 5 : 10) * (1 - (1 - (1 / (1 + game.getEffect('heatCompression'))))))
      );

      for (const _name in cheatMap.crafting.all) {
        const name = /** @type {keyof CheatMap['crafting']['all']} */ (_name);
        const opts = /** @type {CheatOpt} */ (cheatMap.crafting.all[name]);
        const missing = !!ctrl.invalids[name];

        if (missing !== opts.missing) {
          opts.missing = missing;
          opts.btn?.[ctrl.invalids[name] ? 'addClass' : 'removeClass']('missing');
        }
      }

      if (delay > 0) {
        ctrl.completed.length && $(game.msg(ctrl.completed.join(', ')).span).addClass('kittycheat-log');
        setTimeout(() => execBuildAll(delay), delay);
      }
    }

    return ctrl.stats;
  }

  /**
   * @description Doing a dry run, do a full calculation of the game state,
   * and then display a summary of this information.
   *
   * @returns {void}
   **/
  function execTextInfo (/** @type {number} */ delay) {
    const bld = execBuildAll(0, true);

    $('div#kittycheat-txt-drybld').html(`Buildings: ${bld.build?.join(', ') || '-'}`);
    $('div#kittycheat-txt-dryupg').html(`Upgrades : ${bld.upgrade?.join(', ') || '-'}`);
    $('div#kittycheat-txt-relzig').html(`Ziggurat : ${calcZiggurats().text || '-'}`);
    $('div#kittycheat-txt-relcry').html(`Theology : ${calcTheology()[0]?.text || '-'}`);
    $('div#kittycheat-txt-rellvl').html(`Transcend: ${calcTranscend()?.text || '-'}`);
    $('div#kittycheat-txt-bcoins').html(`Blackcoin: ${calcBcoin()?.text || '-'}`);

    setTimeout(() => execTextInfo(delay), delay);
  }

  /**
   * @description Execute all our cheap options. This looks through the full
   * cheapMap structure and then executes each option, unless it is on an own
   * timer. Once done, schedules the execution to repeat in the future.
   *
   * @returns {void}
   **/
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

  /**
   * @description Do the setup for the cheat controls and apply some game configuration. (Mostly around logging
   * and the actual options available)
   *
   * @returns {void}
   **/
  function setup () {
    $('head').append('<style type="text/css">#kittycheat { font-family: monospace; font-size: small; padding-bottom: 30px; } .kittycheat-btn { background: white; border-radius: 2px; border-width: 1px; font-family: monospace; font-size: small; margin-bottom: 2px; margin-right: 2px; padding: 1px 4px; } #game .kittycheat-btn.active { background: darkgreen; color: white; } .kittycheat-btn.danger { background: lightblue; border-style: dashed; } #game .kittycheat-btn.danger.active { background: darkblue; } .kittycheat-btn.missing { background: lightpink; } .kittycheat-btn.end { margin-right: 5px; } .kittycheat-btn.excl { margin-right: -2px; } .kittycheat-div { margin-bottom: 20px; } .kittycheat-div.small { margin-bottom: 5px; } .kittycheat-div.disabled { opacity: 0.33; } .kittycheat-log { font-family: monospace; opacity: 0.33; } .kittycheat-btn-grp { display: inline-block; } #game .kittycheat-btn-grp.nobr { white-space: nowrap; }</style>');

    const divAll = jqAppend($('div#leftColumn'), $('<div id="kittycheat"></div>'));
    const divAct = jqAppend(divAll, $('<div id="kittycheat-act" class="kittycheat-div"></div>'));
    const divTxt = jqAppend(divAll, $('<div id="kittycheat-txt" class="kittycheat-div"></div>'));

    for (const _group in cheatMap) {
      const group = /** @type {keyof CheatMap} */ (_group);
      const divGrp = cheatMap[group].div = jqAppend(divAct, $(`<div id="kittycheat-act-${group}" class="kittycheat-div"></div>`));
      const hasEnd = Object.values(cheatMap[group].all).find((o) => /** @type {CheatOpt} */ (o).end);
      let /** @type {jQuery | null} */ divBtnGrp = null;

      if (group !== 'control') {
        jqAppend(divGrp, $(`<div class="kittycheat-div small">${group}:</div>`));
      }

      activateGroup(group, cheatMap[group].active || cheatMap[group].noExec);

      for (const name in cheatMap[group].all) {
        const opts = /** @type {CheatOpt} */ (cheatMap[group].all[/** @type {keyof CheatMap[group]['all']} */ (name)]);

        divBtnGrp = divBtnGrp || jqAppend(divGrp, $(`<div class="kittycheat-btn-grp ${hasEnd ? 'nobr' : ''}"></div>`));

        if (!opts.noShow) {
          opts.btn = jqAppend(divBtnGrp, $(`<button class="kittycheat-btn ${opts.end ? 'end' : (opts.excl && !opts.excl.includes('sell')) ? 'excl' : ''} ${opts.danger ? 'danger' : ''}">${name}</button>`).click(() => {
            activateBtn(group, name, opts, !opts.active);
          }));

          activateBtn(group, name, opts, opts.active);

          if (opts.delay) {
            execOptTimer(group, name, opts);
          }

          if (opts.end) {
            divBtnGrp = null;
          }
        }
      }
    }

    for (const id of ['drybld', 'dryupg', 'relzig', 'relcry', 'rellvl', 'bcoins']) {
      jqAppend(divTxt, $(`<div id="kittycheat-txt-${id}" class="kittycheat-div small"></div>`));
    }

    game.console.maxMessages = 100;
    game.opts.hideSell = true;
    game.opts.noConfirm = true;

    for (const f of ['craft', 'faith', 'hunt', 'trade']) {
      game.console.filters[/** @type {keyof KittensGame['console']['filters']} */ (f)].enabled = false;
    }
  }

  /**
   * @description Start! Do the setup and then start the execution loops. Done. Profit.
   */
  setup();
  execOpts(INTERVAL.ALL.OPTION);
  execTextInfo(INTERVAL.ALL.TEXT);
  execBuildAll(INTERVAL.ALL.BUILD);
})(/** @type {WindowExt} */ (window).$, /** @type {WindowExt} */ (window).game);
