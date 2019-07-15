const game = window.game;
const gamePage = window.gamePage;
const $ = window.$;

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
    const unicornsPerSecond = gamePage.getEffect('unicornsPerTickBase') * gamePage.getRateUI();
    const globalRatio = 1 + gamePage.getEffect('unicornsGlobalRatio');
    const religionRatio = 1 + gamePage.getEffect('unicornsRatioReligion');
    const paragonRatio = 1 + gamePage.prestige.getParagonProductionRatio();
    const faithBonus = 1 + (gamePage.religion.getProductionBonus() / 100);
    let cycle = 1;

    if (gamePage.calendar.cycles[gamePage.calendar.cycle].festivalEffects['unicorns']) {
      if (gamePage.prestige.getPerk('numeromancy').researched && gamePage.calendar.festivalDays) {
        cycle = gamePage.calendar.cycles[gamePage.calendar.cycle].festivalEffects['unicorns'];
      }
    }

    const onZig = Math.max(gamePage.bld.getBuildingExt('ziggurat').meta.on, 1);
    const total = unicornsPerSecond * globalRatio * religionRatio * paragonRatio * faithBonus * cycle;
    const baseUnicornsPerRift = 500 * (1 + gamePage.getEffect('unicornsRatioReligion') * 0.1);
    let riftChanceRatio = 1;

    if (gamePage.prestige.getPerk('unicornmancy').researched) {
      riftChanceRatio *= 1.1;
    }

    const baseRift = gamePage.getEffect('riftChance') * riftChanceRatio / (10000 * 2) * baseUnicornsPerRift;
    let bestAmoritization = Infinity;
    let bestBuilding = '';
    let pastureAmor = gamePage.bld.getBuildingExt('unicornPasture').meta.effects['unicornsPerTickBase'] * gamePage.getRateUI();

    pastureAmor = pastureAmor * globalRatio * religionRatio * paragonRatio * faithBonus * cycle;

    if (log) {
      console.log('unicornPasture');
      console.log('\tBonus unicorns per second: ' + pastureAmor);
    }

    const zigBtn = gamePage.tabs[0].buttons.find((btn) => btn.opts.building === 'ziggurat');

    pastureAmor = zigBtn.model.prices[0].val / pastureAmor;

    if (log) {
      const baseWait = zigBtn.model.prices[0].val / total;
      const avgWait = zigBtn.model.prices[0].val / (total + baseRift);

      console.log('\tMaximum time to build: ' + gamePage.toDisplaySeconds(baseWait) + ' | Average time to build: ' + gamePage.toDisplaySeconds(avgWait));
      console.log('\tPrice: ' + zigBtn.model.prices[0].val + ' | Amortization: ' + gamePage.toDisplaySeconds(pastureAmor));
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
  } catch (error) {
    console.error(error);
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
    // console.log('crafting', name);
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

const kittycheatOpts = {
  'trading': {
    'leviathans': {
      res: { 'unobtainium': 5000 },
      trade: true
    },
    'dragons': {
      res: { 'titanium': 250 },
      get: 'uranium',
      trade: true
    },
    'zebras': {
      res: { 'slab': 50 },
      get: 'titanium',
      trade: true
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
      func: () => { $('span:contains(Gather catnip)').click(); },
      active: true,
      delay: 5
    },
    'observe': {
      func: () => { $('input#observeBtn').click(); },
      active: true,
      delay: 1000
    },
    'praise': {
      func: () => { gamePage.religion.praise(); },
      active: true,
      delay: 5
    },
    'hunt': {
      func: () => { gamePage.village.huntAll(); },
      active: true,
      delay: 5000
    },
    'tc combust': {
      func: kittycheatCombust,
      active: false,
      delay: 5000
    }
  },
  'crafting': {
    'wood': {
      res: { 'catnip': 250 }
    },
    'beam': {
      res: { 'wood': 250 }
    },
    'slab': {
      res: { 'minerals': 250 }
    },
    'steel': {
      res: { 'coal': 100 }
    },
    'plate': {
      res: { 'iron': 125 }
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
    'eludium': {
      res: { 'unobtainium': 1000, 'alloy': 2500 }
    },
    'kerosene': {
      res: { 'oil': 7500 }
    },
    'thorium': {
      res: { 'uranium': 250 }
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

Object.keys(kittycheatOpts).forEach((groupname) => {
  const group = kittycheatOpts[groupname];
  const kittycheatGroup = $('<div></div>').css({
    'margin-bottom': '10px'
  });
  const kittycheatActs = $('<div></div>').css({});

  kittycheatCont.append(kittycheatGroup);
  kittycheatGroup.append(kittycheatActs);

  Object.keys(group).forEach((optname) => {
    const opts = group[optname];

    opts.active = opts.active || false;

    const btn = $(`<button>${optname}</button>`).click(() => {
      kittycheatBtnClick(btn, optname, opts);
    });

    kittycheatActs.append(btn);
    kittycheatBtnStyle(btn, opts);

    if (opts.delay) {
      setInterval(() => {
        kittycheatExec(optname, opts);
      }, opts.delay);
    }
  });
});

kittycheatCont.append($('<div id="kittycheatUnicorn"></div>'));

setInterval(kittycheatUnicorns, 1000);

setInterval(() => {
  Object.keys(kittycheatOpts).forEach((groupname) => {
    const group = kittycheatOpts[groupname];

    Object.keys(group).forEach((optname) => {
      const opts = group[optname];

      kittycheatExec(optname, opts);
    });
  });
}, 1000);

let isMaxActive = false;

const kittyIwGroup = $('<div></div>').css({
  'margin-bottom': '10px',
  'padding-top': '100px'
});

const maxbtn = $('<button>resources</button>').click(() => {
  isMaxActive = !isMaxActive;
  kittycheatBtnStyle(maxbtn, { active: isMaxActive });
});

kittycheatCont.append(kittyIwGroup);
kittycheatBtnStyle(maxbtn, { active: isMaxActive });
kittyIwGroup.append(maxbtn);

setInterval(() => {
  if (!isMaxActive) {
    return;
  }

  game.resPool.resources.forEach((res) => {
    const max = res.maxValue;
    const isFillable = !!(max && res.visible && res.unlocked && res.value < max);

    if (isFillable) {
      res.value = max;
    }
  });
}, 100);
