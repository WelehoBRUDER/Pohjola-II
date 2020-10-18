
const topBarButtons = [
  {
    name: "Character",
  },
  {
    name: "Perks",
  },
  {
    name: "Inventory"
  },
  {
    name: "Store",
  },
  {
    name: "Bank",
  },
  {
    name: "Floors & Stages",
  },
  {
    name: "Saves"
  }
];

addHoverBox($("goldContainer"), texts.gold, 14);
addHoverBox($("xpContainer"), texts.xp, 14);
addHoverBox($("xpBar"), texts.xp, 14);
addHoverBox($("defaultSprite"), texts.you, 10);

createTopBar();
select("Character");

function createTopBar() {
  $("mainWindowTopBar").textContent = "";
  for (let button of topBarButtons) {
    let but = create("div");
    but.classList.add("mainWindowTopBar--button");
    if (button.selected) but.classList.add("mainWindowTopBar--button-selected");
    but.textContent = button.name;
    but.addEventListener('click', () => select(button.name));
    let hover = button.name.toLowerCase();
    hover = hover.replace(/( & )/g, '_');
    addHoverBox(but, texts[hover], 10);
    $("mainWindowTopBar").appendChild(but);
  }
}

function updateLeftValues() {
  $("goldNumber").textContent = player.gold;
  $("xpNumber").textContent = player.xp + "/" + player.xpCap;
  $("xpBarFill").style.width = (player.xp / player.xpCap) * 100 + '%';
  if (player.xp > player.xpCap) $("xpBarFill").style.width = "100%";
  $("defaultSprite").src = "images/" + player.sprite + ".png";
  $("skillsAndPerks").textContent = "";
  $("skillsAndPerks").appendChild(textSyntax("§/$Y/Stat points§: §$player.skillpoints§"));
  $("skillsAndPerks").appendChild(textSyntax("§/$Y/Perk points§: §$player.perkpoints§"));
  addHoverBox($("skillsAndPerks").childNodes[0], texts.skill, 10);
  addHoverBox($("skillsAndPerks").childNodes[1], texts.perk, 10);
  combatStatsView();
}

function select(target) {
  updateLeftValues();
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
  if (target == "Saves") createSaving();
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
    <div id="levelUpButton">Level Up</div>
  `;
  for (let child of $("characterStats").childNodes) {
    addHoverBox(child, texts[child.id], 12);
    child.addEventListener('click', (e) => UpgradeStat(e, child.id));
  }
  $("levelUpButton").addEventListener('click', (e) => levelUp(e));
}
function combatStatsView() {
  $("combatStats").textContent = "";
  $("combatStats").innerHTML = `
    <p id="weapon">
    <img src="images/weapon_icon.png">
    ${player.weapon.name}
    </p>
    <p id="damage">
    <img src="images/damage_icon.png">
    ${Math.floor(player.weapon.damage * (1 + player.stats.str / 20) * (1 + player.physical_multiplier))}
    </p>
    <p id="dodge">
    <img src="images/dodge_icon.png">
    ${player.dodge * 100}%
    </p>
    <p id="speed">
    <img src="images/speed_icon.png">
    ${(100 / ((0.5 + player.speed) * 60)).toFixed(1)}s
    </p>
    <p id="health">
    <img src="images/health_icon.png">
    ${player.maxhp}
    </p>
    <p id="mana">
    <img src="images/mana_icon.png">
    ${player.maxmp}
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
    if (stat == "vit") player.maxhp += 10;
    else if (stat == "int") player.maxmp += 5;
  } else if (player.skillpoints >= 5 && act.shiftKey) {
    player.skillpoints -= 5;
    player.stats[stat] += 5;
    if (stat == "vit") player.maxhp += 50;
    else if (stat == "int") player.maxmp += 25;
  } else if (player.skillpoints < 5 && act.shiftKey) {
    player.stats[stat] += player.skillpoints;
    if (stat == "vit") player.maxhp += 10 * player.skillpoints;
    else if (stat == "int") player.maxmp += 5 * player.skillpoints;
    player.skillpoints = 0;
  }
  createCharacterScreen();
  updateLeftValues();
}

