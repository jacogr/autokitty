const game = window.game;
const gamePage = window.gamePage;
const $ = window.$;

const isMax = {
  'build': false,
  'max': true,
  'x10': false,
  'upgrade': true,
  'zig': false,
  'crypto': false
};

const combustCycles = { 
  tenErasLink: 500,
  previousCycleLink: 45,
  nextCycleLink: 5
};

const kittycheatStyleBtn = (btn, opts) => {
  return btn.css({
    'background': opts.active ? 'red' : 'white',
    'color': opts.active ? 'white' : 'black',
    'font-family': 'monospace',
    'font-size': 'small',
    'border-radius': '2px',
    'border-width': '1px',
    'padding-inline': '4px',
    'margin-right': '1px',
    'margin-bottom': '1px'
  });
};

const kittycheatStyleDiv = (div, small = false) => {
  return div.css({ 'margin-bottom': small ? '5px' : '20px' });
};

const kittycheatMakePercent = (frac) => {
  if (frac > 0 && frac < Number.MAX_SAFE_INTEGER) {
    const raw = 100 * frac;
    
    return { text: `${raw.toFixed(2)}%`, raw };
  }
};

const kittycheatNoop = () => {};

const kittycheatSpanClick = (label) => {
  const span = $('span').filter(function() { 
    return $(this).text().indexOf(label) === 0;
  });

  if (span.length) {
    span.click();
    
    return 1;
  }

  return 0;
};

const kittycheatCombust = () => {
  const cycle = Object
    .entries(combustCycles)
    .map(([cycle, div]) => ({ cycle, count: Math.floor(((game.getEffect('heatMax') - game.time.heat) / div) / 10) }))
    .filter(({ count }) => count > 0)
    .map(({ cycle }) => cycle)[0];
  
  if (cycle) {
    const btn = gamePage.timeTab.cfPanel.children[0].children[0];

    btn.model[cycle].handler.call(btn);
  }
};

