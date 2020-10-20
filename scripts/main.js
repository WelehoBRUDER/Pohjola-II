const $ = (e) => {return document.getElementById(e);}
const game = $("gameWindow");
let clientWidth = game.offsetWidth;
let clientHeight = game.offsetHeight;
const create = (e) => {return document.createElement(e);}
const add = (e) => {return game.appendChild(e);}
const selectAll = (e) => {return document.querySelectorAll(e);}
const pxtovh = v => v / clientHeight * 100;
const pxtovw = v => v / clientWidth * 100;

function Random(max, min = 0) {
  return Math.floor((Math.random() * (max - min)) + min);
}

function PercentOf(value, max) {
  return (max * (value / 100));
}

let smallUpdater = setInterval(smallUpdate, 500);


// These values are used for determining the edges of the screen.


let combatTimer = setInterval(Update, 1000/60);
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
  floor: 1
}

const colorCodes = [
  {max: 3, color: "#F0F0F0"},
  {max: 7, color: "#F6E661"},
  {max: 12, color: "#F6C461"},
  {max: 18, color: "#F38835"},
  {max: 99, color: "#D80F0C"},
]

function getMove(char, id) {
  for(let move of char.moves) {
    if(move.id == id) return move;
  }
}

function getPower(char, id) {
  for(let move of char.moves) {
    if(move.id == id.id) return move.power;
  }
}

function getPenetration(char, id) {
  for(let move of char.moves) {
    if(move.id == id.id) return move.penetration;
  }
}

function getCooldown(char, id) {
  for(let move of char.moves) {
    if(move.id == id.id) return move.cooldown;
  }
}

function getManacost(char, id) {
  for(let move of char.moves) {
    if(move.id == id.id) return move.mp_cost;
  }
}

let gauntlet = state.stage.gauntlet;

let gauntletLoot = {
  xp: 0,
  gold: 0
}

let enemy = gauntlet[0];
$("enemyName").textContent = "Lv" + enemy.level + " " + enemy.name;
$("enemySprite").src = "images/" + enemy.name + ".png";
EnemyNameColor();
$("playerName").textContent = "Lv" + player.level + " " + player.name;
$("playerSprite").src = "images/" + player.sprite + ".png";
$("playerName").style.color = player.color;
$("playerName").style.textShadow = `0.1vw 0.1vw 0.3vw ${player.color}`;
$("playerSprite").style.filter = `drop-shadow(0.125vw 0.12vw 0.4vw ${player.color})`;

addHoverBox($("playerSpriteContainer"), texts.player, 12);
addHoverBox($("enemySpriteContainer"), texts.enemy, 10);


let playerActionrate = "0%";
let enemyActionrate = "0%";


$("ski-button").addEventListener('click', ()=> playerButtonsOpen("skills"));
$("mag-button").addEventListener('click', ()=> playerButtonsOpen("magical"));
$("itm-button").addEventListener('click', ()=> playerButtonsOpen("items"));
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

$("atk-button").addEventListener('click', ()=>PlayerAttack());

