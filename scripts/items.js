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
    tier: "G",
    smelt: [
      {item: materials.wood_stick, amount: 1},
      {item: materials.iron_ingot, amount: 1}
    ]
  },
  broken_mace: {
    name: "Broken Mace",
    damage: 6,
    type: "physical",
    speed_bonus: -10,
    item_type: "weapon",
    tier: "G",
    smelt: [
      {item: materials.wood_stick, amount: 1},
      {item: materials.iron_ingot, amount: 1}
    ]
  },
  long_sword: {
    name: "Long Sword",
    damage: 8,
    type: "physical",
    speed_bonus: 2,
    item_type: "weapon",
    tier: "F",
    smelt: [
      {item: materials.wood_stick, amount: 2},
      {item: materials.iron_ingot, amount: 2},
      {item: materials.steel_ingot, amount: 1}
    ]
  },
  battle_axe: {
    name: "Battle Axe",
    damage: 15,
    type: "physical",
    speed_bonus: 0,
    item_type: "weapon",
    tier: "E",
    smelt: [
      {item: materials.wood_stick, amount: 3},
      {item: materials.iron_ingot, amount: 5},
      {item: materials.steel_ingot, amount: 2}
    ]
  },
  dual_daggers: {
    name: "Twin Daggers",
    damage: 10,
    type: "physical",
    speed_bonus: 5,
    item_type: "weapon",
    tier: "E",
    smelt: [
      {item: materials.wood_stick, amount: 2},
      {item: materials.iron_ingot, amount: 2},
      {item: materials.steel_ingot, amount: 1}
    ]
  },
  poleaxe: {
    name: "Poleaxe",
    damage: 23,
    type: "physical",
    speed_bonus: -1,
    item_type: "weapon",
    tier: "E",
    smelt: [
      {item: materials.wood_stick, amount: 3},
      {item: materials.iron_ingot, amount: 3},
      {item: materials.steel_ingot, amount: 2}
    ]
  },
  enchanted_blade: {
    name: "Enchanted Longsword",
    damage: 25,
    type: "physical",
    speed_bonus: 4,
    item_type: "weapon",
    tier: "D",
    smelt: [
      {item: materials.wood_stick, amount: 2},
      {item: materials.iron_ingot, amount: 3},
      {item: materials.steel_ingot, amount: 1},
      {item: materials.enchanted_stone, amount: 1}
    ]
  },
  greatsword: {
    name: "Greatsword",
    damage: 31,
    type: "physical",
    speed_bonus: 1,
    item_type: "weapon",
    tier: "E",
    smelt: [
      {item: materials.wood_stick, amount: 3},
      {item: materials.iron_ingot, amount: 1},
      {item: materials.steel_ingot, amount: 4}
    ]
  },
  executioner: {
    name: "Executioner",
    damage: 33,
    type: "physical",
    speed_bonus: -5,
    item_type: "weapon",
    tier: "E",
    smelt: [
      {item: materials.wood_stick, amount: 3},
      {item: materials.iron_ingot, amount: 1},
      {item: materials.steel_ingot, amount: 4}
    ]
  },
  speed_dagger: {
    name: "Dagger of Speed",
    damage: 16,
    type: "physical",
    speed_bonus: 15,
    item_type: "weapon",
    tier: "D",
    smelt: [
      {item: materials.wood_stick, amount: 1},
      {item: materials.iron_ingot, amount: 1},
      {item: materials.steel_ingot, amount: 3}
    ]
  },
  astral_spear: {
    name: "Astral Spear",
    damage: 70,
    type: "physical",
    speed_bonus: 5,
    item_type: "weapon",
    tier: "C",
    smelt: [
      {item: materials.wood_stick, amount: 3},
      {item: materials.iron_ingot, amount: 2},
      {item: materials.steel_ingot, amount: 5},
      {item: materials.enchanted_stone, amount: 2}
    ]
  },
  smooth_mace: {
    name: "A Very Smooth Mace",
    damage: 50,
    type: "physical",
    speed_bonus: 0,
    item_type: "weapon",
    tier: "C",
    smelt: [
      {item: materials.wood_stick, amount: 2},
      {item: materials.iron_ingot, amount: 1},
      {item: materials.steel_ingot, amount: 2}
    ]
  },
  greatsword_of_legend: {
    name: "Greatsword of Legend",
    damage: 65,
    type: "physical",
    speed_bonus: 5,
    item_type: "weapon",
    tier: "C",
    smelt: [
      {item: materials.wood_stick, amount: 2},
      {item: materials.iron_ingot, amount: 2},
      {item: materials.steel_ingot, amount: 3}
    ]
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
    tier: "B",
    smelt: [
      {item: materials.wood_stick, amount: 5},
      {item: materials.iron_ingot, amount: 8},
      {item: materials.steel_ingot, amount: 10},
      {item: materials.enchanted_stone, amount: 3}
    ]
  },
  elven_greatsword: {
    name: "Elven Greatsword",
    damage: 166,
    type: "physical",
    speed_bonus: 25,
    item_type: "weapon",
    effects: [
      {increase_stat: "agi", by: 20},
      {increase: "physical_multiplier", by: 0.25},
      {increase_stat: "str", by: 10}
    ],  
    tier: "A",
    smelt: [
      {item: materials.wood_stick, amount: 5},
      {item: materials.iron_ingot, amount: 14},
      {item: materials.steel_ingot, amount: 25},
      {item: materials.enchanted_stone, amount: 10}
    ]
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
    tier: "B",
    smelt: [
      {item: materials.wood_stick, amount: 2},
      {item: materials.iron_ingot, amount: 4},
      {item: materials.steel_ingot, amount: 15},
      {item: materials.enchanted_stone, amount: 1}
    ]
  },
  broomstick: {
    name: "Broom Stick",
    magical_power: 0.8,
    type: "magical",
    speed_bonus: 0,
    item_type: "weapon",
    tier: "G",
    mag_damage: 5,
    smelt: [
      {item: materials.wood_stick, amount: 4},
    ]
  },
  apprentice_staff: {
    name: "Apprentice's Staff",
    magical_power: 1,
    type: "magical",
    speed_bonus: 0,
    item_type: "weapon",
    tier: "F",
    mag_damage: 12,
    smelt: [
      {item: materials.wood_stick, amount: 4},
      {item: materials.iron_ingot, amount: 1}
    ]
  },
  wizard_staff: {
    name: "Wizard's Staff",
    magical_power: 1.35,
    type: "magical",
    speed_bonus: 0,
    item_type: "weapon",
    tier: "E",
    mag_damage: 18,
    smelt: [
      {item: materials.wood_stick, amount: 4},
      {item: materials.iron_ingot, amount: 4}
    ]
  },
  staff_of_glory: {
    name: "Staff of Glory",
    magical_power: 1.9,
    type: "magical",
    speed_bonus: 0,
    item_type: "weapon",
    tier: "D",
    mag_damage: 30,
    smelt: [
      {item: materials.wood_stick, amount: 4},
      {item: materials.steel_ingot, amount: 4},
      {item: materials.enchanted_stone, amount: 1}
    ]
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
    smelt: [
      {item: materials.wood_stick, amount: 4},
      {item: materials.steel_ingot, amount: 4},
      {item: materials.enchanted_stone, amount: 1}
    ]
  },
  staff_of_legend: {
    name: "Staff of the Legends",
    magical_power: 5.75,
    type: "magical",
    speed_bonus: 8,
    item_type: "weapon",
    tier: "A",
    mag_damage: 95,
    effects: [
      {increase: "maxmp", by: 200},
      {increase_stat: "int", by: 20}
    ],
    smelt: [
      {item: materials.wood_stick, amount: 4},
      {item: materials.steel_ingot, amount: 8},
      {item: materials.enchanted_stone, amount: 3}
    ]
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
    tier: "G",
    smelt: [
      {item: materials.leather, amount: 1}
    ]
  },
  leather_armor: {
    name: "Leather Armor",
    physical_resistance: 5,
    magical_resistance: 3,
    speed_bonus: 1,
    effects: [],
    item_type: "armor",
    tier: "F",
    smelt: [
      {item: materials.leather, amount: 5}
    ]
  },
  chainmail: {
    name: "Chainmail",
    physical_resistance: 10,
    magical_resistance: 2,
    speed_bonus: -4,
    effects: [],
    item_type: "armor",
    tier: "F",
    smelt: [
      {item: materials.iron_ingot, amount: 3}
    ]
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
    tier: "E",
    smelt: [
      {item: materials.leather, amount: 8}
    ]
  },
  plate_armor: {
    name: "Plate Armor",
    physical_resistance: 18,
    magical_resistance: 6,
    speed_bonus: 0,
    item_type: "armor",
    tier: "D",
    smelt: [
      {item: materials.leather, amount: 2},
      {item: materials.steel_ingot, amount: 3}
    ]
  },
  rogue_robes: {
    name: "Rogue's Robes",
    physical_resistance: 8,
    magical_resistance: 10,
    speed_bonus: 6,
    item_type: "armor",
    tier: "D",
    smelt: [
      {item: materials.leather, amount: 8},
      {item: materials.iron_ingot, amount: 1}
    ]
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
    tier: "C",
    smelt: [
      {item: materials.leather, amount: 1},
      {item: materials.iron_ingot, amount: 2},
      {item: materials.steel_ingot, amount: 5}
    ]
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
    tier: "C",
    smelt: [
      {item: materials.leather, amount: 5},
      {item: materials.enchanted_stone, amount: 1}
    ]
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
    tier: "E",
    smelt: [
      {item: materials.leather, amount: 4}
    ]
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
    tier: "C",
    smelt: [
      {item: materials.leather, amount: 5},
      {item: materials.enchanted_stone, amount: 1}
    ]
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
    tier: "B",
    smelt: [
      {item: materials.leather, amount: 10},
      {item: materials.iron_ingot, amount: 5},
      {item: materials.steel_ingot, amount: 10},
      {item: materials.enchanted_stone, amount: 3}
    ]
  },
}

