const $ = (e) => {return document.getElementById(e);}
const game = $("gameWindow");
const create = (e) => {return document.createElement(e);}
const add = (e) => {return game.appendChild(e);}
const selectAll = (e) => {return document.querySelector(e);}

let combatTimer = setInterval(Update, 1000/60);
let textBox = $("gameInfoTextPopUp");

// $ marks variables. Example: §/red/$player.hp§

const texts = {
  atkbutton: "Attack your opponent with your weapon. Damage is based on your weapon, enemy resistances and your stats.",
  skibutton: "Open container for all of your skills.",
  magbutton: "Open container for all of your spells and other magical powers.",
  itmbutton: "Use an item from your inventory.",
  actionPoints: "Your §/yellow/action bar§. When it is filled, it is your turn to attack. §/yellow/Fillrate§ depends on modifiers, items and stats. Current §/yellow/fillrate§: §$playerActionrate§ per second.",
  healthPoints: "Your hit points. §/red/HP§ goes down when attacked. When §/red/HP§ reaches 0, you are §/yellow/defeated§.",
  manaPoints: "Your mana points. §/cyan/MP§ is used for certain §/yellow/skills§ and most §/yellow/spells§. §/cyan/MP§ can be recovered by drinking §/yellow/potions§."
}


let playerActionrate = "0%";

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

function Update() {
  // Execute all code under this line 60 times per second.
  player.speed = (player.weapon.speed_bonus / 100) + player.stats.agi / 100;
  player.action_points += 0.5 + player.speed;
  if(player.action_points >= 100) player.action_points = 0;
  // Action bar (player)
  $("playerActionbar-fill").style.width = player.action_points + '%';
  $("playerActionbar-percentage").textContent = Math.floor(player.action_points) + '%';
  // Health bar (player)
  $("playerHealthbar-number").textContent = player.hp + " / " + player.maxhp + " HP";
  $("playerHealthbar-fill").style.width = (player.hp / player.maxhp) * 100 + '%';
  // Mana bar (player)
  $("playerManabar-number").textContent = player.mp + " / " + player.maxmp + " MP";
  $("playerManabar-fill").style.width = (player.mp / player.maxmp) * 100 + '%';
  // Random 
  playerActionrate = ((0.5 + player.speed) * 60).toFixed(1) + '%';
}

function playerButtonsOpen(buttons) {
  let pbuttons = $("playerButtons-open");
  if(pbuttons.classList.contains("slider--closed")) {
    pbuttons.classList.remove("slider--closed");
    pbuttons.classList.add("slider--open");
  }
  else if(pbuttons.classList.contains("slider--open")) {
    pbuttons.classList.add("slider--closed");
    pbuttons.classList.remove("slider--open");
  }
}

function textBoxSet(point, text, width) {
  textBox.style.display = "block";
  textBox.appendChild(textSyntax(text));
  textBox.style.width = width + 'vw';
  textBox.style.left = point.clientX + 20 + 'px';
  textBox.style.top = point.clientY + 'px';
}

function textBoxMove(point) {
  textBox.style.left = point.clientX + 20 + 'px';
  textBox.style.top = point.clientY + 'px';
}

function textBoxRemove() {
  textBox.style.display = "none";
  textBox.textContent = "";
}

function addHoverBox (element, text, width) {
  element.addEventListener('mouseover', (e)=> textBoxSet(e, text, width));
  element.addEventListener('mousemove', (e) => textBoxMove(e))
  element.addEventListener('mouseout', (e) => textBoxRemove(e))
}

function textSyntax (txt) {
  let container = create("div")
  let text = txt.split("§");
  for(let row of text) {
    let currentText = row;
    let currentColor = "white";
    if(currentText.startsWith("$")) currentText = eval(currentText.split("$")[1]);
    if(row.indexOf("/") != -1) {
      currentColor = row.split("/")[1];
      if(currentColor.startsWith("$")) currentColor = eval(currentColor.split("$")[1]);
      currentText = row.split("/")[2];
      if(currentText.startsWith("$")) currentText = eval(currentText.split("$")[1]);
    }
    container.innerHTML += `<span style="color: ${currentColor}">${currentText}</span>`;
  }
  return container;
}
