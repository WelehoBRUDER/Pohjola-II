const codex = [
  {
    name: "Materials & Crafting",
    text: "This part touches upon all the materials and crafting recipes found in the smithy.",
    content: [
      {
        name: "Getting Started With Crafting",
        text: "So you want to start crafting items? Well that's excellent! Crafting is one of the most powerful systems in §/$Y/Pohjola II§, as it grants you access to far more powerful items than you could otherwise get. §:br§ §:br§ Let's get you situated with the layout. On the left, below materials, are all of the items that can be crafted. If they are highlighted, you can craft them immediately. Hovering over them will allow you to see what you need to craft them. Clicking will craft. §:br§ §:br§ On the right are all items that you can smelt for materials. Smelting an item will give you the materials you see when hovering over the item.",
        image: "smithy.png",
        imageSize: 24
      },
      {
        name: "Monster Core",
        text: "Monster cores are materials used in crafting that drop from powerful monsters, such as the §/$Y/Orc Berserker§",
        image: "monster_core.png",
        imageSize: 6
      },
      {
        name: "Iron Ingot",
        text: "Iron Ingots are one of the most basic crafting materials, gained from smelting most items.",
        image: "iron_ingot.png",
        imageSize: 6
      },
      {
        name: "Steel Ingot",
        text: "Steel Ingots are more advanced crafting material than iron ingots, but are still smelted from most items.",
        image: "steel_ingot.png",
        imageSize: 6
      },
      {
        name: "Leather",
        text: "Leather is a simple yet durable material used for crafting armors and some weapons. It is gained by smelting most armors.",
        image: "leather.png",
        imageSize: 6
      },
      {
        name: "Wooden Stick",
        text: "Sticks are crafting materials that are used in most items. Gained very easily from smelting most weapons and some armors.",
        image: "wood_stick.png",
        imageSize: 6
      },
      {
        name: "Enchanted Stone",
        text: "Enchanted stones are the most rare of resources, used in crafting the most exquisite items. They are gained from smelting equally valuable items.",
        image: "enchanted_stone.png",
        imageSize: 6
      },
      {
        name: "Dark Core",
        text: "An incredibly rare material gained from defeating powerful corrupted beings.",
        image: "dark_core.png",
        imageSize: 6
      }
    ]
  },
  {
    name: "Enemies",
    text: "You can view the statistics and trivia of all the enemies you have defeated here.",
    content: [
      {
        name: "Skeleton",
        desc: "Skeletons are reanimated corpses that are quite weak, but should never be underestimated by rookie adventurers."
      },
      {
        name: "Goblin",
        desc: "Goblins are simple tribal creatures that wield simple weapons and are fond of bashing human skulls. Don't underestimate them!"
      },
      {
        name: "Orc",
        desc: "This is a placeholder description. You should see less of these as development continues."
      },
      {
        name: "Skeleton Knight",
        desc: "This is a placeholder description. You should see less of these as development continues."
      },
      {
        name: "Orc Berserker",
        desc: "This is a placeholder description. You should see less of these as development continues."
      },
      {
        name: "Death Knight",
        desc: "This is a placeholder description. You should see less of these as development continues."
      },
      {
        name: "Ogre",
        desc: "This is a placeholder description. You should see less of these as development continues."
      },
      {
        name: "Minotaur",
        desc: "This is a placeholder description. You should see less of these as development continues."
      },
      {
        name: "Spectral Knight",
        desc: "This is a placeholder description. You should see less of these as development continues."
      },
      {
        name: "Gronk",
        desc: "GRONK IS GRONK. NO MORE THINK."
      },
      {
        name: "Grave floater",
        desc: "This is a placeholder description. You should see less of these as development continues."
      },
      {
        name: "Lich",
        desc: "This is a placeholder description. You should see less of these as development continues."
      },
      {
        name: "Wyvern",
        desc: "This is a placeholder description. You should see less of these as development continues."
      },
      {
        name: "Dwarf Warrior",
        desc: "This is a placeholder description. You should see less of these as development continues."
      },
      {
        name: "Dwarf Hero",
        desc: "This is a placeholder description. You should see less of these as development continues."
      },
      {
        name: "Wyvern Rider",
        desc: "This is a placeholder description. You should see less of these as development continues."
      },
      {
        name: "Elven Warrior",
        desc: "This is a placeholder description. You should see less of these as development continues."
      },
      {
        name: "Elven Archer",
        desc: "This is a placeholder description. You should see less of these as development continues."
      },
      {
        name: "Elven Hero",
        desc: "This is a placeholder description. You should see less of these as development continues."
      },
      {
        name: "Elven King",
        desc: "This is a placeholder description. You should see less of these as development continues."
      },
      {
        name: "Dark Elf Warrior",
        desc: "This is a placeholder description. You should see less of these as development continues."
      },
      {
        name: "Corrupted Elf",
        desc: "This is a placeholder description. You should see less of these as development continues."
      }
    ]
  }
]

