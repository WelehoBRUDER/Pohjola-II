document.addEventListener("DOMContentLoaded", init);

const gamemodes = {
  casual: {
    id: "casual",
    name: "CASUAL",
    description: "Easy mode",
    color: "rgba(17, 107, 17, 0.4)",
  },
  hardcore: {
    id: "hardcore",
    name: "HARDCORE",
    description: "Hard mode",
    color: "rgba(217, 17, 17, 0.4)",
    prevent_manual_save: true,
    prevent_recovery_after_battle: true,
    delete_save_on_death: true,
  },
  eetucore: {
    id: "eetucore",
    name: "NIGHTMARE",
    description: "Eetucore mode",
    color: "rgba(59, 10, 10, 0.4)",
    prevent_manual_save: true,
    prevent_recovery_after_battle: true,
    delete_save_on_death: true,
    can_only_fight_once: true,
    give_enemy_scaling_power: true,
  },
};

const game_mode_text = {
  prevent_manual_save: "§/$R/Disables§ manually saving the game.",
  prevent_recovery_after_battle:
    "§/$R/Disables§ automatic recovery after battle.",
  delete_save_on_death: "Your save is §/$R/deleted§ upon a defeat.",
  can_only_fight_once: "Stages can only be cleared §/$R/once.§",
  give_enemy_scaling_power:
    "Enemies get the status §/$Y/Rage§, which grants them 0.3% §/$R/more damage every turn.§",
};

let menu = {
  settings_open: false,
  load_open: false,
  selected_bg: "none",
  gamemode: gamemodes.casual,
  create_open: false,
};

function generateKey(len) {
  charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < len; i++) {
    let randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}

function init() {
  if (JSON.parse(localStorage.getItem(`settings`))) {
    settings = JSON.parse(localStorage.getItem(`settings`));
  }
  setAnimationSpeed(animationSpeeds[settings.animation_speed || "normal"]);
  save_slots = JSON.parse(localStorage.getItem(`save_slots`)) || [];
  save_slots = save_slots.sort((x1, x2) => x2.time - x1.time);
  findIDs();
  $("continueLastSave").classList.add("unavailable");
  $("settingsButton").addEventListener("click", options);
  updateCheckboxes();
  addHoverBox($("askItemUse"), texts._menu_itemuse, 10);
  $("askItemUse").addEventListener("click", () => toggle("itemUse"));
  addHoverBox($("soundEffects"), texts._menu_sound, 9);
  $("soundEffects").addEventListener("click", () => toggle("soundEffects"));
  $("loadGame").addEventListener("click", openLoadedSaves);
  $("newGame").addEventListener("click", startGame);
  savesLoadMenu();
  char_bgs = [
    {
      name: "Soldier",
      effects: [
        { increase: "maxhp", by: 10 },
        { increase_stat: "str", by: 2 },
      ],
      weapon: copy(weapons.broken_sword),
      armor: copy(armors.leather_armor),
    },
    {
      name: "Barbarian",
      effects: [
        { increase: "maxhp", by: 5 },
        { increase_stat: "str", by: 5 },
      ],
    },
    {
      name: "Vagabond",
      effects: [
        { increase_stat: "agi", by: 3 },
        { increase_stat: "str", by: 3 },
      ],
      armor: copy(armors.leather_armor),
    },
    {
      name: "Scholar",
      effects: [
        { increase: "maxmp", by: 10 },
        { increase_stat: "int", by: 2 },
      ],
      wand: copy(weapons.broomstick),
      armor: copy(armors.rags),
    },
  ];
}

function keyExists(key) {
  let found = 0;
  for (let save of save_slots) {
    if (save.key === key) found++;
  }
  return found;
}

function findIDs() {
  for (let save of save_slots) {
    if (!save.key) {
      save.key = generateKey(7);
      while (keyExists(save.key) > 1) save.key = generateKey(7);
    } else while (keyExists(save.key) > 1) save.key = generateKey(7);
  }
}