function Update() {
  // Execute all code under this line 60 times per second.

  // Keeping the game window's size updated.
  // This makes sure that everything scales accordingly if screen is resized.
  clientWidth = game.offsetWidth;
  clientHeight = game.offsetHeight;

  // Cancel update if battle has ended
  if(state.end) return;

  // Player action bar fill sequence
  player.speed = ((player.weapon.speed_bonus / 100) + (player.armor.speed_bonus / 100)) + player.stats.agi / 100;
  if(!state.paused) player.action_points += 0.5 + player.speed;

  // Enemy action bar fill sequence
  enemy.speed = (enemy.weapon.speed_bonus / 100) + enemy.stats.agi / 100;
  if(!state.paused) enemy.action_points += 0.5 + enemy.speed;

  // Reset action points when they reach their goal
  if(player.action_points >= 100) {
    player.action_points = 100;
    state.paused = true;
    state.turn = "player";
  }
  if(enemy.action_points >= 100) {
    enemy.action_points = 100;
    state.paused = true;
    state.turn = "enemy";
  }

  if(!state.action && state.turn == "enemy") EnemyAttack();

  // Action bar (player)
  $("playerActionbar-fill").style.width = player.action_points + '%';
  $("playerActionbar-percentage").textContent = Math.ceil(player.action_points) + '%';
  if(player.action_points == 0) $("playerActionbar-fill").style.boxShadow = "0px 0px 0vw 0vw rgb(60, 115, 15)";
  else $("playerActionbar-fill").style.boxShadow = "0px 0px 0.25vw 0.2vw rgb(60, 115, 15)";

  // Action bar (enemy)
  $("enemyActionbar-fill").style.width = enemy.action_points + '%';
  $("enemyActionbar-percentage").textContent = Math.ceil(enemy.action_points) + '%';
  if(enemy.action_points == 0) $("enemyActionbar-fill").style.boxShadow = "0px 0px 0vw 0vw rgb(60, 115, 15)";
  else $("enemyActionbar-fill").style.boxShadow = "0px 0px 0.25vw 0.2vw rgb(60, 115, 15)";

  // Health bar (player)
  $("playerHealthbar-number").textContent = player.hp + " / " + player.maxhp + " HP";
  $("playerHealthbar-fill").style.width = (player.hp / player.maxhp) * 100 + '%';
  $("playerHealthbar-taken").style.width = (player.hp / player.maxhp) * 100 + '%';
  if(player.hp == 0) $("playerHealthbar-fill").style.boxShadow = "0px 0px 0vw 0vw rgb(107, 18, 11)"; 
  else $("playerHealthbar-fill").style.boxShadow = "0px 0px 0.25vw 0.2vw rgb(107, 18, 11)";
  
  // Health bar (enemy)
  $("enemyHealthbar-number").textContent = enemy.hp + " / " + enemy.maxhp + " HP";
  $("enemyHealthbar-fill").style.width = (enemy.hp / enemy.maxhp) * 100 + '%';
  $("enemyHealthbar-taken").style.width = (enemy.hp / enemy.maxhp) * 100 + '%';
  if(enemy.hp == 0) $("enemyHealthbar-fill").style.boxShadow = "0px 0px 0vw 0vw rgb(107, 18, 11)"; 
  else $("enemyHealthbar-fill").style.boxShadow = "0px 0px 0.25vw 0.2vw rgb(107, 18, 11)";

  // Mana bar (player)
  $("playerManabar-number").textContent = player.mp + " / " + player.maxmp + " MP";
  $("playerManabar-fill").style.width = (player.mp / player.maxmp) * 100 + '%';
  if(player.mp == 0) $("playerManabar-fill").style.boxShadow = "0px 0px 0vw 0 rgb(12, 58, 110)"; 
  else $("playerManabar-fill").style.boxShadow = "0px 0px 0.25vw 0.2vw rgb(12, 58, 110)";

  // Mana bar (enemy)
  $("enemyManabar-number").textContent = enemy.mp + " / " + enemy.maxmp + " MP";
  $("enemyManabar-fill").style.width = (enemy.mp / enemy.maxmp) * 100 + '%';
  if(enemy.mp == 0) $("enemyManabar-fill").style.boxShadow = "0px 0px 0vw 0 rgb(12, 58, 110)"; 
  else $("enemyManabar-fill").style.boxShadow = "0px 0px 0.25vw 0.2vw rgb(12, 58, 110)";

  // Lower cooldowns
  if(!state.paused && !state.action) {
    // moves
    for(let move of player.moves) {
      if(move.onCooldown > 0) move.onCooldown -= 1/60;
      else move.onCooldown = 0;
    }
    for(let move of enemy.moves) {
      if(move.onCooldown > 0) move.onCooldown -= 1/60;
      else move.onCooldown = 0;
    }
    // statuses
    for(let status of enemy.statuses) {
      if(status.lasts > 0) status.lasts -= 1/60;
      else status.lasts = 0;
      if(status.lasts == 0) enemy.statuses.splice(enemy.statuses[status], 1);
    }
    for(let status of player.statuses) {
      if(status.lasts > 0) status.lasts -= 1/60;
      else status.lasts = 0;
      if(status.lasts == 0) player.statuses.splice(player.statuses[status], 1);
    }
  }

  // Stop animations when paused
  if(state.paused && !state.action) {
    $("playerActionbar-fill").style.animationPlayState = "paused";
    $("playerHealthbar-fill").style.animationPlayState = "paused";
    $("playerManabar-fill").style.animationPlayState = "paused";
    $("enemyActionbar-fill").style.animationPlayState = "paused";
    $("enemyHealthbar-fill").style.animationPlayState = "paused";
    $("enemyManabar-fill").style.animationPlayState = "paused";
  } else {
    $("playerActionbar-fill").style.animationPlayState = "running";
    $("playerHealthbar-fill").style.animationPlayState = "running";
    $("playerManabar-fill").style.animationPlayState = "running";
    $("enemyActionbar-fill").style.animationPlayState = "running";
    $("enemyHealthbar-fill").style.animationPlayState = "running";
    $("enemyManabar-fill").style.animationPlayState = "running";
  }

  // Random 
  playerActionrate = ((0.5 + player.speed) * 60).toFixed(1) + '%';
  enemyActionrate = ((0.5 + enemy.speed) * 60).toFixed(1) + '%';

  // Check deaths
  if(player.hp <= 0) battleEnd("defeat");
  else if(enemy.hp <= 0) battleEnd("victory");

}

