const $ = (e) => {
  return document.getElementById(e);
};
const game = $("gameWindow");
let clientWidth = game.offsetWidth;
let clientHeight = game.offsetHeight;
const create = (e) => {
  return document.createElement(e);
};
const add = (e) => {
  return game.appendChild(e);
};
const selectAll = (e) => {
  return document.querySelectorAll(e);
};
const pxtovh = (v) => (v / clientHeight) * 100;
const pxtovw = (v) => (v / clientWidth) * 100;
let isFirefox = typeof InstallTrigger !== "undefined";
let audio = {
  music: $("music"),
  effect: $("effect"),
};
let music = [
  {
    type: "lobby",
    loop: true,
    source: "audio/music/lobby.mp3",
  },
  {
    type: "combat",
    num: 1,
    loop: true,
    source: "audio/music/combat1.mp3",
  },
  {
    type: "combat",
    num: 2,
    loop: true,
    source: "audio/music/combat2.mp3",
  },
  {
    type: "boss",
    num: 1,
    loop: true,
    source: "audio/music/boss1.mp3",
  },
  {
    type: "boss",
    num: 2,
    loop: true,
    source: "audio/music/boss2.mp3",
  },
  {
    type: "boss",
    num: 3,
    loop: true,
    source: "audio/music/boss3.mp3",
  },
  {
    type: "boss",
    num: 4,
    loop: true,
    source: "audio/music/boss4.mp3",
  },
];

let effects = [
  {
    type: "click",
    loop: false,
    source: "audio/effects/click.wav",
  },
];

function Random(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}

function PercentOf(value, max) {
  return max * (value / 100);
}

function playSound(type) {
  for (let sound of effects) {
    if (sound.type == type) {
      audio.effect.src = sound.source;
      audio.effect.volume = 0.55;
      audio.effect.loop = sound.loop;
      audio.effect.play();
    }
  }
}

function playBossMusic(num) {
  for (let sound of music) {
    if (sound.type == "boss" && sound.num == num) {
      audio.music.src = sound.source;
      audio.music.volume = 0.01;
      audio.music.loop = sound.loop;
      audio.music.play();
    }
  }
}

function playMusic(type) {
  let sound = music[Random(music.length - 1)];
  while (sound.type != type) {
    sound = music[Random(music.length - 1)];
  }
  audio.music.src = sound.source;
  audio.music.volume = 0.01;
  audio.music.loop = sound.loop;
  audio.music.play();
}

function playLobbyMusic() {
  let musc;
  for (let mus of music) {
    if (mus.type == "lobby") musc = mus;
  }
  audio.music.src = musc.source;
  audio.music.volume = 0.01;
  audio.music.loop = musc.loop;
  audio.music.play();
}

function PlayHitSound() {
  audio.effect.src = `audio/effects/hurt${Random(3, 1)}.wav`;
  audio.effect.volume = 0.75;
  audio.effect.play();
}

let smallUpdater = setInterval(smallUpdate, 500);

// These values are used for determining the edges of the screen.

let combatTimer = setInterval(
  Update,
  1000 / (60 * combatSpeeds[settings.combat_speed])
);
let textBox = $("gameInfoTextPopUp");

// $ marks variables. Example: §/$R/$player.hp§
// FS is font size. In vw.

// Colors, for now.
const Y = "#E9DC38"; // Yellow
const B = "#2B69DC"; // Blue
const R = "#DC4C2B"; // Red

// stuff
let state = {
  paused: false,
  turn: "none",
  action: false,
  open: "none",
  end: false,
  stage: dungeon.floor1.stages.stage0,
  floor: 1,
  gamemode: gamemodes.casual,
  started_game: false,
};

const colorCodes = [
  { max: 3, color: "#F0F0F0" },
  { max: 7, color: "#F6E661" },
  { max: 12, color: "#F6C461" },
  { max: 18, color: "#F38835" },
  { max: 99, color: "#D80F0C" },
];

function getMove(char, id) {
  for (let move of char.moves) {
    if (move.id == id) return move;
  }
}

function getPower(char, id) {
  for (let move of char.moves) {
    if (move.id == id.id) return move.power;
  }
}

