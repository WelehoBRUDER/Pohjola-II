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
    tier: "DEFAULT"
  },
  chant_only: {
    name: "Chant Only",
    magical_power: 0.5,
    type: "magical",
    speed_bonus: 0,
    item_type: "weapon",
    tier: "DEFAULT"
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
  poleaxe: {
    name: "Poleaxe",
    damage: 23,
    type: "physical",
    speed_bonus: -1,
    item_type: "weapon",
    tier: "E"
  },
  enchanted_blade: {
    name: "Enchanted Longsword",
    damage: 25,
    type: "physical",
    speed_bonus: 4,
    item_type: "weapon",
    tier: "D"
  },
  greatsword: {
    name: "Greatsword",
    damage: 31,
    type: "physical",
    speed_bonus: 1,
    item_type: "weapon",
    tier: "E"
  },
  executioner: {
    name: "Executioner",
    damage: 33,
    type: "physical",
    speed_bonus: -5,
    item_type: "weapon",
    tier: "E"
  },
  speed_dagger: {
    name: "Dagger of Speed",
    damage: 16,
    type: "physical",
    speed_bonus: 15,
    item_type: "weapon",
    tier: "D"
  },
  astral_spear: {
    name: "Astral Spear",
    damage: 70,
    type: "physical",
    speed_bonus: 5,
    item_type: "weapon",
    tier: "C"
  },
  smooth_mace: {
    name: "A Very Smooth Mace",
    damage: 50,
    type: "physical",
    speed_bonus: 0,
    item_type: "weapon",
    tier: "C"
  },
  greatsword_of_legend: {
    name: "Greatsword of Legend",
    damage: 65,
    type: "physical",
    speed_bonus: 5,
    item_type: "weapon",
    tier: "C"
  },
  lance_of_the_lord: {
    name: "Lance of the Lords",
    damage: 88,
    type: "physical",
    speed_bonus: 8,
    item_type: "weapon",
    effects: [
      {increase_stat: "str", by: 10},
      {increase: "maxhp", by: 100}
    ],  
    tier: "B"
  },
  club_of_the_giant_king: {
    name: "Club of the Giant King",
    damage: 119,
    type: "physical",
    speed_bonus: -10,
    item_type: "weapon",
    effects: [
      {increase_stat: "str", by: 15},
      {increase: "maxhp", by: 150},
      {increase_stat: "int", by: -10},
      {increase: "maxmp", by: -100}
    ],  
    tier: "B"
  },
  broomstick: {
    name: "Broom Stick",
    magical_power: 0.8,
    type: "magical",
    speed_bonus: 0,
    item_type: "weapon",
    tier: "G",
    mag_damage: 5
  },
  apprentice_staff: {
    name: "Apprentice's Staff",
    magical_power: 1,
    type: "magical",
    speed_bonus: 0,
    item_type: "weapon",
    tier: "F",
    mag_damage: 12
  },
  wizard_staff: {
    name: "Wizard's Staff",
    magical_power: 1.35,
    type: "magical",
    speed_bonus: 0,
    item_type: "weapon",
    tier: "E",
    mag_damage: 18
  },
  staff_of_glory: {
    name: "Staff of Glory",
    magical_power: 1.9,
    type: "magical",
    speed_bonus: 0,
    item_type: "weapon",
    tier: "D",
    mag_damage: 30
  },
  archmage_staff: {
    name: "Archmage's Stiff Rod",
    magical_power: 3.6,
    type: "magical",
    speed_bonus: 2,
    item_type: "weapon",
    tier: "B",
    mag_damage: 62,
    effects: [
      {increase: "maxmp", by: 50}
    ],
  },
}

const armors = {
  naked: {
    name: "Nothing",
    physical_resistance: 0,
    magical_resistance: 0,
    speed_bonus: 0,
    effects: [],
    item_type: "armor",
    tier: "DEFAULT"
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
      {increase: "maxhp", by: 25}
    ],
    item_type: "armor",
    tier: "E"
  },
  plate_armor: {
    name: "Plate Armor",
    physical_resistance: 18,
    magical_resistance: 6,
    speed_bonus: 0,
    item_type: "armor",
    tier: "D"
  },
  rogue_robes: {
    name: "Rogue's Robes",
    physical_resistance: 8,
    magical_resistance: 10,
    speed_bonus: 6,
    item_type: "armor",
    tier: "D"
  },
  heavy_plate_armor: {
    name: "Heavy Plate Armor",
    physical_resistance: 28,
    magical_resistance: 13,
    speed_bonus: -1,
    effects: [
      {increase: "physical_multiplier", by: 0.05}
    ],
    item_type: "armor",
    tier: "C"
  },
  legendary_leather_set: {
    name: "Legend's Leather Set",
    physical_resistance: 15,
    magical_resistance: 15,
    speed_bonus: 5,
    effects: [
      {increase_stat: "agi", by: 3},
      {increase: "dodge", by: 0.05},
      {increase: "maxmp", by: 50}
    ],
    item_type: "armor",
    tier: "C"
  },
  wizard_robes: {
    name: "Wizard's Robes",
    physical_resistance: 1,
    magical_resistance: 2,
    speed_bonus: 0,
    effects: [
      {increase: "maxmp", by: 25},
      {increase: "magical_multiplier", by: 0.05}
    ],
    item_type: "armor",
    tier: "E"
  },
  lich_robes: {
    name: "Robes of a Lich",
    physical_resistance: 3,
    magical_resistance: 5,
    speed_bonus: 1,
    effects: [
      {increase: "maxmp", by: 75},
      {increase: "magical_multiplier", by: 0.15},
      {increase_stat: "int", by: 5}
    ],
    item_type: "armor",
    tier: "C"
  },
  kings_armor: {
    name: "Armor of the Forlorn King",
    physical_resistance: 30,
    magical_resistance: 30,
    speed_bonus: 5,
    effects: [
      {increase: "maxhp", by: 250},
      {increase_stat: "str", by: 20},
      {increase_stat: "int", by: 20},
      {increase: "physical_multiplier", by: 0.25}
    ],
    item_type: "armor",
    tier: "B"
  },
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
  medium_healing_potion: {
    id: "healing_potion",
    name: "Medium Healing Potion",
    value: 250,
    recover: "hp",
    item_type: "consumable",
    tier: "D"
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
  mana_potion: {
    id: "mana_potion",
    name: "Mana Potion",
    value: 100,
    recover: "mp",
    item_type: "consumable",
    tier: "E"
  },
  medium_mana_potion: {
    id: "medium_mana_potion",
    name: "Medium Mana Potion",
    value: 200,
    recover: "mp",
    item_type: "consumable",
    tier: "D"
  },
}

const tiers = {
  DEFAULT: "#777B7E",
  G: "#292419",
  F: "#6e2004",
  E: "#c5cf7c",
  D: "#d9d9d9",
  C: "#96c76b",
  B: "#189e3c",
  A: "#2fded8",
  S: "#f7a500"
}