function smallUpdate() {
    // Refresh skills etc
    if(state.open == "magical") updateMagicalMoves();
    else if(state.open == "skills") updateSkillMoves();
    createStatuses();
}

function playerButtonsOpen(buttons) {
  let pbuttons = $("playerButtons-open");
  pbuttons.textContent = "";
  if(pbuttons.classList.contains("slider--closed")) {
    pbuttons.classList.remove("slider--closed");
  }
  if(pbuttons.classList.contains("slider--open")) {
    pbuttons.classList.remove("slider--open");
  }
  if(state.open == buttons) {
      state.open = "none";
      pbuttons.classList.add("slider--closed");
      return;
    }
  else if(state.open != "none") {
    pbuttons.classList.add("slider--closed");
    setTimeout(openSlider, 550);
    function openSlider() {
      pbuttons.classList.add("slider--open");
      if(buttons == "items") generateInventoryItems();
      else if(buttons == "magical") generateMagicalMoves();
      else if(buttons == "skills") generateSkillMoves();
    }
    return;
  } else if(state.open == "none") {
    pbuttons.classList.add("slider--open");
    if(buttons == "items") generateInventoryItems();
    else if(buttons == "magical") generateMagicalMoves();
    else if(buttons == "skills") generateSkillMoves();
  }
}

function generateInventoryItems() {
  state.open = "items"
  let buttons = $("playerButtons-open");
  buttons.textContent = "";
  for(let item of player.items) {
    if(item.amount < 1 || item.item_type != "consumable") continue;
    let Item = create("div");
    Item.id = item.id;
    Item.classList.add("item");
    let img = create("img");
    img.src = "images/" + item.id + ".png";
    if(item.amount > 1) {
      let amnt = create("p");
      amnt.textContent = item.amount;
      Item.appendChild(amnt);
    }
    addHoverBox(Item, item.name + " §FS0.4FS/$Y/Hold shift for details§", (item.name.length-3)/2, texts[item.id]);
    Item.addEventListener('click', ()=>UseItem(item));
    Item.appendChild(img);
    buttons.appendChild(Item);
  }
}

