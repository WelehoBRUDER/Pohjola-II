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
  xp: 0,
  xpCap: 10,
  level: 1,
  skillpoints: 0,
  perkpoints: 1,
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
  bought_perks: {}
}

const enemies = {
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
    dodge: 0.05
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
    dodge: 0.05
  },
  orc: {
    name: "Orc",
    hp: 40,
    mp: 15,
    maxhp: 40,
    maxmp: 15,
    stats: {
      str: 5,
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
    dodge: 0.05
  },
  skeleton_knight: {
    name: "Skeleton Knight",
    hp: 100,
    mp: 25,
    maxhp: 100,
    maxmp: 25,
    stats: {
      str: 8,
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
    dodge: 0.05
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
      copy(moves.bash)
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
    dodge: 0.07
  }
}