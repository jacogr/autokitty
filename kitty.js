const game = window.game;
const gamePage = window.gamePage;
const $ = window.$;

const isMax = {
  'buildings': false,
  'resources': true,
  'upgrades': true,
  'x10': false
};

const kittycheatSpanClick = (label) => {
  try {
    $(`span:contains(${label})`).click();
    
    return 1;
  } catch {
    // ignore
  }

  return 0;
};

const kittycheatCombust = () => {
  if (game.time.heat > 0) {
    return;
  }

  gamePage.timeTab.render();

  const count = Math.floor(game.getEffect('heatMax') / (45 * 5));

  for (let i = 0; i < count; i++) {
    gamePage.timeTab.cfPanel.children[0].children[0].model.sameCycleRestartLink.handler.call(gamePage.timeTab.cfPanel.children[0].children[0]);
  }
};

const kittycheatUnicorns = (log = false) => {
  gamePage.religionTab.render();

  try {
    const validBuildings = ['unicornTomb', 'ivoryTower', 'ivoryCitadel', 'skyPalace', 'unicornUtopia', 'sunspire'];
    const unicornsPerSecond = gamePage.getEffect('unicornsPerTickBase') * gamePage.getTicksPerSecondUI();
    const globalRatio = 1 + gamePage.getEffect('unicornsGlobalRatio');
    const religionRatio = 1 + gamePage.getEffect('unicornsRatioReligion');
    const paragonRatio = 1 + gamePage.prestige.getParagonProductionRatio();
    const faithBonus = 1 + gamePage.religion.getSolarRevolutionRatio();
    let cycle = 1;

    if (gamePage.calendar.cycles[gamePage.calendar.cycle].festivalEffects['unicorns']) {
      if (gamePage.prestige.getPerk('numeromancy').researched && gamePage.calendar.festivalDays) {
        cycle = gamePage.calendar.cycles[gamePage.calendar.cycle].festivalEffects['unicorns'];
      }
    }

    const zigMeta = gamePage.bld.getBuildingExt('ziggurat').meta;
    const onZig = Math.max(zigMeta.on, 1);
    const total = unicornsPerSecond * globalRatio * religionRatio * paragonRatio * faithBonus * cycle;
    const baseUnicornsPerRift = 500 * (1 + gamePage.getEffect('unicornsRatioReligion') * 0.1);
    let riftChanceRatio = 1;

    if (gamePage.prestige.getPerk('unicornmancy').researched) {
      riftChanceRatio *= 1.1;
    }

    const baseRift = gamePage.getEffect('riftChance') * riftChanceRatio / (10000 * 2) * baseUnicornsPerRift;
    let bestAmoritization = Infinity;
    let bestBuilding = '';
    let pastureAmor = gamePage.bld.getBuildingExt('unicornPasture').meta.effects['unicornsPerTickBase'] * gamePage.getTicksPerSecondUI();

    pastureAmor = pastureAmor * globalRatio * religionRatio * paragonRatio * faithBonus * cycle;

    if (log) {
      console.log('unicornPasture');
      console.log('\tBonus unicorns per second: ' + pastureAmor);
    }

    pastureAmor = zigMeta.prices[0].val / pastureAmor;

    if (log) {
      const baseWait = zigMeta.prices[0].val / total;
      const avgWait = zigMeta.prices[0].val / (total + baseRift);

      console.log('\tMaximum time to build: ' + gamePage.toDisplaySeconds(baseWait) + ' | Average time to build: ' + gamePage.toDisplaySeconds(avgWait));
      console.log('\tPrice: ' + zigMeta.prices[0].val + ' | Amortization: ' + gamePage.toDisplaySeconds(pastureAmor));
    }

    if (pastureAmor < bestAmoritization) {
      bestAmoritization = pastureAmor;
      bestBuilding = 'unicornPasture';
    }

    if (!gamePage.tabs[5] || !gamePage.tabs[5].zgUpgradeButtons || !gamePage.tabs[5].zgUpgradeButtons.length) {
      throw new Error('Unable to read religion tab');
    }

    for (let i in gamePage.tabs[5].zgUpgradeButtons) {
      const btn = gamePage.tabs[5].zgUpgradeButtons[i];

      if (validBuildings.indexOf(btn.id) !== -1) {
        if (btn.model.visible) {
          let unicornPrice = 0;

          for (let j in btn.model.prices) {
            if (btn.model.prices[j].name === 'unicorns') {
              unicornPrice += btn.model.prices[j].val;
            } else if (btn.model.prices[j].name === 'tears') {
              unicornPrice += btn.model.prices[j].val * 2500 / onZig;
            }
          }

          const bld = gamePage.religion.getZU(btn.id);
          let relBonus = religionRatio;
          let riftChance = gamePage.getEffect('riftChance');

          for (let j in bld.effects) {
            if (j === 'unicornsRatioReligion') {
              relBonus += bld.effects[j];
            } else if (j === 'riftChance') {
              riftChance += bld.effects[j];
            }
          }

          const unicornsPerRift = 500 * ((relBonus - 1) * 0.1 + 1);
          let riftBonus = riftChance * riftChanceRatio / (10000 * 2) * unicornsPerRift;

          riftBonus -= baseRift;

          let amor = unicornsPerSecond * globalRatio * relBonus * paragonRatio * faithBonus * cycle;

          amor -= total;
          amor = amor + riftBonus;

          if (log) {
            console.log(btn.id);
            console.log('\tBonus unicorns per second: ' + amor);
          }

          amor = unicornPrice / amor;

          if (log) {
            const baseWait = unicornPrice / total;
            const avgWait = unicornPrice / (total + baseRift);
            const amorSeconds = gamePage.toDisplaySeconds(amor) || 'NA';

            console.log('tMaximum time to build: ' + gamePage.toDisplaySeconds(baseWait) + ' | Average time to build: ' + gamePage.toDisplaySeconds(avgWait));
            console.log('\tPrice: ' + unicornPrice + ' | Amortization: ' + amorSeconds);
          }

          if (amor < bestAmoritization) {
            if (riftBonus > 0 || ((relBonus > religionRatio) && (unicornPrice > 0))) {
              bestAmoritization = amor;
              bestBuilding = btn.id;
            }
          }
        }
      }
    }

    $('div#kittycheatUnicorn').html('Unicorns: ' + bestBuilding);
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

const kittycheatMaxFill = () => {
  if (!isMax.resources) {
    return;
  }

  game.resPool.resources.forEach((r) => {
    const max = r.maxValue * ((isMax.x10 || ['faith', 'manpower'].includes(r.name)) ? 10 : 1);
    const isFillable = !!(max && r.visible && r.unlocked && r.value < max && !['kittens', 'zebras'].includes(r.name));

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
  // don't buy upgradable buildings or invisible or switched off
  if (!model || !model.enabled || !model.visible || !model.metadata || (model.metadata.on !== model.metadata.val) || model.stageLinks?.find((l) => l.enabled && l.title === '^') || model.prices.find((p) => ['bloodstone', 'ivory', 'tMythril'].includes(p.name))) {
    return 0;
  }

  // max resources
  kittycheatMaxFill();

  // get first unaffordable price
  const firstLow = model.prices.find((p) =>
    game.resPool.resources.find((r) => r.name === p.name).value < p.val
  );

  // ensure we have enough of everything
  if (firstLow) {
    return 0;
  }

  // at least something with a max
  const firstMax = model.prices.find((p) =>
    game.resPool.resources.find((r) => r.name === p.name).maxValue > 0
  );

  // something needs a max
  if (!firstMax) {
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
      func: () => { kittycheatSpanClick('Gather catnip'); },
      active: true,
      delay: 5
    },
    'observe': {
      func: () => { $('input#observeBtn').click(); },
      active: true,
      delay: 50
    },
    'praise': {
      func: () => { gamePage.religion.praise(); },
      active: true,
      delay: 50
    },
    'hunt': {
      func: () => { gamePage.village.huntAll(); },
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
    'feeding': {
      res: { 'necrocorn': 1 },
      func: () => {
        if (gamePage.resPool.get('necrocorn').value > 0) {
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
      }
    }
  }
};

const kittycheatCont = $('<div></div>').css({
  'padding-bottom': '100px'
});

$('div#leftColumn').append(kittycheatCont);

Object.entries(kittycheatOpts).forEach(([groupname, group]) => {
  const kittycheatGroup = $('<div></div>').css({
    'margin-bottom': '20px'
  });
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

// FIXME!
// kittycheatCont.append($('<div id="kittycheatUnicorn"></div>'));
//
// setInterval(kittycheatUnicorns, 1000);

setInterval(() => {
  Object.values(kittycheatOpts).forEach((group) => {
    Object.entries(group).forEach(([optname, opts]) => {
      kittycheatMaxFill();
      kittycheatExec(optname, opts);
    });
  });

  kittycheatMaxFill();
}, 250);

const kittyIwGroup = $('<div></div>').css({
  // 'padding-top': '80px',
  'margin-bottom': '20px'
});

kittycheatCont.append(kittyIwGroup);

Object.keys(isMax).forEach((id) => {
  const btn = $(`<button>${id}</button>`).click(() => {
    isMax[id] = !isMax[id];
    kittycheatBtnStyle(btn, { active: isMax[id] });
  });

  kittycheatBtnStyle(btn, { active: isMax[id] });
  kittyIwGroup.append(btn);
});

kittycheatBuildAll();
