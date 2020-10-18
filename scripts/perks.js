
let warrior_tree = {
  colors: {
    reg: "#9c271a",
    box: "#701a11",
    name: "Warrior Tree",
    id: "warrior"
  },
  warrior_1: {
    first: true,
    name: "Combat Experience",
    cost: 1,
    desc: "Increases strength by 1 and grants skill '§/$Y/Heavy Attack§'. §:br§ Cost: 1 perk point",
    icon: "weapon_icon",
    effect: [
      {increase_stat: "str", by: 1},
      {grant_skill: copy(moves.heavy_attack)}
    ],
  },
  warrior_2: {
    name: "Warrior Training",
    cost: 1,
    desc: "Increases §/red/HP§ by 10 and strength by 2. §:br§ Cost: 1 perk point",
    icon: "weapon_icon",
    down_of: "warrior_1",
    effect: [
      {increase_stat: "str", by: 2},
      {increase: "maxhp", by: 10}
    ],
  },
  warrior_3: {
    name: "Defense Training",
    cost: 2,
    desc: "Increases §/red/HP§ by 25. §:br§ Cost: 2 perk points",
    icon: "defense",
    left_of: "warrior_2",
    effect: [
      {increase: "maxhp", by: 25},
    ],
  },
  warrior_4: {
    name: "Defense Mastery",
    cost: 1,
    desc: "Increases §/red/HP§ by 15. §:br§ Cost: 1 perk points",
    icon: "defense",
    left_of: "warrior_3",
    effect: [
      {increase: "maxhp", by: 15},
    ],
  },
  warrior_5: {
    name: "Offense is the Best Defense",
    cost: 2,
    desc: "Increases str by 3 and §/red/HP§ by 10. §:br§ Cost: 2 perk points",
    icon: "weapon_icon",
    down_of: "warrior_4",
    effect: [
      {increase: "maxhp", by: 10},
      {increase_stat: "str", by: 3}
    ],
  },
  warrior_6: {
    name: "Immovable Body",
    cost: 3,
    desc: "Increases physical resistance by 2% and §/red/HP§ by 75. §:br§ Cost: 3 perk points",
    icon: "defense",
    down_of: "warrior_5",
    effect: [
      {increase: "maxhp", by: 75},
      {increase: "physical_resistance", by: 2}
    ],
  },
  warrior_7: {
    name: "Responsive Defense",
    cost: 1,
    desc: "Grants skill '§/$Y/Shields Up!§'. §:br§ Cost: 1 perk point",
    icon: "defense",
    left_of: "warrior_4",
    effect: [
      {grant_skill: copy(moves.shields_up)},
    ],
  },
  warrior_15: {
    name: "Sheer Berserking",
    cost: 2,
    desc: "Increases strength by 5, but decreases §/red/HP§ by 15. §:br§ Cost: 2 perk points",
    icon: "damage_icon",
    right_of: "warrior_2",
    effect: [
      {increase: "maxhp", by: -15},
      {increase_stat: "str", by: 5}
    ],
  },
  warrior_16: {
    name: "Powerful Grip",
    cost: 2,
    desc: "Increases physical damage by 5%. §:br§ Cost: 2 perk points",
    icon: "damage_icon",
    right_of: "warrior_15",
    effect: [
      {increase: "physical_multiplier", by: 0.05},
    ],
  },
  warrior_17: {
    name: "Armor Breaker",
    cost: 1,
    desc: "Grants skill '§/$Y/Pierce Through§'. §:br§ Cost: 1 perk point",
    icon: "weapon_icon",
    right_of: "warrior_16",
    effect: [
      {grant_skill: copy(moves.pierce_through)},
    ],
  },
  warrior_18: {
    name: "Tiger on the Prowl",
    cost: 2,
    desc: "Increases agility by 5. §:br§ Cost: 2 perk points",
    icon: "agility",
    down_of: "warrior_16",
    effect: [
      {increase_stat: "agi", by: 5},
    ],
  },
  warrior_19: {
    name: "Bear on the Attack",
    cost: 3,
    desc: "Increases strength by 4 and physical damage by 3%. §:br§ Cost: 3 perk points",
    icon: "damage_icon",
    down_of: "warrior_18",
    effect: [
      {increase_stat: "str", by: 4},
      {increase: "physical_multiplier", by: 0.03}
    ],
  },
  warrior_24: {
    name: "Heavy Assault",
    cost: 1,
    desc: "Increases §/$Y/Heavy Attack§'s damage by 30%. §:br§ Cost: 1 perk point",
    icon: "weapon_icon",
    down_of: "warrior_2",
    effect: [
      {modify_skill: "heavy_attack", target: "power", by: 0.3},
    ],
  },
}

let mage_tree = {
  colors: {
    reg: "#355dde",
    box: "#2343a8",
    name: "Mage Tree",
    id: "mage"
  },
  mage_1: {
    first: true,
    name: "Spiritual Awakening",
    cost: 1,
    desc: "Increases intelligence by 1 and grants spell '§/$Y/Mana Blast§'. §:br§ Cost: 1 perk point",
    icon: "wisdom",
    effect: [
      {increase_stat: "int", by: 1},
      {grant_skill: copy(moves.mana_blast)}
    ],
  },
}

let trees = {
  warrior: true,
  mage: true
}

var selected_tree = warrior_tree;