function generateMagicalMoves() {
  state.open = "magical"
  let buttons = $("playerButtons-open");
  buttons.textContent = "";
  for(let move of player.moves) {
    if(move.physical) continue;
    let Move = create("div");
    Move.id = move.id;
    Move.classList.add("item");
    let img = create("img");
    img.src = "images/" + move.id + ".png";
    Move.appendChild(img);
    addHoverBox(Move, move.name + " §FS0.4FS/$Y/Hold shift for details§", (move.name.length)/2, texts[move.id]);
    Move.addEventListener('click', ()=>Ability(move));
    buttons.appendChild(Move);
  }
  updateMagicalMoves();
}

function updateMagicalMoves() {
  for(let move of player.moves) {
    if(move.physical) continue;
    if(!$(move.id)) continue;
    if(move.onCooldown > 0) {
      if($(move.id).childNodes[1]) {
        $(move.id).childNodes[1].textContent = Math.ceil(move.onCooldown) + "s";
      }
      else {
        let cd = create("p");
        cd.textContent = Math.ceil(move.onCooldown) + "s";
        $(move.id).appendChild(cd);
      }
      $(move.id).childNodes[0].style.filter = "brightness(0.25)";
      $(move.id).childNodes[0].pointerEvents = "none";
    }
    else if(move.mp_cost > player.mp) {
      $(move.id).childNodes[0].style.filter = "brightness(0.25)";
      $(move.id).childNodes[0].pointerEvents = "none";
    }
    else {
      $(move.id).childNodes[0].style.filter = "brightness(1)";
      $(move.id).childNodes[0].pointerEvents = "all";
      if($(move.id).childNodes[1]) $(move.id).removeChild($(move.id).childNodes[1]);
    }
  }
}

function updateSkillMoves() {
  for(let move of player.moves) {
    if(!move.physical) continue;
    if(!$(move.id)) continue;
    if(move.onCooldown > 0) {
      if($(move.id).childNodes[1]) {
        $(move.id).childNodes[1].textContent = Math.ceil(move.onCooldown) + "s";
      }
      else {
        let cd = create("p");
        cd.textContent = Math.ceil(move.onCooldown) + "s";
        $(move.id).appendChild(cd);
      }
      $(move.id).childNodes[0].style.filter = "brightness(0.25)";
      $(move.id).childNodes[0].pointerEvents = "none";
    }
    else if(move.mp_cost > player.mp) {
      $(move.id).childNodes[0].style.filter = "brightness(0.25)";
      $(move.id).childNodes[0].pointerEvents = "none";
    } else {
      $(move.id).childNodes[0].style.filter = "brightness(1)";
      $(move.id).childNodes[0].pointerEvents = "all";
      if($(move.id).childNodes[1]) $(move.id).removeChild($(move.id).childNodes[1]);
    }
  }
}

function generateSkillMoves() {
  state.open = "skills"
  let buttons = $("playerButtons-open");
  buttons.textContent = "";
  for(let move of player.moves) {
    if(!move.physical || move.name == "Attack") continue;
    let Move = create("div");
    Move.id = move.id;
    Move.classList.add("item");
    let img = create("img");
    img.src = "images/" + move.id + ".png";
    addHoverBox(Move, move.name + " §FS0.55FS/$Y/Hold shift for details§", (move.name.length)/2, texts[move.id]);
    Move.addEventListener('click', ()=>Ability(move));
    Move.appendChild(img);
    buttons.appendChild(Move);
  }
  updateSkillMoves();
}

function UseItem(item) {
  if(state.action || state.turn != "player" || item.amount < 1) return;
  player.action_points = 0;
  state.action = true;
  if(item.recover) {
    item.amount--;
    player[item.recover] += item.value;
    if(player[item.recover] > player["max" + item.recover]) player[item.recover] = player["max" + item.recover];
    let particleColor = "green";
    if(item.recover == "mp") particleColor = B;
    createParticle(item.value, particleColor, $("playerSprite"));
    createEventlog(player.name, item.name);
    $("playerSprite").classList.add("heal");
    generateInventoryItems();
    setTimeout(reset, 1000);
  }
}

