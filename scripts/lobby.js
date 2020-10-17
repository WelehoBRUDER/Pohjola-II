
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
    name: "Bank",
  },
  {
    name: "Floors & Stages",
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
  for(let button of topBarButtons) {
    let but = create("div");
    but.classList.add("mainWindowTopBar--button");
    if(button.selected) but.classList.add("mainWindowTopBar--button-selected");
    but.textContent = button.name;
    but.addEventListener('click', ()=>select(button.name));
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
  if(player.xp > player.xpCap) $("xpBarFill").style.width = "100%";
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
  for(let but of topBarButtons) {
    if(target == but.name) but.selected = true;
    else but.selected = false;
  }
  $("mainWindowContainer").textContent = "";
  if(target == "Character") createCharacterScreen();
  if(target == "Floors & Stages") createStageSelection();
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
  for(let child of $("characterStats").childNodes) {
    addHoverBox(child, texts[child.id], 12);
    child.addEventListener('click', (e)=>UpgradeStat(e, child.id));
  }
  $("levelUpButton").addEventListener('click', (e)=>levelUp(e));
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
    ${Math.floor(player.weapon.damage * (1 + player.stats.str/20))}
    </p>
    <p id="dodge">
    <img src="images/dodge_icon.png">
    ${player.dodge*100}%
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
  for(let child of combatStats.childNodes) {
    addHoverBox(child, texts[child.id + "_info"], 12);
  }
}

function UpgradeStat(act, stat) {
  if(player.skillpoints > 0 && !act.shiftKey) {
    player.skillpoints--;
    player.stats[stat]++;
    if(stat == "vit") player.maxhp += 10;
    else if(stat == "int") player.maxmp += 5;
  } else if(player.skillpoints >= 5 && act.shiftKey) {
    player.skillpoints -= 5;
    player.stats[stat] += 5;
    if(stat == "vit") player.maxhp += 50;
    else if(stat == "int") player.maxmp += 25;
  } else if(player.skillpoints < 5 && act.shiftKey) {
    player.stats[stat] += player.skillpoints;
    if(stat == "vit") player.maxhp += 10 * player.skillpoints;
    else if(stat == "int") player.maxmp += 5 * player.skillpoints;
    player.skillpoints = 0;
  }
  createCharacterScreen();
  updateLeftValues();
}

function levelUp(e) {
  if(player.xp >= player.xpCap && !e.shiftKey) {
    player.level++;
    player.skillpoints += 3,
    player.perkpoints += 1,
    player.xp -= player.xpCap;
    player.xpCap *= 1.21;
  } else if(player.xp >= player.xpCap && e.shiftKey) {
    while(player.xp >= player.xpCap) {
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
  for(let stage in floor.stages) {
    if(floor.stages[stage].name == "Stage 0") continue;
    let but = create("button");
    but.textContent = floor.stages[stage].name;
    but.addEventListener("click", ()=>startFight(floor.stages[stage]));
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
  EnemyNameColor();
  $("combatScreen").style.display = "block";
  $("mainScreen").style.display = "none";
}