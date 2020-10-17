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
    addItems(consumables.inferior_healing_potion, 3)
  ],
  moves: [
    copy(moves.pierce_through),
    copy(moves.sundering_slash),
    copy(moves.shields_up),
    copy(moves.fireball),
  ],
  weapon: weapons.fists,
  xp: 0,
  xpCap: 10,
  level: 1,
  skillpoints: 0,
  perkpoints: 0,
  gold: 50,
  physical_resistance: 0,
  magical_resistance: 0,
  speed: 0,
  action_points: 0,
  color: "rgb(50, 120, 50)",
  statuses: [],
  dodge: 0.05,
  sprite: "Player",
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
      min: 8,
      max: 21
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
      min: 8,
      max: 21
    },
    level: 10,
    physical_resistance: 5,
    magical_resistance: 5,
    speed: 0,
    action_points: 0,
    statuses: [],
    dodge: 0.05
  }
}