function textBoxSet(point, text, width, alt) {
  textBox.style.display = "block";
  textBox.textContent = "";
  if(point.shiftKey && alt) textBox.appendChild(textSyntax(alt));
  else textBox.appendChild(textSyntax(text));
  if(point.shiftKey && alt) textBox.style.width = width*1.5 + 'vw';
  else textBox.style.width = width + 'vw';
  textBox.style.left = point.clientX + 20 + 'px';
  textBox.style.top = point.clientY + 20 + 'px';
  if(textBox.offsetLeft + textBox.offsetWidth > clientWidth) {
    textBox.style.left = clientWidth - textBox.offsetWidth  + 'px';
  }
}

function textBoxMove(point) {
  if(point.shiftKey) {

  }
  textBox.style.left = point.clientX + 20 + 'px';
  textBox.style.top = point.clientY + 20 + 'px';
  if(textBox.offsetLeft + textBox.offsetWidth > clientWidth) {
    textBox.style.left = clientWidth - textBox.offsetWidth  + 'px';
  }
}

function textBoxRemove() {
  textBox.style.display = "none";
  textBox.textContent = "";
}

function addHoverBox (element, text, width, alt) {
  element.addEventListener('mouseover', (e)=> textBoxSet(e, text, width, alt));
  element.addEventListener('mousemove', (e) => textBoxMove(e))
  element.addEventListener('mouseout', (e) => textBoxRemove(e))
}

function textSyntax (txt) {
  let container = create("div")
  let text = txt.split("§");
  for(let row of text) {
    let currentText = row;
    let currentColor = "white";
    let size = null;
    if(currentText.startsWith("$")) currentText = eval(currentText.split("$")[1]);
    if(row.indexOf("FS") != -1) {
      size = row.split("FS")[1];
    }
    if(row.indexOf("/") != -1) {
      currentColor = row.split("/")[1];
      if(currentColor.startsWith("$")) currentColor = eval(currentColor.split("$")[1]);
      currentText = row.split("/")[2];
      if(currentText.startsWith("$")) currentText = eval(currentText.split("$")[1]);
    }
    if(currentText == ":br") container.innerHTML += "<br>";
    else if(size == null) container.innerHTML += `<span style="color: ${currentColor}">${currentText}</span>`;
    else container.innerHTML += `<span style="color: ${currentColor}; font-size: ${size}vw">${currentText}</span>`;
  }
  return container;
}

function EnemyNameColor() {
  let difference = enemy.level - player.level;
  for(let code of colorCodes) {
    if(code.max >= difference) {$("enemyName").style.color = code.color;
      $("enemyName").style.textShadow = `-0.1vw 0.1vw 0.3vw ${code.color}`;
      $("enemySprite").style.filter = `drop-shadow(0.125vw 0.12vw 0.4vw ${code.color})`;
      break;
    };
  }
}

function PlayerAttack() {
  if(state.action || state.turn != "player") return;
  player.action_points = 0;
  state.action = true;
  $("playerSpriteContainer").classList.add("player-attack");
  setTimeout(attackEnemy, 1050);
  setTimeout(reset, 2000);
}

function Ability(move) {
  if(state.action || state.turn != "player" || move.onCooldown > 0 || move.mp_cost > player.mp) return;
  player.action_points = 0;
  state.action = true;
  move.onCooldown = move.cooldown;
  smallUpdate();
  if(move.power <= 0) {
    $("playerSprite").classList.add("heal");
    player.statuses.push(copy(statuses[move.status]));
    createParticle(move.name, B, $("playerSprite"));
    createEventlog(player.name, move.name);
    setTimeout(reset, 1000);
  }
  else if(move.physical) {
    $("playerSpriteContainer").classList.add("player-attack");
    setTimeout(()=>hurtEnemy(move), 1050);
    setTimeout(reset, 2000);
  }
  else {
    $("playerSpriteContainer").classList.add("player-attack--magical");
    setTimeout(()=>createProjectile(move.id, $("playerSprite")), 400);
    setTimeout(()=>hurtEnemy(move), 1000);
    setTimeout(resetProjectile, 950);
    setTimeout(reset, 1400);
  }

}
 
