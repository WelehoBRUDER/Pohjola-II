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
    lck: 1
  },
  items: [
    addItems(consumables.inferior_healing_potion, 3)
  ],
  moves: [
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
  statuses: []
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
    statuses: []
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
      agi: 1,
      lck: 1
    },
    items: [
      addItems(consumables.inferior_healing_potion, 1)
    ],
    moves: [
      copy(moves.slice),
      copy(moves.thrust),
      copy(moves.bash)
    ],
    weapon: weapons.broken_sword,
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
    statuses: []
  }
}