(() => {
  const game = window.game;
  const gamePage = window.gamePage;
  const $ = window.$;

  // spend a maxiumum of 1% of an exotic resource
  const FRACTION_EXOTIC = 0.01;

  // build at most 25 HGs - this is optimal for paragon
  const MAX_GENOCIDE = 25;

  const INTERVAL_EXPLORE = 5000;
  const INTERVAL_SACRIFICE = 10000;

  const isMax = {
    'build': { active: false },
    'upgrade': { active: false, end: true },
    'zig': { active: false },
    'crypto': { active: false, end: true },
    'max': { active: false, excl: ['x10'] },
    'x10': { active: false, excl: ['max'], end: true }
  };

  const combustCycles = {
    tenErasLink: 500,
    previousCycleLink: 45,
    nextCycleLink: 5
  };

  const styleBtn = (btn, opts) => {
    return btn.css({
      'background': opts.active ? 'red' : 'white',
      'color': opts.active ? 'white' : 'black',
      'font-family': 'monospace',
      'font-size': 'small',
      'border-radius': '2px',
      'border-width': '1px',
      'padding-inline': '4px',
      'margin-right': opts.end ? '5px' : '1px',
      'margin-bottom': '1px'
    });
  };

  const styleDiv = (div, small = false, extra = {}) => {
    return div.css({ ...extra, 'margin-bottom': small ? '5px' : '20px' });
  };

  const toPercent = (frac) => {
    if ((frac < 0) || (frac > Number.MAX_SAFE_INTEGER)) {
      return;
    }

    const raw = 100 * frac;

    return {
      frac,
      text: raw >= 999
        ? '>999.99%'
        : `${raw.toFixed(2)}%`,
      raw
    };
  };

  const noop = () => {};

  const clickDom = (btn, isMulti = false) => {
    if (btn?.domNode) {
      if (isMulti) {
        btn.domNode.dispatchEvent(new MouseEvent('click', { shiftKey: true }));
      } else {
        btn.domNode.click();
      }

      return 1;
    }

    return 0;
  };

  const clickSpan = (label) => {
    const span = $('span').filter(function() {
      return $(this).text().indexOf(label) === 0;
    });

    if (span.length) {
      span.click();

      return 1;
    }

    return 0;
  };

  const renderBgTab = (tab) => {
    if (game.ui.activeTabId !== tab.tabId) {
      tab.render();
    }
  };

  const getInvalidPrices = (prices) => {
    return prices.filter((p) => {
      const r = gamePage.resPool.get(p.name);

      return r.type === 'exotic'
        ? ((p.val / r.value) > FRACTION_EXOTIC)
        : (p.val > r.value)
    });
  };

  const hasResource = (vals = {}, isTrade = false) => {
    let cando = true;

    for (const key in vals) {
      if (cando) {
        const res = gamePage.resPool.get(key);

        cando = res.value >= vals[key];

        if (cando && !isTrade && res.maxValue > 0) {
          cando = (res.value / res.maxValue) >= 0.05;
        }
      }
    }

    return cando;
  };

  const fillResources = (name = null) => {
    if (!(isMax.max.active || isMax.x10.active) && !name) {
      return;
    }

    for (const r of game.resPool.resources) {
      const max = r.maxValue * (isMax.x10.active ? 10 : 1);

      if (max && r.unlocked && r.visible && r.value < max && !['kittens', 'zebras'].includes(r.name) && (!name || r.name === name)) {
        r.value = max;
      }
    }
  };

  const calcZigguratsPrices = (prices, zigguratRatio) => {
    let unicornPrice = 0;

    for (const price of prices) {
      if (price.name === 'unicorns') {
        unicornPrice += price.val;
      } else if (price.name === 'tears') {
        unicornPrice += (price.val * 2500) / zigguratRatio;
      }
    }

    return unicornPrice;
  };

  const calcZiggurats = () => {
    try {
      const validBuildings = ['unicornTomb', 'ivoryTower', 'ivoryCitadel', 'skyPalace', 'unicornUtopia', 'sunspire'];
      const pastureImpl = gamePage.bld.getBuildingExt('unicornPasture');
      const zigImpl = gamePage.bld.getBuildingExt('ziggurat');
      const unicornsPerTickBase = pastureImpl?.meta.effects?.unicornsPerTickBase;

      if (!pastureImpl || !pastureImpl.meta.unlocked || !pastureImpl.meta.on) {
        return { err: 'No pasture built' };
      } else if (!zigImpl || !zigImpl.meta.unlocked || !zigImpl.meta.on) {
        return { err: 'No ziggurat built' };
      } else if (!unicornsPerTickBase) {
        return { err: 'No ticks per base' };
      }

      // How many unicorns are produced per second.
      const unicornsPerSecondBase = gamePage.getEffect('unicornsPerTickBase') * gamePage.getTicksPerSecondUI();
      // Unicorn ratio modifier. For example, through 'unicorn selection'.
      const globalRatio = gamePage.getEffect('unicornsGlobalRatio') + 1;
      // The unicorn ratio modifier through religion buildings.
      const religionRatio = gamePage.getEffect('unicornsRatioReligion') + 1;
      // The ratio modifier through paragon.
      const paragonRatio = gamePage.prestige.getParagonProductionRatio() + 1;
      // Bonus from collected faith.
      const faithBonus = gamePage.religion.getSolarRevolutionRatio() + 1;

      const currentCycle = gamePage.calendar.cycles[gamePage.calendar.cycle];

      // The modifier applied by the current cycle and holding a festival.
      let cycleBonus = 1;

      // If the current cycle has an effect on unicorn production during festivals
      if (currentCycle.festivalEffects.unicorns !== undefined) {
        // Numeromancy is the metaphysics upgrade that grants bonuses based on cycles.
        if (gamePage.prestige.getPerk('numeromancy').researched && gamePage.calendar.festivalDays) {
          cycleBonus = currentCycle.festivalEffects.unicorns;
        }
      }

      const unicornsPerSecond = unicornsPerSecondBase * globalRatio * religionRatio * paragonRatio * faithBonus * cycleBonus;

      // Based on how many ziggurats we have.
      const zigguratRatio = Math.max(zigImpl.meta.on, 1);

      // How many unicorns do we receive in a unicorn rift?
      const baseUnicornsPerRift = 500 * (1 + gamePage.getEffect('unicornsRatioReligion') * 0.1);

      // How likely are unicorn rifts to happen? The unicornmancy metaphysics upgrade increases this chance.
      let riftChanceRatio = 1;

      if (gamePage.prestige.getPerk('unicornmancy').researched) {
        riftChanceRatio *= 1.1;
      }

      // ?
      const unicornRiftChange = ((gamePage.getEffect('riftChance') * riftChanceRatio) / (10000 * 2)) * baseUnicornsPerRift;

      // We now want to determine how quickly the cost of given building is neutralized
      // by its effect on production of unicorns.

      const pastureProduction = unicornsPerTickBase * gamePage.getTicksPerSecondUI() * globalRatio * religionRatio * paragonRatio * faithBonus * cycleBonus;

      // If the unicorn pasture amortizes itself in less than infinity ticks,
      // set it as the default. This is likely to protect against cases where
      // production of unicorns is 0.
      const pastureAmortization = pastureImpl.model?.prices[0].val / pastureProduction;

      let bestAmortization = Number.POSITIVE_INFINITY;
      let bestBuilding = 'unicornPasture';
      let bestPrices = pastureImpl.model?.prices || [];

      if (pastureAmortization < bestAmortization) {
        bestAmortization = pastureAmortization;
      }

      for (let i = 0; i < validBuildings.length; i++) {
        const building = validBuildings[i];
        const buildingImpl = gamePage.tabs[5].zgUpgradeButtons[i];

        if (!buildingImpl?.model.metadata.unlocked) {
          continue;
        }

        // Determine a price value for this building.
        const unicornPrice = calcZigguratsPrices(buildingImpl.model.prices, zigguratRatio);

        // Determine the effect the building will have on unicorn production and unicorn rifts.
        const buildingInfo = gamePage.religion.getZU(building);
        let religionBonus = religionRatio;
        let riftChance = gamePage.getEffect('riftChance');

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

        if (amortization < bestAmortization) {
          if (0 < riftBonus || (religionRatio < religionBonus && 0 < unicornPrice)) {
            bestAmortization = amortization;
            bestBuilding = building;
            bestPrices = buildingImpl.model.prices;
          }
        }
      }

      return { bestBuilding, bestPrices };
    } catch (e) {
      console.error('Unicorns', e);
      return { err: 'Unable to calculate' };
    }
  };

  const calcTranscend = () => {
    try {
      return toPercent(game.religion.faithRatio / game.religion._getTranscendNextPrice());
    } catch (e) {
      console.error('calcTranscend', e);
    }

    return null;
  };

  const calcTheology = () => {
    try {
      const best = gamePage.religionTab.ctPanel.children[0].children
        .filter((a) => {
          if ((a.id === 'holyGenocide') && (a.model.on >= MAX_GENOCIDE)) {
            return false;
          } else if (a.model.prices[0].name !== 'relic') {
            return false;
          }

          const invalids = getInvalidPrices(a.model.prices);

          return (invalids.length === 0) || ((invalids.length === 1) && (invalids[0].name === 'relic'));
        })
        .sort((a, b) => a.model.prices[0].val - b.model.prices[0].val)[0];

      if (best) {
        return {
          bestBuilding: best.id,
          percent: toPercent(best.model.prices[0].val / gamePage.resPool.get('relic').value)
        };
      }
    } catch (e) {
      console.error('calcTheology', e);
    }

    return null;
  };

  const execTrade = (name) => {
    if ((name === 'leviathans') && (gamePage.religion.getZU('blackPyramid').val > 0) && (gamePage.diplomacy.get('leviathans').unlocked === false)) {
      gamePage.diplomacy.unlockElders();
    }

    gamePage.diplomacyTab.racePanels.find((p) => p.race.name === name)?.tradeBtn.tradeAllHref.link.click();
  };

  const execCraft = (name) => {
    const iswood = (name === 'wood');
    const iswinter = (gamePage.calendar.season === 3);
    const isautum = (gamePage.calendar.season === 2) && (gamePage.calendar.day >= 75);

    if (!iswood || (!iswinter && !isautum)) {
      gamePage.craftAll(name);
    }
  };

  const fnAdore = () => {
    game.religion.resetFaith(1.01, false);
    clickDom(gamePage.religionTab?.praiseBtn);
  };

  const fnCombust = () => {
    const res = Object
      .entries(combustCycles)
      .map(([cycle, div]) => ({
        cycle,
        count: Math.floor(((game.getEffect('heatMax') - game.time.heat) / div) / 10)
      }))
      .find((r) => r.count > 0);

    if (res) {
      renderBgTab(gamePage.timeTab);

      const btn = gamePage.timeTab.cfPanel.children[0].children[0];

      btn.model[res.cycle].handler.call(btn);
    }
  };

  const fnFeed = () => {
    if (gamePage.resPool.get('necrocorn').value > 1) {
      renderBgTab(gamePage.diplomacyTab)

      clickDom(gamePage.diplomacyTab.racePanels.find((p) => p.race.name === 'leviathans')?.feedBtn);
    }
  };

  const execOpt = (name, opts) => {
    try {
      if (opts.active && hasResource(opts.res, opts.trade)) {
        if (opts.func) {
          opts.func();
        } else if (opts.trade) {
          execTrade(name);
        } else {
          execCraft(name);
        }
      }
    } catch (e) {
      console.error('execOpt', name, e);
    }
  };

  const execOptTimer = (name, opts) => {
    try {
      if (opts.active) {
        const isFillable = ['hunt', 'praise'].includes(name);

        if (isFillable) {
          fillResources();
        }

        execOpt(name, opts);

        if (isFillable) {
          fillResources();
        }
      }
    } catch (e) {
      console.error('execOptTimer', name, e);
    }

    setTimeout(() => execOptTimer(name, opts), opts.delay);
  };

  const clickOptBtn = (btn, name, opts) => {
    opts.active = !opts.active;

    styleBtn(btn, opts);
    execOpt(name, opts);
  };

  let lastSacrificeTime = 0;

  const getTearsPrice = (bld) =>
    bld?.model.prices.find((p) => p.name === 'tears');

  const findZigBld = (id) =>
    gamePage.religionTab.zgUpgradeButtons.find((b) => b.id === id);

  const isBuildable = (bld) =>
    !!(bld && bld.model.visible) &&
    hasResource(bld.model.prices.reduce((o, { name, val }) => ({ ...o, [name]: val }), {}), true);

  const buildZig = (dryRun) => {
    try {
      renderBgTab(gamePage.religionTab);

      const uni = calcZiggurats();

      // we don't auto-build pastures (or nothing)
      if (!uni.bestBuilding || uni.bestBuilding === 'unicornPasture') {
        return 0;
      }

      // first we see if we can do a black pyramid
      const blck = findZigBld('blackPyramid');

      if (isBuildable(blck)) {
        return dryRun ? 1 : clickDom(blck);
      }

      const best = findZigBld(uni.bestBuilding);
      const mark = findZigBld('marker');

      const bv = isBuildable(best);
      const mv = isBuildable(mark);

      const bt = getTearsPrice(best);
      const mt = getTearsPrice(mark);

      if (bv || mv) {
        const next = (bv && mv)
          ? ((mt.val <= bt.val) ? mark : best)
          : (mv ? mark : best);

        return dryRun ? 1 : clickDom(next);
      }

      const zigTears = gamePage.resPool.get('tears').value + (gamePage.bld.getBuildingExt('ziggurat').meta.on * gamePage.resPool.get('unicorns').value / 2500);

      // only sacrifice when we do have enough available (only every 10 seconds)
      if (bt && zigTears > bt.val) {
        const nowTime = Date.now();
        const nowDelta = nowTime - lastSacrificeTime;

        if (!dryRun && nowDelta > INTERVAL_SACRIFICE) {
          lastSacrificeTime = nowTime;
          gamePage.religionTab.sacrificeBtn.model.allLink.handler.call(gamePage.religionTab.sacrificeBtn, noop, noop);
        }

        return 1;
      }

      return 0;
    } catch (e) {
      console.error('buildZig', e);
    }

    return 0;
  };

  const buildTheology = (dryRun) => {
    try {
      renderBgTab(gamePage.religionTab);

      const best = calcTheology();

      if (!best || !best.percent || best.percent.frac > FRACTION_EXOTIC) {
        return 0;
      }

      const cld = gamePage.religionTab.ctPanel.children[0].children;
      const bld = cld.find((b) => b.id === best.bestBuilding && b.model.visible && b.model.enabled);

      if (!bld) {
        return 0;
      }

      return dryRun ? 1 : clickDom(bld);
    } catch (e) {
      console.error('buildTheology', e);
    }

    return 0;
  };

  const unlockTabBtn = (btn, dryRun) => {
    if (!btn?.model?.enabled || !btn.model.visible || !btn.model.metadata) {
      return 0;
    } else if (getInvalidPrices(btn.model.prices).length) {
      return 0;
    }

    return  dryRun ? 1 : clickDom(btn);
  };

  let lastExploreTime = 0;

  const unlockTab = (tab, dryRun) => {
    let count = 0;

    try {
      if (!tab.visible) {
        return 0;
      }

      renderBgTab(tab);

      const buttons =
        // religion
        tab.rUpgradeButtons ||
        // space
        tab.GCPanel?.children ||
        // trade
        tab.racePanels?.map((r) => r.embassyButton) ||
        // time
        tab.vsPanel?.children[0]?.children ||
        // science, workshop
        tab.buttons;

      for (const btn of buttons) {
        count += unlockTabBtn(btn, dryRun);
      }

      // for trade, unlock new races to trade with
      if (tab.exploreBtn && tab.racePanels) {
        const maxRaces = tab.leviathansInfo ? 8 : 7;

        if (tab.racePanels.length !== maxRaces) {
          const nowTime = Date.now();
          const nowDelta = nowTime - lastExploreTime;

          if (nowDelta > INTERVAL_EXPLORE) {
            lastExploreTime = nowTime;
            count += dryRun ? 1 : clickDom(tab.exploreBtn);
          }
        }
      }
    } catch (e) {
      console.error('unlockTab', tab?.tabName, e);
    }

    return count;
  };

  const buildTabBtn = (btn, dryRun) => {
    const model = btn?.model;

    // don't buy invisible or switched off
    if (!model?.enabled || !model.visible || !model.metadata || (model.metadata.on !== model.metadata.val)) {
      return 0;
    }

    // max resources
    if (!dryRun) {
      fillResources();
    }

    if (getInvalidPrices(model.prices).length) {
      return 0;
    }

    // at least something with a max
    const firstMax = model.prices.find((p) => gamePage.resPool.get(p.name).maxValue > 0);
    const hasSome = model.metadata.on >= 1;

    // without a max, we only build a single
    if (!firstMax && hasSome) {
      return 0;
    }

    return dryRun ? 1 : clickDom(btn, hasSome);
  };

  const buildTab = (tab, dryRun) => {
    let count = 0;

    try {
      // for builds, we always want the tab visible & active
      if (!tab.visible) {
        return 0;
      } else if (dryRun) {
        renderBgTab(tab);
      } else if (game.ui.activeTabId !== tab.tabId) {
        return 0;
      }

      const areas =
        // space
        tab.planetPanels ||
        // others
        [tab];

      for (const area of areas) {
        for (const child of area.children) {
          count += buildTabBtn(child, dryRun);
        }
      }
    } catch (e) {
      console.error('buildTab', tab?.tabName, e);
    }

    return count;
  };

  const loopTabs = (dryRun, stats, statsType, tabs, fn) => {
    const indv = [];
    let total = 0;

    for (const tab of tabs) {
      const count = fn(gamePage[tab], dryRun);

      if (count) {
        indv.push({ name: gamePage[tab].tabId, count });
        total += count;
      }
    }

    if (total) {
      stats[statsType] = { total, indv };
    }

    return total;
  };

  const execBuildAll = (delay, dryRun = false) => {
    const stats = {};
    let total = 0;

    if (isMax.upgrade.active || dryRun) {
      total += loopTabs(dryRun, stats, 'upgrade', ['diplomacyTab', 'libraryTab', 'religionTab', 'spaceTab', 'timeTab', 'workshopTab'], unlockTab);
    }

    if (isMax.build.active || dryRun) {
      total += loopTabs(dryRun, stats, 'build', ['bldTab', 'spaceTab'], buildTab);
    }

    if (!dryRun) {
      if (isMax.zig.active) {
        total += loopTabs(dryRun, stats, 'zig', ['religionTab'], (_, dryRun) => buildZig(dryRun));
      }

      if (isMax.crypto.active) {
        total += loopTabs(dryRun, stats, 'crypto', ['religionTab'], (_, dryRun) => buildTheology(dryRun));
      }
    }

    if (delay) {
      setTimeout(() => execBuildAll(delay), Math.ceil(delay / (total ? 5 : 1)));
    }

    return { stats, total };
  };

  const execTextInfo = (delay) => {
    const concatNext = (s) =>
      s?.indv.map((e) => e.name).join(', ');

    renderBgTab(gamePage.religionTab);

    const next = execBuildAll(0, true);
    const zig = calcZiggurats();
    const cry = calcTheology();
    const trd = calcTranscend();
    let zigText = zig.bestBuilding;

    if (zig.bestBuilding && zig.bestPrices) {
      const zigguratRatio = Math.max(gamePage.bld.getBuildingExt('ziggurat').meta.on, 1);
      const unicornTotal = ((gamePage.resPool.get('tears').value * 2500) / zigguratRatio) + gamePage.resPool.get('unicorns').value;
      const unicornPrice = calcZigguratsPrices(zig.bestPrices, zigguratRatio);
      const calc = toPercent(unicornTotal / unicornPrice);

      zigText = zig.bestBuilding + (calc ? `, ${calc.text}` : '');
    }

    const cryText = cry && (
      (cry.bestBuilding === 'singularity' ? 'eventHorizon' : cry.bestBuilding) +
      (cry.percent ? `, ${cry.percent.text}` : '')
    );

    const bcoinText = game.calendar.cryptoPrice && (
      game.calendar.cryptoPrice >= 1025
        ? `Sell, ${game.calendar.cryptoPrice.toFixed(3)}`
        : game.calendar.cryptoPrice <= 900
          ? `Buy, ${game.calendar.cryptoPrice.toFixed(3)}`
          : `Hold, ${game.calendar.cryptoPrice.toFixed(3)}`
    );

    $('div#kittycheatDryrunBuild').html(`Buildings: ${concatNext(next.stats.build) || '-'}`);
    $('div#kittycheatDryrunUpgrd').html(`Upgrades : ${concatNext(next.stats.upgrade) || '-'}`);
    $('div#kittycheatZiggurat').html(`Ziggurat : ${zigText || zig.err || '-'}`);
    $('div#kittycheatTheology').html(`Theology : ${cryText || '-'}`);
    $('div#kittycheatTranscend').html(`Transcend: ${trd?.text || '-'}`);
    $('div#kittycheatBlackcoin').html(`Blackcoin: ${bcoinText || '-'}`);

    setTimeout(() => execTextInfo(delay), delay);
  };

  const kittycheatOpts = Object.values({
    'crafting': {
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
        res: { 'beam': 50 }
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
    },
    'trading': {
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
    },
    'actions': {
      'catnip': {
        func: () => {
          clickSpan('Gather catnip');
        },
        active: true,
        delay: 5
      },
      'refine': {
        func: () => {
          fillResources('catnip');
          clickSpan('Refine catnip');
        },
        active: true,
        delay: 1000
      },
      'observe': {
        func: () => {
          $('input#observeBtn').click();
        },
        active: true
      },
      'praise': {
        func: () => {
          fillResources('faith');
          gamePage.religion.praise();
        },
        active: true,
        delay: 25
      },
      'adore': {
        func: fnAdore,
        active: true,
        delay: 120000
      },
      'hunt': {
        func: () => {
          fillResources('manpower');
          gamePage.village.huntAll();
        },
        active: true
      },
      'tc combust': {
        func: fnCombust,
        active: false,
        delay: 1000
      },
      'feeding': {
        func: fnFeed,
        active: false,
        delay: 60000
      }
    }
  });

  const execOpts = (delay) => {
    for (const group of kittycheatOpts) {
      for (const n in group) {
        const o = group[n];

        if (o.active && !o.delay) {
          fillResources();
          execOpt(n, o);
        }
      }
    }

    fillResources();

    setTimeout(() => execOpts(delay), delay);
  };

  const divCont = $('<div></div>').css({
    'padding-bottom': '30px',
    'font-family': 'monospace',
    'font-size': 'small'
  });
  const divIwGroup = styleDiv($('<div></div>'));
  const divTxGroup = styleDiv($('<div></div>'));

  $('div#leftColumn').append(divCont);

  divCont.append(divIwGroup);

  // add groups for all the options
  for (const group of kittycheatOpts) {
    const divGroup = styleDiv($('<div></div>'));

    divCont.append(divGroup);

    for (const optname in group) {
      const opts = group[optname];

      opts.active = opts.active || false;

      const btn = $(`<button>${optname}</button>`).click(() => {
        clickOptBtn(btn, optname, opts);
      });

      divGroup.append(styleBtn(btn, opts));

      if (opts.delay) {
        execOptTimer(optname, opts);
      }
    }
  }

  // building setup
  for (const id in isMax) {
    const btn = $(`<button>${id}</button>`).click(() => {
      isMax[id].active = !isMax[id].active;

      if (isMax[id].active && isMax[id].excl) {
        for (const o of isMax[id].excl) {
          isMax[o].active = false;
          styleBtn(isMax[o].btn, isMax[o]);
        }
      }

      styleBtn(btn, isMax[id]);
    });

    isMax[id].btn = btn;
    divIwGroup.append(styleBtn(btn, isMax[id]));
  }

  divCont.append(divTxGroup);

  for (const id of ['DryrunBuild', 'DryrunUpgrd', 'Ziggurat', 'Theology', 'Transcend', 'Blackcoin']) {
    divTxGroup.append(styleDiv($(`<div id="kittycheat${id}"></div>`), true));
  }

  // switch off confirmation, i.e. we use shift clicks for building
  game.opts.noConfirm = true;

  // start the loops
  execOpts(99);
  execTextInfo(999);
  execBuildAll(999);
})();
