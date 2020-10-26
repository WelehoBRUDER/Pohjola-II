
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
    name: "Inventory"
  },
  {
    name: "Smithy",
  },
  {
    name: "Floors & Stages",
  },
  {
    name: "Saves"
  }
];

var scroll = {
  top: 0,
  left: 0
}

var currentSave;

function number(num) {
  if (num < 1000) return num;
  else if (num < 1000000) return (num / 1000 % 1 !== 0 ? (num / 1000).toFixed(2) : Math.floor(num / 1000)) + "K";
  else if (num < 1000000000) return (num / 1000000 % 1 !== 0 ? (num / 1000000).toFixed(2) : Math.floor(num / 1000000)) + "M";
  else return (num / 1000000000 % 1 !== 0 ? (num / 1000000000).toFixed(2) : Math.floor(num / 1000000000)) + "B";
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
  $("goldNumber").textContent = number(player.gold);
  $("xpNumber").textContent = number(player.xp) + "/" + number(player.xpCap);
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
  SaveGameHC();
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
  if (target == "Smithy") createSmithy();
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
    <div id="levelUpButton"></div>
  `;
  for (let child of $("characterStats").childNodes) {
    addHoverBox(child, texts[child.id], 12);
    child.addEventListener('click', (e) => UpgradeStat(e, child.id));
  }
  addHoverBox($("levelUpButton"), `Level up your character when you have enough experience points. §:br§ ${player.xp >= player.xpCap ? "§/$Y/CLICK TO LEVEL UP§" : ""}`, 12);
  if (player.xp < player.xpCap) {
    $("levelUpButton").classList.add("levelUpButton-cant");
  } else {
    $("levelUpButton").addEventListener('click', (e) => levelUp(e));
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
    ${player.dodge * 100}%
    </p>
    <p id="speed">
    <img src="images/speed_icon.png">
    ${(100 / ((0.5 + player.speed) * 60)).toFixed(1)}s
    </p>
    <p id="health">
    <img src="images/health_icon.png">
    ${(state.hc ? player.hp + "/" : "") + player.maxhp}
    </p>
    <p id="mana">
    <img src="images/mana_icon.png">
    ${(state.hc ? player.mp + "/" : "") + player.maxmp}
    </p>
    <p id="physres">
    <img src="images/physical_resistance.png">
    ${player.physical_resistance}%
    </p>
    <p id="magires">
    <img src="images/magical_resistance.png">
    ${player.magical_resistance}%
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
    player.xpCap *= 1.17;
  } else if (player.xp >= player.xpCap && e.shiftKey) {
    while (player.xp >= player.xpCap) {
      player.level++;
      player.skillpoints += 3,
        player.perkpoints += 1,
        player.xp -= player.xpCap;
      player.xpCap *= 1.17;
    }
  }
  player.hp = player.maxhp;
  player.mp = player.maxmp;
  player.xpCap = Math.ceil(player.xpCap);
  player.xp = Math.floor(player.xp);
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
    if (floor != "floor1" && !player.floors_beaten["floor" + (+floor.substring(5) - 1)]) continue;
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
    if (player.stages_beaten[stage]) text += "§:br§ §/green/BEATEN!§";
    addHoverBox(but, text, 9);
    div.appendChild(but);
  }
  return div;
}

function startFight(stage) {
  state.stage = copy(stage);
  gauntlet = copy(state.stage.gauntlet);
  enemy = gauntlet[0];
  if (!state.hc) player.hp = player.maxhp;
  if (!state.hc) player.mp = player.maxmp;
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
  fixCooldowns();
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
  for (let tree in trees) {
    let treeButton = create("div");
    treeButton.id = tree + "_tree";
    treeButton.textContent = tree.toUpperCase();
    if (selected_tree.colors.id == tree) treeButton.classList.add("perkTree--buttons-selected");
    treeButton.addEventListener("click", changeTree);
    treeButtons.appendChild(treeButton);
  }
  $("mainWindowContainer").appendChild(treeButtons);
  for (let perk in selected_tree) {
    if (perk == "colors") continue;
    let Perk = selected_tree[perk];
    let div = create("div");
    div.id = perk;
    div.classList.add("perkTree--perk");
    div.style.background = selected_tree.colors.reg;
    div.style.boxShadow = `inset 0vw 0vw 0.2vw 0.2vw ${selected_tree.colors.box}`;
    let ico = create("img");
    ico.src = "images/" + selected_tree[perk].icon + ".png";
    ico.classList.add("perkTree--img");
    if (player.bought_perks[perk]) {
      div.classList.add("perkTree--perk-bought");
    }
    if (Perk.left_of) {
      let origin = $(Perk.left_of);
      div.style.top = pxtovw(origin.offsetTop) + "vw";
      div.style.left = pxtovw(origin.offsetLeft) - 6 + "vw";
      let connecter = create("div");
      connecter.classList.add("perkConnecterSide");
      connecter.style.top = pxtovw(origin.offsetTop) + 2 + "vw";
      connecter.style.left = pxtovw(origin.offsetLeft) - 4 + "vw";
      hackywacky.appendChild(connecter);
      if ((!player.bought_perks[Perk.left_of] && !Perk.left_of.startsWith("path"))) {
        div.classList.add("perkTree--perk-unavailable");
      }
      else if (Perk.requires) {
        if (!player.bought_perks[Perk.requires]) {
          div.classList.add("perkTree--perk-unavailable");
        }
      }
    }
    else if (Perk.right_of) {
      let origin = $(Perk.right_of);
      div.style.top = pxtovw(origin.offsetTop) + "vw";
      div.style.left = pxtovw(origin.offsetLeft) + 6 + "vw";
      let connecter = create("div");
      connecter.classList.add("perkConnecterSide");
      connecter.style.top = pxtovw(origin.offsetTop) + 2 + "vw";
      connecter.style.left = pxtovw(origin.offsetLeft) + 4 + "vw";
      hackywacky.appendChild(connecter);
      if ((!player.bought_perks[Perk.right_of] && !Perk.right_of.startsWith("path"))) {
        div.classList.add("perkTree--perk-unavailable");
      }

      else if (Perk.requires) {
        if (!player.bought_perks[Perk.requires]) {
          div.classList.add("perkTree--perk-unavailable");
        }
      }
    }
    else if (Perk.down_of) {
      let origin = $(Perk.down_of);
      div.style.top = pxtovw(origin.offsetTop) + 6 + "vw";
      div.style.left = pxtovw(origin.offsetLeft) + "vw";
      let connecter = create("div");
      connecter.classList.add("perkConnecterDown");
      connecter.style.top = pxtovw(origin.offsetTop) + 2 + "vw";
      connecter.style.left = pxtovw(origin.offsetLeft + origin.offsetWidth / 2.25) + "vw";
      hackywacky.appendChild(connecter);
      if ((!player.bought_perks[Perk.down_of] && !Perk.down_of.startsWith("path"))) {
        div.classList.add("perkTree--perk-unavailable");
      }
      else if (Perk.requires) {
        if (!player.bought_perks[Perk.requires]) {
          div.classList.add("perkTree--perk-unavailable");
        }
      }
    }
    else div.classList.add("perkTree--perk-first");
    if (Perk.name === "PATH") {
      div.classList.add("PERKPATH");
    } else {
      addHoverBox(div, `§FS1.25FS/$Y/${Perk.name}§` + "§:br§" + Perk.desc, Perk.name.length / 1.5);
      div.addEventListener("click", buyPerk);
      div.appendChild(ico);
    }
    hackywacky.appendChild(div);
    $("mainWindowContainer").scrollTo(scroll.left, scroll.top);
  }
}

$("mainWindowContainer").addEventListener('mousedown', action1);
$("mainWindowContainer").addEventListener('mousemove', action2);

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

function buyPerk(e) {
  let perk = e.target.id;
  if (player.bought_perks[perk] || e.target.classList.contains("perkTree--perk-unavailable")) return;
  if (player.perkpoints >= selected_tree[perk].cost) {
    player.perkpoints -= selected_tree[perk].cost;
    player.bought_perks[perk] = true;
    for (let effect of selected_tree[perk].effect) {
      if (effect.increase_stat) player.stats[effect.increase_stat] += effect.by;
      else if (effect.increase) player[effect.increase] += effect.by;
      else if (effect.grant_skill) {
        player.moves.push(copy(effect.grant_skill));
        if (effect.grant_skill.status) player.move_statuses[effect.grant_skill.status] = (copy(statuses[effect.grant_skill.status]));
      }
      else if (effect.modify_skill) {
        for (let skill of player.moves) {
          if (skill.id == effect.modify_skill) {
            skill[effect.target] += effect.by;
          }
        }
      } else if (effect.modify_status) {
        player.move_statuses[effect.modify_status][effect.target] += effect.by;
      }
    }
    scroll.top = $("mainWindowContainer").scrollTop;
    scroll.left = $("mainWindowContainer").scrollLeft;
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
  let wandContainer = create("div");
  let itemsContainer = create("div");
  let matContainer = create("div");
  weaponContainer.id = "weaponContainer";
  armorContainer.id = "armorContainer";
  wandContainer.id = "wandContainer";
  weaponsContainer.id = "weaponsContainer";
  armorsContainer.id = "armorsContainer";
  itemsContainer.id = "itemsContainer";
  matContainer.id = "matContainer";
  weaponContainer.addEventListener("click", unequipWeapon);
  wandContainer.addEventListener("click", unequipWand);
  armorContainer.addEventListener("click", unequipArmor);
  weaponContainer.appendChild(textSyntax("Equipped weapon: §/$tiers[player.weapon.tier]/$player.weapon.name§"));
  armorContainer.appendChild(textSyntax("Equipped armor: §/$tiers[player.armor.tier]/$player.armor.name§"));
  wandContainer.appendChild(textSyntax("Equipped wand: §/$tiers[player.wand.tier]/$player.wand.name§"));
  addHoverBox(weaponContainer, "Damage: §/$Y/$player.weapon.damage§ §:br§ Speed: §/$B/$player.weapon.speed_bonus§", 6);
  addHoverBox(armorContainer, "Physical Resistance: §/$Y/$player.armor.physical_resistance§§/$Y/%§ §:br§ Magical Resistance: §/$B/$player.armor.magical_resistance§§/$B/%§ §:br§ Speed: §$player.armor.speed_bonus§", 12);
  addHoverBox(wandContainer, "Magical Power: §/$Y/$player.wand.magical_power*100§§/$Y/%§ §:br§ Speed: §/$B/$player.wand.speed_bonus§", 12);
  for (let wep of player.items) {
    if (wep.item_type == "weapon" && wep.name != "Fists" && wep.name != "Chant Only") {
      let id = wep.name;
      let weapon;
      if (wep.amount <= 1) weapon = textSyntax(`§/${tiers[wep.tier]}/${wep.name}§`);
      else weapon = textSyntax(`§/${tiers[wep.tier]}/${wep.name} ${wep.amount}x§`);
      weapon.id = id;
      weapon.addEventListener("click", equipWeapon);
      let hoverText = `${wep.magical_power ? "MagPower: " + "§/$Y/" + wep.magical_power * 100 + "%§" : "Damage: " + "§/$Y/" + wep.damage + "§"} §:br§ Speed: §/$B/${wep.speed_bonus}§ §:br§ Tier: §/${tiers[wep.tier]}/${wep.tier}§ §:br§ ${wep.mag_damage ? "MagDamage: " + wep.mag_damage : ""}`;
      if (wep?.effects) {
        for (let effect of wep?.effects) {
          if (effect.increase || effect.increase_stat) {
            hoverText += `§:br§ Increases ${effectSyntax(effect, "stat")} by ${effectSyntax(effect, "value")}`;
          }
        }
      }
      addHoverBox(weapon, hoverText, 8);
      weaponsContainer.appendChild(weapon);
    }
  }
  for (let arm of player.items) {
    if (arm.item_type == "armor" && arm.name != "Nothing") {
      let armor;
      if (arm.amount <= 1) armor = textSyntax(`§/${tiers[arm.tier]}/${arm.name}§`);
      else armor = textSyntax(`§/${tiers[arm.tier]}/${arm.name} ${arm.amount}x§`);
      let hoverText = `Physical Resistance: §/$Y/${arm.physical_resistance}%§ §:br§ Magical Resistance: §/$B/${arm.magical_resistance}%§ §:br§ Speed: §/white/${arm.speed_bonus}§ §:br§ Tier: §/${tiers[arm.tier]}/${arm.tier}§`;
      if (arm?.effects) {
        for (let effect of arm?.effects) {
          if (effect.increase || effect.increase_stat) {
            hoverText += `§:br§ Increases ${effectSyntax(effect, "stat")} by ${effectSyntax(effect, "value")}`;
          }
        }
      }
      addHoverBox(armor, hoverText, 12);
      armor.addEventListener("click", equipArmor);
      armor.id = arm.name;
      armorsContainer.appendChild(armor);
    }
  }
  for (let itm of player.items) {
    if (itm.item_type == "consumable") {
      let item;
      if (itm.amount <= 1) item = textSyntax(`§/${tiers[itm.tier]}/${itm.name}§`);
      else item = textSyntax(`§/${tiers[itm.tier]}/${itm.name} ${itm.amount}x§`);
      let hoverText = `Recovers ${itm.value} ${itm.recover == "mp" ? "§/$B/MP§" : "§/$R/HP§"} §:br§ Tier: §/${tiers[itm.tier]}/${itm.tier}§`;
      if (itm?.effects) {
        for (let effect of itm?.effects) {
          if (effect.increase || effect.increase_stat) {
            hoverText += `§:br§ Increases ${effectSyntax(effect, "stat")} by ${effectSyntax(effect, "value")} §:br§ ${effect.timed ? "Lasts: " + effect.timed + "s" : ""}`;
          }
        }
      }
      addHoverBox(item, hoverText, 12);
      item.addEventListener("click", useItemFromInv);
      item.id = itm.name;
      itemsContainer.appendChild(item);
    }
  }
  for(let mat in materials) {
    let div = create("div");
    let img = create("img");
    let num = create("p");
    div.classList.add("invMaterial");
    img.src = "images/" + materials[mat].img || "images/iron_ingot.png";
    num.textContent = getMatNum(materials[mat]);
    addHoverBox(div, materials[mat].name, 8);
    div.appendChild(img);
    div.appendChild(num);
    matContainer.appendChild(div);
  }
  invContainer.appendChild(weaponContainer);
  invContainer.appendChild(armorContainer);
  invContainer.appendChild(wandContainer);
  invContainer.appendChild(weaponsContainer);
  invContainer.appendChild(armorsContainer);
  invContainer.appendChild(itemsContainer);
  invContainer.appendChild(matContainer);
  $("mainWindowContainer").appendChild(invContainer);
}

function getMatNum(mat) {
  for(let itm of player.items) {
    if(itm.id == (mat.id === undefined ? mat : mat.id)) return itm.amount;
  }
  return 0;
}

function useItemFromInv(e) {
  let item;
  for (let itm of player.items) {
    if (itm.name == e.target.id) item = itm;
  }
  if (!settings.dont_ask_when_using_item) createPrompt(`Are you sure you wish to use ${item.name}?`, () => useThisItem(item));
  else useThisItem(item);
}

function useThisItem(item) {
  if (item.amount <= 1) for (let i = 0; i < player.items.length; i++) {
    if (player.items[i].name == item.name) player.items.splice(i, 1);
    textBoxRemove();
  } else item.amount--;
  if (item.effects) {
    for (let effect of item.effects) {
      if (effect.timed) {
        if (player.temporary_effects.length === 0) {
          if (effect.increase) {
            player[effect.increase] += effect.by;
            player.temporary_effects.push({ increase: effect.increase, by: effect.by, timed: effect.timed })
          }
          else if (effect.increase_stat) {
            player.stats[effect.increase_stat] += effect.by;
            player.temporary_effects.push({ increase_stat: effect.increase_stat, by: effect.by, timed: effect.timed })
          }
        }
        else for (let ef of player.temporary_effects) {
          if (ef.increase == effect.increase) {
            player[ef.increase] -= ef.by;
            player[effect.increase] += effect.by;
            ef.increase = effect.increase;
            ef.timed = effect.timed;
          } else if (ef.increase_stat == ef.increase_stat) {
            player.stats[ef.increase_stat] -= ef.by;
            player.stats[effect.increase_stat] += effect.by;
            ef.increase_stat = effect.increase_stat;
            ef.timed = effect.timed;
          } else if (ef.increase != effect.increase) {
            player[effect.increase] += effect.by;
            player.temporary_effects.push({ increase: effect.increase, by: effect.by, timed: effect.timed })
          } else if (ef.increase_stat != effect.increase_stat) {
            player.stats[effect.increase_stat] += effect.by;
            player.temporary_effects.push({ increase_stat: effect.increase_stat, by: effect.by, timed: effect.timed })
          }
        }
      } else {
        if (effect.increase_stat) player.stats[effect.increase_stat] += effect.by;
        else if (effect.increase) player[effect.increase] += effect.increase_stat;
      }
    }
  }
  if (item.recover) player[item.recover] += item.value;
  if (player.hp > player.maxhp) player.hp = player.maxhp;
  if (player.mp > player.maxmp) player.mp = player.maxmp;
  SaveGameHC();
  createInventory();
  updateLeftValues();
}

function equipWeapon(e) {
  let weapon;
  for (let wep of player.items) {
    if (wep.name == e.target.id) weapon = wep;
  }
  if (weapon.amount <= 1) textBoxRemove();
  if (weapon.magical_power) {
    let foundWep = false;
    for (let wep of player.items) {
      if (wep.name == player.wand.name) { wep.amount++; foundWep = true }
    }
    if (!foundWep) {
      player.items.push(player.wand);
    }
    if (player.wand?.effects) {
      for (let effect of player.wand?.effects) {
        if (effect.increase_stat) player.stats[effect.increase_stat] -= effect.by;
        else if (effect.increase) player[effect.increase] -= effect.by;
      }
    }
    player.wand = weapon;
  } else {
    let foundWep = false;
    for (let wep of player.items) {
      if (wep.name == player.weapon.name) { wep.amount++; foundWep = true }
    }
    if (!foundWep) {
      player.items.push(player.weapon);
    }
    if (player.weapon?.effects) {
      for (let effect of player.weapon?.effects) {
        if (effect.increase_stat) player.stats[effect.increase_stat] -= effect.by;
        else if (effect.increase) player[effect.increase] -= effect.by;
      }
    }
    player.weapon = weapon;
  }
  if (weapon.amount > 1) {
    weapon.amount--;
  }
  else for (let i = 0; i < player.items.length; i++) {
    if (player.items[i].name == weapon.name) player.items.splice(i, 1);
  }
  if (weapon?.effects) {
    for (let effect of weapon?.effects) {
      if (effect.increase_stat) player.stats[effect.increase_stat] += effect.by;
      else if (effect.increase) player[effect.increase] += effect.by;
    }
  }
  createInventory();
  updateLeftValues();
}

function unequipWand(e) {
  if (player.wand.name == "Chant Only") return;
  let foundWep = false;
  for (let wep of player.items) {
    if (wep.name == player.wand.name) { wep.amount++; foundWep = true }
  }
  if (!foundWep) {
    player.items.push(player.wand);
  }
  let chant;
  for (let chanton of player.items) {
    if (chanton.name == "Chant Only") chant = chanton;
  }
  if (player.wand?.effects) {
    for (let effect of player.wand?.effects) {
      if (effect.increase_stat) player.stats[effect.increase_stat] -= effect.by;
      else if (effect.increase) player[effect.increase] -= effect.by;
    }
  }
  player.wand = chant;
  createInventory();
  updateLeftValues();
}

function equipArmor(e) {
  textBoxRemove();
  let armor;
  for (let arm of player.items) {
    if (arm.name == e.target.id) armor = arm;
  }
  if (armor.amount <= 1) textBoxRemove();
  let foundArm = false;
  for (let arm of player.items) {
    if (arm.name == player.armor.name) { arm.amount++; foundArm = true }
  }
  if (!foundArm) {
    player.items.push(player.armor);
  }
  if (player.armor?.effects) {
    for (let effect of player.armor?.effects) {
      if (effect.increase_stat) player.stats[effect.increase_stat] -= effect.by;
      else if (effect.increase) player[effect.increase] -= effect.by;
    }
  }
  player.magical_resistance -= player.armor.magical_resistance;
  player.physical_resistance -= player.armor.physical_resistance;
  player.magical_resistance += armor.magical_resistance;
  player.physical_resistance += armor.physical_resistance;
  player.armor = armor;
  if (armor.amount > 1) {
    armor.amount--;
  }
  else for (let i = 0; i < player.items.length; i++) {
    if (player.items[i].name == armor.name) player.items.splice(i, 1);
  }
  if (armor.effects) {
    for (let effect of armor.effects) {
      if (effect.increase_stat) player.stats[effect.increase_stat] += effect.by;
      else if (effect.increase) player[effect.increase] += effect.by;
    }
  }
  createInventory();
  updateLeftValues();
}

function unequipWeapon() {
  if (player.weapon.name == "Fists") return;
  let foundWep = false;
  for (let wep of player.items) {
    if (wep.name == player.weapon.name) { wep.amount++; foundWep = true }
  }
  if (!foundWep) {
    player.items.push(player.weapon);
  }
  let fists;
  for (let fist of player.items) {
    if (fist.name == "Fists") fists = fist;
  }
  if (player.weapon?.effects) {
    for (let effect of player.weapon?.effects) {
      if (effect.increase_stat) player.stats[effect.increase_stat] -= effect.by;
      else if (effect.increase) player[effect.increase] -= effect.by;
    }
  }
  player.weapon = fists;
  createInventory();
  updateLeftValues();
}

function unequipArmor() {
  if (player.armor.name == "Nothing") return;
  let foundArm = false;
  for (let arm of player.items) {
    if (arm.name == player.armor.name) { arm.amount++; foundArm = true }
  }
  if (!foundArm) {
    player.items.push(player.armor);
  }
  player.magical_resistance -= player.armor.magical_resistance;
  player.physical_resistance -= player.armor.physical_resistance;
  let naked;
  for (let nothing of player.items) {
    if (nothing.name == "Nothing") naked = nothing;
  }
  if (player.armor.effects) {
    for (let effect of player.armor.effects) {
      if (effect.increase_stat) player.stats[effect.increase_stat] -= effect.by;
      else if (effect.increase) player[effect.increase] -= effect.by;
    }
  }
  player.armor = naked;
  createInventory();
  updateLeftValues();
}

var store_buying = [];

function createStore() {
  $("mainWindowContainer").textContent = "";
  let store = create("div");
  store.id = "storeContainer";
  let buying = create("div");
  buying.id = "storeBuyingContainer"
  let totalPrice = create("p");
  totalPrice.id = "storeTotal";
  let checkout = create("button");
  let clear = create("button");
  checkout.textContent = "Checkout";
  clear.textContent = "Clear";
  checkout.id = "checkout";
  clear.id = "clear";
  for (let item of merchants["floor" + state.floor + "_merchant"].stock) {
    let merchandise = textSyntax(`§/${tiers[item.item.tier]}/${item.item.name}§`);
    merchandise.id = item.item.name;
    let hoverText = "";
    let width = 0;
    if (item.type == "consumable") {
      hoverText = `Recover: ${item.item.value} §/$Y/${item.item.recover.toUpperCase()}§ §:br§ Tier: §/${tiers[item.item.tier]}/${item.item.tier}§ §:br§ Price: §/$Y/${number(item.price)}§`;
      width = 8;
    }
    else if (item.type == "weapon") {
      hoverText = `${item.item.magical_power ? "MagPower: " + "§/$Y/" + item.item.magical_power * 100 + "%§" : "Damage: " + "§/$Y/" + item.item.damage + "§"} §:br§ Speed: §/$B/${item.item.speed_bonus}§ §:br§ Tier: §/${tiers[item.item.tier]}/${item.item.tier}§ §:br§ Price: §/$Y/${number(item.price)}§ §:br§ ${item.item.mag_damage ? "MagDamage: " + item.item.mag_damage : ""}`;
      width = 8;
    }
    else if (item.type == "armor") {
      hoverText = `Physical Resistance: §/$Y/${item.item.physical_resistance}§ §:br§ Magical Resistance: §/$B/${item.item.magical_resistance}§ §:br§ Speed: ${item.item.speed_bonus}§:br§ Tier: §/${tiers[item.item.tier]}/${item.item.tier}§ §:br§ Price: §/$Y/${number(item.price)}§`;
      width = 12;
    }
    else if (item.type == "material") {
      hoverText = `${item.item.name} §:br§ Price: §/$Y/${number(item.price)}§`;
      width = 8;
    }
    if (item?.item?.effects) {
      for (let effect of item?.item?.effects) {
        if (effect.increase || effect.increase_stat) {
          hoverText += `§:br§ Increases ${effectSyntax(effect, "stat")} by ${effectSyntax(effect, "value")}`;
        }
      }
    }
    addHoverBox(merchandise, hoverText, width);
    store.appendChild(merchandise);
    merchandise.addEventListener("click", addItem);
  }
  let total = 0;
  for (let item of store_buying) {
    let merchandise = textSyntax(`§/${tiers[item.tier]}/${item.name} x${item.amount}§`);
    merchandise.id = item.name;
    let hoverText = "";
    let width = 0;
    if (item.item_type == "consumable") {
      hoverText = `Recover: ${item.value} §/$Y/${item.recover.toUpperCase()}§ §:br§ Tier: §/${tiers[item.tier]}/${item.tier}§`;
      width = 8;
    }
    else if (item.item_type == "weapon") {
      hoverText = `Damage: §/$Y/${item.damage}§ §:br§ Speed: §/$B/${item.speed_bonus}§ §:br§ Tier: §/${tiers[item.tier]}/${item.tier}§`;
      width = 8;
    }
    else if (item.item_type == "armor") {
      hoverText = `Physical Resistance: §/$Y/${item.physical_resistance}§ §:br§ Magical Resistance: §/$B/${item.magical_resistance}§ §:br§ Speed: ${item.speed_bonus}§:br§ Tier: §/${tiers[item.tier]}/${item.tier}§`;
      width = 12;
    }
    if (item?.effects) {
      for (let effect of item?.effects) {
        if (effect.increase || effect.increase_stat) {
          hoverText += `§:br§ Increases ${effectSyntax(effect, "stat")} by ${effectSyntax(effect, "value")}`;
        }
      }
    }
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
  for (let i = 0; i < store_buying.length; i++) {
    if (store_buying[i].name === e.target.id && store_buying[i].amount <= 1) { store_buying.splice(i, 1); textBoxRemove(); break; }
    else if (store_buying[i].name === e.target.id) { store_buying[i].amount--; break; }
  }
  createStore();
}

function buyItems(price) {
  if (price > player.gold) return;
  player.gold -= price;
  for (let itm of store_buying) {
    if (hasItem(itm)) hasItem(itm).amount += itm.amount;
    else player.items.push(copy(itm));
  }
  updateLeftValues();
  store_buying = [];
  createStore();
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

var save_slots = [];
var selected_slot = null;
var input = "";

function save_does_not_have_sortTime() {
  for (let save of save_slots) {
    if (!save.time || save.time == null) {
      save.time = +(new Date(1 / 1 / 1970));
    }
  }
}

function loadSettingsSave() {
  settings = JSON.parse(localStorage.getItem(`settings`));
}

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
  save_does_not_have_sortTime();
  save_slots = save_slots.sort((x1, x2) => x2.time - x1.time);
  resetIds();
  for (let save of save_slots) {
    let slot = create("p");
    slot.textContent = save.text + " ";
    if(save.hc) slot.innerHTML += "<span style='color: red'>HARDCORE!</span>";
    slot.id = "slot" + save.id;
    if (selected_slot?.id == save?.id) slot.classList.add("saveSelected");
    slot.addEventListener("click", selectSlot);
    save_bottom.appendChild(slot);
  }
  save_topbar.innerHTML = `<input id="save_input"></input> <button id="saveBut" onclick="saveGame()">Create Save</button> <button id="loadBut">Load Save</button> <button id="deleteBut">Delete Save</button> <button id="resetID" onclick="resetIds()">Reset IDs</button>`;
  save_container.appendChild(save_topbar);
  save_container.appendChild(save_bottom);
  $("mainWindowContainer").appendChild(save_container);
  if(state.hc) $("saveBut").classList.add("unavailable");
  $("loadBut").addEventListener("click", () => createPrompt(`Are you sure you wish to load save ${selected_slot?.text}?`, () => loadGame()));
  $("deleteBut").addEventListener("click", () => createPrompt(`Are you sure you wish to DELETE save ${selected_slot?.text}?`, () => deleteGame()));
  addHoverBox($("saveBut"), texts.save_button, 8);
  addHoverBox($("loadBut"), texts.load_button, 8);
  addHoverBox($("deleteBut"), texts.delete_button, 8);
  addHoverBox($("resetID"), texts.resetID, 12);
  $("save_input").value = input;
}

function saveGame() {
  let saveName = $("save_input").value || player.name;
  let sortTime = +(new Date());
  let saveTime = new Date();
  let gameSave = {};
  gameSave.player = player;
  gameSave.state = state;
  saveTime = ("0" + saveTime.getHours()).slice(-2) + "." + ("0" + saveTime.getMinutes()).slice(-2);
  let key = generateKey(7);
  if (selected_slot == null) save_slots.push({ text: `${saveName} || Last Saved: ${saveTime} || Character Level: ${player.level}`, save: gameSave, id: save_slots.length, time: sortTime, hc: state.hc, key: key});
  else {
    createPrompt(`Are you sure you wish to save over slot ${selected_slot.text}?`, () => saveOver(saveName, saveTime, gameSave));
    return;
  };
  findIDs();
  localStorage.setItem("save_slots", JSON.stringify(save_slots));
  createSaving();
}

function SaveGameHC() {
  if(!state.hc) return;
  let saveTime = new Date();
  let gameSave = {};
  gameSave.player = player;
  gameSave.state = state;
  saveTime = ("0" + saveTime.getHours()).slice(-2) + "." + ("0" + saveTime.getMinutes()).slice(-2);
  for(let save of save_slots) {
    if(save.key == currentSave.key && save.hc) { 
      selected_slot = save;
      saveOver(player.name, saveTime, gameSave);
     }
  }
  localStorage.setItem("save_slots", JSON.stringify(save_slots));
  createSaving();
}

function DeleteGameHC() {
  if(!state.hc) return;
  for(let save of save_slots) {
    if(save.key == currentSave.key && save.hc) { 
        save_slots.splice(save.id, 1);
        resetIds();
        localStorage.setItem("save_slots", JSON.stringify(save_slots));
     }
  }
}

function saveOver(name, time, save) {
  let sortTime = +(new Date());
  save_slots[selected_slot.id] = { text: `${name} || Last Saved: ${time} || Character Level: ${player.level}`, save: save, id: selected_slot.id, time: sortTime, hc: state.hc, key: selected_slot.key }
  localStorage.setItem("save_slots", JSON.stringify(save_slots));
  createSaving();
}

function loadGame() {
  if (selected_slot == null) return;
  currentSave = selected_slot;
  if(!state.started) state.started = true;
  player = selected_slot.save.player;
  state = selected_slot.save.state;
  if (!player.wand) player.wand = copy(weapons.chant_only);
  if (player.weapon.name == "Fists") player.weapon.tier = "DEFAULT";
  if (player.armor.name == "Nothing") player.armor.tier = "DEFAULT";
  if (player.wand.name == "Chant Only") player.wand.tier = "DEFAULT";
  for (let item of player.items) {
    if (item.name == "Fists" || item.name == "Nothing" || item.name == "Chant Only") item.tier = "DEFAULT";
  }
  if (!player.move_statuses) player.move_statuses = {};
  for (let move of player.moves) {
    if (move.status) {
      if (!player.move_statuses[move.status]) player.move_statuses[move.status] = copy(statuses[move.status]);
    }
  }
  for (let medpot of player.items) {
    if (medpot.name == "Medium Healing Potion" && medpot.id == "healing_potion") medpot.id = "medium_healing_potion";
  }
  if (!state.hc) state.hc = false;
  if (!player.temporary_effects) player.temporary_effects = [];
  if(!state.started) state.started = true;
  updateLeftValues();
  createSaving();
}

function selectSlot(e) {
  let id = e.target.id.substring(4);
  selected_slot = save_slots[id];
  if (save_slots.length === 1) selected_slot = save_slots[0];
  input = selected_slot?.text?.split("||")[0];
  createSaving();
}

function deleteGame() {
  if (selected_slot == null) return;
  save_slots.splice(selected_slot.id, 1);
  resetIds();
  localStorage.setItem("save_slots", JSON.stringify(save_slots));
  createSaving();
}

function resetIds() {
  for (let i = 0; i < save_slots.length; i++) {
    save_slots[i].id = i;
  }
}

function removeSelect(e) {
  if (e.target.id.startsWith("slot") || e.target.id == "saveTopbar" || e.target.id == "save_input" || e.target.id == "saveBut" || e.target.id == "loadBut" || e.target.id == "deleteBut" || e.target.id == "promptWindow" || e.target.id == "promptAccept") return;
  selected_slot = null;
  input = "";
  createSaving();
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
  } return empty;
}

function effectSyntax(effect, req) {
  if (req == "stat") {
    if (effect.increase) {
      switch (effect.increase) {
        case "physical_multiplier": return "§/$Y/physical damage§"
        case "magical_multiplier": return "§/$Y/magical damage§"
        case "maxhp": return "§/$R/HP§"
        case "maxmp": return "§/$B/MP§"
        case "dodge": return "§/$Y/dodge chance§"
      }
    } else if (effect.increase_stat) {
      switch (effect.increase_stat) {
        case "str": return "strength"
        case "agi": return "agility"
        case "vit": return "vitality"
        case "int": return "intelligence"
        case "lck": return "NOT_DESCRIBED"
      }
    }
  } else if (req == "value") {
    if ((effect.increase?.indexOf("_multiplier") != -1 || effect.increase == "dodge") && !effect.increase_stat) {
      return effect.by * 100 + "%";
    } else return effect.by;
  }
}

function ReturnToMainMenu() {
  $("mainMenu").style.display = "block";
  $("mainScreen").style.display = "none";
  $("combatScreen").style.display = "none";
}

function getPlayerItemAmount(id) {
  for(let item of player.items) {
    if(item.name == id) return item.amount;
  }
  return 0;
}

function createSmithy() {
  $("mainWindowContainer").textContent = "";
  let matContainer = create("div");
  matContainer.id = "matContainer";
  matContainer.style.top = "0.5vw";
  let smithableContainer = create("div");
  smithableContainer.id = "smithableContainer";
  for(let mat in materials) {
    let div = create("div");
    let img = create("img");
    let num = create("p");
    div.classList.add("invMaterial");
    img.src = "images/" + materials[mat].img || "images/iron_ingot.png";
    num.textContent = getMatNum(materials[mat]);
    addHoverBox(div, materials[mat].name, 8);
    div.appendChild(img);
    div.appendChild(num);
    matContainer.appendChild(div);
  }
  for(let smith in craftable_items) {
    if(!craftable_items[smith].to_craft) continue;
    let wep = create("p");
    wep.style.color = tiers[craftable_items[smith].tier];
    wep.textContent = craftable_items[smith].name;
    let mainText = "";
    let canCraft = true;
    for (let need of craftable_items[smith].to_craft) {
      if (need.material) {
        if (getMatNum(need.material) < need.amount) canCraft = false;
      } else if (need.weapon) {
        if (getPlayerItemAmount(need.weapon.name) < need.amount) canCraft = false;
      } else if (need.armor) {
        if (getPlayerItemAmount(need.armor.name) < need.amount) canCraft = false;
      }
    }
    if(!canCraft) wep.classList.add("unavailableCraft");
    for(let mat of craftable_items[smith].to_craft) {
      if(mat.material) {
        console.log(getMatNum(mat.material));
        mainText += `${materials[mat.material].name} §/${getMatNum(mat.material) < mat.amount ? "$R" : "white"}/${mat.amount > 1 ? "x" + mat.amount : "1"}§ §:br§`;
      } else if(mat.weapon) {
        mainText += `§/${tiers[mat.weapon.tier]}/${mat.weapon.name}§ §/${getPlayerItemAmount(mat.weapon.name) < mat.amount ? "$R" : "white"}/${mat.amount > 1 ? "x" + mat.amount : "1"}§ §:br§`;
      } else if(mat.armor) {
        mainText += `§/${tiers[mat.armor.tier]}/${mat.armor.name}§ §/${getPlayerItemAmount(mat.armor.name) < mat.amount ? "$R" : "white"}/${mat.amount > 1 ? "x" + mat.amount : "1"}§ §:br§`;
      }
    }
    let alt = `${craftable_items[smith].magical_power ? "MagPower: " + "§/$Y/" + craftable_items[smith].magical_power * 100 + "%§" : "Damage: " + "§/$Y/" + craftable_items[smith].damage + "§"} §:br§ Speed: §/$B/${craftable_items[smith].speed_bonus}§ §:br§ Tier: §/${tiers[craftable_items[smith].tier]}/${craftable_items[smith].tier}§ §:br§ ${craftable_items[smith].mag_damage ? "MagDamage: " + craftable_items[smith].mag_damage : ""}`;
    if (craftable_items[smith]?.effects) {
      for (let effect of craftable_items[smith]?.effects) {
        if (effect.increase || effect.increase_stat) {
          alt += `§:br§ Increases ${effectSyntax(effect, "stat")} by ${effectSyntax(effect, "value")}`;
        }
      }
    }
    addHoverBox(wep, mainText + "§FS0.75FS/$Y/Hold shift for details§", 12, alt);
    wep.addEventListener("click", ()=>CraftItem(smith));
    smithableContainer.appendChild(wep);
  }
  $("mainWindowContainer").appendChild(smithableContainer);
  $("mainWindowContainer").appendChild(matContainer);
}