function resetProjectile() {
  selectAll('.projectile').forEach(e => e.remove());
}

function attackEnemy() {
  if(enemy.dodge >= Math.random()) {
    createParticle("DODGE", Y, $("enemySprite"));
    createEventlog(player.name, "attack");
    return;
  }
  game.classList.add("shake1");
  $("enemySpriteContainer").classList.add("shake2");
  let damage = 0;
  damage = Math.floor((player.weapon.damage * (1 + player.stats.str/20)) * (1 + player.physical_multiplier)) * (1 - ((resistance_modifiers(enemy, "physical_resistance") + (enemy.physical_resistance)/100)));
  if(damage < 0) damage = 0;
  damage = Math.floor(damage);
  enemy.hp -= damage;
  createParticle(damage, "red", $("enemySprite"));
  createEventlog(player.name, "attack");
  if(enemy.hp < 0) enemy.hp = 0;
}


function enemyAttacks(attack) {
  if(player.dodge >= Math.random()) {
    createParticle("DODGE", Y, $("playerSprite"));
    createEventlog(enemy.name, attack.name);
    enemy.mp -= attack.mp_cost;
    return;
  }
  game.classList.add("shake1");
  $("playerSpriteContainer").classList.add("shake2");
  let damage = 0;
  if(attack.physical) {
    damage = Math.floor((enemy.weapon.damage * (1 + enemy.stats.str/20)) * attack.power) * (1 - (resistance_modifiers(player, "physical_resistance") + (player.physical_resistance)/100) * (1 - attack.penetration));
  }
  else {
    damage = Math.floor((enemy.weapon.damage * (1 + enemy.stats.int/20)) * attack.power) * (1 - (resistance_modifiers(player, "magical_resistance") + (player.magical_resistance)/100) * (1 - attack.penetration));
  }
  if(damage < 0) damage = 0;
  damage = Math.floor(damage);
  player.hp -= damage;
  enemy.mp -= attack.mp_cost;
  attack.onCooldown = attack.cooldown;
  createParticle(damage, "red", $("playerSprite"));
  createEventlog(enemy.name, attack.name);
  if(player.hp < 0) player.hp = 0;
}

function EnemyAttack() {
  enemy.action_points = 0;
  state.action = true;
  if(enemy.hp / enemy.maxhp <= 0.4) {
    if(enemyCanHeal()) {
      for(let item of enemy.items) {
        if(item.recover == "hp" && item.amount > 0) {
          $("enemySprite").classList.add("heal");
          item.amount--;
          enemy.hp += item.value;
          if(enemy.hp > enemy.maxhp) enemy.hp = enemy.maxhp;
          createParticle(item.value, "green", $("enemySprite"));
          createEventlog(enemy.name, item.name);
          break;
        }
      }
      setTimeout(reset, 1000);
      return;
    }
  }
  let attack = enemy.moves[Random(enemy.moves.length)];
  while(attack.onCooldown > 0 || attack.mp_cost > enemy.mp) {
    attack = enemy.moves[Random(enemy.moves.length)];
  }
  $("enemySpriteContainer").classList.add("enemy-attack");
  setTimeout(()=>enemyAttacks(attack), 1050);
  setTimeout(reset, 2000);
}

