const materials = {
  iron_ingot: {
    name: "Iron Ingot",
    id: "iron_ingot",
    img: "iron_ingot.png",
    value: 75,
    amount: 0
  },
  steel_ingot: {
    name: "Steel Ingot",
    id: "steel_ingot",
    img: "steel_ingot.png",
    value: 180,
    amount: 0
  },
  monster_core: {
    name: "Monster Core",
    id: "monster_core",
    img: "monster_core.png",
    value: 100,
    amount: 0
  },
}

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
    createPrompt("Are you sure you wish to craft " + craftable_items[item].name + "?", () => createItem(item));
  }
}

function createItem(item) {
  for (let need of craftable_items[item].to_craft) {
    if (need.material) {
      for (let mat of player.items) {
        if (mat.id == need.material) {
          mat.amount -= need.amount;
          if(mat.amount < 1) player.items.splice(player.items.indexOf(mat), 1);
        }
      }
    } else if (need.weapon) {
      for (let wep of player.items) {
        if (wep.name == need.weapon.name) wep.amount -= need.amount;
        if(wep.amount < 1) player.items.splice(player.items.indexOf(wep), 1);
      }
    } else if (need.armor) {
      for (let arm of player.items) {
        if (arm.name == need.armor.name) arm.amount -= need.amount;
        if(arm.amount < 1) player.items.splice(player.items.indexOf(arm), 1);
      }
    }
  }
  player.items.push({ ...craftable_items[item], amount: 1 });
  createSmithy();
}