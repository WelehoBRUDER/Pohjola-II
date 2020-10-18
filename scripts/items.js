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
    speed_bonus: 1,
    item_type: "weapon",
    tier: "G"
  },
  broken_sword: {
    name: "Broken Sword",
    damage: 5,
    type: "physical",
    speed_bonus: 0,
    item_type: "weapon",
    tier: "G"
  },
  broken_mace: {
    name: "Broken Mace",
    damage: 6,
    type: "physical",
    speed_bonus: -10,
    item_type: "weapon",
    tier: "G"
  },
  long_sword: {
    name: "Long Sword",
    damage: 8,
    type: "physical",
    speed_bonus: 2,
    item_type: "weapon",
    tier: "F"
  },
  battle_axe: {
    name: "Battle Axe",
    damage: 15,
    type: "physical",
    speed_bonus: 0,
    item_type: "weapon",
    tier: "E"
  },
  dual_daggers: {
    name: "Twin Daggers",
    damage: 10,
    type: "physical",
    speed_bonus: 5,
    item_type: "weapon",
    tier: "E"
  },
  greatsword: {
    name: "Greatsword",
    damage: 31,
    type: "physical",
    speed_bonus: 1,
    item_type: "weapon",
    tier: "E"
  }
}

const armors = {
  naked: {
    name: "Nothing",
    physical_resistance: 0,
    magical_resistance: 0,
    speed_bonus: 0,
    effects: [],
    item_type: "armor",
    tier: "G"
  },
  rags: {
    name: "Rags",
    physical_resistance: 2,
    magical_resistance: 1,
    speed_bonus: 0,
    effects: [],
    item_type: "armor",
    tier: "G"
  },
  leather_armor: {
    name: "Leather Armor",
    physical_resistance: 5,
    magical_resistance: 3,
    speed_bonus: 1,
    effects: [],
    item_type: "armor",
    tier: "F"
  },
  chainmail: {
    name: "Chainmail",
    physical_resistance: 10,
    magical_resistance: 2,
    speed_bonus: -4,
    effects: [],
    item_type: "armor",
    tier: "F"
  },
  enchanted_robes: {
    name: "Enchanted Robes",
    physical_resistance: 2,
    magical_resistance: 7,
    speed_bonus: 2,
    effects: [
      {increase_stat: "maxhp", by: 10}
    ],
    item_type: "armor",
    tier: "E"
  }
}

const consumables = {
  inferior_healing_potion: {
    id: "inferior_healing_potion",
    name: "Inferior Healing Potion",
    value: 10,
    recover: "hp",
    item_type: "consumable",
    tier: "G"
  },
  lesser_healing_potion: {
    id: "lesser_healing_potion",
    name: "Lesser Healing Potion",
    value: 25,
    recover: "hp",
    item_type: "consumable",
    tier: "F"
  },
  healing_potion: {
    id: "healing_potion",
    name: "Healing Potion",
    value: 100,
    recover: "hp",
    item_type: "consumable",
    tier: "E"
  },
  inferior_mana_potion: {
    id: "inferior_mana_potion",
    name: "Inferior Mana Potion",
    value: 5,
    recover: "mp",
    item_type: "consumable",
    tier: "G"
  },
  lesser_mana_potion: {
    id: "lesser_mana_potion",
    name: "Lesser Mana Potion",
    value: 25,
    recover: "mp",
    item_type: "consumable",
    tier: "F"
  },
}

const tiers = {
  G: "#292419",
  F: "#6e2004",
  E: "#c5cf7c",
  D: "#d9d9d9",
  C: "#96c76b",
  B: "#189e3c",
  A: "#2fded8",
  S: "#f7a500"
}