function levelUp(e) {
  if (player.xp >= player.xpCap && !e.shiftKey) {
    player.level++;
    player.skillpoints += 3,
      player.perkpoints += 1,
      player.xp -= player.xpCap;
    player.xpCap *= 1.21;
  } else if (player.xp >= player.xpCap && e.shiftKey) {
    while (player.xp >= player.xpCap) {
      player.level++;
      player.skillpoints += 3,
        player.perkpoints += 1,
        player.xp -= player.xpCap;
      player.xpCap *= 1.21;
    }
  }
  player.xpCap = Math.ceil(player.xpCap);
  player.xp = Math.floor(player.xp);
  createCharacterScreen();
  updateLeftValues();
}

function createStageSelection() {
  $("mainWindowContainer").innerHTML = `
    <div id="buttons">
    </div>
  `;
  $("buttons").appendChild(createStages(dungeon.floor1));
}

function createStages(floor) {
  let div = create("div");
  for (let stage in floor.stages) {
    if (floor.stages[stage].name == "Stage 0") continue;
    let but = create("button");
    but.textContent = floor.stages[stage].name;
    but.addEventListener("click", () => startFight(floor.stages[stage]));
    but.classList.add("StageButton");
    let foes = floor.stages[stage].gauntlet;
    let list = [];
    for (let foe of foes) {
      let inList = list.filter(e => e.name == foe.name);
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
        };
      }
    }
    addHoverBox(but, text, 9);
    div.appendChild(but);
  }
  return div;
}

function startFight(stage) {
  state.stage = copy(stage);
  gauntlet = copy(state.stage.gauntlet);
  enemy = gauntlet[0];
  player.hp = player.maxhp;
  player.mp = player.maxmp;
  state.end = false;
  state.turn = "none";
  state.action = false;
  state.paused = false;
  state.open = "none";
  player.action_points = 0;
  $("enemyName").textContent = "Lv" + enemy.level + " " + enemy.name;
  $("enemySprite").src = "images/" + enemy.name + ".png";
  $("playerName").textContent = "Lv" + player.level + " " + player.name;
  for(let cd of player.moves) {
    cd.onCooldown = 0;
  }
  EnemyNameColor();
  $("combatScreen").style.display = "block";
  $("mainScreen").style.display = "none";
  $("eventWindow").textContent = "";
}

function createPerkTree() {
  $("mainWindowContainer").textContent = "";
  let hackywacky = create("div");
  hackywacky.id = "perkBG";
  $("mainWindowContainer").appendChild(hackywacky);
  let title = create("p");
  title.id = "perkTree--title";
  title.textContent = selected_tree.colors.name;
  $("mainWindowContainer").appendChild(title);
  let treeButtons = create("div");
  treeButtons.id = "perkTree--buttons";
  for(let tree in trees) {
    let treeButton = create("div");
    treeButton.id = tree + "_tree";
    treeButton.textContent = tree.toUpperCase();
    if(selected_tree.colors.id == tree) treeButton.classList.add("perkTree--buttons-selected");
    treeButton.addEventListener("click", changeTree);
    treeButtons.appendChild(treeButton);
  }
  $("mainWindowContainer").appendChild(treeButtons);
  for(let perk in selected_tree) {
    if(perk == "colors") continue; 
    let Perk = selected_tree[perk];
    let div = create("div");
    div.id = perk;
    div.classList.add("perkTree--perk");
    div.style.background = selected_tree.colors.reg;
    div.style.boxShadow = `inset 0vw 0vw 0.2vw 0.2vw ${selected_tree.colors.box}`;
    let ico = create("img");
    ico.src = "images/" + selected_tree[perk].icon + ".png";
    ico.classList.add("perkTree--img");
    if(player.bought_perks[perk]) {
      div.classList.add("perkTree--perk-bought");
    }
    if(Perk.left_of) {
      let origin = $(Perk.left_of);
      div.style.top = pxtovw(origin.offsetHeight) + 2 + "vw";
      div.style.left = pxtovw(origin.offsetLeft) - 6 + "vw";
      let connecter = create("div");
      connecter.classList.add("perkConnecterSide");
      connecter.style.top = pxtovw(origin.offsetHeight) + 4 + "vw";
      connecter.style.left = pxtovw(origin.offsetLeft) - 4 + "vw";
      hackywacky.appendChild(connecter);
      if(!player.bought_perks[Perk.left_of]) {
        div.classList.add("perkTree--perk-unavailable");
      }
    }
    else if(Perk.right_of) {
      let origin = $(Perk.right_of);
      div.style.top = pxtovw(origin.offsetHeight) + 2 + "vw";
      div.style.left = pxtovw(origin.offsetLeft) + 6 + "vw";
      let connecter = create("div");
      connecter.classList.add("perkConnecterSide");
      connecter.style.top = pxtovw(origin.offsetHeight) + 4 + "vw";
      connecter.style.left = pxtovw(origin.offsetLeft) + 4 + "vw";
      hackywacky.appendChild(connecter);
      if(!player.bought_perks[Perk.right_of]) {
        div.classList.add("perkTree--perk-unavailable");
      }
    }
    else if(Perk.down_of) {
      let origin = $(Perk.down_of);
      div.style.top = pxtovw(origin.offsetTop) + 6 + "vw";
      div.style.left = pxtovw(origin.offsetLeft - origin.offsetWidth/2) + 2 + "vw";
      let connecter = create("div");
      connecter.classList.add("perkConnecterDown");
      connecter.style.top = pxtovw(origin.offsetTop) + 2 + "vw";
      connecter.style.left = pxtovw(origin.offsetLeft) + 1.5 + "vw";
      hackywacky.appendChild(connecter);
      if(!player.bought_perks[Perk.down_of]) {
        div.classList.add("perkTree--perk-unavailable");
      }
    }
    else div.classList.add("perkTree--perk-first");
    addHoverBox(div, `§FS1.25FS/$Y/${Perk.name}§` + "§:br§" + Perk.desc, Perk.name.length/1.5);
    div.addEventListener("click", buyPerk);
    div.appendChild(ico);
    hackywacky.appendChild(div);
  }
}