const kittycheatZigguratsCalc = () => {
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
      let unicornPrice = 0;
      
      for (const price of buildingImpl.model.prices) {
        // Add the amount of unicorns the building costs (if any).
        if (price.name === 'unicorns') {
          unicornPrice += price.val;
        }
        
        // Tears result from unicorn sacrifices, so factor that into the price proportionally.
        if (price.name === 'tears') {
          unicornPrice += (price.val * 2500) / zigguratRatio;
        }
      }

      // Determine the effect the building will have on unicorn production and unicorn rifts.
      const buildingInfo = gamePage.religion.getZU(building);
      let religionBonus = religionRatio;
      let riftChance = gamePage.getEffect('riftChance');
      
      for (const effect in buildingInfo.effects) {
        if (effect === 'unicornsRatioReligion') {
          religionBonus += buildingInfo.effects.unicornsRatioReligion;
        }
        
        if (effect === 'riftChance') {
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

const kittycheatTranscendCalc = () => {
  try {
    return kittycheatMakePercent(game.religion.faithRatio / game.religion._getTranscendNextPrice());
  } catch (e) {
    console.error('kittycheatTranscendCalc', e);
  }

  return null;
};

const kittycheatTheologyCalc = () => {
  try {
    const relics = gamePage.resPool.get('relic').value;
    
    return gamePage.religionTab.ctPanel.children[0].children
      .filter((a) => a.model.prices.length === 1 && a.model.prices[0].name === 'relic')
      .sort((a, b) => a.model.prices[0].val - b.model.prices[0].val)
      .map((a) => ({ 
        bestBuilding: a.id,
        percent: kittycheatMakePercent(a.model.prices[0].val / relics)
      }))[0];
  } catch (e) {
    console.error('kittycheatTheologyCalc', e);
  }

  return null;
};

const kittycheatReligion = (delay) => {
  const zig = kittycheatZigguratsCalc();
  const cry = kittycheatTheologyCalc();
  const trd = kittycheatTranscendCalc();
  let zigText = zig.bestBuilding;

  if (zig.bestBuilding && zig.bestPrices) {
    const zigguratRatio = gamePage.bld.getBuildingExt('ziggurat').meta.on || 0;

    const tears2uni = (tears) =>
      (tears * 2500) / zigguratRatio;
    
    let unicornTotal = tears2uni(gamePage.resPool.get('tears').value) + gamePage.resPool.get('unicorns').value;
    let unicornPrice = 0;
        
    for (const price of zig.bestPrices) {
      if (price.name === 'unicorns') {
        unicornPrice += price.val;
      } else if (price.name === 'tears') {
        unicornPrice += tears2uni(price.val);
      }
    }

    const calc = kittycheatMakePercent(unicornTotal / unicornPrice);
  
    zigText = zig.bestBuilding + (calc ? `, ${calc.text}` : '');
  }

  const cryText = cry && (
    (cry.bestBuilding === 'singularity' ? 'eventHorizon' : cry.bestBuilding) + 
    (cry.percent ? `, ${cry.percent.text}` : '')
  );
  
  $('div#kittycheatZiggurat').html(`Ziggurat : ${zigText || zig.err || '-'}`);
  $('div#kittycheatTheology').html(`Theology : ${cryText || '-'}`);
  $('div#kittycheatTranscend').html(`Transcend: ${trd?.text || '-'}`);

  setTimeout(() => kittycheatReligion(delay), delay);  
};

const kittycheatHasResource = (vals, isTrade) => {
  let cando = true;

  Object.entries(vals).forEach(([key, val]) => {
    const res = gamePage.resPool.get(key);

    if (val.value) {
      cando = cando && (res.value >= val.value);
    }
    
    if (!isTrade && res.maxValue > 0) {
      cando = cando && ((res.value / res.maxValue) >= 0.05);
    }
  });

  return cando;
};

const kittycheatHasTradeSpace = (get) => {
  if (!get) {
    return true;
  }

  const res = gamePage.resPool.get(get.name);

  if (res.maxValue > 0) {
    return (res.value / res.maxValue) <= 0.99;
  }

  return true;
};

const kittycheatTrade = (name) => {
  if ((name === 'leviathans') && (gamePage.religion.getZU('blackPyramid').val > 0) && (gamePage.diplomacy.get('leviathans').unlocked === false)) {
    gamePage.diplomacy.unlockElders();
  }

  gamePage.diplomacyTab.racePanels.forEach((panel) => {
    if (panel.race.name.toLowerCase().indexOf(name) === 0) {
      panel.tradeBtn.tradeAllHref.link.click();
    }
  });
};

const kittycheatCraft = (name) => {
  const iswood = (name === 'wood');
  const iswinter = (gamePage.calendar.season === 3);
  const isautum = (gamePage.calendar.season === 2) && (gamePage.calendar.day >= 75);

  if (!iswood || (!iswinter && !isautum)) {
    gamePage.craftAll(name);
  }
};

const kittycheatExec = (name, opts) => {
  try {
    const vals = opts.res || {};

    if (opts.active && kittycheatHasResource(vals, opts.trade)) {
      if (opts.func) {
        opts.func();
      } else if (opts.trade) {
        if (kittycheatHasTradeSpace(opts.get)) {
          kittycheatTrade(name);
        }
      } else {
        kittycheatCraft(name);
      }
    }
  } catch (e) {
    console.error('kittycheatExec', name, e);
  }
};

const kittycheatExecTimer = (name, opts) => {
  try {
    if (opts.active) {
      const isFillable = ['hunt', 'praise'].includes(name);
  
      if (isFillable) {
        kittycheatMaxFill();
      }
  
      kittycheatExec(name, opts);
  
      if (isFillable) {
        kittycheatMaxFill();
      }
    }
  } catch (e) {
    console.error('kittycheatExecTimer', name, e);
  }

  setTimeout(() => kittycheatExecTimer(name, opts), opts.delay);
};

const kittycheatBtnClick = (btn, name, opts) => {
  opts.active = !opts.active;

  kittycheatStyleBtn(btn, opts);
  kittycheatExec(name, opts);
};

const kittycheatMaxFill = (name = null) => {
  if (!isMax.max && !name) {
    return;
  }

  game.resPool.resources.forEach((r) => {
    const max = r.maxValue * ((isMax.x10 || ['faith', 'manpower'].includes(r.name)) ? 10 : 1);
    const isFillable = !!max && r.visible && r.unlocked && r.value < max && !['kittens', 'zebras'].includes(r.name) && (!name || r.name === name);

    if (isFillable) {
      r.value = max;
    }
  });
};

const kittycheatTabUnlock = (tab) => {
  try {
    const buttons =
      // religion
      tab.rUpgradeButtons ||
      // space
      tab.GCPanel?.children ||
      // science, workshop
      tab.buttons;

    return buttons.reduce((count, btn) => {
      try {
        if (btn && btn.model && btn.model.enabled && btn.model.visible && btn.model.metadata && !btn.model.prices.find((p) => ['void'].includes(p.name))) {
          return count + kittycheatSpanClick(btn.model.metadata.label);
        }
      } catch (e) {
        console.error('kittycheatTabUnlock', tab.tabName, e);
      }

      return count;
    }, 0);
  } catch (e) {
    console.error('kittycheatTabUnlock', tab?.tabName, e);
  }

  return 0;
};

const kittycheatBuildButtonClick = (model) => {
  // don't buy invisible or switched off
  if (!model || !model.enabled || !model.visible || !model.metadata || (model.metadata.on !== model.metadata.val)) {
    return 0;
  }

  // max resources
  kittycheatMaxFill();

  // get first invalid price
  const firstInvalid = model.prices.find((p) =>
    game.resPool.resources.find((r) => r.name === p.name).value < p.val
  );

  // ensure we have enough of everything
  if (firstInvalid) {
    return 0;
  }

  // at least something with a max
  const firstMax = model.prices.find((p) =>
    game.resPool.resources.find((r) => r.name === p.name).maxValue > 0
  );

  // without a max, we only build a single
  if (!firstMax && model.metadata.on >= 1) {
    return 0;
  }

  return kittycheatSpanClick(model.metadata.label);
};

const kittycheatTabBuild = (tab) => {
  try {
    const areas =
      // space
      tab.planetPanels ||
      // trade
      tab.racePanels?.map((r) => ({ children: [r.embassyButton] })) ||
      // others
      [tab];

    return areas.reduce((count, area) => {
      return count + area.children.reduce((count, child) => {
        try {
          const result = kittycheatBuildButtonClick(child?.model);
          
          // for trade, explore after click - some ui nigglies which this unlocks
          if (result && tab.exploreBtn) {
            kittycheatSpanClick(tab.exploreBtn.model.name);
          }
          
          return count + result;
        } catch (e) {
          console.error('kittycheatTabBuild', tab.tabName, e);
        }

        return count;
      }, 0);
    }, 0);
  } catch (e) {
    console.error('kittycheatTabBuild', tab?.tabName, e);
  }

  return 0;
};

const kittycheatLoopTabs = (ids, fn) => {
  return ids
    .map((i) => gamePage.tabs[i])
    .filter((t) => t.visible && game.ui.activeTabId === t.tabId)
    .reduce((count, t) => count + fn(t), 0);
};

let kittycheatBuildZigPrevTime = 0;

const kittycheatBuildZig = () => {
  try {
    const availTears = gamePage.resPool.get('tears').value;
    const availSorrow = gamePage.resPool.get('sorrow').value;
    
    const findBld = (id) =>
      gamePage.religionTab.zgUpgradeButtons.find((b) => b.id === id);

    const isVisible = (bld) =>
      !!(bld && bld.model.visible);

    const isValid = (bld, tst, avail = availTears) =>
      isVisible(bld) && !!(tst && tst.val && avail > tst.val);

    const getPrice = (bld, name = 'tears') =>
      bld?.model.prices.find((p) => p.name === name);

    const uni = kittycheatZigguratsCalc();
    
    // we don't auto-build pastures (or nothing)
    if (!uni.bestBuilding || uni.bestBuilding === 'unicornPasture') {
      return 0;
    }

    // first we see if we can do a black pyramid
    const blck = findBld('blackPyramid');

    if (isValid(blck, getPrice(blck, 'sorrow'), availSorrow)) {
      console.log('kittycheatBuildZig', 'Building blackPyramid');
      blck.domNode.click();
      return 0;
    }

    const best = findBld(uni.bestBuilding);
    const mark = findBld('marker');
    
    const bt = getPrice(best);
    const mt = getPrice(mark);
    
    const bv = isValid(best, bt);
    const mv = isValid(mark, mt);

    if (bv || mv) {
      const next = (bv && mv)
        ? ((mt.val <= bt.val) ? mark : best)
        : (mv ? mark : best);
      
      console.log('kittycheatBuildZig', `building ${next.id}`);
      next.domNode.click();
      return 0;
    }

    const zigImpl = gamePage.bld.getBuildingExt('ziggurat');
    const availUni = gamePage.resPool.get('unicorns').value;
    const zigTears = availTears + (zigImpl.meta.on * availUni / 2500);
    const nowTime = Date.now();
    const nowDelta = nowTime - kittycheatBuildZigPrevTime;

    // only sacrifice when we do have enough available (twice a minute only)
    if (nowDelta > 30000 && bt && zigTears > bt.val) {
      console.log('kittycheatBuildZig', 'sacrificing');
      kittycheatBuildZigPrevTime = nowTime;
      gamePage.religionTab.sacrificeBtn.model.allLink.handler.call(gamePage.religionTab.sacrificeBtn, kittycheatNoop, kittycheatNoop);
      return 0;
    }

    return 0;
  } catch (e) {
    console.error('kittycheatZiggurats', e);
  }

  return 0;
};

const kittycheatBuildTheology = () => {
  try {
    const best = kittycheatTheologyCalc();

    if (!best || !best.percent || best.percent.raw > 1) {
      return 0;
    }

    const cld = gamePage.religionTab.ctPanel.children[0].children;
    const bld = cld.find((b) => b.id === best.bestBuilding && b.model.visible && b.model.enabled);

    if (!bld) {
      return 0;
    }

    bld.domNode.click();

    return 0;
  } catch (e) {
    console.error('kittycheatBuildTheology', e);
  }

  return 0;
};

const kittycheatBuildAll = (delay) => {
  let count = 0;
  
  // upgrades: 2:science, 3:workshop, 5:religion, 6:space
  if (isMax.upgrade) {
    count += kittycheatLoopTabs([2, 3, 5, 6], kittycheatTabUnlock);
  }

  // buildings: 0:bonfire, 4:trade, 6:space
  if (isMax.build) {
    count += kittycheatLoopTabs([0, 4, 6], kittycheatTabBuild);
  }

  // religion: zigurats
  if (isMax.zig) {
    count += kittycheatBuildZig();
  }

  // religion: cryptotheology
  if (isMax.crypto) {
    count += kittycheatBuildTheology();
  }

  setTimeout(() => kittycheatBuildAll(delay), count ? 0 : delay);
};

const kittycheatFeed = () => {
  if (gamePage.resPool.get('necrocorn').value > 1) {
    gamePage.tabs.forEach((tab) => {
      if (tab.tabName.toLowerCase().indexOf('trade') === 0) {
        tab.racePanels.forEach((panel) => {
          if (panel.race.name.toLowerCase().indexOf('leviathans') === 0) {
            panel.feedBtn.domNode.click()
          }
        });
      }
    });
  }
};

const kittycheatAdore = () => {
  // sadly the game always confirms here, leave for now...
  // if (game.religion.faithRatio > game.religion._getTranscendNextPrice()) {
  //  gamePage.religionTab?.transcendBtn.domNode.click();
  // }
  
  game.religion.resetFaith(1.01, false);
  gamePage.religionTab?.praiseBtn.domNode.click();
};

const kittycheatOpts = {
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
    },
    /*'feeding': {
      res: { 'necrocorn': 1 },
      func: kittycheatFeed
    }*/
  },
  'trading': {
    'leviathans': {
      res: { 'unobtainium': 5000 },
      trade: true,
      active: true
    },
    'dragons': {
      res: { 'titanium': 250 },
      get: 'uranium',
      trade: true,
      active: true
    },
    'zebras': {
      res: { 'slab': 50 },
      get: 'titanium',
      trade: true,
      active: true
    },
    'nagas': {
      res: { 'ivory': 500 },
      get: 'minerals',
      trade: true
    },
    'spiders': {
      res: { 'scaffold': 50 },
      get: 'coal',
      trade: true
    },
    'griffins': {
      res: { 'wood': 500 },
      get: 'iron',
      trade: true
    },
    'lizards': {
      res: { 'minerals': 1000 },
      get: 'wood',
      trade: true
    },
    'sharks': {
      res: { 'iron': 100 },
      get: 'catnip',
      trade: true
    }
  },
  'actions': {
    'catnip': {
      func: () => { 
        kittycheatSpanClick('Gather catnip');
      },
      active: true,
      delay: 5
    },
    'refine': {
      func: () => { 
        kittycheatMaxFill('catnip');
        kittycheatSpanClick('Refine catnip');
      },
      active: true,
      delay: 1000
    },
    'observe': {
      func: () => { 
        $('input#observeBtn').click();
      },
      active: true,
      delay: 100
    },
    'praise': {
      func: () => {
        kittycheatMaxFill('faith');
        gamePage.religion.praise();
      },
      active: true,
      delay: 25
    },
    'adore': {
      func: kittycheatAdore,
      active: true,
      delay: 120000
    },
    'hunt': {
      func: () => {
        kittycheatMaxFill('manpower');
        gamePage.village.huntAll();
      },
      active: true,
      delay: 100
    },
    'tc combust': {
      func: kittycheatCombust,
      active: false,
      delay: 1500
    }
  }
};

const kittycheatExecOpts = (delay) => {
  Object.values(kittycheatOpts).forEach((group) => {
    Object.entries(group).forEach(([optname, opts]) => {
      kittycheatMaxFill();

      if (!opts.delay) {
        kittycheatExec(optname, opts);
      }
    });
  });

  kittycheatMaxFill();

  setTimeout(() => kittycheatExecOpts(delay), delay);
};

const kittycheatCont = $('<div></div>').css({ 
  'padding-bottom': '30px',
  'font-family': 'monospace',
  'font-size': 'small'
});
const kittyIwGroup = kittycheatStyleDiv($('<div></div>'));
const kittyTxGroup = kittycheatStyleDiv($('<div></div>'));

$('div#leftColumn').append(kittycheatCont);

kittycheatCont.append(kittyIwGroup);

// add groups for all the options
Object.entries(kittycheatOpts).forEach(([groupname, group]) => {
  const kittycheatGroup = kittycheatStyleDiv($('<div></div>'));
  const kittycheatActs = $('<div></div>');

  kittycheatCont.append(kittycheatGroup);
  kittycheatGroup.append(kittycheatActs);

  Object.entries(group).forEach(([optname, opts]) => {
    opts.active = opts.active || false;

    const btn = $(`<button>${optname}</button>`).click(() => {
      kittycheatBtnClick(btn, optname, opts);
    });
    
    kittycheatActs.append(kittycheatStyleBtn(btn, opts));

    if (opts.delay) {
      kittycheatExecTimer(optname, opts);
    }
  });
});

// building setup
Object.keys(isMax).forEach((id) => {
  const btn = $(`<button>${id}</button>`).click(() => {
    isMax[id] = !isMax[id];
    kittycheatStyleBtn(btn, { active: isMax[id] });
  });

  kittyIwGroup.append(kittycheatStyleBtn(btn, { active: isMax[id] }));
});

kittycheatCont.append(kittyTxGroup);

['kittycheatZiggurat', 'kittycheatTheology', 'kittycheatTranscend'].forEach((id) => {
  kittyTxGroup.append(kittycheatStyleDiv($(`<div id="${id}"></div>`), true));
});

// render clicky tabs at startup (as available)
['diplomacyTab', 'religionTab', 'timeTab'].forEach((tab) => {
  try {
    gamePage[tab].render();
  } catch (e) {
    console.error('initial render', tab, e);
  }
});

// start the loops
kittycheatExecOpts(100);
kittycheatReligion(500);
kittycheatBuildAll(1000);
