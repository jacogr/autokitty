const game = window.game;
const gamePage = window.gamePage;
const $ = window.$;

const isMax = {
  'buildings': false,
  'resources': true,
  'upgrades': true,
  'x10': false
};

const combustCycles = { 
  tenErasLink: 500,
  previousCycleLink: 45,
  nextCycleLink: 5
};

const kittycheatSpanClick = (label) => {
  try {
    // $(`span:contains(${label})`).click();
    $('span')
      .filter(function() { 
        return $(this).text().indexOf(label) === 0;
      })
      .click();
    
    return 1;
  } catch {
    // ignore
  }

  return 0;
};

const kittycheatCombust = () => {
  gamePage.timeTab.render();

  const cycles = Object
    .entries(combustCycles)
    .map(([cycle, div]) => ({ cycle, count: Math.floor(((game.getEffect('heatMax') - game.time.heat) / div) / 10) }))
    .filter(({ count }) => count > 0)
    .map(({ cycle }) => cycle);
  
  if (cycles.length) {
    gamePage.timeTab.cfPanel.children[0].children[0].model[cycles[0]].handler.call(gamePage.timeTab.cfPanel.children[0].children[0]);
  }
};

const kittycheatUnicorns = (log = false) => {
  gamePage.religionTab.render();
  
  try {
    const validBuildings = ['unicornTomb', 'ivoryTower', 'ivoryCitadel', 'skyPalace', 'unicornUtopia', 'sunspire'];
    const unicornPastureImpl = gamePage.bld.getBuildingExt('unicornPasture');

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

    const currentCycleIndex = gamePage.calendar.cycle;
    const currentCycle = gamePage.calendar.cycles[currentCycleIndex];

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
    const zigguratRatio = Math.max(gamePage.bld.getBuildingExt('ziggurat').meta.on, 1);
    
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

    let bestAmortization = Number.POSITIVE_INFINITY;
    const unicornsPerTickBase = gamePage.bld.getBuildingExt('unicornPasture').meta.effects?.unicornsPerTickBase;
    const pastureProduction = unicornsPerTickBase * gamePage.getTicksPerSecondUI() * globalRatio * religionRatio * paragonRatio * faithBonus * cycleBonus;

    // If the unicorn pasture amortizes itself in less than infinity ticks,
    // set it as the default. This is likely to protect against cases where
    // production of unicorns is 0.
    const pastureAmortization = unicornPastureImpl.model?.prices[0].val / pastureProduction;
    let bestBuilding = null;
    
    if (pastureAmortization < bestAmortization) {
      bestAmortization = pastureAmortization;
      bestBuilding = 'unicornPasture';
    }

    for (let i = 0; i < validBuildings.length; i++) {
      const building = validBuildings[i];
      const buildingImpl = gamePage.tabs[5].zgUpgradeButtons[i];

      if (!buildingImpl.model.metadata.unlocked) {
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
        }
      }
    }

    $('div#kittycheatUnicorn').html(`Unicorns: ${bestBuilding || 'unicornPasture'}`);
  } catch (e) {
    console.error(e);
    $('div#kittycheatUnicorn').html('Unicorns: unable to calculate');
  }
};

const kittycheatHasResource = (vals, isTrade) => {
  let cando = true;

  Object.keys(vals).forEach((name) => {
    const res = gamePage.resPool.get(name);

    if (vals[name].value) {
      cando = cando && (res.value >= vals[name].value);
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

  gamePage.diplomacyTab.render();
  gamePage.tabs.forEach((tab) => {
    if (tab.tabName.toLowerCase().indexOf('trade') === 0) {
      tab.racePanels.forEach((panel) => {
        if (panel.race.name.toLowerCase().indexOf(name) === 0) {
          panel.tradeBtn.tradeAllHref.link.click();
        }
      });
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
  const vals = opts.res || {};

  if (opts.active && kittycheatHasResource(vals, opts.trade)) {
    try {
      if (opts.func) {
        opts.func();
      } else if (opts.trade) {
        if (kittycheatHasTradeSpace(opts.get)) {
          kittycheatTrade(name);
        }
      } else {
        kittycheatCraft(name);
      }
    } catch (e) {
      console.error(name, opts, e);
    }
  }
};

const kittycheatBtnStyle = (btn, opts) => {
  btn.css({
    'background': opts.active ? 'red' : 'white',
    'color': opts.active ? 'white' : 'black'
  });
};

const kittycheatBtnClick = (btn, name, opts) => {
  opts.active = !opts.active;

  kittycheatBtnStyle(btn, opts);
  kittycheatExec(name, opts);
};

const kittycheatMaxFill = (name = null) => {
  if (!isMax.resources && !name) {
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
        console.error(tab.tabName, e);
      }

      return count;
    }, 0);
  } catch (e) {
    console.error(tab?.tabName, e);
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
          console.error(tab.tabName, e);
        }

        return count;
      }, 0);
    }, 0);
  } catch (e) {
    console.error(tab?.tabName, e);
  }

  return 0;
};