function getBase(char, id) {
  for (let move of char.moves) {
    if (move.id == id.id) return move.base;
  }
}

function getPenetration(char, id) {
  for (let move of char.moves) {
    if (move.id == id.id) return move.penetration;
  }
}

function getLast(char, id) {
  for (let move of char.moves) {
    if (move.id == id.id) return move.last;
  }
}

function getCooldown(char, id) {
  for (let move of char.moves) {
    if (move.id == id.id) return move.cooldown;
  }
}

function getManacost(char, id) {
  for (let move of char.moves) {
    if (move.id == id.id) return move.mp_cost;
  }
}

let gauntlet = state.stage.gauntlet;

let gauntletLoot = {
  xp: 0,
  gold: 0,
};

let enemy = gauntlet[0];
$("enemyName").textContent = "Lv" + enemy.level + " " + enemy.name;
$("enemySprite").src = "images/" + enemy.name + ".png";
EnemyNameColor();
$("playerName").textContent = "Lv" + player.level + " " + player.name;
$("playerSprite").src = "images/" + player.sprite + ".png";
$("playerName").style.color = player.color;
$("playerName").style.textShadow = `0.1vw 0.1vw 0.3vw ${player.color}`;
$(
  "playerSprite"
).style.filter = `drop-shadow(0.125vw 0.12vw 0.4vw ${player.color})`;

addHoverBox($("playerSpriteContainer"), texts.player, 12);
addHoverBox($("enemySpriteContainer"), texts.enemy, 10);

let playerActionrate = "0%";
let enemyActionrate = "0%";

$("ski-button").addEventListener("click", () => playerButtonsOpen("skills"));
$("mag-button").addEventListener("click", () => playerButtonsOpen("magical"));
$("itm-button").addEventListener("click", () => playerButtonsOpen("items"));
addHoverBox($("atk-button"), texts.atkbutton, 12);
addHoverBox($("ski-button"), texts.skibutton, 9);
addHoverBox($("mag-button"), texts.magbutton, 10);
addHoverBox($("itm-button"), texts.itmbutton, 9);
addHoverBox($("playerActionbar"), texts.actionPoints, 12);
addHoverBox($("playerHealthbar"), texts.healthPoints, 12);
addHoverBox($("playerManabar"), texts.manaPoints, 13);
addHoverBox($("enemyActionbar"), texts.enemyActionPoints, 12);
addHoverBox($("enemyHealthbar"), texts.enemyHealthPoints, 13);
addHoverBox($("enemyManabar"), texts.enemyManaPoints, 13);

$("atk-button").addEventListener("click", () => PlayerAttack());

function actionBar() {
  try {
    $("enemyActionbar-fill").classList.remove("actionbar-progress");
    $("enemyActionbar-fill").classList.remove("actionbar-ready");
    $("enemyActionbar-fill").classList.remove("actionbar-halt");
    $("enemyActionbar-fill").classList.remove("actionbar-gone");
    $("playerActionbar-fill").classList.remove("actionbar-progress");
    $("playerActionbar-fill").classList.remove("actionbar-ready");
    $("playerActionbar-fill").classList.remove("actionbar-halt");
    $("playerActionbar-fill").classList.remove("actionbar-gone");
  } catch {}
  if (!state.paused && player.action_points < 100 && player.action_points > 0) {
    $("playerActionbar-fill").classList.add("actionbar-progress");
  } else if (
    state.paused &&
    player.action_points < 100 &&
    player.action_points > 0
  ) {
    $("playerActionbar-fill").classList.add("actionbar-halt");
  } else if (player.action_points === 0) {
    $("playerActionbar-fill").classList.add("actionbar-gone");
  } else {
    $("playerActionbar-fill").classList.add("actionbar-ready");
  }
  if (!state.paused && enemy.action_points < 100 && enemy.action_points > 0) {
    $("enemyActionbar-fill").classList.add("actionbar-progress");
  } else if (
    state.paused &&
    enemy.action_points < 100 &&
    enemy.action_points > 0
  ) {
    $("enemyActionbar-fill").classList.add("actionbar-halt");
  } else if (enemy.action_points === 0) {
    $("enemyActionbar-fill").classList.add("actionbar-gone");
  } else {
    $("enemyActionbar-fill").classList.add("actionbar-ready");
  }
}