function createEventlog(name, object) {
  let log = create("p");
  let time = new Date();
  time = "[" + ("0" + time.getHours()).slice(-2) + "." + ("0" + time.getMinutes()).slice(-2) + "." + ("0" + time.getSeconds()).slice(-2) + "]";
  let text = create("span");
  let clock = create("span");
  clock.style.color = Y;
  clock.textContent = time;
  text.textContent = `‌‌ ${name} uses ${object}.`;
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
  particle.style.transition = "1.2s";
  particle.classList.add("particle");
  particle.style.left = (start.x + Random(200, 80)) + "px";
  particle.style.top = (start.y + Random(150, 30)) + "px";
  particle.style.fontSize = Random(6, 5) + "vw";
  setTimeout(flyRandomly, 25);
  function flyRandomly() {
    particle.style.left = Random(200, -200) + "px";
  }
  add(particle);
}

function createProjectile(id, start) {
  let projectile = create("img");
  //projectile.classList.add("shoot");
  projectile.classList.add("projectile");
  projectile.src = "images/" + id + ".png";
  projectile.style.left = (start.x + 50) + "px";
  projectile.style.top = (start.y + start.clientHeight/3.5) + "px";
  setTimeout(flyForwards, 25);
  function flyForwards() {
    projectile.style.left = "65vw";
  }
  add(projectile);
}

function hurtEnemy(move) {
  if(enemy.dodge >= Math.random()) {
    createParticle("DODGE", Y, $("enemySprite"));
    createEventlog(player.name, move.name);
    player.mp -= move.mp_cost;
    return;
  }
  game.classList.add("shake1");
  $("enemySpriteContainer").classList.add("shake2");
  let damage = 0;
  if(move.physical) {
    damage = Math.floor((((player.weapon.damage + move.base) * (1 + player.stats.str/20)) * (1 + player.physical_multiplier)) * move.power) * (1 - (resistance_modifiers(enemy, "physical_resistance") + (enemy.physical_resistance)/100) * (1 - move.penetration));
  } else {
    damage = Math.floor((((player.weapon.damage + move.base) * (1 + player.stats.int/20)) * (1 + player.magical_multiplier)) * move.power) * (1 - (resistance_modifiers(enemy, "magical_resistance") + (enemy.magical_resistance)/100) * (1 - move.penetration));
  }
  if(damage < 0) damage = 0;
  damage = Math.floor(damage);
  enemy.hp -= damage;
  createParticle(damage, "red", $("enemySprite"));
  createEventlog(player.name, move.name);
  if(move.status) {
    enemy.statuses.push(copy(statuses[move.status]));
    createStatuses();
  }
  player.mp -= move.mp_cost;
  if(enemy.hp < 0) enemy.hp = 0;
}

function createStatuses() {
  // Enemy statuses
  $("enemyStatusEffects").textContent = "";
  $("playerStatusEffects").textContent = "";
  for(let status of enemy.statuses) {
    let container = create("div");
    container.id = status.id;
    let img = create("img");
    img.src = "images/" + status.id + ".png";
    let last = create("p");
    last.textContent = Math.ceil(status.lasts) + "s";
    addHoverBox(container, texts[status.id], texts[status.id]/3);
    container.appendChild(img);
    container.appendChild(last);
    $("enemyStatusEffects").appendChild(container);
  }
  for(let status of player.statuses) {
    let container = create("div");
    container.id = status.id;
    let img = create("img");
    img.src = "images/" + status.id + ".png";
    let last = create("p");
    last.textContent = Math.ceil(status.lasts) + "s";
    addHoverBox(container, texts[status.id], texts[status.id]/3);
    container.appendChild(img);
    container.appendChild(last);
    $("playerStatusEffects").appendChild(container);
  }
}


function reset() {
    $("playerSpriteContainer").classList.remove("player-attack");
    $("playerSpriteContainer").classList.remove("player-attack--magical");
    $("enemySpriteContainer").classList.remove("enemy-attack");
    $("playerSpriteContainer").classList.remove("shake2");
    $("enemySpriteContainer").classList.remove("shake2");
    $("playerSprite").classList.remove("heal");
    $("enemySprite").classList.remove("heal");
    game.classList.remove("shake1");
    state.paused = false;
    state.action = false;
    state.turn = "none";
    selectAll('.particle').forEach(e => e.remove());
}