function savesLoadMenu() {
  $("loadContainer").textContent = "";
  for (let save of save_slots) {
    let slot = create("p");
    slot.textContent = save.text + " ";
    if (save.gamemode?.id === "hardcore")
      slot.innerHTML += "<span style='color: red'>HARDCORE!</span>";
    else if (save.gamemode?.id === "eetucore")
      slot.innerHTML += "<span style='color: darkred'>NIGHTMARE!</span>";
    slot.id = "slot" + save.id;
    if (selected_slot?.id == save?.id) slot.classList.add("saveSelected");
    slot.addEventListener("click", () =>
      createPrompt(
        `Are you sure you wish to load game ${save.text.split("||")[0]}?`,
        () => load_game_menu(save)
      )
    );
    $("loadContainer").appendChild(slot);
  }
}

function load_game_menu(slot) {
  selected_slot = slot;
  loadGame(true);
  $("mainMenu").style.display = "none";
  $("mainScreen").style.display = "block";
}

function options() {
  if (!menu.settings_open) {
    $("optarr").style.transform = "rotateZ(90deg) scale(1)";
    menu.settings_open = true;
    $("optionsMenu").style.transform = "rotate(0deg) scale(1)";
    createAnimationSpeedOptions();
    createCombatSpeedOptions();
  } else {
    $("optarr").style.transform = "rotateZ(0deg) scale(0)";
    menu.settings_open = false;
    $("optionsMenu").style.transform = "rotate(90deg) scale(0)";
  }
}

function createAnimationSpeedOptions() {
  const select = $("animation-speed");
  select.innerHTML = "";
  select.removeEventListener("change", updateAnimationSpeed(select.value));
  Object.keys(animationSpeeds).forEach((key) => {
    const option = create("option");
    option.value = key;
    option.textContent = key.toUpperCase();
    select.appendChild(option);
  });
  select.addEventListener("change", () => {
    updateAnimationSpeed(select.value);
  });
  select.value = settings.animation_speed;
}

function createCombatSpeedOptions() {
  const select = $("combat-speed");
  select.innerHTML = "";
  select.removeEventListener("change", updateCombatSpeed(select.value));
  Object.keys(combatSpeeds).forEach((key) => {
    const option = create("option");
    option.value = key;
    option.textContent = key.toUpperCase();
    select.appendChild(option);
  });
  select.addEventListener("change", () => {
    updateCombatSpeed(select.value);
  });
  select.value = settings.animation_speed;
}

function updateAnimationSpeed(value) {
  if (!value || value === "") return;
  settings.animation_speed = value;
  localStorage.setItem("settings", JSON.stringify(settings));
  setAnimationSpeed(animationSpeeds[value]);
}

function updateCombatSpeed(value) {
  if (!value || value === "") return;
  settings.combat_speed = value;
  localStorage.setItem("settings", JSON.stringify(settings));
}

function toggle(tog) {
  if (tog == "itemUse") {
    settings.dont_ask_when_using_item = !settings.dont_ask_when_using_item;
    updateCheckboxes();
  } else if (tog == "soundEffects") {
    settings.sound_effects = !settings.sound_effects;
    updateCheckboxes();
  }
}

function updateCheckboxes() {
  $("check--itemPrompt").textContent = !settings.dont_ask_when_using_item
    ? "X"
    : "";
  $("check--soundEffects").textContent = settings.sound_effects ? "X" : "";
}

function openLoadedSaves() {
  if (!menu.load_open) {
    $("loadarr").style.transform = "rotateZ(90deg) scale(1)";
    menu.load_open = true;
    $("loadContainer").style.transform = "rotate(0deg) scale(1)";
  } else {
    $("loadarr").style.transform = "rotateZ(0deg) scale(0)";
    menu.load_open = false;
    $("loadContainer").style.transform = "rotate(90deg) scale(0)";
  }
}

