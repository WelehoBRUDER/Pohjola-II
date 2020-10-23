document.addEventListener("DOMContentLoaded", init);
let menu = {
  settings_open: false,
  load_open: false,
  selected_bg: "none",
  hardcore: false
}

function init() {
  if (JSON.parse(localStorage.getItem(`settings`))) {
    settings = JSON.parse(localStorage.getItem(`settings`));
  }
  save_slots = JSON.parse(localStorage.getItem(`save_slots`)) || [];
  $("continueLastSave").classList.add("unavailable");
  $("settingsButton").addEventListener("click", options);
  updateCheckboxes();
  addHoverBox($("askItemUse"), texts._menu_itemuse, 10);
  $("askItemUse").addEventListener("click", () => toggle("itemUse"))
  addHoverBox($("soundEffects"), texts._menu_sound, 9);
  $("soundEffects").addEventListener("click", () => toggle("soundEffects"))
  $("loadGame").addEventListener("click", openLoadedSaves);
  $("newGame").addEventListener("click", startGame);
  savesLoadMenu();
  char_bgs = [
    {
      name: "Soldier",
      effects: [
        { increase: "maxhp", by: 10 },
        { increase_stat: "str", by: 2 }
      ],
      weapon: copy(weapons.broken_sword),
      armor: copy(armors.leather_armor)
    },
    {
      name: "Barbarian",
      effects: [
        { increase: "maxhp", by: 5 },
        { increase_stat: "str", by: 5 }
      ]
    },
    {
      name: "Scholar",
      effects: [
        { increase: "maxmp", by: 10 },
        { increase_stat: "int", by: 2 }
      ],
      wand: copy(weapons.broomstick),
      armor: copy(armors.rags)
    }
  ]
};

function savesLoadMenu() {
  $("loadContainer").textContent = "";
  for (let save of save_slots) {
    let slot = create("p");
    slot.textContent = save.text + " ";
    if (save.hc) slot.innerHTML += "<span style='color: red'>HARDCORE!</span>";
    slot.id = "slot" + save.id;
    if (selected_slot?.id == save?.id) slot.classList.add("saveSelected");
    slot.addEventListener("click", () => createPrompt(`Are you sure you wish to load game ${save.text.split("||")[0]}?`, () => load_game_menu(save)));
    $("loadContainer").appendChild(slot);
  }
}

function load_game_menu(slot) {
  selected_slot = slot;
  loadGame();
  $("mainMenu").style.display = "none";
  $("mainScreen").style.display = "block";
}

function options() {
  if (!menu.settings_open) {
    $("optarr").style.transform = "rotateZ(90deg) scale(1)";
    menu.settings_open = true;
    $("optionsMenu").style.transform = "rotate(0deg) scale(1)";
  } else {
    $("optarr").style.transform = "rotateZ(0deg) scale(0)";
    menu.settings_open = false;
    $("optionsMenu").style.transform = "rotate(90deg) scale(0)";
  }
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
  $("check--itemPrompt").textContent = !settings.dont_ask_when_using_item ? "X" : "";
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
  $("mainMenu").style.display = "none";
  $("characterCreation").style.display = "block";
  for (let bg of char_bgs) {
    let back = create("p");
    back.textContent = bg.name;
    back.addEventListener("click", () => selectBG(bg));
    addHoverBox(back, texts[bg.name], 10);
    $("backgroundForChar").appendChild(back);
  }
  $("hardcoreBut").addEventListener("click", toggleHC);
  $("startTheGame").addEventListener("click", createCharacter);
}

function toggleHC() {
  if (menu.hardcore) {
    menu.hardcore = false;
    $("hardcoreBut").style.border = "";
  } else {
    menu.hardcore = true;
    $("hardcoreBut").style.border = "0.25vw solid gold";
  }
}

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
  player.name = $("characterName").value;
  if (menu.selected_bg.weapon) {
    player.items.push(player.weapon);
    player.weapon = menu.selected_bg.weapon;
  } 
  if (menu.selected_bg.armor) {
    player.items.push(player.armor);
    player.armor = menu.selected_bg.armor;
  } 
  if (menu.selected_bg.wand) {
    player.items.push(player.wand);
    player.wand = menu.selected_bg.wand;
  } 
  for (let effect of menu.selected_bg.effects) {
    if (effect.increase_stat) player.stats[effect.increase_stat] += effect.by;
    else if (effect.increase) player[effect.increase] += effect.by;
  }
  player.hp = player.maxhp;
  player.mp = player.maxmp;
  if (menu.hardcore) {
    state.hc = true;
    let saveName = player.name;
    let sortTime = +(new Date());
    let saveTime = new Date();
    let gameSave = {};
    gameSave.player = player;
    gameSave.state = state;
    saveTime = ("0" + saveTime.getHours()).slice(-2) + "." + ("0" + saveTime.getMinutes()).slice(-2);
    save_slots.push({ text: `${saveName} || Last Saved: ${saveTime} || Character Level: ${player.level}`, save: gameSave, id: save_slots.length, time: sortTime, hc: menu.hardcore });
    localStorage.setItem("save_slots", JSON.stringify(save_slots));
    $("characterCreation").style.display = "none";
    $("combatScreen").style.display = "block";
  } else {
    $("characterCreation").style.display = "none";
    $("combatScreen").style.display = "block";
  }
}

var char_bgs = {};

