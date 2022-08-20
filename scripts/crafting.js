const materials = {
  wood_stick: {
    name: "Wooden Stick",
    id: "wood_stick",
    img: "wood_stick.png",
    value: 30,
    amount: 0,
  },
  leather: {
    name: "Leather",
    id: "leather",
    img: "leather.png",
    value: 35,
    amount: 0,
  },
  iron_ingot: {
    name: "Iron Ingot",
    id: "iron_ingot",
    img: "iron_ingot.png",
    value: 75,
    amount: 0,
  },
  steel_ingot: {
    name: "Steel Ingot",
    id: "steel_ingot",
    img: "steel_ingot.png",
    value: 180,
    amount: 0,
  },
  enchanted_stone: {
    name: "Enchanted Stone",
    id: "enchanted_stone",
    img: "enchanted_stone.png",
    value: 750,
    amount: 0,
  },
  dark_core: {
    name: "Dark Core",
    id: "dark_core",
    img: "dark_core.png",
    value: 1500,
    amount: 0,
  },
  monster_core: {
    name: "Monster Core",
    id: "monster_core",
    img: "monster_core.png",
    value: 100,
    amount: 0,
  },
};

function CraftItem(item) {
  let canCraft = true;
  for (let need of craftable_items[item].to_craft) {
    if (need.material) {
      if (getMatNum(need.material) < need.amount) canCraft = false;
    } else if (need.weapon) {
      if (getPlayerItemAmount(need.weapon.name) < need.amount) canCraft = false;
    } else if (need.armor) {
      if (getPlayerItemAmount(need.armor.name) < need.amount) canCraft = false;
    }
  }
  if (canCraft) {
    createPrompt(
      "Are you sure you wish to craft " + craftable_items[item].name + "?",
      () => createItem(item)
    );
  }
}

function createItem(item) {
  playSound("click");
  for (let need of craftable_items[item].to_craft) {
    if (need.material) {
      for (let mat of player.items) {
        if (mat.id == need.material) {
          mat.amount -= need.amount;
          if (mat.amount < 1) player.items.splice(player.items.indexOf(mat), 1);
        }
      }
    } else if (need.weapon) {
      for (let wep of player.items) {
        if (wep.name == need.weapon.name) wep.amount -= need.amount;
        if (wep.amount < 1) player.items.splice(player.items.indexOf(wep), 1);
      }
    } else if (need.armor) {
      for (let arm of player.items) {
        if (arm.name == need.armor.name) arm.amount -= need.amount;
        if (arm.amount < 1) player.items.splice(player.items.indexOf(arm), 1);
      }
    }
  }
  player.items.push({ ...craftable_items[item], amount: 1 });
  createSmithy();
}

function SmeltItem(item) {
  createPrompt("Are you sure you wish to smelt " + item.name + "?", () =>
    smeltItem(item)
  );
}

function smeltItem(item) {
  playSound("click");
  for (let mat of item.smelt) {
    let exists = false;
    for (let itm of player.items) {
      if (itm.name == mat.item.name) {
        itm.amount += mat.amount;
        exists = true;
      }
    }
    if (!exists) player.items.push({ ...mat.item, amount: mat.amount });
  }
  for (let i = 0; i < player.items.length; i++) {
    if (player.items[i].name == item.name)
      player.items[i].amount <= 1
        ? player.items.splice(i, 1)
        : player.items[i].amount--;
  }
  createSmithy();
}