function speedDebuffs(char) {
  let total = 1;
  for (let debuff of char.statuses) {
    if (debuff.lower) {
      total += debuff.lower;
    }
  }
  return total;
}

function speedBuffs(char) {
  let total = 1;
  for (let buff of char.statuses) {
    if (buff.increase) {
      total += buff.increase;
    }
  }
  return total;
}

function healOT(char) {
  if (state.paused || state.end) return;
  for (let stat of char.statuses) {
    if (stat.heal_ot) {
      if (stat.heal_limit < 100) {
        stat.heal_limit += 100 / 60;
      }
      if (stat.heal_limit >= 100) {
        char.hp += Math.ceil(char.maxhp * stat.heal_ot);
        if (char.hp > char.maxhp) char.hp = char.maxhp;
        stat.heal_limit = 0;
        createParticle(
          Math.ceil(char.maxhp * stat.heal_ot),
          "green",
          char == player ? $("playerSprite") : $("enemySprite")
        );
      }
    }
  }
}

function dmgOT(char) {
  if (state.paused || state.end) return;
  for (let stat of char.statuses) {
    if (stat.dmg_ot) {
      if (stat.dmg_limit < 100) {
        stat.dmg_limit += 100 / 60;
      }
      if (stat.dmg_limit >= 100) {
        char.hp -= Math.ceil(char.maxhp * stat.dmg_ot);
        if (char.hp > char.maxhp) char.hp = char.maxhp;
        stat.dmg_limit = 0;
        createParticle(
          Math.ceil(char.maxhp * stat.dmg_ot),
          "purple",
          char == player ? $("playerSprite") : $("enemySprite")
        );
      }
    }
  }
}

let player_turns = 0;
let enemy_turns = 0;

function smallUpdate() {
  // Refresh skills etc
  if (state.open == "magical") updateMagicalMoves();
  else if (state.open == "skills") updateSkillMoves();
  createStatuses();
}

function playerButtonsOpen(buttons) {
  let pbuttons = $("playerButtons-open");
  pbuttons.textContent = "";
  if (pbuttons.classList.contains("slider--closed")) {
    pbuttons.classList.remove("slider--closed");
  }
  if (pbuttons.classList.contains("slider--open")) {
    pbuttons.classList.remove("slider--open");
  }
  if (state.open == buttons) {
    state.open = "none";
    pbuttons.classList.add("slider--closed");
    return;
  } else if (state.open != "none") {
    pbuttons.classList.add("slider--closed");
    setTimeout(openSlider, 550);
    function openSlider() {
      pbuttons.classList.add("slider--open");
      if (buttons == "items") generateInventoryItems();
      else if (buttons == "magical") generateMagicalMoves();
      else if (buttons == "skills") generateSkillMoves();
    }
    return;
  } else if (state.open == "none") {
    pbuttons.classList.add("slider--open");
    if (buttons == "items") generateInventoryItems();
    else if (buttons == "magical") generateMagicalMoves();
    else if (buttons == "skills") generateSkillMoves();
  }
}

function generateInventoryItems() {
  state.open = "items";
  let buttons = $("playerButtons-open");
  buttons.textContent = "";
  for (let item of player.items) {
    if (item.amount < 1 || item.item_type != "consumable") continue;
    let Item = create("div");
    Item.id = item.id;
    Item.classList.add("item");
    let img = create("img");
    img.src = "images/" + item.id + ".png";
    if (item.amount > 1) {
      let amnt = create("p");
      amnt.textContent = item.amount;
      Item.appendChild(amnt);
    }
    addHoverBox(
      Item,
      item.name + " §FS0.4FS/$Y/Hold shift for details§",
      (item.name.length - 3) / 2,
      texts[item.id]
    );
    Item.addEventListener("click", () => UseItem(item));
    Item.appendChild(img);
    buttons.appendChild(Item);
  }
}