function enemyCanHeal() {
  for(let item of enemy.items) {
    if(item?.recover == "hp" && item.amount > 0) return true;
  }
  return false;
} 

function resistance_modifiers(char, res) {
  let modifier = 0;
  for(let resist of char.statuses) {
    if(resist.target == res) modifier += resist.power;
  }
  return modifier;
}

function battleEnd(condition) {
  if(condition == "victory") {
    gauntlet.splice(gauntlet[enemy], 1);
    let xp = 0;
    let gold = 0;
    xp = enemy.xp;
    xp = xp * (1 + player.stats.lck / 50);
    gold = Random(enemy.gold.max, enemy.gold.min);
    gold = gold * (1 + player.stats.lck / 10);
    gauntletLoot.xp += xp
    gauntletLoot.gold += gold
    state.end = true;
    $("battleEndScreen").style.transform = "translateX(-50%) translateY(-50%) scale(1)";
    $("conclusion").textContent = "VICTORY";
    $("battleEndText").textContent = `You have defeated the ${enemy.name}! It drops ${xp} XP and ${gold} Gold! `;
    if(gauntlet.length > 0) { 
      $("battleEndText").textContent += " However, more enemies still await you deeper in the dungeon. Brace yourself for battle!";
      $("battleEndButton").onclick = ()=>NextInGauntlet();
    } else {
      $("battleEndText").textContent += ` You have wiped out all enemies in the dungeon! This is a great victory! You gain ${gauntletLoot.xp} XP and ${gauntletLoot.gold} Gold!`;
      $("battleEndButton").onclick = ()=>EndGauntlet("Victory");
    }
  } else if(condition == "defeat") {
    state.end = true;
    player.hp = 1;
    $("battleEndScreen").style.transform = "translateX(-50%) translateY(-50%) scale(1)";
    $("conclusion").textContent = "DEFEAT";
    $("battleEndText").textContent = `You have been defeated by the ${enemy.name}, and thus gain no gold and lose all of your experience!`;
    $("battleEndButton").onclick = ()=>EndGauntlet("Defeat");
  }
}

function EndGauntlet(condition) {
  $("battleEndScreen").style.transform = "translate(-50%) translateY(-50%) scale(0)";
  if(condition == "Victory") {
    player.xp += gauntletLoot.xp;
    player.gold += gauntletLoot.gold;
    gauntletLoot.xp = 0;
    gauntletLoot.gold = 0;
    let curStage = state.stage.name.replace(/( )/g, '');
    curStage = curStage.toLowerCase();
    if(!player.stages_beaten[curStage]) player.stages_beaten[curStage] = true;
    let floorBeaten = true;
    for(let stage in dungeon["floor" + state.floor].stages) {
      if(stage == "stage0") continue;
      if(!player?.stages_beaten[stage]) floorBeaten = false;
    }
    if(floorBeaten) {
      player.floors_beaten["floor" + state.floor] = true;
    }
    $("combatScreen").style.display = "none";
    $("mainScreen").style.display = "block";
    updateLeftValues();
  } else if(condition == "Defeat") {
    gauntletLoot.xp = 0;
    gauntletLoot.gold = 0;
    player.xp = 0;
    $("combatScreen").style.display = "none";
    $("mainScreen").style.display = "block";
    updateLeftValues();
  }
}

function NextInGauntlet() {
  $("battleEndScreen").style.transform = "translateX(-50%) translateY(-50%) scale(0)";
  player.action_points = 0;
  enemy.action_points = 0;
  state.end = false;
  enemy = gauntlet[0];
  $("enemyName").textContent = "Lv" + enemy.level + " " + enemy.name;
  $("enemySprite").src = "images/" + enemy.name + ".png";
  EnemyNameColor();
  smallUpdate();
}