const consumables = {
  inferior_healing_potion: {
    id: "inferior_healing_potion",
    name: "Inferior Healing Potion",
    value: 10,
    recover: "hp",
    item_type: "consumable",
    tier: "G",
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
    id: "medium_healing_potion",
    name: "Medium Healing Potion",
    value: 250,
    recover: "hp",
    item_type: "consumable",
    tier: "D"
  },
  greater_healing_potion: {
    id: "greater_healing_potion",
    name: "Greater Healing Potion",
    value: 700,
    recover: "hp",
    item_type: "consumable",
    tier: "C"
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
  agility_potion: {
    id: "agility_potion",
    name: "Agility Potion",
    value: 1,
    recover: "hp",
    item_type: "consumable",
    tier: "G",
    effects: [
      {increase_stat: "agi", by: 10, timed: 15}
    ]
  },
  strength_potion: {
    id: "strength_potion",
    name: "Strength Potion",
    value: 1,
    recover: "hp",
    item_type: "consumable",
    tier: "G",
    effects: [
      {increase_stat: "str", by: 10, timed: 15}
    ]
  },
}

const craftable_items = {
  
  // CRAFTABLE WEAPONS //

  straight_sword: {
    to_craft: [
      {material: "iron_ingot", amount: 1},
      {weapon: copy(weapons.broken_sword), amount: 1}
    ],
    name: "Straight Sword",
    type: "physical",
    damage: 7,
    speed_bonus: 0,
    item_type: "weapon",
    tier: "G"
  },
  arming_sword: {
    to_craft: [
      {material: "iron_ingot", amount: 2},
      {material: "wood_stick", amount: 1}
    ],
    name: "Arming Sword",
    type: "physical",
    damage: 6,
    speed_bonus: 1,
    item_type: "weapon",
    tier: "G"
  },
  steel_blade: {
    to_craft: [
      {material: "steel_ingot", amount: 2},
      {material: "iron_ingot", amount: 1},
      {weapon: copy(weapons.long_sword), amount: 1}
    ],
    name: "Steel Blade",
    type: "physical",
    damage: 18,
    speed_bonus: 1,
    item_type: "weapon",
    tier: "E"
  },
  doombringer_axe: {
    to_craft: [
      {material: "steel_ingot", amount: 5},
      {material: "iron_ingot", amount: 10},
      {weapon: copy(weapons.battle_axe), amount: 2},
      {material: "monster_core", amount: 3}
    ],
    name: "Doombringer Axe",
    type: "physical",
    damage: 49,
    speed_bonus: 5,
    item_type: "weapon",
    effects: [
      {increase: "physical_multiplier", by: 0.08}
    ],
    tier: "D"
  },
  zweihander: {
    to_craft: [
      {material: "wood_stick", amount: 2},
      {material: "steel_ingot", amount: 3},
      {material: "iron_ingot", amount: 5},
      {weapon: copy(weapons.enchanted_blade), amount: 1},
      {material: "monster_core", amount: 3}
    ],
    name: "Zweihänder",
    type: "physical",
    damage: 75,
    speed_bonus: 2,
    item_type: "weapon",
    effects: [
      {increase: "physical_multiplier", by: 0.12},
      {increase: "maxhp", by: 25}
    ],
    tier: "C"
  },
  enchanted_greatsword: {
    to_craft: [
      {material: "wood_stick", amount: 3},
      {material: "steel_ingot", amount: 8},
      {material: "iron_ingot", amount: 7},
      {weapon: copy(weapons.greatsword_of_legend), amount: 1},
      {material: "enchanted_stone", amount: 1},
      {material: "monster_core", amount: 5}
    ],
    name: "Enchanted Greatsword",
    type: "physical",
    damage: 84,
    speed_bonus: 4,
    item_type: "weapon",
    effects: [
      {increase: "physical_multiplier", by: 0.1},
      {increase: "maxhp", by: 75},
      {increase: "str", by: 3}
    ],
    tier: "C"
  },
  legendary_swordspear: {
    to_craft: [
      {material: "wood_stick", amount: 10},
      {material: "steel_ingot", amount: 15},
      {material: "iron_ingot", amount: 25},
      {weapon: copy(weapons.greatsword_of_legend), amount: 2},
      {weapon: copy(weapons.lance_of_the_lord), amount: 1},
      {material: "enchanted_stone", amount: 5},
      {material: "monster_core", amount: 60}
    ],
    name: "Legendary Swordspear",
    type: "physical",
    damage: 141,
    speed_bonus: 7,
    item_type: "weapon",
    effects: [
      {increase: "physical_multiplier", by: 0.1},
      {increase: "maxhp", by: 100},
      {increase_stat: "str", by: 25},
      {increase_stat: "int", by: 20},
      {increase: "maxmp", by: 50}
    ],
    tier: "A"
  },
  enchanted_stick: {
    to_craft: [
      {material: "wood_stick", amount: 4},
      {material: "leather", amount: 2}
    ],
    name: "Enchanted Stick",
    magical_power: 0.9,
    type: "magical",
    speed_bonus: 1,
    item_type: "weapon",
    tier: "F",
    mag_damage: 5,
  },
  staff_of_fortune: {
    to_craft: [
      {material: "wood_stick", amount: 15},
      {material: "leather", amount: 4},
      {material: "steel_ingot", amount: 7},
      {material: "enchanted_stone", amount: 13},
      {weapon: copy(weapons.staff_of_legend), amount: 1},
      {material: "monster_core", amount: 80}
    ],
    name: "Fortunous Stave",
    magical_power: 5.5,
    type: "magical",
    speed_bonus: 1,
    item_type: "weapon",
    tier: "A",
    mag_damage: 148,
    effects: [
      {increase_stat: "int", by: 20},
      {increase: "maxmp", by: 250},
      {increase: "magical_multiplier", by: 0.33}
    ]
  },
  thick_leather_armor: {
    to_craft: [
      {material: "wood_stick", amount: 1},
      {material: "leather", amount: 5}
    ],
    name: "Thick Leather Armor",
    physical_resistance: 7,
    magical_resistance: 6,
    speed_bonus: 2,
    effects: [],
    item_type: "armor",
    tier: "E",
  },
  padded_plate_armor: {
    to_craft: [
      {material: "steel_ingot", amount: 3},
      {material: "leather", amount: 3},
      {armor: copy(armors.plate_armor), amount: 1}
    ],
    name: "Padded Plate Armor",
    physical_resistance: 21,
    magical_resistance: 8,
    speed_bonus: 2,
    effects: [],
    item_type: "armor",
    tier: "D",
  },
  armor_of_the_great_lord: {
    to_craft: [
      {material: "iron_ingot", amount: 30},
      {material: "steel_ingot", amount: 20},
      {material: "leather", amount: 25},
      {armor: copy(armors.kings_armor), amount: 1},
      {material: "enchanted_stone", amount: 10},
      {material: "monster_core", amount: 75}
    ],
    name: "The Great Lord's Armour",
    physical_resistance: 38,
    magical_resistance: 35,
    speed_bonus: 10,
    effects: [
      {increase: "maxhp", by: 500},
      {increase: "maxmp", by: 200},
      {increase: "physical_multiplier", by: 0.25},
      {increase_stat: "str", by: 25},
      {increase_stat: "int", by: 25},
      {increase: "dodge", by: 0.05}
    ],
    item_type: "armor",
    tier: "A",
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