function generateMagicalMoves() {
  state.open = "magical";
  let buttons = $("playerButtons-open");
  buttons.textContent = "";
  for (let move of player.moves) {
    if (move.physical) continue;
    let Move = create("div");
    Move.id = move.id;
    Move.classList.add("item");
    let img = create("img");
    img.src = "images/" + move.id + ".png";
    Move.appendChild(img);
    addHoverBox(
      Move,
      move.name + " §FS0.4FS/$Y/Hold shift for details§",
      move.name.length / 2,
      texts[move.id]
    );
    Move.addEventListener("click", () => Ability(move));
    buttons.appendChild(Move);
  }
  updateMagicalMoves();
}

function updateMagicalMoves() {
  for (let move of player.moves) {
    if (move.physical) continue;
    if (!$(move.id)) continue;
    if (move.onCooldown > 0) {
      if ($(move.id).childNodes[1]) {
        $(move.id).childNodes[1].textContent = Math.ceil(move.onCooldown) + "s";
      } else {
        let cd = create("p");
        cd.textContent = Math.ceil(move.onCooldown) + "s";
        $(move.id).appendChild(cd);
      }
      $(move.id).childNodes[0].classList.add("item-unavailable");
      $(move.id).childNodes[0].pointerEvents = "none";
    } else if (move.mp_cost > player.mp && move.mp_cost != 0) {
      $(move.id).childNodes[0].classList.add("item-unavailable");
      $(move.id).childNodes[0].pointerEvents = "none";
      if (move.onCooldown <= 0)
        if ($(move.id).childNodes[1])
          $(move.id).removeChild($(move.id).childNodes[1]);
    } else {
      $(move.id).childNodes[0].classList.remove("item-unavailable");
      $(move.id).childNodes[0].pointerEvents = "all";
      if ($(move.id).childNodes[1])
        $(move.id).removeChild($(move.id).childNodes[1]);
    }
  }
}

function updateSkillMoves() {
  for (let move of player.moves) {
    if (!move.physical) continue;
    if (!$(move.id)) continue;
    if (move.onCooldown > 0) {
      if ($(move.id).childNodes[1]) {
        $(move.id).childNodes[1].textContent = Math.ceil(move.onCooldown) + "s";
      } else {
        let cd = create("p");
        cd.textContent = Math.ceil(move.onCooldown) + "s";
        $(move.id).appendChild(cd);
      }
      $(move.id).childNodes[0].classList.add("item-unavailable");
      $(move.id).childNodes[0].pointerEvents = "none";
    } else if (move.mp_cost > player.mp && move.mp_cost != 0) {
      $(move.id).childNodes[0].classList.add("item-unavailable");
      $(move.id).childNodes[0].pointerEvents = "none";
    } else {
      $(move.id).childNodes[0].classList.remove("item-unavailable");
      $(move.id).childNodes[0].pointerEvents = "all";
      if ($(move.id).childNodes[1])
        $(move.id).removeChild($(move.id).childNodes[1]);
    }
  }
}

function generateSkillMoves() {
  state.open = "skills";
  let buttons = $("playerButtons-open");
  buttons.textContent = "";
  for (let move of player.moves) {
    if (!move.physical || move.name == "Attack") continue;
    let Move = create("div");
    Move.id = move.id;
    Move.classList.add("item");
    let img = create("img");
    img.src = "images/" + move.id + ".png";
    addHoverBox(
      Move,
      move.name + " §FS0.55FS/$Y/Hold shift for details§",
      move.name.length / 2,
      texts[move.id]
    );
    Move.addEventListener("click", () => Ability(move));
    Move.appendChild(img);
    buttons.appendChild(Move);
  }
  updateSkillMoves();
}

let hovering = undefined;

function textBoxSet(point, text, width, alt) {
  hovering = { point: point, text: text, alt: alt, width: width };
  textBox.style.display = "block";
  textBox.textContent = "";
  textBox.appendChild(textSyntax(text));
  textBox.style.width = width + "vw";
  textBox.style.left = point.clientX + 20 + "px";
  textBox.style.top = point.clientY + 20 + "px";
  if (textBox.offsetLeft + textBox.offsetWidth > clientWidth) {
    textBox.style.left = clientWidth - textBox.offsetWidth + "px";
  }
  if (textBox.offsetTop + textBox.offsetHeight > clientHeight) {
    textBox.style.top = clientHeight - textBox.offsetHeight + "px";
  }
}

