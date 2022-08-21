const topBarButtons = [
  {
    name: "Character",
  },
  {
    name: "Perks",
  },
  {
    name: "Store",
  },
  {
    name: "Inventory",
  },
  {
    name: "Smithy",
  },
  {
    name: "Floors & Stages",
  },
  {
    name: "Codex",
  },
  {
    name: "Saves",
  },
  {
    name: "Statistics",
  },
];

const scroll = {
  top: 0,
  left: 0,
};

let currentSave;

function number(num) {
  if (num < 1000) return num;
  else if (num < 1000000)
    return (
      ((num / 1000) % 1 !== 0
        ? (num / 1000).toFixed(2)
        : Math.floor(num / 1000)) + "K"
    );
  else if (num < 1000000000)
    return (
      ((num / 1000000) % 1 !== 0
        ? (num / 1000000).toFixed(2)
        : Math.floor(num / 1000000)) + "M"
    );
  else
    return (
      ((num / 1000000000) % 1 !== 0
        ? (num / 1000000000).toFixed(2)
        : Math.floor(num / 1000000000)) + "B"
    );
}

addHoverBox($("goldContainer"), texts.gold, 14);
addHoverBox($("xpContainer"), texts.xp, 14);
addHoverBox($("xpBar"), texts.xp, 14);
addHoverBox($("defaultSprite"), texts.you, 10);

createTopBar();
select("Floors & Stages");

function createTopBar() {
  $("mainWindowTopBar").textContent = "";
  for (let button of topBarButtons) {
    if (button.name == "Saves" && state.gamemode.prevent_manual_save) continue;
    let but = create("div");
    but.classList.add("mainWindowTopBar--button");
    if (button.selected) but.classList.add("mainWindowTopBar--button-selected");
    but.textContent = button.name;
    but.addEventListener("click", () => select(button.name));
    let hover = button.name.toLowerCase();
    hover = hover.replace(/( & )/g, "_");
    addHoverBox(but, texts[hover], 10);
    $("mainWindowTopBar").appendChild(but);
  }
}

function updateLeftValues() {
  $("goldNumber").textContent = number(player.gold);
  $("xpNumber").textContent = number(player.xp) + "/" + number(player.xpCap);
  $("xpBarFill").style.width = (player.xp / player.xpCap) * 100 + "%";
  if (player.xp > player.xpCap) $("xpBarFill").style.width = "100%";
  $("defaultSprite").src = "images/" + player.sprite + ".png";
  $("skillsAndPerks").textContent = "";
  $("skillsAndPerks").appendChild(
    textSyntax("§/$Y/Stat points§: §$player.skillpoints§")
  );
  $("skillsAndPerks").appendChild(
    textSyntax("§/$Y/Perk points§: §$player.perkpoints§")
  );
  addHoverBox($("skillsAndPerks").childNodes[0], texts.skill, 10);
  addHoverBox($("skillsAndPerks").childNodes[1], texts.perk, 10);
  combatStatsView();
}

function select(target) {
  playSound("click");
  SaveGameHC();
  updateLeftValues();
  if (state.gamemode.prevent_manual_save && target == "Saves") return;
  $("mainWindowContainer").removeEventListener("click", removeSelect);
  for (let but of topBarButtons) {
    if (target == but.name) but.selected = true;
    else but.selected = false;
  }
  $("mainWindowContainer").textContent = "";
  if (target == "Character") createCharacterScreen();
  if (target == "Floors & Stages") createStageSelection();
  if (target == "Perks") createPerkTree();
  if (target == "Inventory") createInventory();
  if (target == "Store") createStore();
  if (target == "Smithy") createSmithy();
  if (target == "Codex") createCodex();
  if (target == "Saves") createSaving();
  if (target == "Statistics") createStatistics();
  createTopBar();
}