function buyPerk(e) {
  let perk = e.target.id;
  if(player.bought_perks[perk]) return;
  if(player.perkpoints >= selected_tree[perk].cost) {
    player.perkpoints -= selected_tree[perk].cost;
    player.bought_perks[perk] = true;
    for(let effect of selected_tree[perk].effect) {
      if(effect.increase_stat) player.stats[effect.increase_stat] += effect.by;
      else if(effect.increase) player[effect.increase] += effect.by;
      else if(effect.grant_skill) player.moves.push(copy(effect.grant_skill));
      else if(effect.modify_skill) {
        for(let skill of player.moves) {
          if(skill.id == effect.modify_skill) {
            skill[effect.target] += effect.by;
          }
        }
      }
    }
    updateLeftValues();
    createPerkTree();
  }
}

function changeTree(e) {
  let tree = e.target.id;
  selected_tree = eval(tree);
  createPerkTree();
}

function createInventory() {
  $("mainWindowContainer").textContent = "";
  let invContainer = create("div");
  let weaponContainer = create("div");
  let armorContainer = create("div");
  let weaponsContainer = create("div");
  let armorsContainer = create("div");
  weaponContainer.id = "weaponContainer";
  armorContainer.id = "armorContainer";
  weaponsContainer.id = "weaponsContainer";
  armorsContainer.id = "armorsContainer";
  weaponContainer.addEventListener("click", unequipWeapon);
  armorContainer.addEventListener("click", unequipArmor);
  weaponContainer.appendChild(textSyntax("Equipped weapon: §/$tiers[player.weapon.tier]/$player.weapon.name§"));
  armorContainer.appendChild(textSyntax("Equipped armor: §/$tiers[player.armor.tier]/$player.armor.name§"));
  addHoverBox(weaponContainer, "Damage: §/$Y/$player.weapon.damage§ §:br§ Speed: §/$B/$player.weapon.speed_bonus§", 6);
  addHoverBox(armorContainer, "Physical Resistance: §/$Y/$player.armor.physical_resistance§§/$Y/%§ §:br§ Magical Resistance: §/$B/$player.armor.magical_resistance§§/$B/%§ §:br§ Speed: §$player.armor.speed_bonus§", 12);
  for(let wep of player.items) {
    if(wep.item_type == "weapon" && wep.name != "Fists") {
      let id = wep.name;
      let weapon;
      if(wep.amount <= 1) weapon = textSyntax(`§/${tiers[wep.tier]}/${wep.name}§`);
      else weapon = textSyntax(`§/${tiers[wep.tier]}/${wep.name} ${wep.amount}x§`);
      weapon.id = id;
      weapon.addEventListener("click", equipWeapon);
      addHoverBox(weapon, `Damage: §/$Y/${wep.damage}§ §:br§ Speed: §/$B/${wep.speed_bonus}§ §:br§ Tier: §/${tiers[wep.tier]}/${wep.tier}§`, 6);
      weaponsContainer.appendChild(weapon);
    }
  }
  for(let arm of player.items) {
      if(arm.item_type == "armor" && arm.name != "Nothing") {
        let armor;
        if(arm.amount <= 1) armor = textSyntax(`§/${tiers[arm.tier]}/${arm.name}§`);
        else armor = textSyntax(`§/${tiers[arm.tier]}/${arm.name} ${arm.amount}x§`);
        addHoverBox(armor, `Physical Resistance: §/$Y/${arm.physical_resistance}%§ §:br§ Magical Resistance: §/$B/${arm.magical_resistance}%§ §:br§ Speed: §/white/${arm.speed_bonus}§ §:br§ Tier: §/${tiers[arm.tier]}/${arm.tier}§`, 12);
        armor.addEventListener("click", equipArmor);
        armor.id = arm.name;
        armorsContainer.appendChild(armor);
    }
  }
  invContainer.appendChild(weaponContainer);
  invContainer.appendChild(armorContainer);
  invContainer.appendChild(weaponsContainer);
  invContainer.appendChild(armorsContainer);
  $("mainWindowContainer").appendChild(invContainer);
}