function startGame() {
  if (!menu.create_open) {
    $("startarr").style.transform = "rotateZ(90deg) scale(1)";
    menu.create_open = true;
    $("characterCreation").style.transform = "rotate(0deg) scale(1)";
  } else {
    $("startarr").style.transform = "rotateZ(0deg) scale(0)";
    menu.create_open = false;
    $("characterCreation").style.transform = "rotate(90deg) scale(0)";
  }
  $("backgroundForChar").textContent = "";
  for (let bg of char_bgs) {
    let back = create("p");
    back.textContent = bg.name;
    back.addEventListener("click", () => selectBG(bg));
    addHoverBox(back, texts[bg.name], 10);
    $("backgroundForChar").appendChild(back);
  }
  gamemodeChoices();
  $("startTheGame").addEventListener("click", createCharacter);
}

function gamemodeChoices() {
  const container = $("gamemode");
  const creation = $("characterCreation");
  container.textContent = "";
  Object.entries(gamemodes).forEach(([key, mode]) => {
    const choice = create("div");
    const name = create("h3");
    choice.style.background = mode.color;
    name.textContent = mode.name;
    choice.addEventListener("click", () => selectGamemode(mode));
    if (menu.gamemode.id === key) choice.classList.add("gamemodeSelected");
    choice.append(name);
    Object.entries(mode).forEach(([key, bool]) => {
      if (typeof bool !== "boolean") return;
      const opt = textSyntax(game_mode_text[key]);
      choice.appendChild(opt);
    });
    container.appendChild(choice);
  });
  creation.append(container);
}

function selectGamemode(mode) {
  menu.gamemode = mode;
  gamemodeChoices();
}

// function toggleHC() {
//   if (menu.hardcore) {
//     menu.hardcore = false;
//     $("hardcoreBut").style.border = "";
//   } else {
//     menu.hardcore = true;
//     $("hardcoreBut").style.border = "0.25vw solid gold";
//   }
// }

function selectBG(bg) {
  $("backgroundForChar").textContent = "";
  menu.selected_bg = bg;
  $("characterCreation").style.display = "block";
  for (let bag of char_bgs) {
    let back = create("p");
    back.textContent = bag.name;
    back.addEventListener("click", () => selectBG(bag));
    addHoverBox(back, texts[bg.name], 10);
    if (menu.selected_bg.name == bag.name) back.classList.add("charBG-select");
    $("backgroundForChar").appendChild(back);
  }
}

function createCharacter() {
  if (menu.selected_bg == "none") return;
  player.name =
    $("characterName").value.length > 0 ? $("characterName").value : "Hero";
  $("mainMenu").style.display = "none";
  if (menu.selected_bg.weapon) {
    player.items.push(player.weapon);
    player.weapon = { ...menu.selected_bg.weapon, amount: 1 };
  }
  if (menu.selected_bg.armor) {
    player.items.push(player.armor);
    player.armor = { ...menu.selected_bg.armor, amount: 1 };
    player.physical_resistance = player.armor.physical_resistance;
    player.magical_resistance = player.armor.magical_resistance;
  }
  if (menu.selected_bg.wand) {
    player.items.push(player.wand);
    player.wand = { ...menu.selected_bg.wand, amount: 1 };
  }
  for (let effect of menu.selected_bg.effects) {
    if (effect.increase_stat) player.stats[effect.increase_stat] += effect.by;
    else if (effect.increase) player[effect.increase] += effect.by;
  }
  player.hp = getPlayerHP();
  player.mp = player.maxmp;
  state.gamemode = menu.gamemode;
  if (state.gamemode.give_enemy_scaling_power) {
    enemy.statuses.push({ ...statuses.enemy_rage });
  }
  if (menu.gamemode.delete_save_on_death) {
    let saveName = player.name;
    let sortTime = +new Date();
    let saveTime = new Date();
    let gameSave = {};
    gameSave.player = player;
    gameSave.state = state;
    saveTime =
      ("0" + saveTime.getHours()).slice(-2) +
      "." +
      ("0" + saveTime.getMinutes()).slice(-2);
    save_slots.push({
      text: `${saveName} || Last Saved: ${saveTime} || Character Level: ${player.level}`,
      save: gameSave,
      id: save_slots.length,
      time: sortTime,
      gamemode: menu.gamemode,
      key: generateKey(7),
    });
    findIDs();
    currentSave = save_slots[save_slots.length - 1];
    localStorage.setItem("save_slots", JSON.stringify(save_slots));
    $("characterCreation").style.display = "none";
    $("combatScreen").style.display = "block";
  } else {
    $("characterCreation").style.display = "none";
    $("combatScreen").style.display = "block";
  }
}

