const copy = (e) => {return JSON.parse(JSON.stringify(e));}

function addItems(itm, amnt) {
  let item = copy(itm);
  item.amount = amnt;
  return item;
}

const weapons = {
  fists: {
    name: "Fists",
    damage: 4,
    type: "physical",
    speed_bonus: 5
  },
  broken_sword: {
    name: "Broken Sword",
    damage: 5,
    type: "physical",
    speed_bonus: 0
  },
  broken_mace: {
    name: "Broken Mace",
    damage: 6,
    type: "physical",
    speed_bonus: -10
  },
  long_sword: {
    name: "Long Sword",
    damage: 8,
    type: "physical",
    speed_bonus: 2
  },
  battle_axe: {
    name: "Battle Axe",
    damage: 15,
    type: "physical",
    speed_bonus: 0
  }
}

const consumables = {
  inferior_healing_potion: {
    id: "inferior_healing_potion",
    name: "Inferior Healing Potion",
    value: 10,
    recover: "hp"
  },
  lesser_healing_potion: {
    id: "lesser_healing_potion",
    name: "Lesser Healing Potion",
    value: 25,
    recover: "hp"
  },
  inferior_mana_potion: {
    id: "inferior_mana_potion",
    name: "Inferior Mana Potion",
    value: 5,
    recover: "mp"
  }
}