function createCharacterScreen() {
  $("mainWindowContainer").innerHTML = `
    <div id="characterStats">
      <div id="str">
        <img src="images/strength.png">
        <p>${player.stats.str}</p>
      </div>
      <div id="vit">
        <img src="images/vitality.png">
        <p>${player.stats.vit}</p>
      </div>
      <div id="agi">
       <img src="images/agility.png">
        <p>${player.stats.agi}</p>
      </div>
      <div id="int">
        <img src="images/wisdom.png">
        <p>${player.stats.int}</p>
      </div>
    </div>
    <div id="levelUpButton"></div>
  `;
  for (let child of $("characterStats").childNodes) {
    addHoverBox(child, texts[child.id], 12);
    child.addEventListener("click", (e) => UpgradeStat(e, child.id));
  }
  addHoverBox(
    $("levelUpButton"),
    `Level up your character when you have enough experience points. §:br§ ${
      player.xp >= player.xpCap ? "§/$Y/CLICK TO LEVEL UP§" : ""
    }`,
    12
  );
  if (player.xp < player.xpCap) {
    $("levelUpButton").classList.add("levelUpButton-cant");
  } else {
    $("levelUpButton").addEventListener("click", (e) => levelUp(e));
  }
}
function combatStatsView() {
  Update();
  $("combatStats").textContent = "";
  $("combatStats").innerHTML = `
    <p id="weapon">
    <img src="images/weapon_icon.png">
    ${player.weapon.name}
    </p>
    <p id="damage">
    <img src="images/damage_icon.png">
    ${Math.floor(calculateDmg(player, enemies.dummy, "defaultAttack"))}
    </p>
    <p id="dodge">
    <img src="images/dodge_icon.png">
    ${Math.floor(player.dodge * 100)}%
    </p>
    <p id="speed">
    <img src="images/speedometer.png">
    ${(100 / ((0.5 + player.speed) * 60)).toFixed(1)}s
    </p>
    <p id="health">
    <img src="images/centaur-heart.png">
    ${
      (state.gamemode.prevent_recovery_after_battle ? player.hp + "/" : "") +
      getPlayerHP()
    }
    </p>
    <p id="mana">
    <img src="images/mana_icon.png">
    ${
      (state.gamemode.prevent_recovery_after_battle ? player.mp + "/" : "") +
      player.maxmp
    }
    </p>
    <p id="physres">
    <img src="images/physical_resistance.png">
    ${Math.floor(player.physical_resistance)}%
    </p>
    <p id="magires">
    <img src="images/magical_resistance.png">
    ${Math.floor(player.magical_resistance)}%
    </p>
    <p id="critchance">
    <img src="images/dice-fire.png">
    ${Math.floor(player.critChance)}%
    </p>
    <p id="critdamage">
    <img src="images/punch-blast.png">
    ${Math.floor(player.critDamage)}%
    </p>
  `;
  for (let child of combatStats.childNodes) {
    addHoverBox(child, texts[child.id + "_info"], 12);
  }
}

function UpgradeStat(act, stat) {
  if (player.skillpoints > 0 && !act.shiftKey) {
    player.skillpoints--;
    player.stats[stat]++;
    if (stat == "vit") player.maxhp += 25;
    else if (stat == "int") player.maxmp += 5;
    else if (stat === "agi") {
      player.critChance += 0.1;
    }
    player.hp = getPlayerHP();
    player.mp = player.maxmp;
  } else if (player.skillpoints >= 5 && act.shiftKey) {
    player.skillpoints -= 5;
    player.stats[stat] += 5;
    if (stat == "vit") player.maxhp += 50;
    else if (stat == "int") player.maxmp += 25;
    else if (stat === "agi") {
      player.critChance += 0.5;
    }
    player.hp = getPlayerHP();
    player.mp = player.maxmp;
  } else if (player.skillpoints < 5 && act.shiftKey) {
    player.stats[stat] += player.skillpoints;
    if (stat == "vit") player.maxhp += 10 * player.skillpoints;
    else if (stat == "int") player.maxmp += 5 * player.skillpoints;
    else if (stat === "agi") {
      player.critChance += 0.1 * player.skillpoints;
    }
    player.hp = getPlayerHP();
    player.mp = player.maxmp;
    player.skillpoints = 0;
  }
  playSound("click");
  createCharacterScreen();
  updateLeftValues();
}