function textBoxMove(point, text, alt) {
  textBox.style.left = point.clientX + 20 + "px";
  textBox.style.top = point.clientY + 20 + "px";
  if (textBox.offsetLeft + textBox.offsetWidth > clientWidth) {
    textBox.style.left = clientWidth - textBox.offsetWidth + "px";
  }
  if (textBox.offsetTop + textBox.offsetHeight > clientHeight) {
    textBox.style.top = clientHeight - textBox.offsetHeight + "px";
  }
}

function textBoxAlt(e) {
  if (hovering?.point && e.shiftKey && hovering.alt) {
    textBox.textContent = "";
    textBox.style.width = hovering.width * 1.5 + "vw";
    textBox.appendChild(textSyntax(hovering.alt));
  }
}

function textBoxMain(e) {
  if (hovering?.point) {
    textBox.textContent = "";
    textBox.style.width = hovering.width + "vw";
    textBox.appendChild(textSyntax(hovering.text));
  }
}

function textBoxRemove() {
  hovering = undefined;
  textBox.style.display = "none";
  textBox.textContent = "";
}

function addHoverBox(element, text, width, alt) {
  element.addEventListener("mouseover", (e) => textBoxSet(e, text, width, alt));
  element.addEventListener("mousemove", (e) => textBoxMove(e, text, alt));
  element.addEventListener("mouseout", (e) => textBoxRemove(e));
}

document.body.addEventListener("keydown", textBoxAlt);
document.body.addEventListener("keyup", textBoxMain);

function textSyntax(txt) {
  let container = create("div");
  let text = txt.split("§");
  for (let row of text) {
    let currentText = row;
    let currentColor = "white";
    let size = null;
    if (currentText.startsWith("$"))
      currentText = eval(currentText.split("$")[1]);
    if (row.indexOf("FS") != -1) {
      size = row.split("FS")[1];
    }
    if (row.indexOf("/") != -1) {
      currentColor = row.split("/")[1];
      if (currentColor.startsWith("$"))
        currentColor = eval(currentColor.split("$")[1]);
      currentText = row.split("/")[2];
      if (currentText.startsWith("$"))
        currentText = eval(currentText.split("$")[1]);
    }
    if (currentText == ":br") container.innerHTML += "<br>";
    else if (size == null)
      container.innerHTML += `<span style="color: ${currentColor}">${currentText}</span>`;
    else
      container.innerHTML += `<span style="color: ${currentColor}; font-size: ${size}vw">${currentText}</span>`;
  }
  return container;
}

function EnemyNameColor() {
  let difference = enemy.level - player.level;
  for (let code of colorCodes) {
    if (code.max >= difference) {
      $("enemyName").style.color = code.color;
      $("enemyName").style.textShadow = `-0.1vw 0.1vw 0.3vw ${code.color}`;
      $(
        "enemySprite"
      ).style.filter = `drop-shadow(0.125vw 0.12vw 0.4vw ${code.color})`;
      break;
    }
  }
}

function resetProjectile() {
  selectAll(".projectile").forEach((e) => e.remove());
}

function createEventlog(name, object, skill = null) {
  console.log(skill);
  let log = create("p");
  let time = new Date();
  time =
    "[" +
    ("0" + time.getHours()).slice(-2) +
    "." +
    ("0" + time.getMinutes()).slice(-2) +
    "." +
    ("0" + time.getSeconds()).slice(-2) +
    "]";
  let text = create("span");
  let clock = create("span");
  clock.style.color = Y;
  clock.textContent = time;
  if (skill) {
    text.textContent = ` ${skill} is ready!`;
  } else {
    text.textContent = ` ${name} uses ${object}.`;
  }
  log.appendChild(clock);
  log.appendChild(text);
  $("eventWindow").appendChild(log);
  $("eventWindow").scrollBy(0, 2000);
}

