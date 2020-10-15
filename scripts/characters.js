var player = {
  name: "Hero",
  hp: 7,
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
  action_points: 0
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
    weapon: weapons.broken_sword,
    xp: 5,
    level: 1,
    physical_resistance: 0,
    magical_resistance: 0
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
    weapon: weapons.broken_sword,
    xp: 15,
    level: 2,
    physical_resistance: 2,
    magical_resistance: 2
  }
}