const kittycheatLoopTabs = (ids, fn) => {
  return ids
    .map((i) => gamePage.tabs[i])
    .filter((t) => t.visible && game.ui.activeTabId === t.tabId)
    .reduce((count, t) => count + fn(t), 0);
};

const kittycheatBuildAll = () => {
  let count = 0;
  
  // upgrades: 2:science, 3:workshop, 5:religion, 6:space
  if (isMax.upgrades) {
    count += kittycheatLoopTabs([2, 3, 5, 6], kittycheatTabUnlock);
  }

  // buildings: 0:bonfire, 4:trade, 6:space
  if (isMax.buildings) {
    count += kittycheatLoopTabs([0, 4, 6], kittycheatTabBuild);
  }

  setTimeout(kittycheatBuildAll, count ? 0 : 1000);
};

const kittycheatFeed = () => {
  if (gamePage.resPool.get('necrocorn').value > 1) {
    gamePage.tabs.forEach((tab) => {
      if (tab.tabName.toLowerCase().indexOf('trade') === 0) {
        tab.racePanels.forEach((panel) => {
          if (panel.race.name.toLowerCase().indexOf('leviathans') === 0) {
            panel.feedBtn.domNode.click();
          }
        });
      }
    });
  }
};

const kittycheatOpts = {
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
      delay: 50
    },
    'praise': {
      func: () => {
        gamePage.religion.praise();
      },
      active: true,
      delay: 50
    },
    'hunt': {
      func: () => {
        gamePage.village.huntAll();
      },
      active: true,
      delay: 250
    },
    'tc combust': {
      func: kittycheatCombust,
      active: false,
      delay: 1500
    }
  },
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
  }
};

const kittycheatContCss = { 'margin-bottom': '20px' };
const kittycheatCont = $('<div></div>').css({ 'padding-bottom': '100px' });
const kittyIwGroup = $('<div></div>').css(kittycheatContCss);

$('div#leftColumn').append(kittycheatCont);

kittycheatCont.append(kittyIwGroup);

// add groups for all the options
Object.entries(kittycheatOpts).forEach(([groupname, group]) => {
  const kittycheatGroup = $('<div></div>').css(kittycheatContCss);
  const kittycheatActs = $('<div></div>').css({});

  kittycheatCont.append(kittycheatGroup);
  kittycheatGroup.append(kittycheatActs);

  Object.entries(group).forEach(([optname, opts]) => {
    opts.active = opts.active || false;

    const btn = $(`<button>${optname}</button>`).click(() => {
      kittycheatBtnClick(btn, optname, opts);
    });

    kittycheatActs.append(btn);
    kittycheatBtnStyle(btn, opts);

    if (opts.delay) {
      setInterval(() => {
        const isFillable = ['hunt', 'praise'].includes(optname);

        if (isFillable) {
          kittycheatMaxFill();
        }

        kittycheatExec(optname, opts);

        if (isFillable) {
          kittycheatMaxFill();
        }
      }, opts.delay);
    }
  });
});

// building setup
Object.keys(isMax).forEach((id) => {
  const btn = $(`<button>${id}</button>`).click(() => {
    isMax[id] = !isMax[id];
    kittycheatBtnStyle(btn, { active: isMax[id] });
  });

  kittycheatBtnStyle(btn, { active: isMax[id] });
  kittyIwGroup.append(btn);
});

kittycheatCont.append($('<div id="kittycheatUnicorn"></div>').css(kittycheatContCss));

setInterval(() => {
  Object.values(kittycheatOpts).forEach((group) => {
    Object.entries(group).forEach(([optname, opts]) => {
      kittycheatMaxFill();
      kittycheatExec(optname, opts);
    });
  });

  kittycheatMaxFill();
}, 100);

setInterval(kittycheatUnicorns, 250);

kittycheatBuildAll();