function levelUp(e) {
  if (player.xp >= player.xpCap && !e.shiftKey) {
    player.level++;
    (player.skillpoints += 3),
      (player.perkpoints += 1),
      (player.xp -= player.xpCap);
    player.xpCap *= 1.17;
  } else if (player.xp >= player.xpCap && e.shiftKey) {
    while (player.xp >= player.xpCap) {
      player.level++;
      (player.skillpoints += 3),
        (player.perkpoints += 1),
        (player.xp -= player.xpCap);
      player.xpCap *= 1.17;
    }
  }
  player.hp = getPlayerHP();
  player.mp = player.maxmp;
  player.xpCap = Math.ceil(player.xpCap);
  player.xp = Math.floor(player.xp);
  playSound("click");
  createCharacterScreen();
  updateLeftValues();
}

function createStageSelection() {
  $("mainWindowContainer").innerHTML = `
    <select id="floorsSelect"></select>
    <div id="buttons">
    </div>
  `;
  for (let floor in dungeon) {
    if (
      floor != "floor1" &&
      !player.floors_beaten["floor" + (+floor.substring(5) - 1)]
    )
      continue;
    let option = create("option");
    option.textContent = dungeon[floor].name;
    option.value = floor;
    $("floorsSelect").appendChild(option);
  }
  $("floorsSelect").value = "floor" + state.floor;
  $("floorsSelect").addEventListener("change", changeFloor);
  $("buttons").appendChild(createStages(dungeon["floor" + state.floor]));
}

function changeFloor(e) {
  state.floor = e.target.value.substring(5);
  createStageSelection();
}

function createStages(floor) {
  let div = create("div");
  for (let stage in floor.stages) {
    if (floor.stages[stage].name == "Stage 0") continue;
    if (
      floor.stages[stage].name == "_God_" &&
      !player.stages_beaten.college_ball
    )
      continue;
    let but = create("button");
    but.textContent = floor.stages[stage].name;
    but.addEventListener("click", () => startFight(floor.stages[stage]));
    but.classList.add("StageButton");
    let foes = floor.stages[stage].gauntlet;
    let list = [];
    for (let foe of foes) {
      let inList = list.filter((e) => e.name == foe.name);
      if (inList.length > 0) {
        inList[0].amount += +1;
      } else {
        list.push({ name: foe.name, amount: 1, lvl: foe.level });
      }
    }
    list = list.sort((x1, x2) => x2.lvl - x1.lvl);
    let text = "";
    for (let lit of list) {
      let difference = lit.lvl - player.level;
      for (let code of colorCodes) {
        if (code.max >= difference) {
          text += `${lit.amount}x §/${code.color}/${lit.name}§ §:br§`;
          break;
        }
      }
    }
    if (player.stages_beaten[stage]) {
      text += "§:br§ §/green/BEATEN!§";
      if (state.gamemode.can_only_fight_once) {
        text += "§:br§ §/red/You can only fight this stage once§";
      }
    }

    addHoverBox(but, text, 10);
    div.appendChild(but);
  }
  return div;
}

function startFight(stage) {
  if (state.gamemode.can_only_fight_once && player.stages_beaten[stage.id]) {
    return;
  }
  state.stage = copy(stage);
  gauntlet = copy(state.stage.gauntlet);
  enemy = gauntlet[0];
  if (!state.gamemode.prevent_recovery_after_battle) {
    player.hp = getPlayerHP();
    player.mp = player.maxmp;
  }
  combatTimer = setInterval(
    Update,
    1000 / (60 * combatSpeeds[settings.combat_speed])
  );
  state.end = false;
  state.turn = "none";
  state.action = false;
  state.paused = false;
  state.open = "none";
  player.action_points = 0;
  $("enemyName").textContent = "Lv" + enemy.level + " " + enemy.name;
  $("enemySprite").src = "images/" + enemy.name + ".png";
  $("playerName").textContent = "Lv" + player.level + " " + player.name;
  for (let cd of player.moves) {
    cd.onCooldown = 0;
  }
  player.statuses = [];
  enemy.statuses = [];
  if (state.gamemode.give_enemy_scaling_power) {
    enemy.statuses.push({ ...statuses.enemy_rage });
  }
  fixCooldowns();
  EnemyNameColor();
  if (!enemy.music) playMusic("combat");
  else playBossMusic(enemy.music);
  $("combatScreen").style.display = "block";
  $("mainScreen").style.display = "none";
  $("eventWindow").textContent = "";
}

$("mainWindowContainer").addEventListener("mousedown", action1);
$("mainWindowContainer").addEventListener("mousemove", action2);

