
(() => {
  const game = window.game;
  const gamePage = window.gamePage;
  const $ = window.$;

  const FRACTION = {
    // spend 1% maximum on any exotic
    EXOTIC: 0.01,
    // spend 50% maximum on karma
    KARMA: 0.5,
    // don't convert if we have less than 5% of the max
    CRAFT: 0.05,
    // build uncapped buildings when we use only 10% of resources
    UNCAPPED: 0.1
  };

  const MAXVAL = {
    // sell bcoin when it hits this amount (1100 is a crash)
    BCOIN_PRICE: 1050,
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

  const combustCycles = Object.entries({
    tenErasLink: 500,
    previousCycleLink: 45,
    nextCycleLink: 5
  });

  function noop () {}

  function capitalizeFirst (val) {
    return val.charAt(0).toUpperCase() + val.slice(1);
  }

  function jqAppend (parent, child) {
     parent.append(child);

     return child;
  }

  function activateGroup (groupname, active = false) {
    cheatMap[groupname].active = active;
    $(`div#${getGroupId(groupname)}`).animate({ opacity: active ? 1 : 0.33 }, 100);
  }

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

  function styleDiv (div, small = false, extra = {}) {
    return div.css({ ...extra, 'margin-bottom': small ? '5px' : '20px' });
  }

  function toPercent (frac) {
    if ((frac < 0) || (frac > Number.MAX_SAFE_INTEGER)) {
      return;
    }

    const raw = 100 * frac;

    return {
      frac,
      text: raw >= 100
        ? '>> 100%'
        : `${raw.toFixed(3)}%`,
      raw
    };
  }

  function echo (text) {
    if (text) {
      $(game.msg(text).span).css('opacity', 0.275);
    }
  }

  function getBtnName (btn) {
    return btn?.opts?.name || btn?.model?.metadata?.label;
  }

  function echoBtn (btn) {
    echo(getBtnName(btn));
  }

  function clickDom (btn, isMulti = false) {
    if (btn?.domNode) {
      if (isMulti) {
        btn.domNode.dispatchEvent(new MouseEvent('click', { shiftKey: true }));
      } else {
        btn.domNode.click();
      }

      return 1;
    }

    return 0;
  }

  function clickDomEcho (btn, isMulti = false) {
    if (clickDom(btn, isMulti)) {
      echoBtn(btn);

      return 1;
    }

    return 0;
  }

  function clickSpan (label) {
    const elem = $('span').filter(function() {
      return $(this).text().indexOf(label) === 0;
    });

    if (elem.length) {
      elem.click();

      return 1;
    }

    return 0;
  }

  function renderBgTab (tab) {
    if (game.ui.activeTabId !== tab.tabId) {
      tab.render();
    }
  }

  function getInvalidPrices (prices) {
    return prices.filter((p) => {
      const r = gamePage.resPool.get(p.name);

      return (p.val / r.value) > (
        r.type === 'exotic'
          ?  FRACTION.EXOTIC
          : r.name === 'karma' // type=rare, also affects neocorns
            ? FRACTION.KARMA
            : 1
      );
    });
  }

  function hasResource (vals = {}, isTrade = false) {
    let cando = true;

    for (const key in vals) {
      if (cando) {
        const res = gamePage.resPool.get(key);

        cando = res.value >= vals[key];

        if (cando && !isTrade && res.maxValue > 0) {
          cando = (res.value / res.maxValue) >= FRACTION.CRAFT;
        }
      }
    }

    return cando;
  }

  function fillResources (name = null) {
    if (!(cheatMap.control.resources.active || cheatMap.control.x10.active) && !name) {
      return;
    }

    for (const r of game.resPool.resources) {
      const max = r.maxValue * (cheatMap.control.x10.active ? 10 : 1);

      if (max && r.unlocked && r.visible && r.value < max && !['kittens', 'zebras'].includes(r.name) && (!name || r.name === name)) {
        r.value = max;
      }
    }
  }

  function calcZigguratsPrices (prices, zigguratRatio) {
    let unicornPrice = 0;

    for (const price of prices) {
      if (price.name === 'unicorns') {
        unicornPrice += price.val;
      } else if (price.name === 'tears') {
        unicornPrice += (price.val * 2500) / zigguratRatio;
      }
    }

    return unicornPrice;
  }

  function calcZiggurats () {
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

  function calcBcoin () {
    try {
      const price = game.calendar.cryptoPrice;

      if (price) {
        const action = (
          price >= MAXVAL.BCOIN_PRICE
            ? 'sell'
            : price <= 950
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

  function calcTranscend () {
    try {
      return toPercent(game.religion.faithRatio / game.religion._getTranscendNextPrice());
    } catch (e) {
      console.error('calcTranscend', e);
    }

    return null;
  }

  function findTheologyBld (id) {
    return gamePage.religionTab.ctPanel.children[0].children.find((b) => b.id === id);
  }

  function calcTheology () {
    try {
      const best = gamePage.religionTab.ctPanel.children[0].children
        .filter((a) => {
          if ((a.id === 'holyGenocide') && (a.model.on >= MAXVAL.BLDG_GENOCIDE)) {
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
          percent: toPercent(gamePage.resPool.get('relic').value / (best.model.prices[0].val * (1 / FRACTION.EXOTIC)))
        };
      }
    } catch (e) {
      console.error('calcTheology', e);
    }

    return null;
  }

  function execTrade (name) {
    if ((name === 'leviathans') && !gamePage.diplomacy.get('leviathans').unlocked && gamePage.religion.getZU('blackPyramid').val) {
      gamePage.diplomacy.unlockElders();
    }

    gamePage.diplomacyTab.racePanels.find((p) => p.race.name === name)?.tradeBtn.tradeAllHref.link.click();
  }

  function execCraft (name) {
    const iswood = (name === 'wood');
    const iswinter = (gamePage.calendar.season === 3);
    const isautum = (gamePage.calendar.season === 2) && (gamePage.calendar.day >= 75);

    if (!iswood || (!iswinter && !isautum)) {
      gamePage.craftAll(name);
    }
  }

  function fnAdore () {
    renderBgTab(gamePage.religionTab);

    game.religion.resetFaith(1.01, false);
    clickDom(gamePage.religionTab?.praiseBtn);
  }

  function fnPromote () {
    renderBgTab(gamePage.villageTab);

    clickDom(gamePage.villageTab?.promoteKittensBtn);
  }

  function fnCombust () {
    const res = combustCycles
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
  }

  function fnCombust40k () {
    if (game.calendar.year < 40000) {
      fnCombust();
    } else {
      activateBtn(cheatMap.actions['40k'], false);
    }
  }

  function findLeviathans () {
    return gamePage.diplomacyTab.racePanels.find((p) => p.race.name === 'leviathans');
  }

  function fnFeed () {
    if (gamePage.resPool.get('necrocorn').value > 1) {
      renderBgTab(gamePage.diplomacyTab)
      clickDom(findLeviathans()?.feedBtn);
    }
  }

  function fnSellBcoin () {
    const info = calcBcoin();

    if (info?.price >= MAXVAL.BCOIN_PRICE) {
      const res = gamePage.resPool.get('blackcoin');

      if (res.value > 0) {
        renderBgTab(gamePage.diplomacyTab);
        clickDom(findLeviathans()?.sellBcoin);
      }
    }
  }

  function execOpt (name, opts) {
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
  }

  function execOptTimer (group, name, opts) {
    try {
      if (opts.active && cheatMap[group].active) {
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

    setTimeout(() => execOptTimer(group, name, opts), opts.delay);
  }

  let lastSacrificeTime = 0;

  function getTearsPrice (bld) {
    return bld?.model.prices.find((p) => p.name === 'tears');
  }

  function findZigBld (id) {
    return gamePage.religionTab.zgUpgradeButtons.find((b) => b.id === id);
  }

  function isZigBuildable (bld) {
    return !!(bld && bld.model.visible) &&
    hasResource(bld.model.prices.reduce((o, { name, val }) => ({ ...o, [name]: val }), {}), true);
  }

  function buildZig (dryRun) {
    try {
      renderBgTab(gamePage.religionTab);

      const uni = calcZiggurats();

      if (!uni.bestBuilding) {
        return 0;
      } else if (uni.bestBuilding === 'unicornPasture') {
        if (game.ui.activeTabId == gamePage.bldTab.id) {
          const bld = gamePage.bldTab.children.find((b) => b.model.metadata.name === uni.bestBuilding);

          if (isZigBuildable(bld)) {
            return dryRun ? 1 : clickDomEcho(bld);
          }
        }

        return 0;
      }

      // first we see if we can do a black pyramid
      const blck = findZigBld('blackPyramid');

      if (isZigBuildable(blck)) {
        return dryRun ? 1 : clickDomEcho(blck);
      }

      const best = findZigBld(uni.bestBuilding);
      const mark = findZigBld('marker');

      const bv = isZigBuildable(best);
      const mv = isZigBuildable(mark);

      const bt = getTearsPrice(best);
      const mt = getTearsPrice(mark);

      if (bv || mv) {
        const next = (bv && mv)
          ? ((mt.val <= bt.val) ? mark : best)
          : (mv ? mark : best);

        return dryRun ? 1 : clickDomEcho(next);
      }

      const zigTears = gamePage.resPool.get('tears').value + (gamePage.bld.getBuildingExt('ziggurat').meta.on * gamePage.resPool.get('unicorns').value / 2500);

      // only sacrifice when we do have enough available (only every 10 seconds)
      if (bt && zigTears > bt.val) {
        const nowTime = Date.now();
        const nowDelta = nowTime - lastSacrificeTime;

        if (!dryRun && nowDelta > INTERVAL.SACRIFICE) {
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
  }

  function buildTheology (dryRun) {
    try {
      renderBgTab(gamePage.religionTab);

      const best = calcTheology();

      if (!best || !best.percent || best.percent.frac < 1) {
        return 0;
      }

      const cld = gamePage.religionTab.ctPanel.children[0].children;
      const bld = cld.find((b) => b.id === best.bestBuilding && b.model.visible && b.model.enabled);

      if (!bld) {
        return 0;
      }

      return dryRun ? 1 : clickDomEcho(bld);
    } catch (e) {
      console.error('buildTheology', e);
    }

    return 0;
  }

  function unlockTabBtn (btn, dryRun, isMulti = false) {
    if (!btn?.model?.enabled || !btn.model.visible || !btn.model.metadata) {
      return 0;
    } else if (getInvalidPrices(btn.model.prices).length) {
      return 0;
    } else if (btn.id === 'cryochambers' && btn.model.on >= gamePage.bld.getBuildingExt('chronosphere').meta.on) {
      return 0;
    }

    return  dryRun ? 1 : clickDom(btn, isMulti);
  }

  function pushBtnName (done, btn) {
    const n = getBtnName(btn);

    n && done.push(n);
  }

  let lastExploreTime = 0;

  function unlockTab (tab, dryRun) {
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
      const done = [];

      // multi for religion & embassy upgrades
      const isMulti = !!((tab.rUpgradeButtons || tab.racePanels)?.length);

      for (const btn of buttons) {
        const res = unlockTabBtn(btn, dryRun, isMulti);

        if (res) {
          pushBtnName(done, btn);
          count += res;

          if (dryRun) {
            return count;
          }
        }
      }

      if (done.length) {
        echo(done.join(', '));
      }

      // for trade, unlock new races to trade with
      if (tab.exploreBtn && tab.racePanels && tab.racePanels.length !== 8) {
        const maxRaces = tab.leviathansInfo
          ? 8 - (tab.racePanels.find((r) => r.race.name === 'leviathans') ? 0 : 1)
          : 7;

        if (tab.racePanels.length !== maxRaces) {
          const nowTime = Date.now();
          const nowDelta = nowTime - lastExploreTime;

          if (nowDelta > INTERVAL.EXPLORE) {
            lastExploreTime = nowTime;
            count += dryRun ? 1 : clickDom(tab.exploreBtn);
          }
        }
      }
    } catch (e) {
      console.error('unlockTab', tab?.tabName, e);
    }

    return count;
  }

  function buildTabBtn (btn, dryRun) {
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
    let buildMulti = model.metadata.on >= 1;

    // without a max, we only build a single
    if (!firstMax && buildMulti) {
      const fistInvalid = model.prices.find((p) => {
        const r = gamePage.resPool.get(p.name);

        return !r.maxValue && ((p.val / r.value) > FRACTION.UNCAPPED);
      });

      if (fistInvalid) {
        return 0;
      }

      // only build a single
      buildMulti = false;
    }

    return dryRun ? 1 : clickDom(btn, buildMulti);
  }

  function buildTab (tab, dryRun) {
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
      const done = [];

      for (const area of areas) {
        for (const btn of area.children) {
          const res = buildTabBtn(btn, dryRun);

          if (res) {
            pushBtnName(done, btn);
            count += res;

            if (dryRun) {
              return count;
            }
          }
        }
      }

      if (done.length) {
        echo(done.join(', '));
      }
    } catch (e) {
      console.error('buildTab', tab?.tabName, e);
    }

    return count;
  }

  function loopTabs (dryRun, stats, statsType, tabs, fn) {
    const indv = [];
    let total = 0;

    for (const tab of tabs) {
      const count = fn(gamePage[tab], dryRun);

      if (count) {
        indv.push(gamePage[tab].tabId);
        total += count;
      }
    }

    if (total) {
      stats[statsType] = indv;
    }

    return total;
  }

  function execBuildAll (delay, dryRun = false) {
    const stats = {};
    let total = 0;

    if (cheatMap.control.upgrade.active || dryRun) {
      total += loopTabs(dryRun, stats, 'upgrade', ['diplomacyTab', 'libraryTab', 'religionTab', 'spaceTab', 'timeTab', 'workshopTab'], unlockTab);
    }

    if (cheatMap.control.build.active || dryRun) {
      total += loopTabs(dryRun, stats, 'build', ['bldTab', 'spaceTab'], buildTab);
    }

    if (!dryRun) {
      if (cheatMap.control.zig.active) {
        total += loopTabs(dryRun, stats, 'zig', ['religionTab'], (_, dryRun) => buildZig(dryRun));
      }

      if (cheatMap.control.crypto.active) {
        total += loopTabs(dryRun, stats, 'crypto', ['religionTab'], (_, dryRun) => buildTheology(dryRun));
      }
    }

    if (delay) {
      setTimeout(() => execBuildAll(delay), Math.ceil(delay / (total ? 3 : 1)));
    }

    return stats;
  }

  function execTextInfo (delay) {
    renderBgTab(gamePage.religionTab);

    const next = execBuildAll(0, true);
    const zig = calcZiggurats();
    const cry = calcTheology();
    const trd = calcTranscend();
    const bcoin = calcBcoin();
    let zigText = zig.bestBuilding;

    if (zig.bestBuilding && zig.bestPrices) {
      const bld = findZigBld(zig.bestBuilding);
      const zigguratRatio = Math.max(gamePage.bld.getBuildingExt('ziggurat').meta.on, 1);
      const unicornTotal = ((gamePage.resPool.get('tears').value * 2500) / zigguratRatio) + gamePage.resPool.get('unicorns').value;
      const unicornPrice = calcZigguratsPrices(zig.bestPrices, zigguratRatio);
      const calc = toPercent(unicornTotal / unicornPrice);

      const name = bld?.opts.name || (zig.bestBuilding === 'unicornPasture' && 'Unic. Pasture');

      if (name) {
        zigText = name + (calc ? `, ${calc.text}` : '');
      }
    }

    const cryText = cry && (
      findTheologyBld(cry.bestBuilding).opts.name +
      (cry.percent ? `, ${cry.percent.text}` : '')
    );

    $('div#kittycheatTxtDryBld').html(`Buildings: ${next.build?.join(', ') || '-'}`);
    $('div#kittycheatTxtDryUpg').html(`Upgrades : ${next.upgrade?.join(', ') || '-'}`);
    $('div#kittycheatTxtRelZig').html(`Ziggurat : ${zigText || zig.err || '-'}`);
    $('div#kittycheatTxtRelCry').html(`Theology : ${cryText || '-'}`);
    $('div#kittycheatTxtRelLvl').html(`Transcend: ${trd?.text || '-'}`);
    $('div#kittycheatTxtBcoins').html(`Blackcoin: ${bcoin?.text || '-'}`);

    setTimeout(() => execTextInfo(delay), delay);
  }

  const cheatMap = {
    'control': {
      active: true,
      'build': { active: false },
      'upgrade': { active: false, end: true },
      'craft': { active: false, group: 'crafting' },
      'trade': { active: false, group: 'trading' },
      'exec': { active: false, group: 'actions', end: true },
      'zig': { active: false },
      'crypto': { active: false, end: true },
      'resources': { active: false, excl: ['x10'] },
      'x10': { active: false, excl: ['resources'], end: true }
    },
    'crafting': {
      active: false,
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
      active: false,
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
      active: false,
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
          gamePage.religion.praise();
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
          gamePage.village.huntAll();
        },
        active: true
      },
      'promote': {
        func: fnPromote,
        active: true,
        delay: INTERVAL.PROMOTE,
        end: true
      },
      'feed': {
        func: fnFeed,
        active: false,
        delay: INTERVAL.FEED
      },
      'bcoin': {
        func: fnSellBcoin,
        active: true,
        delay: INTERVAL.BCOIN,
        end: true
      },
      'combust': {
        func: fnCombust,
        active: false,
        delay: INTERVAL.COMBUST,
        excl: ['40k']
      },
      '40k': {
        func: fnCombust40k,
        active: false,
        delay: INTERVAL.COMBUST,
        excl: ['combust'],
        end: true
      }
    }
  };
  const cheatArr = Object.entries(cheatMap);

  function execOpts (delay) {
    for (const [group, maps] of cheatArr) {
      if (group !== 'control' && cheatMap[group].active) {
        for (const n in maps) {
          const o = maps[n];

          if (o.active && !o.delay) {
            fillResources();
            execOpt(n, o);
          }
        }
      }
    }

    fillResources();

    setTimeout(() => execOpts(delay), delay);
  }

  function getGroupId (groupname) {
    return `kittycheatAct${capitalizeFirst(groupname)}`;
  }

  function clickOptBtn (group, name, opts) {
    activateBtn(opts, !opts.active);

    if (cheatMap[group].active) {
      if (opts.group) {
        activateGroup(opts.group, opts.active);
      } else if (opts.active) {
        if (opts.excl) {
          for (const excl of opts.excl) {
            activateBtn(cheatMap[group][excl], false);
          }
        }

        if (group !== 'control') {
          execOpt(name, opts);
        }
      }
    }
  }

  const divCont = jqAppend($('div#leftColumn'), $('<div id="kittycheat"></div>').css({
    'padding-bottom': '30px',
    'font-family': 'monospace',
    'font-size': 'small'
  }));
  const divActGroup = jqAppend(divCont, styleDiv($('<div id="kittycheatAct"></div>')));
  const divTxtGroup = jqAppend(divCont, styleDiv($('<div id="kittycheatTxt"></div>')));

  // add groups for all the options
  for (const [groupname, group] of cheatArr) {
    const divGroup = jqAppend(divActGroup, styleDiv($(`<div id="${getGroupId(groupname)}"></div>`)));

    for (const optname in group) {
      const opts = group[optname];

      if (optname === 'active') {
        activateGroup(groupname, opts);
      } else {
        opts.btn = jqAppend(divGroup, $(`<button>${optname}</button>`).click(() => {
          clickOptBtn(groupname, optname, opts);
        }));

        activateBtn(opts, opts.active || false);

        if (opts.delay) {
          execOptTimer(groupname, optname, opts);
        }
      }
    }
  }

  for (const id of ['DryBld', 'DryUpg', 'RelZig', 'RelCry', 'RelLvl', 'Bcoins']) {
    jqAppend(divTxtGroup, styleDiv($(`<div id="kittycheatTxt${id}"></div>`), true));
  }

  //adjust messages, switch off confirmation
  game.console.maxMessages = 100;
  game.opts.noConfirm = true;

  // these logs are very fast with this script
  for (const f of ['craft', 'faith', 'hunt', 'trade']) {
    game.console.filters[f].enabled = false;
  }

  // start the loops
  execOpts(INTERVAL.ALL_OPT);
  execTextInfo(INTERVAL.ALL_TXT);
  execBuildAll(INTERVAL.ALL_BLD);
})();