function equipWeapon(e) {
  let weapon;
  for(let wep of player.items) {
    if(wep.name == e.target.id) weapon = wep;
  }
  if(weapon.amount <= 1) textBoxRemove();
  let foundWep = false;
  for(let wep of player.items) {
    if(wep.name == player.weapon.name) {wep.amount++; foundWep = true}
  }
  if(!foundWep) {
    player.items.push(player.weapon);
  }
  player.weapon = weapon;
  if(weapon.amount > 1) {
    weapon.amount--;
  } 
  else for(let i = 0; i<player.items.length; i++) {
    if(player.items[i].name == weapon.name) player.items.splice(i, 1);
  }
  createInventory();
  updateLeftValues();
}

function equipArmor(e) {
  textBoxRemove();
  let armor;
  for(let arm of player.items) {
    if(arm.name == e.target.id) armor = arm;
  }
  if(armor.amount <= 1) textBoxRemove();
  let foundArm = false;
  for(let arm of player.items) {
    if(arm.name == player.armor.name) {arm.amount++; foundArm = true}
  }
  if(!foundArm) {
    player.items.push(player.armor);
  }
  player.armor = armor;
  if(armor.amount > 1) {
    armor.amount--;
  } 
  else for(let i = 0; i<player.items.length; i++) {
    if(player.items[i].name == armor.name) player.items.splice(i, 1);
  }
  createInventory();
  updateLeftValues();
}

function unequipWeapon() {
  if(player.weapon.name == "Fists") return;
  let foundWep = false;
  for(let wep of player.items) {
    if(wep.name == player.weapon.name) {wep.amount++; foundWep = true}
  }
  if(!foundWep) {
    player.items.push(player.weapon);
  }
  let fists;
  for(let fist of player.items) {
    if(fist.name == "Fists") fists = fist;
  }
  player.weapon = fists;
  createInventory();
  updateLeftValues();
}

function unequipArmor() {
  if(player.armor.name == "Nothing") return;
  let foundArm = false;
  for(let arm of player.items) {
    if(arm.name == player.armor.name) {arm.amount++; foundArm = true}
  }
  if(!foundArm) {
    player.items.push(player.armor);
  }
  let naked;
  for(let nothing of player.items) {
    if(nothing.name == "Nothing") naked = nothing;
  }
  player.armor = naked;
  createInventory();
  updateLeftValues();
}