let mouseX = 0;
let mouseY = 0;
let bgPosX = 0;
let bgPosY = 0;

function action1(e) {
  mouseX = e.x;
  mouseY = e.y;
  bgPosX = $("mainWindowContainer").scrollLeft;
  bgPosY = $("mainWindowContainer").scrollTop;
}

function action2(e) {
  if (e.buttons == 1) {
    let offsetX = e.x - mouseX;
    let offsetY = e.y - mouseY;
    $("mainWindowContainer").scrollTo(bgPosX - offsetX, bgPosY - offsetY);
  }
}

function getMatNum(mat) {
  for (let itm of player.items) {
    if (itm.id == (mat.id === undefined ? mat : mat.id)) return itm.amount;
  }
  return 0;
}

function useItemFromInv(e) {
  let item;
  for (let itm of player.items) {
    if (itm.name == e.target.id) item = itm;
  }
  if (!settings.dont_ask_when_using_item)
    createPrompt(`Are you sure you wish to use ${item.name}?`, () =>
      useThisItem(item)
    );
  else useThisItem(item);
}

let store_buying = [];

function createStore() {
  $("mainWindowContainer").textContent = "";
  let store = create("div");
  store.id = "storeContainer";
  let buying = create("div");
  buying.id = "storeBuyingContainer";
  let totalPrice = create("p");
  totalPrice.id = "storeTotal";
  let checkout = create("button");
  let clear = create("button");
  checkout.textContent = "Checkout";
  clear.textContent = "Clear";
  checkout.id = "checkout";
  clear.id = "clear";
  for (let item of merchants["floor" + state.floor + "_merchant"].stock) {
    let merchandise = textSyntax(
      `§/${tiers[item.item.tier]}/${item.item.name}§`
    );
    merchandise.id = item.item.name;
    let hoverText = itemHoverText(item.item, item.price);
    let width = 15;
    addHoverBox(merchandise, hoverText, width);
    store.appendChild(merchandise);
    merchandise.addEventListener("click", addItem);
  }
  let total = 0;
  for (let item of store_buying) {
    let merchandise = textSyntax(
      `§/${tiers[item.tier]}/${item.name} x${item.amount}§`
    );
    merchandise.id = item.name;
    let hoverText = itemHoverText(item);
    let width = 15;
    for (let itm of merchants["floor" + state.floor + "_merchant"].stock) {
      if (itm.item.name == item.name) total += itm.price * item.amount;
    }
    addHoverBox(merchandise, hoverText, width);
    buying.appendChild(merchandise);
    merchandise.addEventListener("click", removeItem);
  }
  checkout.addEventListener("click", () => buyItems(total));
  clear.addEventListener("click", clearItems);
  let goldIcon = create("img");
  goldIcon.src = "images/gold.png";
  let textContent = create("p");
  textContent.textContent = spacesToNumber(total);
  if (player.gold < total) textContent.style.color = "red";
  if (player.gold < total) checkout.classList.add("unavailable");
  totalPrice.appendChild(goldIcon);
  totalPrice.appendChild(textContent);
  addHoverBox(totalPrice, texts.total_price, 12);
  addHoverBox(checkout, texts.checkout, 12);
  addHoverBox(clear, texts.clear_store, 8);
  $("mainWindowContainer").appendChild(totalPrice);
  $("mainWindowContainer").appendChild(buying);
  $("mainWindowContainer").appendChild(store);
  $("mainWindowContainer").appendChild(checkout);
  $("mainWindowContainer").appendChild(clear);
}

function addItem(e) {
  playSound("click");
  let item;
  for (let itm of merchants["floor" + state.floor + "_merchant"].stock) {
    if (itm.item.name == e.target.id) item = itm;
  }
  let itemFound = false;
  for (let itm of store_buying) {
    if (itm.name == item.item.name) {
      itm.amount++;
      itemFound = true;
    }
  }
  if (!itemFound) {
    store_buying.push(copy({ ...item.item, amount: 1 }));
  }
  createStore();
}

function removeItem(e) {
  playSound("click");
  for (let i = 0; i < store_buying.length; i++) {
    if (store_buying[i].name === e.target.id && store_buying[i].amount <= 1) {
      store_buying.splice(i, 1);
      textBoxRemove();
      break;
    } else if (store_buying[i].name === e.target.id) {
      store_buying[i].amount--;
      break;
    }
  }
  createStore();
}

