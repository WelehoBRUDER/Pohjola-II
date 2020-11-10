var player = {
  name: "Hero",
  hp: 20,
  mp: 10,
  maxhp: 20,
  maxmp: 10,
  stats: {
    str: 1,
    vit: 1,
    int: 1,
    agi: 1,
    lck: 0
  },
  items: [
    addItems(consumables.inferior_healing_potion, 3),
  ],
  moves: [],
  weapon: copy(weapons.fists),
  armor: copy(armors.naked),
  wand: copy(weapons.chant_only),
  xp: 0,
  xpCap: 10,
  level: 1,
  skillpoints: 0,
  perkpoints: 0,
  gold: 50,
  physical_resistance: 0,
  magical_resistance: 0,
  physical_multiplier: 0,
  magical_multiplier: 0,
  speed: 0,
  action_points: 0,
  color: "rgb(50, 120, 50)",
  statuses: [],
  dodge: 0.05,
  sprite: "Player",
  bought_perks: {},
  stages_beaten: {},
  floors_beaten: {},
  move_statuses: {},
  temporary_effects: []
}

const enemies = {
  dummy: {
    name: "dummy",
    hp: 999999,
    mp: 0,
    maxhp: 999999,
    maxmp: 0,
    physical_resistance: 0,
    magical_resistance: 0,
    statuses: []
  },
  skeleton: {
    name: "Skeleton",
    hp: 8,
    mp: 8,
    maxhp: 8,
    maxmp: 8,
    stats: {
      str: 1,
      vit: 1,
      int: 1,
      agi: 1,
      lck: 1
    },
    items: [
      addItems(consumables.inferior_healing_potion, 1)
    ],
    moves: [
      copy(moves.slice),
      copy(moves.thrust)
    ],
    weapon: weapons.broken_sword,
    xp: 5,
    gold: {
      min: 3,
      max: 9
    },
    level: 1,
    physical_resistance: 0,
    magical_resistance: 0,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.05,
    drops: [
      {item: weapons.broken_sword, chance: 0.1, min: 1, max: 1}
    ]
  },
  goblin: {
    name: "Goblin",
    hp: 15,
    mp: 10,
    maxhp: 15,
    maxmp: 10,
    stats: {
      str: 1,
      vit: 1,
      int: 1,
      agi: 2,
      lck: 1
    },
    items: [
      addItems(consumables.inferior_healing_potion, 1)
    ],
    moves: [
      copy(moves.crush),
      copy(moves.bash)
    ],
    weapon: weapons.broken_mace,
    xp: 15,
    gold: {
      min: 8,
      max: 21
    },
    level: 2,
    physical_resistance: 5,
    magical_resistance: 5,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.05,
    drops: [
      {item: weapons.broken_mace, chance: 0.1, min: 1, max: 1},
      {item: consumables.inferior_healing_potion, chance: 0.07, min: 1, max: 1}
    ]
  },
  orc: {
    name: "Orc",
    hp: 45,
    mp: 15,
    maxhp: 45,
    maxmp: 15,
    stats: {
      str: 10,
      vit: 1,
      int: 1,
      agi: 3,
      lck: 1
    },
    items: [
    ],
    moves: [
      copy(moves.crush),
      copy(moves.bash)
    ],
    weapon: weapons.broken_mace,
    xp: 50,
    gold: {
      min: 14,
      max: 37
    },
    level: 5,
    physical_resistance: 5,
    magical_resistance: 5,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.05,
    drops: [
      {item: weapons.broken_mace, chance: 0.15, min: 1, max: 1},
      {item: consumables.inferior_healing_potion, chance: 0.15, min: 1, max: 1}
    ]
  },
  skeleton_knight: {
    name: "Skeleton Knight",
    hp: 100,
    mp: 25,
    maxhp: 100,
    maxmp: 25,
    stats: {
      str: 14,
      vit: 4,
      int: 4,
      agi: 5,
      lck: 1
    },
    items: [
      addItems(consumables.inferior_healing_potion, 2)
    ],
    moves: [
      copy(moves.crush),
      copy(moves.thrust),
      copy(moves.slice)
    ],
    weapon: weapons.long_sword,
    xp: 200,
    gold: {
      min: 51,
      max: 82
    },
    level: 10,
    physical_resistance: 10,
    magical_resistance: 10,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.05,
    drops: [
      {item: weapons.long_sword, chance: 0.1, min: 1, max: 1},
      {item: consumables.inferior_healing_potion, chance: 0.13, min: 1, max: 2}
    ]
  },
  orc_berserker: {
    name: "Orc Berserker",
    hp: 220,
    mp: 20,
    maxhp: 220,
    maxmp: 20,
    stats: {
      str: 20,
      vit: 5,
      int: 2,
      agi: 10,
      lck: 1
    },
    items: [
      addItems(consumables.lesser_healing_potion, 3)
    ],
    moves: [
      copy(moves.crush),
      copy(moves.thrust),
      copy(moves.slice),
      copy(moves.bash),
    ],
    weapon: weapons.battle_axe,
    xp: 750,
    gold: {
      min: 197,
      max: 284
    },
    level: 15,
    physical_resistance: 18,
    magical_resistance: 7,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.07,
    drops: [
      {item: materials.monster_core, chance: 0.1, min: 1, max: 1},
      {item: weapons.battle_axe, chance: 0.2, min: 1, max: 1},
      {item: consumables.lesser_healing_potion, chance: 0.1, min: 1, max: 1}
    ]
  },
  death_knight: {
    name: "Death Knight",
    hp: 550,
    mp: 50,
    maxhp: 550,
    maxmp: 50,
    stats: {
      str: 28,
      vit: 12,
      int: 2,
      agi: 17,
      lck: 1
    },
    items: [
      addItems(consumables.healing_potion, 2)
    ],
    moves: [
      copy(moves.crush),
      copy(moves.thrust),
      copy(moves.slice),
      copy(moves.shield_bash)
    ],
    weapon: weapons.greatsword,
    xp: 2500,
    gold: {
      min: 577,
      max: 1229
    },
    level: 25,
    physical_resistance: 30,
    magical_resistance: 14,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.06,
    drops: [
      {item: materials.monster_core, chance: 0.15, min: 1, max: 2},
      {item: weapons.greatsword, chance: 0.15, min: 1, max: 1},
      {item: consumables.lesser_healing_potion, chance: 0.2, min: 2, max: 5}
    ],
    music: 1
  },
  ogre: {
    name: "Ogre",
    hp: 440,
    mp: 25,
    maxhp: 440,
    maxmp: 25,
    stats: {
      str: 37,
      vit: 12,
      int: 2,
      agi: 12,
      lck: 1
    },
    items: [
      addItems(consumables.healing_potion, 1)
    ],
    moves: [
      copy(moves.crush),
      copy(moves.thrust),
      copy(moves.slice)
    ],
    weapon: weapons.battle_axe,
    xp: 1550,
    gold: {
      min: 399,
      max: 1008
    },
    level: 21,
    physical_resistance: 17,
    magical_resistance: 29,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.05,
    drops: [
      {item: materials.monster_core, chance: 0.2, min: 1, max: 2},
      {item: weapons.battle_axe, chance: 0.25, min: 1, max: 1},
      {item: consumables.healing_potion, chance: 0.1, min: 1, max: 1}
    ]
  },
  minotaur: {
    name: "Minotauros",
    hp: 825,
    mp: 25,
    maxhp: 825,
    maxmp: 25,
    stats: {
      str: 40,
      vit: 10,
      int: 1,
      agi: 15,
      lck: 1
    },
    items: [
      addItems(consumables.healing_potion, 2)
    ],
    moves: [
      copy(moves.crush),
      copy(moves.slice),
      copy(moves.break)
    ],
    weapon: weapons.executioner,
    xp: 4000,
    gold: {
      min: 589,
      max: 2007
    },
    level: 30,
    physical_resistance: 41,
    magical_resistance: 26,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.04,
    drops: [
      {item: materials.monster_core, chance: 0.2, min: 1, max: 2},
      {item: weapons.executioner, chance: 0.15, min: 1, max: 1},
      {item: consumables.healing_potion, chance: 0.1, min: 1, max: 1}
    ]
  },
  spectral_knight: {
    name: "Spectral Knight",
    hp: 670,
    mp: 25,
    maxhp: 670,
    maxmp: 25,
    stats: {
      str: 28,
      vit: 15,
      int: 30,
      agi: 30,
      lck: 1
    },
    items: [
      addItems(consumables.medium_healing_potion, 2)
    ],
    moves: [
      copy(moves.thrust),
      copy(moves.heavy_attack),
      copy(moves.astral_lance),
      copy(moves.bash)
    ],
    weapon: weapons.astral_spear,
    xp: 20000,
    gold: {
      min: 1799,
      max: 3522
    },
    level: 37,
    physical_resistance: 69,
    magical_resistance: 38,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.06,
    drops: [
      {item: materials.monster_core, chance: 0.5, min: 1, max: 3},
      {item: weapons.astral_spear, chance: 0.1, min: 1, max: 1},
      {item: consumables.healing_potion, chance: 0.1, min: 1, max: 2},
      {item: consumables.mana_potion, chance: 0.1, min: 1, max: 2}
    ]
  },
  grave_floater: {
    name: "Grave Floater",
    hp: 300,
    mp: 100,
    maxhp: 300,
    maxmp: 100,
    stats: {
      str: 6,
      vit: 3,
      int: 90,
      agi: 51,
      lck: 1
    },
    items: [
      addItems(consumables.medium_healing_potion, 1)
    ],
    moves: [
      copy(moves.grave_floater_blast),
      copy(moves.fireball),
      copy(moves.astral_lance),
    ],
    weapon: weapons.astral_spear,
    xp: 19000,
    gold: {
      min: 2155,
      max: 3165
    },
    level: 35,
    physical_resistance: 91,
    magical_resistance: 50,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.03,
    drops: [
      {item: materials.monster_core, chance: 0.5, min: 1, max: 3},
      {item: weapons.astral_spear, chance: 0.1, min: 1, max: 1},
      {item: consumables.healing_potion, chance: 0.1, min: 1, max: 2},
      {item: consumables.mana_potion, chance: 0.1, min: 1, max: 2}
    ]
  },
  gronk: {
    name: "GRONK",
    hp: 525,
    mp: 0,
    maxhp: 525,
    maxmp: 0,
    stats: {
      str: 55,
      vit: 5,
      int: -50,
      agi: 8,
      lck: 1
    },
    items: [],
    moves: [
      copy(moves.gronk_smash),
      copy(moves.gronk_clobber),
    ],
    weapon: weapons.club_of_the_giant_king,
    xp: 30000,
    gold: {
      min: 1,
      max: 5
    },
    level: 40,
    physical_resistance: 22,
    magical_resistance: 19,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.025,
    drops: [
      {item: materials.monster_core, chance: 0.5, min: 1, max: 3},
      {item: weapons.club_of_the_giant_king, chance: 0.12, min: 1, max: 1}
    ]
  },
  lich: {
    name: "Lich",
    hp: 475,
    mp: 300,
    maxhp: 475,
    maxmp: 300,
    stats: {
      str: 40,
      vit: 5,
      int: 120,
      agi: 15,
      lck: 1
    },
    items: [],
    moves: [
      copy(moves.thrust),
      copy(moves.fire_lance),
      copy(moves.grave_floater_blast),
      copy(moves.astral_lance),
    ],
    weapon: weapons.lance_of_the_lord,
    xp: 37500,
    gold: {
      min: 3109,
      max: 5786
    },
    level: 42,
    physical_resistance: 86,
    magical_resistance: 52,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.05,
    drops: [
      {item: materials.monster_core, chance: 0.5, min: 1, max: 3},
      {item: weapons.lance_of_the_lord, chance: 0.01, min: 1, max: 1},
      {item: consumables.healing_potion, chance: 0.1, min: 1, max: 2},
      {item: consumables.medium_mana_potion, chance: 0.15, min: 1, max: 3}
    ]
  },
  wyvern: {
    name: "Wyvern",
    hp: 1200,
    mp: 400,
    maxhp: 1200,
    maxmp: 400,
    stats: {
      str: 90,
      vit: 25,
      int: 130,
      agi: 28,
      lck: 1
    },
    items: [],
    moves: [
      copy(moves.thrust),
      copy(moves.fire_lance),
      copy(moves.slice),
      copy(moves.fireball),
      copy(moves.crush)
    ],
    weapon: weapons.greatsword_of_legend,
    xp: 81850,
    gold: {
      min: 9958,
      max: 14775
    },
    level: 50,
    physical_resistance: 42,
    magical_resistance: 65,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.04,
    drops: [
      {item: materials.monster_core, chance: 0.5, min: 3, max: 7},
      {item: weapons.greatsword_of_legend, chance: 0.1, min: 1, max: 1},
      {item: consumables.medium_healing_potion, chance: 0.2, min: 1, max: 3},
      {item: consumables.medium_mana_potion, chance: 0.2, min: 1, max: 3}
    ],
    music: 2
  },
  dwarf_warrior: {
    name: "Dwarf Warrior",
    hp: 4100,
    mp: 50,
    maxhp: 4100,
    maxmp: 50,
    stats: {
      str: 110,
      vit: 90,
      int: 10,
      agi: 19,
      lck: 1
    },
    items: [],
    moves: [
      copy(moves.thrust),
      copy(moves.slice),
      copy(moves.crush)
    ],
    weapon: craftable_items.doombringer_axe,
    xp: 150775,
    gold: {
      min: 18575,
      max: 26485
    },
    level: 60,
    physical_resistance: 40,
    magical_resistance: 47,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.05,
    drops: [
      {item: materials.monster_core, chance: 0.33, min: 3, max: 7},
      {item: craftable_items.doombringer_axe, chance: 0.22, min: 1, max: 3},
    ]
  },
  dwarf_hero: {
    name: "Dwarf Hero",
    hp: 7950,
    mp: 50,
    maxhp: 7950,
    maxmp: 50,
    stats: {
      str: 90,
      vit: 140,
      int: 2,
      agi: 46,
      lck: 1
    },
    items: [],
    moves: [
      copy(moves.thrust),
      copy(moves.slice),
      copy(moves.crush),
      copy(moves.heavy_attack)
    ],
    weapon: weapons.greatsword_of_legend,
    xp: 295780,
    gold: {
      min: 18575,
      max: 26485
    },
    level: 66,
    physical_resistance: 50,
    magical_resistance: 50,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.05,
    drops: [
      {item: materials.monster_core, chance: 0.33, min: 4, max: 8},
      {item: weapons.battle_axe, chance: 0.47, min: 1, max: 3},
    ]
  },
  wyvern_rider: {
    name: "Wyvern Rider",
    hp: 13800,
    mp: 1500,
    maxhp: 13800,
    maxmp: 1500,
    stats: {
      str: 70,
      vit: 200,
      int: 130,
      agi: 19,
      lck: 1
    },
    items: [],
    moves: [
      copy(moves.thrust),
      copy(moves.slice),
      copy(moves.crush),
      copy(moves.astral_lance),
      copy(moves.fire_lance)
    ],
    weapon: weapons.lance_of_the_lord,
    xp: 480000,
    gold: {
      min: 53995,
      max: 82445
    },
    level: 75,
    physical_resistance: 51,
    magical_resistance: 58,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.09,
    drops: [
      {item: materials.monster_core, chance: 0.66, min: 10, max: 18},
      {item: weapons.lance_of_the_lord, chance: 0.27, min: 1, max: 2},
      {item: materials.enchanted_stone, chance: 0.4, min: 1, max: 5}
    ],
    music: 2
  },
  elven_warrior: {
    name: "Elven Warrior",
    hp: 9000,
    mp: 1000,
    maxhp: 9000,
    maxmp: 1000,
    stats: {
      str: 95,
      vit: 100,
      int: 25,
      agi: 66,
      lck: 1
    },
    items: [],
    moves: [
      copy(moves.thrust),
      copy(moves.slice),
      copy(moves.crush),
    ],
    weapon: weapons.greatsword_of_legend,
    xp: 370500,
    gold: {
      min: 37552,
      max: 62985
    },
    level: 70,
    physical_resistance: 51,
    magical_resistance: 58,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.1,
    drops: [
      {item: materials.monster_core, chance: 0.66, min: 6, max: 11},
      {item: weapons.greatsword_of_legend, chance: 0.27, min: 1, max: 2},
      {item: materials.enchanted_stone, chance: 0.4, min: 1, max: 5}
    ],
  },
  elven_archer: {
    name: "Elven Archer",
    hp: 6500,
    mp: 2000,
    maxhp: 6500,
    maxmp: 2000,
    stats: {
      str: 90,
      vit: 70,
      int: 90,
      agi: 90,
      lck: 1
    },
    items: [],
    moves: [
      copy(moves.thrust),
      copy(moves.slice),
      copy(moves.power_shot),
    ],
    weapon: weapons.greatsword_of_legend,
    xp: 425750,
    gold: {
      min: 55955,
      max: 77488
    },
    level: 74,
    physical_resistance: 37,
    magical_resistance: 61,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.1,
    drops: [
      {item: materials.monster_core, chance: 0.66, min: 6, max: 11},
      {item: weapons.greatsword_of_legend, chance: 0.27, min: 1, max: 2},
      {item: materials.enchanted_stone, chance: 0.4, min: 1, max: 7}
    ],
  },
  elven_hero: {
    name: "Elven Hero",
    hp: 15750,
    mp: 2000,
    maxhp: 15750,
    maxmp: 2000,
    stats: {
      str: 95,
      vit: 120,
      int: 95,
      agi: 80,
      lck: 1
    },
    items: [],
    moves: [
      copy(moves.thrust),
      copy(moves.slice),
      copy(moves.power_shot),
      copy(moves.immobilizing_shatter)
    ],
    weapon: craftable_items.enchanted_greatsword,
    xp: 790800,
    gold: {
      min: 95855,
      max: 127545
    },
    level: 80,
    physical_resistance: 53,
    magical_resistance: 53,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.1,
    drops: [
      {item: materials.monster_core, chance: 0.66, min: 13, max: 25},
      {item: craftable_items.enchanted_greatsword, chance: 0.27, min: 1, max: 2},
      {item: materials.enchanted_stone, chance: 0.4, min: 2, max: 7}
    ],
  },
  elven_king: {
    name: "Elven King",
    hp: 21500,
    mp: 3000,
    maxhp: 21500,
    maxmp: 3000,
    stats: {
      str: 140,
      vit: 170,
      int: 145,
      agi: 60,
      lck: 1
    },
    items: [],
    moves: [
      copy(moves.thrust),
      copy(moves.slice),
      copy(moves.power_shot),
      copy(moves.immobilizing_shatter),
      copy(moves.sundering_slash)
    ],
    weapon: craftable_items.enchanted_greatsword,
    xp: 2790800,
    gold: {
      min: 155757,
      max: 266557
    },
    level: 90,
    physical_resistance: 40,
    magical_resistance: 33,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.1,
    drops: [
      {item: materials.monster_core, chance: 0.87, min: 20, max: 28},
      {item: weapons.elven_greatsword, chance: 1, min: 1, max: 1},
      {item: materials.enchanted_stone, chance: 0.9, min: 5, max: 12}
    ],
  },
  dark_elf_warrior: {
    name: "Dark Elf Warrior",
    hp: 15200,
    mp: 3000,
    maxhp: 15200,
    maxmp: 3000,
    stats: {
      str: 110,
      vit: 125,
      int: 100,
      agi: 80,
      lck: 1
    },
    items: [],
    moves: [
      copy(moves.thrust),
      copy(moves.slice),
      copy(moves.immobilizing_shatter),
      copy(moves.cursed_strike)
    ],
    weapon: craftable_items.enchanted_greatsword,
    xp: 1805520,
    gold: {
      min: 96333,
      max: 178545
    },
    level: 85,
    physical_resistance: 27,
    magical_resistance: 22,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.05,
    drops: [
      {item: materials.dark_core, chance: 0.25, min: 1, max: 1},
      {item: weapons.enchanted_greatsword, chance: 1, min: 1, max: 1},
      {item: copy(materials.enchanted_stone), chance: 0.9, min: 5, max: 12},
    ]
  },
  corrupted_elf: {
    name: "Corrupted Elf",
    hp: 38500,
    mp: 5000,
    maxhp: 38500,
    maxmp: 5000,
    stats: {
      str: 150,
      vit: 200,
      int: 150,
      agi: 90,
      lck: 1
    },
    items: [],
    moves: [
      copy(moves.thrust),
      copy(moves.slice),
      copy(moves.immobilizing_shatter),
      copy(moves.astral_lance),
      copy(moves.cursed_strike),
      copy(moves.holy_grace)
    ],
    weapon: craftable_items.enchanted_greatsword,
    xp: 9800500,
    gold: {
      min: 523799,
      max: 866755
    },
    level: 100,
    physical_resistance: 35,
    magical_resistance: 32,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.05,
    drops: [
      {item: materials.dark_core, chance: 1, min: 1, max: 1},
      {item: weapons.enchanted_greatsword, chance: 1, min: 3, max: 15},
      {item: copy(materials.enchanted_stone), chance: 0.9, min: 5, max: 12},
      {item: consumables.dummy, chance: 0, min: 0, max: 0}
    ]
  }
}