function createParticle(text, color, start) {
  let particle = create("p");
  particle.classList.add("fly");
  particle.style.color = color;
  particle.textContent = text;
  particle.style.transition = "1.5s";
  particle.classList.add("particle");
  particle.style.left =
    (isFirefox ? start.getBoundingClientRect().left : start.x) +
    Random(200, 80) +
    "px";
  particle.style.top =
    (isFirefox ? start.getBoundingClientRect().top : start.y) +
    Random(150, 30) +
    "px";
  particle.style.fontSize = Random(6, 5) + "vw";
  setTimeout(flyRandomly, 25);
  function flyRandomly() {
    particle.style.left = Random(200, -200) + "px";
  }
  add(particle);
}

function createProjectile(id, start, left) {
  let projectile = create("img");
  //projectile.classList.add("shoot");
  projectile.classList.add("projectile");
  projectile.src = "images/" + id + ".png";
  if (left)
    projectile.style.left =
      (isFirefox ? start.getBoundingClientRect().left : start.x) + 50 + "px";
  else
    projectile.style.left =
      pxtovw((isFirefox ? start.getBoundingClientRect().left : start.x) + 50) +
      26 +
      "vw";
  projectile.style.top = start.y + start.clientHeight / 3.5 + "px";
  setTimeout(flyForwards, 25);
  function flyForwards() {
    if (left) projectile.style.left = "65vw";
    else projectile.style.left = "20vw";
  }
  add(projectile);
}

function reset() {
  $("playerSpriteContainer").classList.remove("player-attack");
  $("playerSpriteContainer").classList.remove("player-attack--magical");
  $("enemySpriteContainer").classList.remove("enemy-attack");
  $("enemySpriteContainer").classList.remove("enemy-attack--magical");
  $("playerSpriteContainer").classList.remove("shake2");
  $("enemySpriteContainer").classList.remove("shake2");
  $("playerSprite").classList.remove("heal");
  $("enemySprite").classList.remove("heal");
  game.classList.remove("shake1");
  state.paused = false;
  state.action = false;
  state.turn = "none";
  selectAll(".particle").forEach((e) => e.remove());
}

function DroppedText(drops) {
  let text = "";
  for (let drop of drops) {
    text += `| ${drop.amount}x ${drop.name} |`;
  }
  return text;
}

function battleEnd(condition) {
  clearInterval(combatTimer);
  playTime();
  if (condition == "victory") {
    gauntlet.splice(gauntlet[enemy], 1);
    game_stats.enemies_killed++;
    if (player_turns > game_stats.most_turns_player)
      game_stats.most_turns_player = player_turns;
    if (enemy_turns > game_stats.most_turns_enemy)
      game_stats.most_turns_enemy = enemy_turns;
    if (enemy_turns + player_turns > game_stats.longest_battle_in_turns)
      game_stats.longest_battle_in_turns = enemy_turns + player_turns;
    let xp = 0;
    let gold = 0;
    xp = enemy.xp;
    xp = Math.ceil(xp * (1 + player.stats.lck / 100));
    gold = Random(enemy.gold.max, enemy.gold.min);
    gold = Math.ceil(gold * (1 + player.stats.lck / 25));
    if (!player.enemies_slain[enemy.id]) {
      player.enemies_slain[enemy.id] = 1;
    } else {
      player.enemies_slain[enemy.id]++;
    }
    let dropped = [];
    if (enemy.drops) {
      for (let drop of enemy.drops) {
        if (drop == undefined || drop.item == undefined) continue;
        if (drop.chance >= Math.random()) {
          amount = Random(drop.max, drop.min);
          dropped.push({ ...drop.item, amount: amount });
          if (dropped.id) {
            if (
              player.items
                .map((item) => (item = item.id))
                .indexOf(drop.item.id) == -1
            )
              player.items.push({ ...drop.item, amount: amount });
            else
              player.items[
                player.items
                  .map((item) => (item = item.id))
                  .indexOf(drop.item.id)
              ].amount += amount;
          } else {
            if (
              player.items
                .map((item) => (item = item.name))
                .indexOf(drop.item.name) == -1
            )
              player.items.push({ ...drop.item, amount: amount });
            else
              player.items[
                player.items
                  .map((item) => (item = item.name))
                  .indexOf(drop.item.name)
              ].amount += amount;
          }
        }
      }
    }
    gauntletLoot.xp += xp;
    gauntletLoot.gold += gold;
    state.end = true;
    $("battleEndScreen").style.transform =
      "translateX(-50%) translateY(-50%) scale(1)";
    $("conclusion").textContent = "VICTORY";
    $("battleEndText").textContent = `You have defeated the ${
      enemy.name
    }! It drops ${xp} XP and ${gold} Gold! ${
      dropped.length > 0 ? "In addition you gather " + DroppedText(dropped) : ""
    }`;
    if (gauntlet.length > 0) {
      $("battleEndText").textContent +=
        " However, more enemies still await you deeper in the dungeon. Brace yourself for battle!";
      $("battleEndButton").onclick = () => NextInGauntlet();
    } else {
      $(
        "battleEndText"
      ).textContent += ` You have wiped out all enemies in the dungeon! This is a great victory! You gain ${gauntletLoot.xp} XP and ${gauntletLoot.gold} Gold!`;
      $("battleEndButton").onclick = () => EndGauntlet("Victory");
    }
  } else if (condition == "defeat") {
    DeleteGameHC();
    state.end = true;
    player.hp = 1;
    $("battleEndScreen").style.transform =
      "translateX(-50%) translateY(-50%) scale(1)";
    $("conclusion").textContent = "DEFEAT";
    $(
      "battleEndText"
    ).textContent = `You have been defeated by the ${enemy.name}, and thus gain no gold and lose all of your experience!`;
    if (state.gamemode.delete_save_on_death)
      $("battleEndText").textContent +=
        "Because you are playing in hardcore mode, your save is now deleted! Better luck next time :)";
    if (state.gamemode.delete_save_on_death) {
      $("battleEndButton").onclick = ReturnToMainMenu();
    } else $("battleEndButton").onclick = () => EndGauntlet("Defeat");
  }
}

