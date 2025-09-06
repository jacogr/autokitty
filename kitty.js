// @ts-check

/**
 * jQuery definitions
 *
 * @typedef {{
 *  append: (elem: jQuery) => jQuery,
 *  click: (fn?: () => unknown) => jQuery,
 *  css: (style: { [x: string]: string | number } | string, val?: string | number) => jQuery,
 *  filter: (fn: (index: number, elem: HTMLElement) => boolean) => jQuery,
 *  html: (html: string) => jQuery,
 *  length: number,
 *  text: () => string
 * }} jQuery
 *
 * @typedef {(elem: HTMLElement | string) => jQuery} JQuery
 */

/**
 * Kittens Game definitions
 *
 * @typedef {'craft' | 'faith' | 'hunt' | 'trade'} KittensNamedConsFilt
 *
 * @typedef {'chronosphere' | 'unicornPasture' | 'ziggurat'} KittensNamedBldgBld
 *
 * @typedef {'holyGenocide'} KittensNamedBldgCrypto
 *
 * @typedef {'blackPyramid' | 'unicornTomb' | 'ivoryTower' | 'ivoryCitadel' | 'skyPalace' | 'unicornUtopia' | 'sunspire'} KittensNamedBldgZU
 *
 * @typedef {KittensNamedBldgBld | KittensNamedBldgCrypto | KittensNamedBldgZU} KittensNamedBldg
 *
 * @typedef {'numeromancy' | 'unicornmancy'} KittensNamedPerk
 *
 * @typedef {'leviathans' | 'dragons' | 'zebras' | 'nagas' | 'spiders' | 'griffins' | 'lizards' | 'sharks'} KittensNamedRace
 *
 * @typedef {'alloy' | 'beam' | 'blackcoin' | 'bloodstone' | 'blueprint' | 'coal' | 'compedium' | 'concrate' | 'culture' | 'eludium' | 'furs' | 'gear' | 'iron' | 'ivory' | 'karma' | 'kerosene' | 'manuscript' | 'megalith' | 'minerals' | 'necrocorn' | 'oil' | 'parchment' | 'plate' | 'relic' |'scaffold' |  'science' | 'ship' | 'slab' | 'starchart' | 'steel' | 'sorrow' | 'tMythril' | 'tears' | 'thorium' | 'timeCrystal' | 'titanium' | 'unicorns' | 'unobtainium' | 'uranium' | 'wood'} KittensNamedRes
 *
 * @typedef {'common' | 'exotic' | 'rare'} KittensNamedResType
 *
 * @typedef {'bldTab' | 'diplomacyTab' | 'libraryTab' | 'religionTab' | 'spaceTab' | 'timeTab' | 'villageTab' | 'workshopTab'} KittensNamedTab
 *
 * @typedef {{
 *  id: string,
 *  render: () => void,
 *  tabId: string,
 *  tabName: string,
 *  visible: boolean
 * }} KittensTab
 *
 * @typedef {{
 *  children: KittensBtn[]
 * }} KittensBtnPanel
 *
 * @typedef {{
 *  cathPollution: number,
 *  getBuildingExt: (name: KittensNamedBldg) => KittensBldg
 * }} KittensBld
 *
 * @typedef {KittensBtnPanel & KittensTab} KittensBldTab
 *
 * @typedef {{
 *  effects: KittensEffects,
 *  label: string,
 *  name: string,
 *  on: number,
 *  unlocked: boolean,
 *  val: number
 * }} KittensBldgMetadata
 *
 * @typedef {{
 *  enabled: boolean,
 *  metadata: KittensBldgMetadata,
 *  on: number,
 *  prices: KittensPrice[],
 *  visible: boolean
 * }} KittensBldgModel
 *
 * @typedef {{
 *  effects: KittensEffects,
 *  meta: KittensBldgMetadata,
 *  model?: KittensBldgModel,
 *  val: number
 * }} KittensBldg
 *
 * @typedef {{
 *  loadout: { pinned: boolean },
 *  name: string
 * }} KittensBtnOpts
 *
 * @typedef {{
 *  domNode: HTMLElement,
 *  id: string,
 *  model: KittensBldgModel,
 *  opts?: KittensBtnOpts
 * }} KittensBtn
 *
 * @typedef {{
 *  festivalEffects: { unicorns: number }
 * }} KittensCalendarCycle
 *
 * @typedef {{
 *  cryptoPrice: number,
 *  cycle: string,
 *  cycles: KittensCalendarCycle[],
 *  festivalDays: number,
 *  year: number
 * }} KittensCalendar
 *
 * @typedef {{
 *  filters: { [x in KittensNamedConsFilt]: { enabled: boolean } },
 *  maxMessages: number
 * }} KittensConsole
 *
 * @typedef {{
 *  name: KittensNamedRace,
 *  unlocked: boolean
 * }} KittensDiplomacyRace
 *
 * @typedef {{
 *  get: (name: KittensNamedRace) => KittensDiplomacyRace,
 *  unlockElders: () => void
 * }} KittensDiplomacy
 *
 * @typedef {{
 *  embassyButton: KittensBtn,
 *  race: KittensDiplomacyRace,
 *  feedBtn?: KittensBtn,
 *  tradeBtn: { tradeAllHref: { link: HTMLElement } }
 * }} KittensDiplomacyRacePanel
 *
 * @typedef {{
 *  exploreBtn: KittensBtn,
 *  racePanels: KittensDiplomacyRacePanel[],
 *  leviathansInfo: any
 * } & KittensTab} KittensDiplomacyTab
 *
 * @typedef {{
 *  cathPollutionPerTickProd: number,
 *  riftChance: number,
 *  unicornsPerTickBase: number,
 *  unicornsRatioReligion: number
 * }} KittensEffects
 *
 * @typedef {{
 *  noConfirm: boolean
 * }} KittensOpts
 *
 * @typedef {{
 *  researched: boolean
 * }} KittensPerk
 *
 * @typedef {{
 *  getParagonProductionRatio: () => number,
 *  getPerk: (name: KittensNamedPerk) => KittensPerk
 * }} KittensPrestige
 *
 * @typedef {{
 *  name: KittensNamedRes,
 *  val: number
 * }} KittensPrice
 *
 * @typedef {{
 *  _getTranscendNextPrice: () => number,
 *  faithRatio: number,
 *  getSolarRevolutionRatio: () => number,
 *  getZU: (name: KittensNamedBldgZU) => KittensBldg,
 *  praise: () => void,
 *  resetFaith: (n: number, b: boolean) => void
 * }} KittensReligion
 *
 * @typedef {{
 *  ctPanel: { children: KittensBtnPanel[] },
 *  praiseBtn: KittensBtn,
 *  rUpgradeButtons: KittensBtn[],
 *  sacrificeBtn: { model: { allLink: { handler: () => void } } },
 *  zgUpgradeButtons: KittensBtn[]
 * } & KittensTab} KittensReligionTab
 *
 * @typedef {{
 *  maxValue: number,
 *  name: KittensNamedRes,
 *  type: KittensNamedResType,
 *  unlocked: boolean,
 *  value: number,
 *  visible: boolean
 * }} KittensRes
 *
 * @typedef {{
 *  get: (name: KittensNamedRes) => KittensRes,
 *  resources: KittensRes[]
 * }} KittensResPool
 *
 * @typedef {{
 *  GCPanel: KittensBtnPanel,
 *  planetPanels: KittensBtnPanel[]
 * } & KittensTab} KittensSpaceTab
 *
 * @typedef {{
 * heat: number
 * }} KittensTime
 *
 * @typedef {{
 *  cfPanel: { children: KittensBtnPanel[] },
 *  vsPanel: { children: KittensBtnPanel[] }
 * } & KittensTab} KittensTimeTab
 *
 * @typedef {{
 *  activeTabId: string
 * }} KittensUI
 *
 * @typedef {{
 *  huntAll: () => void
 * }} KittensVillage
 *
 * @typedef {{
 *  buttons: KittensBtn[],
 *  promoteKittensBtn: KittensBtn
 * } & KittensTab} KittensVillageTab
 *
 * @typedef {{
 *  craft: (name: KittensNamedRes, count: number) => void,
 *  craftAll: (name: KittensNamedRes) => void,
 *  getCraftAllCount: (name: KittensNamedRes) => number
 * }} KittensWorkshop
 *
 * @typedef {{
 *  buttons: KittensBtn[]
 * } & KittensTab} KittensWorkshopTab
 *
 * @typedef {{
 *  bld: KittensBld,
 *  bldTab: KittensBldTab,
 *  calendar: KittensCalendar,
 *  console: KittensConsole,
 *  diplomacy: KittensDiplomacy,
 *  diplomacyTab: KittensDiplomacyTab,
 *  getEffect: (name: string) => number,
 *  getTicksPerSecondUI: () => number,
 *  msg: (text?: string) => { span: HTMLElement },
 *  opts: KittensOpts,
 *  prestige: KittensPrestige,
 *  religion: KittensReligion,
 *  religionTab: KittensReligionTab,
 *  resPool: KittensResPool,
 *  time: KittensTime,
 *  timeTab: KittensTimeTab,
 *  spaceTab: KittensSpaceTab,
 *  ui: KittensUI,
 *  village: KittensVillage,
 *  villageTab: KittensVillageTab,
 *  workshop: KittensWorkshop,
 *  workshopTab: KittensWorkshopTab
 * }} KittensGame
 */