let char_bgs = {};

let game_stats = {
  enemies_killed: 0,
  items_used: 0,
  most_damage_dealt: 0,
  most_damage_taken: 0,
  longest_battle_in_turns: 0,
  most_turns_player: 0,
  most_turns_enemy: 0,
};

const stat_texts = {
  enemies_killed: "Enemies Killed",
  items_used: "Items Used During Battle",
  most_damage_dealt: "Most Damage Dealt",
  most_damage_taken: "Most Damage Taken",
  longest_battle_in_turns: "Longest Battle in Turns",
  most_turns_player: "Most Turns You Got In a Battle",
  most_turns_enemy: "Most Turns Your Enemy Got in a Battle",
};

function createStatistics() {
  const statistics = create("div");
  statistics.id = "statistics";
  Object.entries(game_stats).forEach(([key, value]) => {
    let stat = create("p");
    stat.textContent = `${stat_texts[key]}: ${value}`;
    statistics.appendChild(stat);
  });
  $("mainWindowContainer").appendChild(statistics);
}

// Item hover
function itemHoverText(item, price = -1) {
  let hoverText = "";
  if (item.item_type == "consumable") {
    hoverText = `Recover: ${
      item.value
    } §/$Y/${item.recover.toUpperCase()}§ §:br§ Tier: §/${tiers[item.tier]}/${
      item.tier
    }§`;
  } else if (item.item_type == "weapon") {
    hoverText = `${
      item.magical_power
        ? "MagPower: " + "§/$Y/" + item.magical_power * 100 + "%§"
        : "Damage: " + "§/$Y/" + item.damage + "§"
    } §:br§ Speed: §/$B/${item.speed_bonus}§ §:br§ Tier: §/${
      tiers[item.tier]
    }/${item.tier}§ ${
      item.mag_damage ? "§:br§MagDamage: " + item.mag_damage : ""
    }`;
  } else if (item.item_type == "armor") {
    hoverText = `Physical Resistance: §/$Y/${
      item.physical_resistance
    }%§ §:br§ Magical Resistance: §/$B/${
      item.magical_resistance
    }%§ §:br§ Speed: §/$B/${item.speed_bonus}§ §:br§ Tier: §/${
      tiers[item.tier]
    }/${item.tier}§ `;
  } else if (item.item_type == "material") {
    hoverText = `${item.name}`;
  }
  if (price > -1) {
    hoverText += `§:br§Price: §/$Y/${number(price)}§`;
  }
  if (item?.effects) {
    for (let effect of item?.effects) {
      if (effect.increase || effect.increase_stat) {
        hoverText += `§:br§ Increases ${effectSyntax(
          effect,
          "stat"
        )} by ${effectSyntax(effect, "value")}`;
      }
    }
  }
  return hoverText;
}

const animationSpeeds = {
  extremely_fast: 0.15,
  very_fast: 0.4,
  fast: 0.6,
  quick: 0.8,
  normal: 1,
  slow: 1.2,
  very_slow: 1.4,
  extremely_slow: 2,
};
function setAnimationSpeed(speed) {
  document.documentElement.style.setProperty("--animation-speed", speed);
}
const combatSpeeds = {
  extremely_fast: 3,
  very_fast: 2,
  fast: 1.5,
  normal: 1,
  slow: 0.5,
};