function EndGauntlet(condition) {
  $("battleEndScreen").style.transform =
    "translate(-50%) translateY(-50%) scale(0)";
  playLobbyMusic();
  if (condition == "Victory") {
    SaveGameHC();
    player.xp += gauntletLoot.xp;
    player.gold += gauntletLoot.gold;
    gauntletLoot.xp = 0;
    gauntletLoot.gold = 0;
    let curStage = state.stage.name.replace(/( )/g, "");
    curStage = curStage.toLowerCase();
    if (!player.stages_beaten[curStage]) player.stages_beaten[curStage] = true;
    let floorBeaten = true;
    for (let stage in dungeon["floor" + state.floor].stages) {
      if (stage == "stage0") continue;
      if (!player?.stages_beaten[stage]) floorBeaten = false;
    }
    if (floorBeaten) {
      player.floors_beaten["floor" + state.floor] = true;
    }
    createStageSelection();
    $("combatScreen").style.display = "none";
    $("mainScreen").style.display = "block";
    updateLeftValues();
  } else if (condition == "Defeat") {
    gauntletLoot.xp = 0;
    gauntletLoot.gold = 0;
    player.xp = 0;
    $("combatScreen").style.display = "none";
    $("mainScreen").style.display = "block";
    updateLeftValues();
  }
}

function NextInGauntlet() {
  playTime();
  $("battleEndScreen").style.transform =
    "translateX(-50%) translateY(-50%) scale(0)";
  player.action_points = 0;
  enemy.action_points = 0;
  state.end = false;
  player_turns = 0;
  enemy_turns = 0;
  enemy = gauntlet[0];
  if (state.gamemode.give_enemy_scaling_power) {
    enemy.statuses.push({ ...statuses.enemy_rage });
  }
  combatTimer = setInterval(
    Update,
    1000 / (60 * combatSpeeds[settings.combat_speed])
  );
  $("enemyName").textContent = "Lv" + enemy.level + " " + enemy.name;
  $("enemySprite").src = "images/" + enemy.name + ".png";
  EnemyNameColor();
  smallUpdate();
  fixCooldowns();
}

function fixCooldowns() {
  if (state.open == "none") {
    if ($("playerButtons-open").classList.contains("slider--open"))
      $("playerButtons-open").classList.remove("slider--open");
    $("playerButtons-open").classList.add("slider--closed");
  } else if (state.open == "items") generateInventoryItems();
  else if (state.open == "magical") generateMagicalMoves();
  else if (state.open == "skills") generateSkillMoves();
}