function createSmithy() {
  $("mainWindowContainer").textContent = "";
  let matContainer = create("div");
  matContainer.id = "matContainer";
  matContainer.style.top = "0.5vw";
  let smithableContainer = create("div");
  let smeltContainer = create("div");
  smithableContainer.id = "smithableContainer";
  smeltContainer.id = "smeltContainer";
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
  for (let smith in craftable_items) {
    if (!craftable_items[smith].to_craft) continue;
    let wep = create("p");
    wep.style.color = tiers[craftable_items[smith].tier];
    wep.textContent = craftable_items[smith].name;
    let mainText = "";
    let canCraft = true;
    for (let need of craftable_items[smith].to_craft) {
      if (need.material) {
        if (getMatNum(need.material) < need.amount) canCraft = false;
      } else if (need.weapon) {
        if (getPlayerItemAmount(need.weapon.name) < need.amount)
          canCraft = false;
      } else if (need.armor) {
        if (getPlayerItemAmount(need.armor.name) < need.amount)
          canCraft = false;
      }
    }
    if (!canCraft) wep.classList.add("unavailableCraft");
    for (let mat of craftable_items[smith].to_craft) {
      if (mat.material) {
        mainText += `${materials[mat.material].name} §/${
          getMatNum(mat.material) < mat.amount ? "$R" : "white"
        }/${mat.amount > 1 ? "x" + mat.amount : "1"}§ §:br§`;
      } else if (mat.weapon) {
        mainText += `§/${tiers[mat.weapon.tier]}/${mat.weapon.name}§ §/${
          getPlayerItemAmount(mat.weapon.name) < mat.amount ? "$R" : "white"
        }/${mat.amount > 1 ? "x" + mat.amount : "1"}§ §:br§`;
      } else if (mat.armor) {
        mainText += `§/${tiers[mat.armor.tier]}/${mat.armor.name}§ §/${
          getPlayerItemAmount(mat.armor.name) < mat.amount ? "$R" : "white"
        }/${mat.amount > 1 ? "x" + mat.amount : "1"}§ §:br§`;
      }
    }
    let alt;
    if (craftable_items[smith].damage || craftable_items[smith].mag_damage)
      alt = `${
        craftable_items[smith].magical_power
          ? "MagPower: " +
            "§/$Y/" +
            craftable_items[smith].magical_power * 100 +
            "%§"
          : "Damage: " + "§/$Y/" + craftable_items[smith].damage + "§"
      } §:br§ Speed: §/$B/${
        craftable_items[smith].speed_bonus
      }§ §:br§ Tier: §/${tiers[craftable_items[smith].tier]}/${
        craftable_items[smith].tier
      }§ §:br§ ${
        craftable_items[smith].mag_damage
          ? "MagDamage: " + craftable_items[smith].mag_damage
          : ""
      }`;
    else
      alt = `Physical Resistance: §/$Y/${
        craftable_items[smith].physical_resistance
      }§ §:br§ Magical Resistance: §/$B/${
        craftable_items[smith].magical_resistance
      }§ §:br§ Speed: ${craftable_items[smith].speed_bonus}§:br§ Tier: §/${
        tiers[craftable_items[smith].tier]
      }/${craftable_items[smith].tier}§ §:br§`;
    if (craftable_items[smith]?.effects) {
      for (let effect of craftable_items[smith]?.effects) {
        if (effect.increase || effect.increase_stat) {
          alt += `§:br§ Increases ${effectSyntax(
            effect,
            "stat"
          )} by ${effectSyntax(effect, "value")}`;
        }
      }
    }
    addHoverBox(
      wep,
      mainText + "§FS0.75FS/$Y/Hold shift for details§",
      12,
      alt
    );
    wep.addEventListener("click", () => CraftItem(smith));
    smithableContainer.appendChild(wep);
  }
  for (let smith of player.items) {
    if (!smith.smelt) continue;
    let wep = create("p");
    wep.style.color = tiers[smith.tier];
    wep.textContent = smith.name + " " + smith.amount + "x";
    let mainText = "";
    for (let mat of smith.smelt) {
      mainText += `${materials[mat.item.id].name} §${
        mat.amount > 1 ? "x" + mat.amount : "1"
      }§ §:br§`;
    }
    let alt;
    if (smith.mag_damage || smith.damage)
      alt = `${
        smith.magical_power
          ? "MagPower: " + "§/$Y/" + smith.magical_power * 100 + "%§"
          : "Damage: " + "§/$Y/" + smith.damage + "§"
      } §:br§ Speed: §/$B/${smith.speed_bonus}§ §:br§ Tier: §/${
        tiers[smith.tier]
      }/${smith.tier}§ §:br§ ${
        smith.mag_damage ? "MagDamage: " + smith.mag_damage : ""
      }`;
    else
      `Physical Resistance: §/$Y/${
        smith.physical_resistance
      }§ §:br§ Magical Resistance: §/$B/${
        smith.magical_resistance
      }§ §:br§ Speed: ${smith.speed_bonus}§:br§ Tier: §/${tiers[smith.tier]}/${
        smith.tier
      }§ §:br§`;
    if (smith?.effects) {
      for (let effect of smith?.effects) {
        if (effect.increase || effect.increase_stat) {
          alt += `§:br§ Increases ${effectSyntax(
            effect,
            "stat"
          )} by ${effectSyntax(effect, "value")}`;
        }
      }
    }
    addHoverBox(
      wep,
      mainText + "§FS0.75FS/$Y/Hold shift for details§",
      12,
      alt
    );
    wep.addEventListener("click", () => SmeltItem(smith));
    smeltContainer.appendChild(wep);
  }
  $("mainWindowContainer").appendChild(smithableContainer);
  $("mainWindowContainer").appendChild(smeltContainer);
  $("mainWindowContainer").appendChild(matContainer);
}