const tierNumbers = {
  DEFAULT: 0,
  G: 1,
  F: 2,
  E: 3,
  D: 4,
  C: 5,
  B: 6,
  A: 7,
  S: 8,
};

function buyItems(price) {
  playSound("click");
  if (price > player.gold) return;
  player.gold -= price;
  for (let itm of store_buying) {
    if (hasItem(itm)) hasItem(itm).amount += itm.amount;
    else player.items.push(copy(itm));
    autoEquip(itm);
  }
  updateLeftValues();
  store_buying = [];
  createStore();
}

function autoEquip(itm) {
  if (itm.item_type === "weapon" || itm.item_type === "armor") {
    console.log("eh?");
    let itm_tier = tierNumbers[itm.tier];
    if (itm.item_type === "weapon") {
      let eq_tier = tierNumbers[player.weapon.tier];
      console.log(itm_tier, eq_tier);
      if (itm_tier > eq_tier) {
        // equip
        equipWeapon(null, itm);
      }
    } else if (itm.item_type === "armor") {
      let eq_tier = tierNumbers[player.armor.tier];
      if (itm_tier > eq_tier) {
        // equip
        equipArmor(null, itm);
      }
    }
    updateLeftValues();
  }
}

function hasItem(itm) {
  for (let item of player.items) {
    if (item.name == itm.name) return item;
  }
  return false;
}

function clearItems() {
  store_buying = [];
  createStore();
}

let save_slots = [];
let selected_slot = null;
let input = "";

function save_does_not_have_sortTime() {
  for (let save of save_slots) {
    if (!save.time || save.time == null) {
      save.time = +new Date(1 / 1 / 1970);
    }
  }
}

function loadSettingsSave() {
  settings = JSON.parse(localStorage.getItem(`settings`));
}

$("promptAccept").addEventListener("click", cancelPrompt);

function createPrompt(text, accept) {
  if (text.indexOf("undefined") != -1) return;
  $("promptBackground").style.display = "block";
  $("promptWindow").style.display = "block";
  $("promptText").textContent = text;
  $("promptAccept").onclick = accept;
}

function cancelPrompt() {
  $("promptBackground").style.display = "none";
  $("promptWindow").style.display = "none";
}

function spacesToNumber(number) {
  let txt = `${number}`;
  let empty = "";
  for (let i = 0; i < txt.length; i++) {
    if ((txt.length - i) % 3 == 0 && i !== 0) empty += " ";
    empty += txt[i];
  }
  return empty;
}

function effectSyntax(effect, req) {
  if (req == "stat") {
    if (effect.increase) {
      switch (effect.increase) {
        case "physical_multiplier":
          return "§/$Y/physical damage§";
        case "magical_multiplier":
          return "§/$Y/magical damage§";
        case "maxhp":
          return "§/$R/HP§";
        case "maxmp":
          return "§/$B/MP§";
        case "dodge":
          return "§/$Y/dodge chance§";
        case "critChance":
          return "§/$Y/crit chance§";
        case "critDamage":
          return "§/$Y/crit damage§";
      }
    } else if (effect.increase_stat) {
      switch (effect.increase_stat) {
        case "str":
          return "strength";
        case "agi":
          return "agility";
        case "vit":
          return "vitality";
        case "int":
          return "intelligence";
        case "lck":
          return "NOT_DESCRIBED";
      }
    }
  } else if (req == "value") {
    if (
      (effect.increase?.indexOf("_multiplier") != -1 ||
        effect.increase == "dodge") &&
      !effect.increase_stat
    ) {
      return effect.by * 100 + "%";
    } else if (
      effect.increase === "critChance" ||
      effect.increase === "critDamage"
    ) {
      return effect.by + "%";
    } else return effect.by;
  }
}

function ReturnToMainMenu() {
  $("mainMenu").style.display = "block";
  $("mainScreen").style.display = "none";
  $("combatScreen").style.display = "none";
}

function getPlayerItemAmount(id) {
  for (let item of player.items) {
    if (item.name == id) return item.amount;
  }
  return 0;
}