function createStore() {
  $("mainWindowContainer").textContent = "";
  let store = create("div");
  store.id = "storeContainer";
  for(let item of merchants["floor" + state.floor + "_merchant"].stock) {
    console.log(item);
    let merchandise = textSyntax(`§/${tiers[item.item.tier]}/${item.item.name}§`);
    merchandise.id = item.item.name;
    if(item.type == "consumable") addHoverBox(merchandise, `Recover: ${item.item.value} §/$Y/${item.item.recover.toUpperCase()}§ §:br§ Tier: §/${tiers[item.item.tier]}/${item.item.tier}§ §:br§ Price: §/$Y/${item.price}§`, 8);
    else if(item.type == "weapon") addHoverBox(merchandise, `Damage: §/$Y/${item.item.damage}§ §:br§ Speed: §/$B/${item.item.speed_bonus}§ §:br§ Tier: §/${tiers[item.item.tier]}/${item.item.tier}§ §:br§ Price: §/$Y/${item.price}§`, 8);
    else if(item.type == "armor") addHoverBox(merchandise, `Physical Resistance: §/$Y/${item.item.physical_resistance}§ §:br§ Magical Resistance: §/$B/${item.item.magical_resistance}§ §:br§ Speed: ${item.item.speed_bonus}§:br§ Tier: §/${tiers[item.item.tier]}/${item.item.tier}§ §:br§ Price: §/$Y/${item.price}§`, 12);
    store.appendChild(merchandise);
    merchandise.addEventListener("click", buyItem);
  }
  $("mainWindowContainer").appendChild(store);
}

function buyItem(e) {
  let item;
  for(let itm of merchants["floor" + state.floor + "_merchant"].stock) {
    if(itm.item.name == e.target.id) item = itm;
  }
  if(player.gold < item.price) return;
  player.gold -= item.price;
  let itemFound = false;
  for(let itm of player.items) {
    if(itm.name == item.item.name) {
      itm.amount++;
      itemFound = true;
    }
  }
  if(!itemFound) {
    player.items.push(copy({...item.item, amount: 1}));
  }
  updateLeftValues();
}

var save_slots = [];
var selected_slot = null;

function createSaving() {
  $("mainWindowContainer").textContent = "";
  let save_container = create("div");
  let save_topbar = create("div");
  let save_bottom = create("div");
  save_bottom.id = "saveBottom";
  save_topbar.id = "saveTopbar";
  save_container.id = "saveContainer";
  $("mainWindowContainer").removeEventListener("click", removeSelect);
  $("mainWindowContainer").addEventListener("click", removeSelect);
  save_slots = JSON.parse(localStorage.getItem(`save_slots`)) || [];
  for(let save of save_slots) {
    let slot = create("p");
    slot.textContent = save.text;
    slot.id = "slot" + save.id;
    if(selected_slot?.id == save?.id) slot.classList.add("saveSelected");
    slot.addEventListener("click", selectSlot);
    save_bottom.appendChild(slot);
  }
  save_topbar.innerHTML = `<input id="save_input"></input> <button id="saveBut" onclick="saveGame()">Create Save</button> <button id="loadBut" onclick="loadGame()">Load Save</button>`;
  save_container.appendChild(save_topbar);
  save_container.appendChild(save_bottom);
  $("mainWindowContainer").appendChild(save_container);
  addHoverBox($("saveBut"), texts.save_button, 8);
  addHoverBox($("loadBut"), texts.load_button, 8);
}

function saveGame() {
  let saveName = $("save_input").value || player.name;
  let saveTime = new Date();
  let gameSave = {};
  gameSave.player = player;
  gameSave.state = state;
  saveTime = ("0" + saveTime.getHours()).slice(-2) + "." + ("0" + saveTime.getMinutes()).slice(-2);
  let id = 0;
  if(selected_slot == null) save_slots.push({text: `${saveName} || Last Saved: ${saveTime} || Character Level: ${player.level}`, save: gameSave, id: save_slots.length});
  else save_slots[selected_slot.id] = {text: `${saveName} || Last Saved: ${saveTime} || Character Level: ${player.level}`, save: gameSave, id: selected_slot.id};
  localStorage.setItem("save_slots", JSON.stringify(save_slots));
  createSaving();
}

function loadGame() {
  console.log(selected_slot);
  if(selected_slot == null) return;
  player = selected_slot.save.player;
  state = selected_slot.save.state;
  updateLeftValues();
  createSaving();
}

function selectSlot(e) {
  let id = e.target.id.substring(4);
  selected_slot = save_slots[id];
  createSaving();
}

function removeSelect(e) {
  if(e.target.id.startsWith("slot") || e.target.id == "saveTopbar" || e.target.id == "save_input" || e.target.id == "saveBut" || e.target.id == "loadBut") return;
  selected_slot = null;
  createSaving();
}