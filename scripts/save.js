function createSaving() {
  if (state.gamemode.prevent_manual_save) return;
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
    if (save.gamemode?.id === "hardcore")
      slot.innerHTML += "<span style='color: red'>HARDCORE!</span>";
    else if (save.gamemode?.id === "eetucore")
      slot.innerHTML += "<span style='color: darkred'>NIGHTMARE!</span>";
    slot.id = "slot" + save.id;
    if (selected_slot?.id == save?.id) slot.classList.add("saveSelected");
    slot.addEventListener("click", selectSlot);
    save_bottom.appendChild(slot);
  }
  save_topbar.innerHTML = `<input id="save_input"></input> <button id="saveBut" onclick="saveGame()">Create Save</button> <button id="loadBut">Load Save</button> <button id="deleteBut">Delete Save</button> <button id="resetID" onclick="resetIds()">Reset IDs</button>`;
  save_container.appendChild(save_topbar);
  save_container.appendChild(save_bottom);
  $("mainWindowContainer").appendChild(save_container);
  $("loadBut").addEventListener("click", () =>
    createPrompt(
      `Are you sure you wish to load save ${selected_slot?.text}?`,
      () => loadGame()
    )
  );
  $("deleteBut").addEventListener("click", () =>
    createPrompt(
      `Are you sure you wish to DELETE save ${selected_slot?.text}?`,
      () => deleteGame()
    )
  );
  addHoverBox($("saveBut"), texts.save_button, 8);
  addHoverBox($("loadBut"), texts.load_button, 8);
  addHoverBox($("deleteBut"), texts.delete_button, 8);
  addHoverBox($("resetID"), texts.resetID, 12);
  $("save_input").value = input;
}

function saveGame() {
  playSound("click");
  let saveName = $("save_input").value || player.name;
  let sortTime = +new Date();
  let saveTime = new Date();
  let gameSave = {};
  gameSave.player = player;
  gameSave.state = state;
  saveTime =
    ("0" + saveTime.getHours()).slice(-2) +
    "." +
    ("0" + saveTime.getMinutes()).slice(-2);
  let key = generateKey(7);
  if (selected_slot == null)
    save_slots.push({
      text: `${saveName} || Last Saved: ${saveTime} || Character Level: ${player.level}`,
      save: gameSave,
      id: save_slots.length,
      time: sortTime,
      gamemode: state.gamemode,
      stats: game_stats,
      key: key,
    });
  else {
    createPrompt(
      `Are you sure you wish to save over slot ${selected_slot.text}?`,
      () => saveOver(saveName, saveTime, gameSave)
    );
    return;
  }
  findIDs();
  localStorage.setItem("save_slots", JSON.stringify(save_slots));
  createSaving();
}

function SaveGameHC() {
  if (!state.gamemode.prevent_manual_save) return;
  let saveTime = new Date();
  let gameSave = {};
  gameSave.player = player;
  gameSave.state = state;
  saveTime =
    ("0" + saveTime.getHours()).slice(-2) +
    "." +
    ("0" + saveTime.getMinutes()).slice(-2);
  for (let save of save_slots) {
    if (save.key == currentSave.key && save.gamemode?.prevent_manual_save) {
      selected_slot = save;
      saveOver(player.name, saveTime, gameSave);
    }
  }
  localStorage.setItem("save_slots", JSON.stringify(save_slots));
}

function DeleteGameHC() {
  if (!state.gamemode.prevent_manual_save) return;
  for (let save of save_slots) {
    if (save.key == currentSave.key && save.gamemode?.prevent_manual_save) {
      save_slots.splice(save.id, 1);
      resetIds();
      localStorage.setItem("save_slots", JSON.stringify(save_slots));
    }
  }
}

function saveOver(name, time, save) {
  playSound("click");
  let sortTime = +new Date();
  save_slots[save_slots.findIndex((s) => s.key === selected_slot.key)] = {
    text: `${name} || Last Saved: ${time} || Character Level: ${player.level}`,
    save: save,
    id: selected_slot.id,
    time: sortTime,
    gamemode: state.gamemode,
    stats: game_stats,
    key: selected_slot.key,
  };
  localStorage.setItem("save_slots", JSON.stringify(save_slots));
  createSaving();
}

function loadGame(menu) {
  playSound("click");
  playLobbyMusic();
  if (selected_slot == null) return;
  currentSave = selected_slot;
  if (!state.started) state.started = true;
  player = selected_slot.save.player;
  state = selected_slot.save.state;
  if (!state.gamemode) state.gamemode = gamemodes.casual;
  else {
    state.gamemode = gamemodes[state.gamemode.id];
  }
  if (!player.wand) player.wand = copy(weapons.chant_only);
  if (player.weapon?.name == "Fists") player.weapon.tier = "DEFAULT";
  if (player.armor?.name == "Nothing") player.armor.tier = "DEFAULT";
  if (player.wand?.name == "Chant Only") player.wand.tier = "DEFAULT";
  for (let item of player.items) {
    if (
      item.name == "Fists" ||
      item.name == "Nothing" ||
      item.name == "Chant Only"
    )
      item.tier = "DEFAULT";
  }
  if (!player.critChance) player.critChance = 10;
  if (!player.critDamage) player.critDamage = 50;
  if (!player.hpMultiplier) player.hpMultiplier = 1;
  if (!player.move_statuses) player.move_statuses = {};
  if (!player.enemies_slain) player.enemies_slain = {};
  for (let move of player.moves) {
    if (move.status) {
      if (!player.move_statuses[move.status])
        player.move_statuses[move.status] = copy(statuses[move.status]);
    }
  }
  for (let medpot of player.items) {
    if (medpot.name == "Medium Healing Potion" && medpot.id == "healing_potion")
      medpot.id = "medium_healing_potion";
  }
  game_stats = selected_slot.stats;
  if (!game_stats) {
    game_stats = {
      enemies_killed: 0,
      items_used: 0,
      most_damage_dealt: 0,
      most_damage_taken: 0,
      longest_battle_in_turns: 0,
      most_turns_player: 0,
      most_turns_enemy: 0,
    };
  }
  if (!player.temporary_effects) player.temporary_effects = [];
  if (!state.started) state.started = true;
  if (menu) select("Character");
  else select("Saves");
  updateLeftValues();
}

function selectSlot(e) {
  playSound("click");
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
  if (
    e.target.id.startsWith("slot") ||
    e.target.id == "saveTopbar" ||
    e.target.id == "save_input" ||
    e.target.id == "saveBut" ||
    e.target.id == "loadBut" ||
    e.target.id == "deleteBut" ||
    e.target.id == "promptWindow" ||
    e.target.id == "promptAccept"
  )
    return;
  selected_slot = null;
  input = "";
  createSaving();
}
