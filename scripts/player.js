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
  weaponContainer.appendChild(
    textSyntax(
      "Equipped weapon: §/$tiers[player.weapon.tier]/$player.weapon.name§"
    )
  );
  armorContainer.appendChild(
    textSyntax(
      "Equipped armor: §/$tiers[player.armor.tier]/$player.armor.name§"
    )
  );
  wandContainer.appendChild(
    textSyntax("Equipped wand: §/$tiers[player.wand.tier]/$player.wand.name§")
  );
  let weaponHover = itemHoverText(player.weapon);
  let armorHover = itemHoverText(player.armor);
  let wandHover = itemHoverText(player.wand);
  addHoverBox(weaponContainer, weaponHover, 15);
  addHoverBox(armorContainer, armorHover, 15);
  addHoverBox(wandContainer, wandHover, 15);
  for (let wep of player.items) {
    if (
      wep.item_type === "weapon" &&
      wep.name !== "Fists" &&
      wep.name !== "Chant Only"
    ) {
      let id = wep.name;
      let weapon;
      if (wep.amount <= 1)
        weapon = textSyntax(`§/${tiers[wep.tier]}/${wep.name}§`);
      else
        weapon = textSyntax(`§/${tiers[wep.tier]}/${wep.name} ${wep.amount}x§`);
      weapon.id = id;
      weapon.addEventListener("click", equipWeapon);
      let hoverText = itemHoverText(wep);
      addHoverBox(weapon, hoverText, 15);
      weaponsContainer.appendChild(weapon);
    }
  }
  for (let arm of player.items) {
    if (arm.item_type == "armor" && arm.name != "Nothing") {
      let armor;
      if (arm.amount <= 1)
        armor = textSyntax(`§/${tiers[arm.tier]}/${arm.name}§`);
      else
        armor = textSyntax(`§/${tiers[arm.tier]}/${arm.name} ${arm.amount}x§`);
      let hoverText = itemHoverText(arm);
      addHoverBox(armor, hoverText, 15);
      armor.addEventListener("click", equipArmor);
      armor.id = arm.name;
      armorsContainer.appendChild(armor);
    }
  }
  for (let itm of player.items) {
    if (itm.item_type == "consumable") {
      let item;
      if (itm.amount <= 1)
        item = textSyntax(`§/${tiers[itm.tier]}/${itm.name}§`);
      else
        item = textSyntax(`§/${tiers[itm.tier]}/${itm.name} ${itm.amount}x§`);
      let hoverText = itemHoverText(itm);
      addHoverBox(item, hoverText, 12);
      item.addEventListener("click", useItemFromInv);
      item.id = itm.name;
      itemsContainer.appendChild(item);
    }
  }
  for (let mat in materials) {
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

function useThisItem(item) {
  playSound("click");
  if (item.amount <= 1)
    for (let i = 0; i < player.items.length; i++) {
      if (player.items[i].name == item.name) player.items.splice(i, 1);
      textBoxRemove();
    }
  else item.amount--;
  if (item.effects) {
    for (let effect of item.effects) {
      if (effect.timed) {
        if (player.temporary_effects.length === 0) {
          if (effect.increase) {
            player[effect.increase] += effect.by;
            player.temporary_effects.push({
              increase: effect.increase,
              by: effect.by,
              timed: effect.timed,
            });
          } else if (effect.increase_stat) {
            player.stats[effect.increase_stat] += effect.by;
            player.temporary_effects.push({
              increase_stat: effect.increase_stat,
              by: effect.by,
              timed: effect.timed,
            });
          }
        } else
          for (let ef of player.temporary_effects) {
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
              player.temporary_effects.push({
                increase: effect.increase,
                by: effect.by,
                timed: effect.timed,
              });
            } else if (ef.increase_stat != effect.increase_stat) {
              player.stats[effect.increase_stat] += effect.by;
              player.temporary_effects.push({
                increase_stat: effect.increase_stat,
                by: effect.by,
                timed: effect.timed,
              });
            }
          }
      } else {
        if (effect.increase_stat)
          player.stats[effect.increase_stat] += effect.by;
        else if (effect.increase)
          player[effect.increase] += effect.increase_stat;
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

function equipWeapon(e, item = null) {
  playSound("click");
  let weapon;
  if (item) weapon = { ...item };
  else {
    for (let wep of player.items) {
      if (wep.name == e.target.id) weapon = wep;
    }
  }
  if (weapon.amount <= 1) textBoxRemove();
  if (weapon.magical_power) {
    let foundWep = false;
    for (let wep of player.items) {
      if (wep.name == player.wand.name) {
        wep.amount++;
        foundWep = true;
      }
    }
    if (!foundWep) {
      player.items.push(player.wand);
    }
    if (player.wand?.effects) {
      for (let effect of player.wand?.effects) {
        if (effect.increase_stat)
          player.stats[effect.increase_stat] -= effect.by;
        else if (effect.increase) player[effect.increase] -= effect.by;
      }
    }
    player.wand = weapon;
  } else {
    let foundWep = false;
    for (let wep of player.items) {
      if (wep.name == player.weapon.name) {
        wep.amount++;
        foundWep = true;
      }
    }
    if (!foundWep) {
      player.items.push(player.weapon);
    }
    if (player.weapon?.effects) {
      for (let effect of player.weapon?.effects) {
        if (effect.increase_stat)
          player.stats[effect.increase_stat] -= effect.by;
        else if (effect.increase) player[effect.increase] -= effect.by;
      }
    }
    player.weapon = weapon;
  }
  if (weapon.amount > 1) {
    weapon.amount--;
  } else
    for (let i = 0; i < player.items.length; i++) {
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
  playSound("click");
  if (player.wand.name == "Chant Only") return;
  let foundWep = false;
  for (let wep of player.items) {
    if (wep.name == player.wand.name) {
      wep.amount++;
      foundWep = true;
    }
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

function equipArmor(e, item = null) {
  playSound("click");
  textBoxRemove();
  let armor;
  if (item) armor = { ...item };
  else {
    for (let arm of player.items) {
      if (arm.name == e.target.id) armor = arm;
    }
  }
  if (armor.amount <= 1) textBoxRemove();
  let foundArm = false;
  for (let arm of player.items) {
    if (arm.name == player.armor.name) {
      arm.amount++;
      foundArm = true;
    }
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
  } else
    for (let i = 0; i < player.items.length; i++) {
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
  playSound("click");
  if (player.weapon.name == "Fists") return;
  let foundWep = false;
  for (let wep of player.items) {
    if (wep.name == player.weapon.name) {
      wep.amount++;
      foundWep = true;
    }
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
  playSound("click");
  if (player.armor.name == "Nothing") return;
  let foundArm = false;
  for (let arm of player.items) {
    if (arm.name == player.armor.name) {
      arm.amount++;
      foundArm = true;
    }
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