/**
 * Kitty Cheat definitions
 *
 * @typedef {{
 *  active?: boolean,
 *  delay?: number,
 *  end?: boolean,
 *  excl?: string[],
 *  func?: () => void,
 *  group?: 'actions' | 'crafting' | 'trading',
 *  res?: { [x in KittensNamedRes]?: number },
 *  tab?: KittensNamedTab,
 *  trade?: boolean
 * }} CheatOptPartial
 *
 * @typedef {{
 *  btn: jQuery
 * } & CheatOptPartial} CheatOpt
 *
 * @typedef {{
 *  control: { active: true, all: { [x: string]: CheatOptPartial } },
 *  crafting: { active: boolean, all: { [x in KittensNamedRes]?: CheatOptPartial } },
 *  trading: { active: boolean, all: { [x in KittensNamedRace]: CheatOptPartial } },
 *  actions: { active: boolean, all: { [x: string]: CheatOptPartial } },
 *  tabs: { active: true, all: { [x: string]: CheatOptPartial } }
 * }} CheatMap
 *
 * @typedef {{
 *  frac: number,
 *  raw: number
 *  text: string
 * }} CheatPercent
 *
 * @typedef {{
 *  build?: string[],
 *  crypto?: string[],
 *  upgrade?: string[],
 *  zig?: string[]
 * }} CheatStats
 */

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
      // TODO: res is currently not used, remove or add
      active: false,
      all: {
        //'wood': {
        //  res: { 'catnip': 250 }
        //},
        'beam': {
          res: { 'wood': 250 },
          active: true
        },
        'slab': {
          res: { 'minerals': 250 },
          active: true
        },
        'steel': {
          res: { 'coal': 100 },
          active: true
        },
        'plate': {
          res: { 'iron': 125 },
          active: true
        },
        'gear': {
          res: { 'steel': 15 }
        },
        'concrate': {
          res: { 'steel': 25 }
        },
        'alloy': {
          res: { 'titanium': 10 }
        },
        'parchment': {
          res: { 'furs': 175 },
          active: true
        },
        'manuscript': {
          res: { 'parchment': 25, 'culture': 400 }
        },
        'compedium': {
          res: { 'manuscript': 50, 'science': 10000 }
        },
        'blueprint': {
          res: { 'compedium': 25, 'science': 25000 }
        },
        'kerosene': {
          res: { 'oil': 7500 },
          active: true
        },
        'megalith': {
          res: { 'beam': 2500 }
        },
        'scaffold': {
          res: { 'beam': 50 },
          active: true
        },
        'ship': {
          res: { 'starchart': 25 }
        },
        'eludium': {
          res: { 'unobtainium': 1000, 'alloy': 2500 }
        },
        'thorium': {
          res: { 'uranium': 250 },
          active: true
        },
        'bloodstone': {
          res: { 'timeCrystal': 5000, 'relic': 10000 }
        },
        'tMythril': {
          res: { 'bloodstone': 5 }
        }
      }
    },
    'trading': {
      active: false,
      all: {
        'leviathans': {
          res: { 'unobtainium': 5000 },
          trade: true,
          active: true
        },
        'dragons': {
          res: { 'titanium': 250 },
          trade: true,
          active: true
        },
        'zebras': {
          res: { 'slab': 50 },
          trade: true,
          active: true
        },
        'nagas': {
          res: { 'ivory': 500 },
          trade: true
        },
        'spiders': {
          res: { 'scaffold': 50 },
          trade: true
        },
        'griffins': {
          res: { 'wood': 500 },
          trade: true,
          active: true
        },
        'lizards': {
          res: { 'minerals': 1000 },
          trade: true,
          active: true
        },
        'sharks': {
          res: { 'iron': 100 },
          trade: true,
          active: true
        }
      }
    },
    'actions': {
      active: false,
      all: {
        'catnip': {
          func: () => {
            clickSpan('Gather catnip');
          },
          active: true,
          delay: INTERVAL.CATNIP_GATHER
        },
        'refine': {
          func: () => {
            fillResources('catnip');
            clickSpan('Refine catnip');
          },
          active: true,
          delay: INTERVAL.CATNIP_REFINE,
          end: true
        },
        'praise': {
          func: () => {
            fillResources('faith');
            game.religion.praise();
          },
          active: true,
          delay: INTERVAL.PRAISE
        },
        'adore': {
          func: fnAdore,
          active: true,
          delay: INTERVAL.ADORE,
          end: true
        },
        'observe': {
          func: () => {
            $('input#observeBtn').click();
          },
          active: true
        },
        'hunt': {
          func: () => {
            fillResources('manpower');
            game.village.huntAll();
          },
          active: true
        },
        'promote': {
          func: fnPromote,
          active: true,
          delay: INTERVAL.PROMOTE
        },
        'loadout': {
          func: fnLoadout,
          active: true,
          delay: INTERVAL.PROMOTE,
          end: true
        },
        'feed': {
          func: fnFeed,
          delay: INTERVAL.FEED
        },
        'bcoin': {
          func: fnTradeBcoin,
          active: true,
          delay: INTERVAL.BCOIN,
          end: true
        },
        'combust': {
          func: fnCombust,
          delay: INTERVAL.COMBUST,
          excl: ['40k']
        },
        '40k': {
          func: fnCombust40k,
          delay: INTERVAL.COMBUST,
          excl: ['combust'],
          end: true
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

  /**
   * @returns {void}
   */
  function noop () {}

  /**
   * @param {string} str
   * @returns {string}
   */
  function capitalizeFirst (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * @param {jQuery} parent
   * @param {jQuery} child
   * @returns {jQuery}
   */
  function jqAppend (parent, child) {
     parent.append(child);

     return child;
  }

  /**
   *
   * @param {CheatOpt} opts
   * @param {boolean} [active]
   * @returns {jQuery}
   */
  function activateBtn (opts, active = false) {
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

  /**
   * @param {jQuery} div
   * @param {boolean} [small]
   * @returns {jQuery}
   */
  function styleDiv (div, small = false) {
    return div.css({ 'margin-bottom': small ? '5px' : '20px' });
  }

  /**
   * @param {number} frac
   * @returns {CheatPercent | undefined}
   */
  function toPercent (frac) {
    if (frac > 0 && frac < Number.MAX_SAFE_INTEGER) {
      const raw = 100 * frac;

      return {
        frac,
        text: raw >= 100
          ? '>> 100%'
          : `${raw.toFixed(3)}%`,
        raw
      };
    }
  }

  /**
   * @param {string | null} [text]
   * @param {number} [retval]
   * @returns {number}
   */
  function echo (text, retval = 1) {
    !!retval && !!text && $(game.msg(text).span).css('opacity', 0.275);

    return retval;
  }

  /**
   * @param {KittensBtn | null | undefined} btn
   * @returns {string | undefined}
   */
  function getBtnName (btn) {
    return btn?.opts?.name || btn?.model?.metadata?.label;
  }

  /**
   * @param {KittensBtn | null | undefined} btn
   * @param {{ isAll?: boolean, isBatch?: boolean }} [opts]
   * @returns {number}
   */
  function clickDom (btn, opts = {}) {
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

  /**
   * @param {string} label
   * @returns {number}
   */
  function clickSpan (label) {
    const elem = $('span').filter((_, e) => $(e).text().indexOf(label) === 0);

    if (elem.length) {
      elem.click();

      return 1;
    }

    return 0;
  }

  /**
   * @template {KittensTab} T
   * @param {T | null | undefined} [tab]
   * @returns {T | null | undefined}
   */
  function renderBgTab (tab) {
    if (!tab?.visible) {
      return null;
    } else if (game.ui.activeTabId !== tab.tabId) {
      tab.render();
    }

    return tab;
  }

  /**
   * @param {KittensBtn} btn
   * @param {string | null} [skip]
   * @returns {KittensPrice[]}
   */
  function getInvalidPrices (btn, skip = null) {
    return btn.model.prices.filter((p) => {
      if (p.name === skip) {
        return false;
      }

      const r = game.resPool.get(p.name);

      return (p.val / r.value) > (
        r.type === 'exotic'
          ?  FRACTION.EXOTIC
          : r.name === 'karma' // type=rare, also affects neocorns
            ? FRACTION.KARMA
            : 1
      );
    });
  }

  /**
   * @param {string | null} [name]
   * @returns {void}
   */
  function fillResources (name = null) {
    if (!(cheatMap.control.all.resources.active || cheatMap.control.all.x10.active) && !name) {
      return;
    }

    for (const r of game.resPool.resources) {
      const max = r.maxValue * (cheatMap.control.all.x10.active ? 10 : 1);

      if (max && r.unlocked && r.visible && r.value < max && !['kittens', 'zebras'].includes(r.name) && (!name || r.name === name)) {
        r.value = max;
      }
    }
  }

  /**
   * @param {KittensPrice[]} prices
   * @param {number} zigguratRatio
   * @returns {number}
   */
  function calcZigguratsPrices (prices, zigguratRatio) {
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
   * @returns {{ err?: string, bestBuilding?: KittensNamedBldgZU | 'unicornPasture', bestPrices?: KittensPrice[] }}
   */
  function calcZiggurats () {
    // Adapted from Kitten Scientists
    // https://github.com/kitten-science/kitten-scientists/blob/804104d4ddc8b64e74f1ad5b448e0ca334fa6479/source/ReligionManager.ts#L246-L395
    try {
      /** @type {KittensNamedBldgZU[]} */
      const validBuildings = ['unicornTomb', 'ivoryTower', 'ivoryCitadel', 'skyPalace', 'unicornUtopia', 'sunspire'];
      const pastureImpl = game.bld.getBuildingExt('unicornPasture');
      const zigImpl = game.bld.getBuildingExt('ziggurat');
      const unicornsPerTickBase = pastureImpl?.meta.effects?.unicornsPerTickBase;

      if (!pastureImpl?.meta.unlocked || !pastureImpl.meta.on) {
        return { err: 'No pasture built' };
      } else if (!zigImpl?.meta.unlocked || !zigImpl.meta.on) {
        return { err: 'No ziggurat built' };
      } else if (!unicornsPerTickBase) {
        return { err: 'No ticks per base' };
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
      let riftChanceRatio = 1;

      if (game.prestige.getPerk('unicornmancy').researched) {
        riftChanceRatio *= 1.1;
      }

      // ?
      const unicornRiftChange = ((game.getEffect('riftChance') * riftChanceRatio) / (10000 * 2)) * baseUnicornsPerRift;

      // We now want to determine how quickly the cost of given building is neutralized
      // by its effect on production of unicorns.

      const pastureProduction = unicornsPerTickBase * game.getTicksPerSecondUI() * globalRatio * religionRatio * paragonRatio * faithBonus * cycleBonus;

      /** @type {KittensNamedBldgZU | 'unicornPasture'} */
      let bestBuilding = 'unicornPasture';
      let bestAmortization = Number.POSITIVE_INFINITY;
      let bestPrices = [];

      // If the unicorn pasture amortizes itself in less than infinity ticks,
      // set it as the default. This is likely to protect against cases where
      // production of unicorns is 0.
      if (pastureImpl.model?.prices) {
        const pastureAmortization = pastureImpl.model.prices[0].val / pastureProduction;

        if (pastureAmortization < bestAmortization) {
          bestAmortization = pastureAmortization;
          bestPrices = pastureImpl.model.prices;
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
        let religionBonus = religionRatio;
        let riftChance = game.getEffect('riftChance');

        for (const effect in buildingInfo.effects) {
          if (effect === 'unicornsRatioReligion') {
            religionBonus += buildingInfo.effects.unicornsRatioReligion;
          } else if (effect === 'riftChance') {
            riftChance += buildingInfo.effects.riftChance;
          }
        }

        // The rest should be straight forward.
        const unicornsPerRift = 500 * ((religionBonus - 1) * 0.1 + 1);
        let riftBonus = ((riftChance * riftChanceRatio) / (10000 * 2)) * unicornsPerRift;

        riftBonus -= unicornRiftChange;

        let buildingProduction = unicornsPerSecondBase * globalRatio * religionBonus * paragonRatio * faithBonus * cycleBonus;

        buildingProduction -= unicornsPerSecond;
        buildingProduction += riftBonus;

        const amortization = unicornPrice / buildingProduction;

        if ((amortization < bestAmortization) && (0 < riftBonus || (religionRatio < religionBonus && 0 < unicornPrice))) {
          bestAmortization = amortization;
          bestBuilding = building;
          bestPrices = buildingImpl.model.prices;
        }
      }

      return { bestBuilding, bestPrices };
    } catch (e) {
      console.error('Unicorns', e);
      return { err: 'Unable to calculate' };
    }
  }

  /**
   * @returns {{ action: 'buy' | 'hold' | 'sell', price: number, text: string } | null}
   */
  function calcBcoin () {
    try {
      const price = game.calendar.cryptoPrice;

      if (price) {
        const action = (
          price >= MAXVAL.BCOIN_SELL
            ? 'sell'
            : price <= MAXVAL.BCOIN_BUY
              ? 'buy'
              : 'hold'
        );

        return {
          action,
          price,
          text: `${action} @ ${price.toFixed(3)}R`
        };
      }
    } catch (e) {
      console.error('calcBcoin', e);
    }

    return null;
  }

  /**
   * @returns {CheatPercent | null | undefined}
   */
  function calcTranscend () {
    try {
      return toPercent(game.religion.faithRatio / game.religion._getTranscendNextPrice());
    } catch (e) {
      console.error('calcTranscend', e);
    }

    return null;
  }

  /**
   * @param {string} id
   * @returns {KittensBtn | undefined}
   */
  function findTheologyBld (id) {
    return game.religionTab.ctPanel.children[0].children.find((b) => b.id === id);
  }

  /**
   * @returns {{ bestBuilding: KittensNamedBldgCrypto, percent?: CheatPercent }[] | null}
   */
  function calcTheology () {
    try {
      return game.religionTab.ctPanel.children[0].children
        .filter((a) => {
          if ((a.id === 'holyGenocide') && (a.model.on >= MAXVAL.BLDG_GENOCIDE)) {
            return false;
          } else if (a.model.prices[0].name !== 'relic') {
            return false;
          }

          return !getInvalidPrices(a, 'relic').length;
        })
        .sort((a, b) => a.model.prices[0].val - b.model.prices[0].val)
        .map((a) => ({
          bestBuilding: /** @type KittensNamedBldgCrypto */ (a.id),
          percent: toPercent(game.resPool.get('relic').value / (a.model.prices[0].val * (1 / FRACTION.EXOTIC)))
        }));
    } catch (e) {
      console.error('calcTheology', e);
    }

    return null;
  }

  /**
   * @param {KittensNamedRace} name
   * @returns {void}
   */
  function execTrade (name) {
    if ((name === 'leviathans') && !game.diplomacy.get('leviathans').unlocked && game.religion.getZU('blackPyramid').val) {
      game.diplomacy.unlockElders();
    }

    renderBgTab(game.diplomacyTab)
      ?.racePanels.find((p) => p.race.name === name)
      ?.tradeBtn.tradeAllHref.link.click();
  }

  /**
   * @param {KittensNamedRes} name
   * @returns {void}
   */
  function execCraft (name) {
    const max = game.workshop.getCraftAllCount(name);

    if (max > 0 && max < Number.MAX_VALUE) {
      game.workshop.craft(name, Math.ceil(FRACTION.CRAFT * max));
    }
  }

  /**
   * @returns {void}
   */
  function fnAdore () {
    game.religion.resetFaith(1.01, false);
    clickDom(renderBgTab(game.religionTab)?.praiseBtn);
  }

  /**
   * @returns {void}
   */
  function fnPromote () {
    clickDom(renderBgTab(game.villageTab)?.promoteKittensBtn);
  }

  /**
   * @returns {void}
   */
  function fnLoadout () {
    clickDom(renderBgTab(game.villageTab)?.buttons.find((b) => b?.opts?.loadout?.pinned));
  }

  /**
   * @returns {void}
   */
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

  /**
   * @returns {void}
   */
  function fnCombust40k () {
    if (game.calendar.year < 40000) {
      fnCombust();
    } else {
      activateBtn(/** @type {CheatOpt} */ (cheatMap.actions.all['40k']), false);
    }
  }

  /**
   * @returns {KittensDiplomacyRacePanel | undefined}
   */
  function findLeviathans () {
    return game.diplomacyTab.racePanels.find((p) => p.race.name === 'leviathans');
  }

  /**
   * @returns {void}
   */
  function fnFeed () {
    if (game.resPool.get('necrocorn').value > 1 && renderBgTab(game.diplomacyTab)) {
      clickDom(findLeviathans()?.feedBtn);
    }
  }

  /**
   * @returns {void}
   */
  function fnTradeBcoin () {
    const info = calcBcoin();

    if (info?.price && info.action !== 'hold') {
      const bcoin = game.resPool.get('blackcoin').value;

      if (((info.action === 'sell' && bcoin > 0) || (info.action === 'buy' && bcoin === 0)) && renderBgTab(game.diplomacyTab)) {
        clickDom(findLeviathans()?.[`${info.action}Bcoin`]);
      }
    }
  }

  /**
   * @param {string} name
   * @param {CheatOpt} opts
   */
  function execOpt (name, opts) {
    try {
      if (opts.active) {
        if (opts.func) {
          opts.func();
        } else if (opts.trade) {
          execTrade(/** @type {KittensNamedRace} */ (name));
        } else {
          execCraft(/** @type {KittensNamedRes} */ (name));
        }
      }
    } catch (e) {
      console.error('execOpt', name, e);
    }
  }

  /**
   * @param {string} group
   * @param {string} name
   * @param {CheatOpt} opts
   */
  function execOptTimer (group, name, opts) {
    try {
      if (opts.active && cheatMap[group].active) {
        const isFillable = ['hunt', 'praise'].includes(name);

        isFillable && fillResources();
        execOpt(name, opts);
        isFillable && fillResources();
      }
    } catch (e) {
      console.error('execOptTimer', group, name, e);
    }

    setTimeout(() => execOptTimer(group, name, opts), opts.delay);
  }

  /**
   * @param {KittensBtn} [bld]
   * @returns {boolean}
   */
  function isZigBuildable (bld) {
    return !!bld?.model.visible && !getInvalidPrices(bld).length;
  }

  /**
   * @param {string} id
   * @returns {KittensBtn | undefined}
   */
  function findZigBld (id) {
    return game.religionTab.zgUpgradeButtons.find((b) => b.id === id);
  }

  /**
   * @param {string} id
   * @returns {{ bld?: KittensBtn, isBuildable: boolean, tears?: KittensPrice }}
   */
  function getZigInfo (id) {
    const bld = findZigBld(id);

    return {
      bld,
      isBuildable: isZigBuildable(bld),
      tears: bld?.model.prices.find((p) => p.name === 'tears')
    };
  }

  /**
   * @param {boolean} dryRun
   * @returns {number}
   */
  function buildZig (dryRun) {
    try {
      if (!renderBgTab(game.religionTab)) {
        return 0;
      }

      const uni = calcZiggurats();

      if (!uni.bestBuilding) {
        return 0;
      } else if (uni.bestBuilding === 'unicornPasture') {
        if (game.ui.activeTabId == game.bldTab.id) {
          const bld = game.bldTab.children.find((b) => b.model.metadata.name === uni.bestBuilding);

          if (isZigBuildable(bld)) {
            return dryRun ? 1 : echo(getBtnName(bld), clickDom(bld));
          }
        }

        return 0;
      }

      // first we see if we can do a black pyramid
      const blck = getZigInfo('blackPyramid');

      if (blck.isBuildable) {
        return dryRun ? 1 : echo(getBtnName(blck.bld), clickDom(blck.bld));
      }

      const best = getZigInfo(uni.bestBuilding);
      const mark = getZigInfo('marker');
      const next = (best.isBuildable && mark.tears) && (mark.isBuildable && best.tears)
        ? mark.tears.val <= best.tears.val
          ? mark
          : best
        : mark.isBuildable
          ? mark
          : best.isBuildable
            ? best
            : null;

      if (next) {
        return dryRun ? 1 : echo(getBtnName(next.bld), clickDom(next.bld));
      }

      const zigTears = game.resPool.get('tears').value + (game.bld.getBuildingExt('ziggurat').meta.on * game.resPool.get('unicorns').value / 2500);

      // only sacrifice when we do have enough available (only every 10 seconds)
      if (best.tears && zigTears > best.tears.val) {
        const nowTime = Date.now();
        const nowDelta = nowTime - lastSacrificeTime;

        if (!dryRun && nowDelta > INTERVAL.SACRIFICE) {
          lastSacrificeTime = nowTime;
          game.religionTab.sacrificeBtn.model.allLink.handler.call(game.religionTab.sacrificeBtn, noop, noop);
        }

        return 1;
      }

      return 0;
    } catch (e) {
      console.error('buildZig', e);
    }

    return 0;
  }

  /**
   * @param {KittensBtn | null | undefined} btn
   * @param {{ bestBuilding: KittensNamedBldgCrypto, percent?: CheatPercent }} best
   * @param {boolean} dryRun
   * @returns {number}
   */
  function buildTheologyBtn (btn, best, dryRun) {
    if (!btn || !best?.percent || best.percent.frac < 1 || getInvalidPrices(btn).length) {
      return 0;
    }

    return dryRun ? 1 : clickDom(btn);
  }

  /**
   * @param {boolean} dryRun
   * @returns {number}
   */
  function buildTheology (dryRun) {
    const done = [];
    let count = 0;

    try {
      if (!renderBgTab(game.religionTab)) {
        return 0;
      }

      const avail = calcTheology() || [];

      for (const best of avail) {
        const btn = game.religionTab.ctPanel.children[0].children.find((b) => b.id === best?.bestBuilding && b.model.visible && b.model.enabled);

        if (buildTheologyBtn(btn, best, dryRun)) {
          if (dryRun) {
            return 1;
          }

          pushBtnName(done, btn);
          count++;
        } else {
          break;
        }
      }
    } catch (e) {
      console.error('buildTheology', e);
    }

    if (done.length) {
      echo(done.join(', '));
    }

    return count;
  }

  /**
   * @param {KittensBtn} btn
   * @param {boolean} dryRun
   * @param {boolean} [isAll]
   * @returns {number}
   */
  function unlockTabBtn (btn, dryRun, isAll = false) {
    if (!btn?.model?.enabled || !btn.model.visible || !btn.model.metadata) {
      return 0;
    } else if (btn.id === 'cryochambers' && btn.model.on >= game.bld.getBuildingExt('chronosphere').meta.on) {
      return 0;
    }

    if (!dryRun) {
      fillResources();
    }

    if (getInvalidPrices(btn).length) {
      return 0;
    }

    return dryRun ? 1 : clickDom(btn, { isAll });
  }

  /**
   * @param {string[]} arr
   * @param {KittensBtn | null | undefined} btn
   */
  function pushBtnName (arr, btn) {
    const n = getBtnName(btn);

    n && arr.push(n);
  }

  /**
   * @param {KittensTab} tab
   * @param {boolean} dryRun
   * @returns {number}
   */
  function unlockTab (tab, dryRun) {
    const done = [];
    let count = 0;

    try {
      if (!renderBgTab(tab)) {
        return 0;
      }

      const buttons =
        /** @type {KittensReligionTab} */ (tab).rUpgradeButtons ||
        /** @type {KittensSpaceTab} */ (tab).GCPanel?.children ||
        /** @type {KittensDiplomacyTab} */ (tab).racePanels?.map((r) => r.embassyButton) ||
        /** @type {KittensTimeTab} */ (tab).vsPanel?.children[0]?.children ||
        /** @type {KittensWorkshopTab} */ (tab).buttons;

      // multi for religion & embassy upgrades
      const isAll = !!((/** @type {KittensReligionTab} */ (tab).rUpgradeButtons || /** @type {KittensDiplomacyTab} */ (tab).racePanels)?.length);

      for (const btn of buttons) {
        if (unlockTabBtn(btn, dryRun, isAll)) {
          if (dryRun) {
            return 1;
          }

          pushBtnName(done, btn);
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
    } catch (e) {
      console.error('unlockTab', tab?.tabName, e);
    }

    if (done.length) {
      echo(done.join(', '));
    }

    return count;
  }

  /**
   * @param {KittensBtn} btn
   * @param {boolean} dryRun
   * @returns {number}
   */
  function buildTabBtn (btn, dryRun) {
    const model = btn?.model;

    if (!model?.visible || !model.enabled || !model.metadata || (model.metadata.on !== model.metadata.val)) {
      return 0;
    } else if (!cheatMap.control.all.pollute.active && model.metadata.effects?.cathPollutionPerTickProd) {
      return 0;
    }

    if (!dryRun) {
      fillResources();
    }

    if (getInvalidPrices(btn).length) {
      return 0;
    }

    // at least something with a max
    const firstMax = model.prices.find((p) => game.resPool.get(p.name).maxValue > 0);
    let isAll = model.metadata.on >= 1;

    // without a max, we only build a single
    if (!firstMax && isAll) {
      if (!cheatMap.control.all.uncap.active) {
        return 0;
      }

      const fistInvalid = model.prices.find((p) => {
        const r = game.resPool.get(p.name);

        return !r.maxValue && ((p.val / r.value) > FRACTION.UNCAPPED);
      });

      if (fistInvalid) {
        return 0;
      }

      isAll = false;
    }

    return dryRun ? 1 : clickDom(btn, { isAll });
  }

  /**
   * @param {KittensTab} tab
   * @param {boolean} dryRun
   * @returns {number}
   */
  function buildTab (tab, dryRun) {
    const done = [];
    let count = 0;

    try {
      if (!renderBgTab(tab)) {
        return 0;
      }

      const areas =
        /** @type {KittensSpaceTab} */ (tab).planetPanels ||
        [/** @type {KittensBldTab} */ (tab)];

      for (const area of areas) {
        for (const btn of area.children) {
          if (buildTabBtn(btn, dryRun)) {
            if (dryRun) {
              return 1;
            }

            pushBtnName(done, btn);
            count++;
          }
        }
      }
    } catch (e) {
      console.error('buildTab', tab?.tabName, e);
    }

    if (done.length) {
      echo(done.join(', '));
    }

    return count;
  }

  /**
   * @param {boolean} dryRun
   * @param {CheatStats} stats
   * @param {keyof CheatStats} statsType
   * @param {KittensNamedTab[]} tabs
   * @param {(tab: KittensTab, dryRun: boolean) => number} fn
   * @returns {number}
   */
  function loopTabs (dryRun, stats, statsType, tabs, fn) {
    const allowedTabs = [];
    const indv = [];
    let total = 0;

    for (const t in cheatMap.tabs.all) {
      cheatMap.tabs.all[t].active && allowedTabs.push(cheatMap.tabs.all[t].tab);
    }

    for (const tab of tabs) {
      if (allowedTabs.includes(tab)) {
        const count = fn(game[tab], dryRun);

        if (count) {
          indv.push(game[tab].tabId);
          total += count;
        }
      }
    }

    if (total) {
      stats[statsType] = indv;
    }

    return total;
  }

  /**
   *
   * @param {number} delay
   * @param {boolean} [dryRun]
   * @returns {CheatStats}
   */
  function execBuildAll (delay, dryRun = false) {
    /** @type {CheatStats} */
    const stats = {};
    let total = 0;

    if (cheatMap.control.all.upgrade.active || dryRun) {
      total += loopTabs(dryRun, stats, 'upgrade', ['diplomacyTab', 'libraryTab', 'religionTab', 'spaceTab', 'timeTab', 'workshopTab'], unlockTab);
    }

    if (cheatMap.control.all.build.active || dryRun) {
      total += loopTabs(dryRun, stats, 'build', ['bldTab', 'spaceTab'], buildTab);
    }

    if (!dryRun) {
      if (cheatMap.control.all.zig.active) {
        total += loopTabs(dryRun, stats, 'zig', ['religionTab'], (_, dryRun) => buildZig(dryRun));
      }

      if (cheatMap.control.all.crypto.active) {
        total += loopTabs(dryRun, stats, 'crypto', ['religionTab'], (_, dryRun) => buildTheology(dryRun));
      }
    }

    if (delay) {
      setTimeout(() => execBuildAll(delay), Math.ceil(delay / (total ? 2 : 1)));
    }

    return stats;
  }

  /**
   * @param {number} delay
   */
  function execTextInfo (delay) {
    renderBgTab(game.religionTab);

    const next = execBuildAll(0, true);
    const zig = calcZiggurats();
    const cry = calcTheology();
    const trd = calcTranscend();
    const bcoin = calcBcoin();

    let zigText = /** @type {string | undefined} */ (zig.bestBuilding);

    if (zig.bestBuilding && zig.bestPrices) {
      const name = zig.bestBuilding === 'unicornPasture'
        ? 'Unic. Pasture'
        : findZigBld(zig.bestBuilding)?.opts?.name;

      if (name) {
        const zigguratRatio = game.bld.getBuildingExt('ziggurat').meta.on;
        const unicornTotal = ((game.resPool.get('tears').value * 2500) / zigguratRatio) + game.resPool.get('unicorns').value;
        const unicornPrice = calcZigguratsPrices(zig.bestPrices, zigguratRatio);

        zigText = `${name} ${toPercent(unicornTotal / unicornPrice)?.text || ''}`;
      }
    }

    const cryText = cry?.[0]?.bestBuilding && `${findTheologyBld(cry[0].bestBuilding)?.opts?.name} ${cry[0].percent?.text || ''}`;

    $('div#kittycheatTxtDryBld').html(`Buildings: ${next.build?.join(', ') || '-'}`);
    $('div#kittycheatTxtDryUpg').html(`Upgrades : ${next.upgrade?.join(', ') || '-'}`);
    $('div#kittycheatTxtRelZig').html(`Ziggurat : ${zigText || zig.err || '-'}`);
    $('div#kittycheatTxtRelCry').html(`Theology : ${cryText || '-'}`);
    $('div#kittycheatTxtRelLvl').html(`Transcend: ${trd?.text || '-'}`);
    $('div#kittycheatTxtBcoins').html(`Blackcoin: ${bcoin?.text || '-'}`);

    setTimeout(() => execTextInfo(delay), delay);
  }

  /**
   * @param {string} group
   * @returns {boolean}
   */
  function isExecGroup (group) {
    return group !== 'control' && group !== 'tabs';
  }

  /**
   * @param {number} delay
   */
  function execOpts (delay) {
    for (const group in cheatMap) {
      const { active, all } = cheatMap[group];

      if (active && isExecGroup(group)) {
        for (const m in all) {
          const o = all[m];

          if (o.active && !o.delay) {
            fillResources();
            execOpt(m, o);
          }
        }
      }
    }

    fillResources();

    setTimeout(() => execOpts(delay), delay);
  }

  /**
   * @param {string} group
   * @returns {string}
   */
  function getGroupId (group) {
    return `kittycheatAct${capitalizeFirst(group)}`;
  }

  /**
   * @param {string} group
   * @param {boolean} [active]
   */
  function activateGroup (group, active = false) {
    cheatMap[group].active = active;
    $(`div#${getGroupId(group)}`).css('opacity', active ? 1 : 0.33);
  }

  /**
   * @param {string} group
   * @param {string} name
   * @param {CheatOpt} opts
   */
  function clickOptBtn (group, name, opts) {
    activateBtn(opts, !opts.active);

    if (cheatMap[group].active) {
      if (opts.group) {
        activateGroup(opts.group, opts.active);
      } else if (opts.active) {
        if (opts.excl) {
          for (const e of opts.excl) {
            activateBtn(cheatMap[group].all[e], false);
          }
        }

        if (isExecGroup(group)) {
          execOpt(name, opts);
        }
      }
    }
  }

  /**
   * @returns {void}
   */
  function initCheat () {
    const divCont = jqAppend($('div#leftColumn'), $('<div id="kittycheat"></div>').css({
      'padding-bottom': '30px',
      'font-family': 'monospace',
      'font-size': 'small'
    }));
    const divActGroup = jqAppend(divCont, styleDiv($('<div id="kittycheatAct"></div>')));
    const divTxtGroup = jqAppend(divCont, styleDiv($('<div id="kittycheatTxt"></div>')));

    // add groups for all the options
    for (const group in cheatMap) {
      const { active, all } = cheatMap[group];
      const divGroup = jqAppend(divActGroup, styleDiv($(`<div id="${getGroupId(group)}"></div>`)));

      activateGroup(group, active);

      for (const name in all) {
        const opts = all[name];

        opts.btn = jqAppend(divGroup, $(`<button>${name}</button>`).click(() => {
          clickOptBtn(group, name, opts);
        }));

        activateBtn(opts, opts.active);

        if (opts.delay) {
          execOptTimer(group, name, opts);
        }
      }
    }

    for (const id of ['DryBld', 'DryUpg', 'RelZig', 'RelCry', 'RelLvl', 'Bcoins']) {
      jqAppend(divTxtGroup, styleDiv($(`<div id="kittycheatTxt${id}"></div>`), true));
    }
  }

  /**
   * @returns {void}
   */
  function initGame () {
    //adjust messages, switch off confirmation
    game.console.maxMessages = 100;
    game.opts.noConfirm = true;

    // these logs are very fast with this script
    for (const f of ['craft', 'faith', 'hunt', 'trade']) {
      game.console.filters[f].enabled = false;
    }
  }

  initGame();
  initCheat();
  execOpts(INTERVAL.ALL_OPT);
  execTextInfo(INTERVAL.ALL_TXT);
  execBuildAll(INTERVAL.ALL_BLD);
})(window['$'], window['game']);