function createCodex() {
  let codexText = create("div");
  let codexSelect = create("div");
  codexText.id = "codexText";
  codexSelect.id = "codexSelect";
  for (let title of codex) {
    let tit = create("p");
    tit.textContent = title.name;
    tit.id = title.name;
    tit.addEventListener("click", openContent);
    let content = create("div");
    for (let con of title.content) {
      let p = create("p");
      p.textContent = con.name;
      p.id = con.name;
      p.onclick = function (e) {
        e.stopPropagation();
        openCodex(e);
      }
      p.style.fontSize = "0.75vw";
      content.appendChild(p);
    }
    content.style.maxHeight = "0vw";
    content.id = title.name + "Content";
    tit.appendChild(content);
    codexSelect.appendChild(tit);
  }
  $("mainWindowContainer").appendChild(codexText);
  $("mainWindowContainer").appendChild(codexSelect);
}

function openContent(e) {
  if (e.target.id.indexOf("Content") != -1) return;
  if ($(e.target.id + "Content").style.maxHeight == "0vw") {
    $(e.target.id + "Content").style.maxHeight = "22vw";
  } else {
    $(e.target.id + "Content").style.maxHeight = "0vw";
  }
  for (let title of codex) {
    if (title.name == e.target.id) $("codexText").innerHTML = `<p>${title.text}</p>`;
  }
}

function openCodex(e) {
  if (e.target.id.indexOf("Content") != -1) return;
  $("codexText").textContent = "";
  for (let title of codex) {
    for (let con of title.content) {
      if (con.name == e.target.id) {
        if (con.image) {
          let img = create("img");
          img.src = "images/" + con.image;
          img.id = "codexImage";
          if(con.imageSize) img.style.width = con.imageSize + "vw";
          $("codexText").appendChild(img);
        }
        if (con.text) $("codexText").appendChild(textSyntax(con.text));
        if (con.desc) {
          let foe = enemies[con.name.replace(/\s/g, "_").toLowerCase()];
          let img = create("img");
          img.src = "images/" + foe.name + ".png";
          img.id = "codexImage";
          img.style.width = "16vw";
          if(con.imageSize) img.style.width = con.imageSize + "vw";
          $("codexText").appendChild(img);
          $("codexText").appendChild(textSyntax(con.desc));
          $("codexText").appendChild(textSyntax(GetEnemyInfo(foe)));
          $("codexText").appendChild(codexLoot(foe));
        }
      }
    }
  }
}

function GetEnemyInfo(enemy) {
  let text = "";
  text = `
  ${enemy.name}'s Stats:                               ${enemy.name}'s Loot: §:br§  
  §/$R/HP§: ${enemy.maxhp}                             
  §/$B/MP§: ${enemy.maxmp}
  §/$Y/Physical Resistance§: ${enemy.physical_resistance}%
  §/$B/Magical Resistance§: ${enemy.magical_resistance}%
  Weapon: §/$Y/${enemy.weapon.name}§
  Highest DMG: §/$R/${enemyHighestDamage(enemy)}§
  Average DMG: §/$R/${enemyAverageDamage(enemy)}§
  Lowest DMG: §/$R/${enemyLowestDamage(enemy)}§
  Dodge Chance: ${Math.floor(enemy.dodge * 100)}%
  Strength: ${enemy.stats.str}
  Vitality: ${enemy.stats.vit}
  Agility: ${enemy.stats.agi}
  Intelligence: ${enemy.stats.int}
  XP: ${enemy.xp}
  §/$Y/Gold§: ${enemy.gold.min}-${enemy.gold.max}
  `;
  return text;
}

function enemyAverageDamage(enemy) {
  let dmg = 0;
  for(let abi of enemy.moves) {
    dmg += calculateDmg(enemy, enemies.dummy, abi);
  }
  dmg = Math.floor(dmg / enemy.moves.length);
  return dmg;
}

function enemyLowestDamage(enemy) {
  let dmg = 99999999;
  for(let abi of enemy.moves) {
   if(calculateDmg(enemy, enemies.dummy, abi) < dmg) dmg = calculateDmg(enemy, enemies.dummy, abi);
  }
  return Math.floor(dmg);
}

function enemyHighestDamage(enemy) {
  let dmg = 0;
  for(let abi of enemy.moves) {
    if(calculateDmg(enemy, enemies.dummy, abi) > dmg) dmg = calculateDmg(enemy, enemies.dummy, abi);
   }
   return Math.floor(dmg);
}

function codexLoot(enemy) {
  let div = create("div");
  div.id = "codexLoot";
  for (let loot of enemy.drops) {
    let drop = "";
    let found = false;
    for (let itm of player.items) {
      console.log(loot.item);
      if (itm.name == loot.item.name) {
        drop = `| §/${loot.item?.tier ? tiers[loot.item.tier] : "white"}/${loot.item.name}§ | ${loot.max > loot.min ? loot.min + "-" + loot.max : loot.min} | Chance: ${Math.floor(loot.chance*100)}% |`;
        div.appendChild(textSyntax(drop));
        found = true;
      }
    }
    if (!found) {
      drop = "§/black/???§";
      div.appendChild(textSyntax(drop));
    }
  }
  return div;
}