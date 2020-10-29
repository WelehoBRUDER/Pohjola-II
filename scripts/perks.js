
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
  path_1: {
    name: "PATH",
    cost: 0,
    left_of: "warrior_2",
    GET_FROM: "warrior_2"
  },
  warrior_3: {
    name: "Defense Training",
    cost: 2,
    desc: "Increases §/red/HP§ by 25. §:br§ Cost: 2 perk points",
    icon: "defense",
    requires: "warrior_2",
    left_of: "path_1",
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
    icon: "physical_resistance",
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
  warrior_8: {
    name: "Heightened Reflexes",
    cost: 1,
    desc: "Lowers §/$Y/Shields Up!§'s cooldown by 2s. §:br§ Cost: 1 perk point",
    icon: "defense",
    down_of: "warrior_7",
    effect: [
      {modify_skill: "shields_up", target: "cooldown", by: -2},
    ],
  },
  warrior_9: {
    name: "The Best Defense",
    cost: 2,
    desc: "Increases dodge chance by 5%. §:br§ Cost: 2 perk points",
    icon: "dodge_icon",
    down_of: "warrior_6",
    effect: [
      {increase: "dodge", by: 0.05},
    ],
  },
  warrior_10: {
    name: "Sheer Willpower",
    cost: 2,
    desc: "Increases §/red/HP§ by 150. §:br§ Cost: 2 perk points",
    icon: "defense",
    left_of: "warrior_6",
    effect: [
      {increase: "maxhp", by: 150},
    ],
  },
  warrior_11: {
    name: "Prepared for Anything",
    cost: 2,
    desc: "Increases both §/$Y/physical§ and §/$B/magical§ resistances by 5%. §:br§ Cost: 2 perk points",
    icon: "defense",
    right_of: "warrior_6",
    effect: [
      {increase: "physical_resistance", by: 5},
      {increase: "magical_resistance", by: 5}
    ],
  },
  warrior_12: {
    name: "Human Juggernaut",
    cost: 3,
    desc: "Increases both §/$Y/physical resistance§ by 3% and §/$R/HP§ by 100. §:br§ Cost: 3 perk points",
    icon: "vitality",
    down_of: "warrior_10",
    effect: [
      {increase: "physical_resistance", by: 3},
      {increase: "maxhp", by: 100}
    ],
  },
  warrior_13: {
    name: "I Can Take a Hit! (Or Two)",
    cost: 5,
    desc: "Increases §/$R/HP§ by 300. §:br§ Cost: 5 perk points",
    icon: "vitality",
    down_of: "warrior_9",
    effect: [
      {increase: "maxhp", by: 300},
    ],
  },
  path_2: {
    name: "PATH",
    cost: 0,
    right_of: "warrior_2",
    GET_FROM: "warrior_2"
  },
  warrior_15: {
    name: "Sheer Berserking",
    cost: 2,
    desc: "Increases strength by 5, but decreases §/red/HP§ by 15. §:br§ Cost: 2 perk points",
    icon: "damage_icon",
    right_of: "path_2",
    requires: "warrior_2",
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
  warrior_20: {
    name: "Piercer of the Heavens",
    cost: 2,
    desc: "Increases §/$Y/Pierce Through§'s damage by 20%, and armor piercing by 10%. §:br§ Cost: 2 perk points",
    icon: "weapon_icon",
    down_of: "warrior_17",
    effect: [
      {modify_skill: "pierce_through", target: "power", by: 0.2},
      {modify_skill: "pierce_through", target: "penetration", by: 0.1}
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
  warrior_25: {
    name: "Defense Breacher",
    cost: 2,
    desc: "Grants skill '§/$Y/Sundering Slash§'. §:br§ Cost: 2 perk points",
    icon: "damage_icon",
    down_of: "warrior_24",
    effect: [
      {grant_skill: copy(moves.sundering_slash)},
    ],
  },
  warrior_26: {
    name: "Warrior Expertise",
    cost: 3,
    desc: "Increases §/red/HP§ by 50 and physical damage by 10%. §:br§ Cost: 3 perk points",
    icon: "weapon_icon",
    down_of: "warrior_25",
    effect: [
      {increase: "maxhp", by: 50},
      {increase: "physical_multiplier", by: 0.1}
    ],
  },
  warrior_27: {
    name: "Agile Assault",
    cost: 1,
    desc: "Increases agility by 2 and physical damage by 2%. §:br§ Cost: 1 perk point",
    icon: "weapon_icon",
    right_of: "warrior_24",
    effect: [
      {increase_stat: "agi", by: 2},
      {increase: "physical_multiplier", by: 0.02}
    ],
  },
  warrior_28: {
    name: "Careful Manuevers",
    cost: 1,
    desc: "Increases dodge chance by 3%. §:br§ Cost: 1 perk point",
    icon: "dodge_icon",
    left_of: "warrior_24",
    effect: [
      {increase: "dodge", by: 0.03}
    ],
  },
  warrior_29: {
    name: "Impatient Slasher",
    cost: 1,
    desc: "Lowers §/$Y/Sundering Slash§'s cooldown by 1s. §:br§ Cost: 1 perk point",
    icon: "weapon_icon",
    right_of: "warrior_25",
    effect: [
      {modify_skill: "sundering_slash", target: "cooldown", by: -1},
    ],
  },
  warrior_30: {
    name: "Cutting Deeper",
    cost: 1,
    desc: "Increases §/$Y/Sundering Slash§'s effect time by 1s. §:br§ Cost: 1 perk point",
    icon: "weapon_icon",
    left_of: "warrior_25",
    effect: [
      {modify_skill: "sundering_slash", target: "lasts", by: 1},
    ],
  },
  warrior_31: {
    name: "Titan's Strength",
    cost: 4,
    desc: "Increases strength by 10 and physical damage by 5%. §:br§ Lowers intelligence by 1. §:br§ Cost: 4 perk points",
    icon: "strength",
    down_of: "warrior_19",
    effect: [
      {increase_stat: "str", by: 10},
      {increase: "physical_multiplier", by: 0.05},
      {increase_stat: "int", by: -1},
      {increase: "maxmp", by: -5}
    ],
  },
  warrior_32: {
    name: "Battlefield Looter",
    cost: 2,
    desc: "Increases XP gain by 5% and gold gain by 20%. §:br§ Cost: 2 perk points",
    icon: "gold_small",
    right_of: "warrior_19",
    effect: [
      {increase_stat: "lck", by: 5},
    ],
  },
  warrior_33: {
    name: "Power and Grace",
    cost: 2,
    desc: "Increases physical damage by 5% and agility by 3. §:br§ Cost: 2 perk points",
    icon: "weapon_icon",
    down_of: "warrior_31",
    effect: [
      {increase_stat: "agi", by: 3},
      {increase: "physical_multiplier", by: 0.05},
    ],
  },
  warrior_34: {
    name: "Strength through Experience",
    cost: 2,
    desc: "Increases physical damage by 6% and strength by 3. §:br§ Cost: 2 perk points",
    icon: "strength",
    right_of: "warrior_33",
    effect: [
      {increase_stat: "str", by: 3},
      {increase: "physical_multiplier", by: 0.06},
    ],
  },
  warrior_35: {
    name: "Finding a Weakpoint",
    cost: 3,
    desc: "Increases physical damage by 10%. §:br§ Cost: 2 perk points",
    icon: "damage_icon",
    left_of: "warrior_33",
    effect: [
      {increase: "physical_multiplier", by: 0.1},
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
  mage_2: {
    name: "A Tempered Mind",
    cost: 1,
    desc: "Increases §/$B/MP§ by 10. §:br§ Cost: 1 perk point",
    icon: "wisdom",
    down_of: "mage_1",
    effect: [
      {increase: "maxmp", by: 10},
    ],
  },
  path_mage_1: {
    name: "PATH",
    cost: 0,
    left_of: "mage_2",
    GET_FROM: "mage_2"
  },
  mage_3: {
    name: "The Spirit Veil",
    cost: 2,
    desc: "Increases magical resistance by 5%. §:br§ Cost: 2 perk points",
    icon: "magical_resistance",
    left_of: "path_mage_1",
    requires: "mage_2",
    effect: [
      {increase: "magical_resistance", by: 5},
    ],
  },
  mage_4: {
    name: "Barrier Magic",
    cost: 2,
    desc: "Increases physical resistance by 3%. §:br§ Cost: 2 perk points",
    icon: "physical_resistance",
    left_of: "mage_3",
    effect: [
      {increase: "physical_resistance", by: 3},
    ],
  },
  mage_5: {
    name: "Battle Medic",
    cost: 1,
    desc: "Grants spell '§/$Y/Greater Heal§'. §:br§ Cost: 1 perk point",
    icon: "regeneration",
    left_of: "mage_4",
    effect: [
      {grant_skill: copy(moves.regeneration)},
    ],
  },
  mage_6: {
    name: "Path of the Healer",
    cost: 2,
    desc: "Increases §/$Y/Greater Heal§'s healing by 10% and decreases mana cost by 10. §:br§ Cost: 2 perk points",
    icon: "regeneration",
    down_of: "mage_5",
    effect: [
      {modify_skill: "regeneration", target: "power", by: 0.1},
      {modify_skill: "regeneration", target: "mp_cost", by: -10}
    ],
  },
  mage_7: {
    name: "Defensive Stratagems",
    cost: 1,
    desc: "Increases §/$R/HP§ by 50.§:br§ Cost: 1 perk point",
    icon: "defense",
    down_of: "mage_4",
    effect: [
      {increase: "maxhp", by: 50},
    ],
  },
  mage_8: {
    name: "Attending the Flesh",
    cost: 2,
    desc: "Increases §/$R/HP§ by 70.§:br§ Cost: 2 perk points",
    icon: "defense",
    down_of: "mage_7",
    effect: [
      {increase: "maxhp", by: 70},
    ],
  },
  mage_9: {
    name: "Body and Soul, In Sync",
    cost: 3,
    desc: "Increases §/$R/HP§ and §/$B/MP§ by 100.§:br§ Cost: 3 perk points",
    icon: "defense",
    down_of: "mage_8",
    effect: [
      {increase: "maxhp", by: 100},
      {increase: "maxmp", by: 100},
    ],
  },
  path_mage_2: {
    name: "PATH",
    cost: 0,
    right_of: "mage_2",
    GET_FROM: "mage_2"
  },
  mage_10: {
    name: "Striking Prowess",
    cost: 2,
    desc: "Increases intelligence by 3. §:br§ Cost: 2 perk points",
    icon: "damage_icon",
    right_of: "path_mage_2",
    requires: "mage_2",
    effect: [
      {increase_stat: "int", by: 3},
    ],
  },
  mage_11: {
    name: "Concentrated Anger",
    cost: 2,
    desc: "Increases magical damage by 4%. §:br§ Cost: 2 perk points",
    icon: "damage_icon",
    right_of: "mage_10",
    effect: [
      {increase: "magical_multiplier", by: 0.04},
    ],
  },
  mage_12: {
    name: "Strengthened Blast",
    cost: 2,
    desc: "Increases §/$Y/Mana Blast§'s damage by 15%, and base damage by 2. §:br§ Cost: 2 perk points",
    icon: "damage_icon",
    down_of: "mage_11",
    effect: [
      {modify_skill: "mana_blast", target: "power", by: 0.15},
      {modify_skill: "mana_blast", target: "base", by: 2}
    ],
  },
  mage_13: {
    name: "Throwing the Flames",
    cost: 2,
    desc: "Grants spell §/$Y/Fireball§. §:br§ Cost: 2 perk points",
    icon: "fireball",
    down_of: "mage_12",
    effect: [
      {grant_skill: copy(moves.fireball)}
    ],
  },
  mage_14: {
    name: "Stronger Flame",
    cost: 1,
    desc: "Increases §/$Y/Fireball§'s base damage by 5, and power by 10%. §:br§ Cost: 1 perk point",
    icon: "damage_icon",
    right_of: "mage_13",
    effect: [
      {modify_skill: "fireball", target: "base", by: 5},
      {modify_skill: "fireball", target: "power", by: 0.1}
    ],
  },
  mage_15: {
    name: "Efficient Casting",
    cost: 1,
    desc: "Lowers §/$Y/Fireball§'s §/$B/MP§ cost by 10. §:br§ Cost: 1 perk point",
    icon: "wisdom",
    left_of: "mage_13",
    effect: [
      {modify_skill: "fireball", target: "mp_cost", by: -10},
    ],
  },
  mage_16: {
    name: "We've Got to Fry 'Em Up!",
    cost: 2,
    desc: "Adds a 7 second §/red/cooldown§ to §/$Y/Fireball§, but increases damage by 150%. §:br§ Cost: 2 perk points",
    icon: "fireball",
    down_of: "mage_13",
    effect: [
      {modify_skill: "fireball", target: "cooldown", by: 7},
      {modify_skill: "fireball", target: "power", by: 1.5}
    ],
  },
  mage_17: {
    name: "Wisdoms of the Past",
    cost: 2,
    desc: "Increases magical damage by 10%. §:br§ Cost: 2 perk points",
    icon: "mana_icon",
    right_of: "mage_11",
    effect: [
      {increase: "magical_multiplier", by: 0.1}
    ],
  },
  mage_18: {
    name: "Concentrated Weak Point",
    cost: 2,
    desc: "Grant spell '§/$Y/Fire Lance§'. §:br§ Cost: 2 perk points",
    icon: "fire_lance",
    down_of: "mage_17",
    effect: [
      {grant_skill: copy(moves.fire_lance)}
    ],
  },
  mage_19: {
    name: "Simple and Reliable",
    cost: 3,
    desc: "Increases §/$Y/Mana Blast§'s damage by 10%, and base damage by 7, but §/red/doubles§ §/$B/MP§ cost. §:br§ Cost: 3 perk points",
    icon: "mana_blast",
    left_of: "mage_12",
    effect: [
      {modify_skill: "mana_blast", target: "power", by: 0.1},
      {modify_skill: "mana_blast", target: "base", by: 7},
      {modify_skill: "mana_blast", target: "mp_cost", by: 10}
    ],
  },
  mage_20: {
    name: "Channeling the Reserves",
    cost: 1,
    desc: "Increases §/$B/MP§ by 25. §:br§ Cost: 1 perk point",
    icon: "wisdom",
    down_of: "mage_2",
    effect: [
      {increase: "maxmp", by: 25},
    ],
  },
  mage_21: {
    name: "The Thinking Man",
    cost: 3,
    desc: "Increases §/$B/MP§ by 50, intelligence by 5 and magical damage by 8%. §:br§ Cost: 3 perk points",
    icon: "wisdom",
    down_of: "mage_20",
    effect: [
      {increase: "maxmp", by: 50},
      {increase: "magical_multiplier", by: 0.08},
      {increase_stat: "int", by: 5},
    ],
  },
  mage_22: {
    name: "Expanded Capacity",
    cost: 2,
    desc: "Increases §/$B/MP§ by 60. §:br§ Cost: 2 perk points",
    icon: "wisdom",
    left_of: "mage_20",
    effect: [
      {increase: "maxmp", by: 60},
    ],
  },
  mage_23: {
    name: "Bone Breaking Shatter",
    cost: 2,
    desc: "Grant spell '§/$Y/Immobilizing Shatter§'. §:br§ Cost: 2 perk points",
    icon: "immobilizing_shatter",
    left_of: "mage_22",
    effect: [
      {grant_skill: copy(moves.immobilizing_shatter)},
    ],
  },
  mage_24: {
    name: "Weigh Down Thy Foe",
    cost: 2,
    desc: "Increase §/$Y/Immobilizing Shatter§'s speed debuff by 10% and time by 2s, but increase cooldown by 2s. §:br§ Cost: 2 perk points",
    icon: "speed_down",
    down_of: "mage_23",
    effect: [
      {modify_status: "speed_down", target: "lower", by: 0.1},
      {modify_status: "speed_down", target: "lasts", by: 2},
      {modify_skill: "immobilizing_shatter", target: "cooldown", by: 2}
    ],
  },
  mage_25: {
    name: "Weapon of Mass Destruction",
    cost: 1,
    desc: "Increases §/$Y/Fireball§'s damage by 12% and base damage by 8, but increases §/$B/MP§ cost by 30. §:br§ Cost: 1 perk point",
    icon: "weapon_icon",
    down_of: "mage_16",
    effect: [
      {modify_skill: "fireball", target: "power", by: 0.12},
      {modify_skill: "fireball", target: "base", by: 8},
      {modify_skill: "fireball", target: "mp_cost", by: 30}
    ],
  },
  mage_26: {
    name: "Hastened Casting",
    cost: 1,
    desc: "Lowers §/$Y/Fireball§'s cooldown by 2s, but increases §/$B/MP§ cost by 15. §:br§ Cost: 1 perk point",
    icon: "weapon_icon",
    left_of: "mage_25",
    effect: [
      {modify_skill: "fireball", target: "cooldown", by: -2},
      {modify_skill: "fireball", target: "mp_cost", by: 15}
    ],
  },
  mage_27: {
    name: "The Flame Lancer",
    cost: 1,
    desc: "Increases §/$Y/Fire Lance§'s penetration by 10% and base damage by 7, but increases §/$B/MP§ cost by 30. §:br§ Cost: 1 perk point",
    icon: "fire_lance",
    right_of: "mage_18",
    effect: [
      {modify_skill: "fire_lance", target: "penetration", by: 0.1},
      {modify_skill: "fire_lance", target: "base", by: 7},
      {modify_skill: "fire_lance", target: "mp_cost", by: 30}
    ],
  },
  mage_28: {
    name: "Just Pump More Juice Into It!",
    cost: 1,
    desc: "Increases §/$Y/Fire Lance§'s damage by 25% and §/green/removes§ cooldown, but increases §/$B/MP§ cost by 55. §:br§ Cost: 1 perk point",
    icon: "weapon_icon",
    down_of: "mage_27",
    effect: [
      {modify_skill: "fire_lance", target: "power", by: 0.25},
      {modify_skill: "fire_lance", target: "cooldown", by: -4},
      {modify_skill: "fire_lance", target: "mp_cost", by: 55}
    ],
  },
  mage_29: {
    name: "Commitment to Offense",
    cost: 3,
    desc: "Increases magical damage by 25%. §:br§ Cost: 3 perk points",
    icon: "wisdom",
    down_of: "mage_21",
    effect: [
      {increase: "magical_multiplier", by: 0.25},
    ],
  },
  mage_30: {
    name: "Forsaking the Flesh",
    cost: 4,
    desc: "Increases magical damage by 45%, but §/$R/lowers§ strength by 10 and §/$R/HP§ by 50. §:br§ Cost: 4 perk points",
    icon: "damage_icon",
    down_of: "mage_29",
    effect: [
      {increase: "magical_multiplier", by: 0.45},
      {increase: "maxhp", by: -50},
      {increase_stat: "str", by: -10}
    ],
  },
}

let paladin_tree = {
  colors: {
    reg: "#fc8803",
    box: "#c76f0a",
    name: "Paladin Tree",
    id: "paladin"
  },
  paladin_1: {
    first: true,
    name: "Grasping the Holy Grace",
    cost: 1,
    desc: "Increases vitality by 1 and grants spell '§/$Y/Holy Grace§'. §:br§ Cost: 1 perk point",
    icon: "holy",
    effect: [
      {increase_stat: "vit", by: 1},
      {increase: "maxhp", by: 10},
      {grant_skill: copy(moves.holy_grace)}
    ],
  },
  paladin_2: {
    name: "Divine Protection",
    cost: 1,
    desc: "Increases both §/$Y/physical§ and §/$B/magical§ resistances by 2%.§:br§ Cost: 1 perk point",
    icon: "defense",
    down_of: "paladin_1",
    effect: [
      {increase: "physical_resistance", by: 2},
      {increase: "magical_resistance", by: 2},
    ],
  },
  paladin_10: {
    name: "Light from Within",
    cost: 2,
    desc: "Increases §/$Y/Holy Grace§'s healing by 3% and effect time by 1s. §:br§ Cost: 2 perk points",
    icon: "holy_grace",
    down_of: "paladin_2",
    effect: [
      {modify_status: "holy_recovery", target: "heal_ot", by: 0.03},
      {modify_status: "holy_recovery", target: "lasts", by: 1},
    ],
  },
  paladin_11: {
    name: "Solemn Prayer",
    cost: 2,
    desc: "Increases §/$Y/Holy Grace§'s healing by 2% and effect time by 3s, but increases §/$B/MP§ cost by 50. §:br§ Cost: 2 perk points",
    icon: "holy_grace",
    down_of: "paladin_10",
    effect: [
      {modify_status: "holy_recovery", target: "heal_ot", by: 0.02},
      {modify_status: "holy_recovery", target: "lasts", by: 3},
      {modify_skill: "holy_grace", target: "mp_cost", by: 50},
    ],
  },
  path_paladin_1: {
    name: "PATH",
    GET_FROM: "paladin_2",
    left_of: "paladin_2"
  },
  paladin_3: {
    name: "Divine Flesh",
    cost: 2,
    desc: "Increases §/$R/HP§ by 30. §:br§ Cost: 2 perk points",
    icon: "health_icon",
    left_of: "path_paladin_1",
    requires: "paladin_2",
    effect: [
      {increase: "maxhp", by: 30},
    ],
  },
  paladin_12: {
    name: "Reward Our Faith",
    cost: 1,
    desc: "Increases §/$B/MP§ by 50. §:br§ Cost: 1 perk point",
    icon: "holy",
    down_of: "paladin_3",
    effect: [
      {increase: "maxmp", by: 50},
    ],
  },
  paladin_4: {
    name: "Holy Guardian",
    cost: 2,
    desc: "Increases §/$R/HP§ by 25 and physical resistance by 3%. §:br§ Cost: 2 perk points",
    icon: "physical_resistance",
    left_of: "paladin_3",
    effect: [
      {increase: "maxhp", by: 25},
      {increase: "physical_resistance", by: 3}
    ],
  },
  paladin_5: {
    name: "Dispelling Light",
    cost: 1,
    desc: "Grants skill '§/$Y/Dispelling Light§'. §:br§ Cost: 1 perk point",
    icon: "dispelling_light",
    left_of: "paladin_4",
    effect: [
      {grant_skill: copy(moves.dispelling_light)},
    ],
  },
  paladin_6: {
    name: "Everlasting Prayer",
    cost: 1,
    desc: "Increases '§/$Y/Dispelling Light§'s effect time by 2s. §:br§ Cost: 1 perk point",
    icon: "holy",
    down_of: "paladin_5",
    effect: [
      {modify_status: "holy_resist", target: "lasts", by: 2},
    ],
  },
  paladin_7: {
    name: "Strenghtened by Crucifixion",
    cost: 2,
    desc: "Increases §/$R/HP§ by 100. §:br§ Cost: 2 perk points",
    icon: "defense",
    down_of: "paladin_4",
    effect: [
      {increase: "maxhp", by: 100},
    ],
  },
  paladin_8: {
    name: "A Body of Steel...",
    cost: 1,
    desc: "Increases §/$Y/physical resistance§ by 8%. §:br§ Cost: 1 perk point",
    icon: "physical_resistance",
    down_of: "paladin_7",
    effect: [
      {increase: "physical_resistance", by: 8},
    ],
  },
  paladin_9: {
    name: "And an Iron Will",
    cost: 1,
    desc: "Increases §/$Y/magical resistance§ by 8%. §:br§ Cost: 1 perk point",
    icon: "magical_resistance",
    down_of: "paladin_8",
    effect: [
      {increase: "magical_resistance", by: 8},
    ],
  },
  path_paladin_2: {
    name: "PATH",
    GET_FROM: "paladin_2",
    right_of: "paladin_2"
  },
  paladin_14: {
    name: "Strength Training",
    cost: 2,
    desc: "Increases strength by 4. §:br§ Cost: 2 perk points",
    icon: "strength",
    right_of: "path_paladin_2",
    requires: "paladin_2",
    effect: [
      {increase_stat: "str", by: 4},
    ],
  },
  paladin_15: {
    name: "Divine Blade",
    cost: 2,
    desc: "Grant skill '§/$Y/Blessed Weapon§'. §:br§ Cost: 2 perk points",
    icon: "blessed_weapon",
    right_of: "paladin_14",
    effect: [
      {grant_skill: copy(moves.blessed_weapon)},
    ],
  },
  paladin_16: {
    name: "Crusader Bladework",
    cost: 2,
    desc: "Improve §/$Y/Blessed Weapon§'s damage by 5% and time by 1s. §:br§ Cost: 2 perk points",
    icon: "weapon_icon",
    down_of: "paladin_15",
    effect: [
      {modify_status: "damage_up", target: "damage_buff", by: 0.05},
      {modify_status: "damage_up", target: "lasts", by: 1},
    ],
  },
  paladin_17: {
    name: "Crusader King",
    cost: 3,
    desc: "Increase physical damage by 5%, §/$R/HP§ by 25 and magical resistance by 2% §:br§ Cost: 3 perk points",
    icon: "crusader",
    down_of: "paladin_16",
    effect: [
      {increase: "physical_multiplier", by: 0.05},
      {increase: "maxhp", by: 25},
      {increase: "magical_resistance", by: 2}
    ],
  },
  paladin_18: {
    name: "Blessed Be Thy Blade",
    cost: 1,
    desc: "Increases physical damage by 7%. §:br§ Cost: 1 perk points",
    icon: "weapon_icon",
    right_of: "paladin_15",
    effect: [
      {increase: "physical_multiplier", by: 0.07},
    ],
  },
  paladin_19: {
    name: "Holy Arrow",
    cost: 1,
    desc: "Grant spell '§/$Y/Holy Arrow§'. §:br§ Cost: 1 perk point",
    icon: "holy_arrow",
    down_of: "paladin_14",
    effect: [
      {grant_skill: copy(moves.holy_arrow)},
    ],
  },
  paladin_20: {
    name: "Blessing The Arrow",
    cost: 1,
    desc: "Increases §/$Y/Holy Arrow§'s damage by 90% and base damage by 8, but §/red/doubles§ §/$B/MP§ cost. §:br§ Cost: 1 perk point",
    icon: "holy",
    left_of: "paladin_19",
    effect: [
      {modify_skill: "holy_arrow", target: "power", by: 0.9},
      {modify_skill: "holy_arrow", target: "base", by: 8},
      {modify_skill: "holy_arrow", target: "mp_cost", by: 30},
    ],
  },
  paladin_21: {
    name: "God's Blow",
    cost: 1,
    desc: "Grants skill '§/$Y/Holy Smite§'. §:br§ Cost: 1 perk points",
    icon: "holy_smite",
    right_of: "paladin_18",
    effect: [
      {grant_skill: copy(moves.holy_smite)},
    ],
  },
  paladin_22: {
    name: "Charging the Word",
    cost: 1,
    desc: "Increases §/$Y/Holy Smite§'s damage by 25% and base damage by 2, but increases cooldown by 1s. §:br§ Cost: 1 perk points",
    icon: "weapon_icon",
    down_of: "paladin_21",
    effect: [
      {modify_skill: "holy_smite", target: "power", by: 0.25},
      {modify_skill: "holy_smite", target: "base", by: 5},
      {modify_skill: "holy_smite", target: "cooldown", by: 1}
    ],
  },
  paladin_23: {
    name: "Cracking the Apostates!",
    cost: 1,
    desc: "Increases §/$Y/Holy Smite§'s base damage by 3 and gives 15% penetration, but increases cooldown by 2s. §:br§ Cost: 1 perk points",
    icon: "weapon_icon",
    down_of: "paladin_22",
    effect: [
      {modify_skill: "holy_smite", target: "penetration", by: 0.15},
      {modify_skill: "holy_smite", target: "base", by: 10},
      {modify_skill: "holy_smite", target: "cooldown", by: 2}
    ],
  },
  paladin_24: {
    name: "Sheer Might And Guts",
    cost: 4,
    desc: "Increase physical damage by 4%, §/$R/HP§ by 75 and strength by 5. §:br§ §/$R/Lowers§ intelligence by 2. §:br§ Cost: 4 perk points",
    icon: "weapon_icon",
    down_of: "paladin_17",
    effect: [
      {increase: "physical_multiplier", by: 0.04},
      {increase: "maxhp", by: 75},
      {increase_stat: "str", by: 5},
      {increase_stat: "int", by: -2},
      {increase: "maxmp", by: -10}
    ],
  },
  paladin_25: {
    name: "Commitment to Defense",
    cost: 2,
    desc: "Increases §/$R/HP§ by 200. §:br§ Cost: 2 perk points",
    icon: "defense",
    right_of: "paladin_9",
    effect: [
      {increase: "maxhp", by: 200},
    ],
  },
  paladin_26: {
    name: "Accept The Spirit",
    cost: 2,
    desc: "Increases physical damage by 9%. §:br§ Cost: 2 perk points",
    icon: "damage_icon",
    left_of: "paladin_24",
    effect: [
      {increase: "physical_multiplier", by: 0.09},
    ],
  },
}

let trees = {
  warrior: true,
  mage: true,
  paladin: true
}

var selected_tree = warrior_tree;