const moves = {
  attack: {
    power: 1,
    penetration: 0,
    mp_cost: 0,
    cooldown: 0,
    physical: true,
    name: "Attack",
    onCooldown: 0,
    base: 0,
  },
  slice: {
    power: 0.8,
    penetration: 0,
    mp_cost: 0,
    cooldown: 0,
    physical: true,
    name: "Slice",
    onCooldown: 0,
    base: 0,
  },
  thrust: {
    power: 1.1,
    penetration: 0.25,
    mp_cost: 0,
    cooldown: 4,
    physical: true,
    name: "Thrust",
    onCooldown: 0,
    base: 0,
  },
  pierce_through: {
    power: 1.2,
    penetration: 0.5,
    mp_cost: 0,
    cooldown: 5,
    physical: true,
    name: "Pierce Through",
    onCooldown: 0,
    base: 0,
    id: "pierce_through",
  },
  heavy_attack: {
    power: 1.5,
    penetration: 0,
    mp_cost: 0,
    cooldown: 4,
    physical: true,
    name: "Heavy Attack",
    onCooldown: 0,
    base: 0,
    id: "heavy_attack",
  },
  holy_smite: {
    power: 1.25,
    penetration: 0,
    mp_cost: 0,
    cooldown: 5,
    physical: true,
    name: "Holy Smite",
    onCooldown: 0,
    base: 0,
    id: "holy_smite",
  },
  sundering_slash: {
    power: 0.6,
    penetration: 0,
    mp_cost: 0,
    cooldown: 7,
    physical: true,
    name: "Sundering Slash",
    onCooldown: 0,
    base: 0,
    id: "sundering_slash",
    status: "sundered",
  },
  cursed_strike: {
    power: 1.3,
    penetration: 0,
    mp_cost: 0,
    cooldown: 8,
    physical: true,
    name: "Cursed Strike",
    onCooldown: 0,
    base: 0,
    id: "cursed_strike",
    status: "curse",
  },
  shields_up: {
    power: 0,
    mp_cost: 0,
    cooldown: 10,
    name: "Shields Up",
    physical: true,
    onCooldown: 0,
    base: 0,
    id: "shields_up",
    status: "resistance",
  },
  bash: {
    power: 0.9,
    penetration: 0,
    mp_cost: 0,
    cooldown: 0,
    physical: true,
    name: "Bash",
    onCooldown: 0,
    base: 0,
  },
  shield_bash: {
    power: 1.3,
    penetration: 0.15,
    mp_cost: 0,
    cooldown: 5,
    physical: true,
    name: "Shield Bash",
    onCooldown: 0,
    base: 0,
  },
  gronk_smash: {
    power: 1.9,
    penetration: 0.25,
    mp_cost: 0,
    cooldown: 0,
    physical: true,
    name: "GRONK SMASH!!",
    onCooldown: 0,
    base: 0,
  },
  gronk_clobber: {
    power: 1.85,
    penetration: 0.3,
    mp_cost: 0,
    cooldown: 0,
    physical: true,
    name: "GRONK CLOB CLOB!!",
    onCooldown: 0,
    base: 0,
  },
  crush: {
    power: 1.0,
    penetration: 0.1,
    mp_cost: 0,
    cooldown: 5,
    physical: true,
    name: "Crush",
    onCooldown: 0,
    base: 0,
  },
  break: {
    power: 1.25,
    penetration: 0.25,
    mp_cost: 0,
    cooldown: 7,
    physical: true,
    name: "Break",
    onCooldown: 0,
    base: 0,
  },
  hack: {
    power: 1.1,
    penetration: 0,
    mp_cost: 0,
    cooldown: 2,
    physical: true,
    name: "Hack",
    onCooldown: 0,
    base: 0,
  },
  fireball: {
    power: 1.4,
    penetration: 0,
    mp_cost: 25,
    cooldown: 0,
    physical: false,
    name: "Fireball",
    onCooldown: 0,
    id: "fireball",
    base: 15,
  },
  mana_blast: {
    power: 1.1,
    penetration: 0,
    mp_cost: 10,
    cooldown: 0,
    physical: false,
    name: "Mana Blast",
    onCooldown: 0,
    id: "mana_blast",
    base: 8,
  },
  grave_floater_blast: {
    power: 1.15,
    penetration: 0,
    mp_cost: 10,
    cooldown: 0,
    physical: false,
    name: "Mana Blast",
    onCooldown: 0,
    id: "grave_floater_blast",
    base: 20,
  },
  power_shot: {
    power: 1.33,
    penetration: 0.7,
    mp_cost: 100,
    cooldown: 0,
    physical: false,
    name: "Power Shot",
    onCooldown: 0,
    id: "power_shot",
    base: 75,
  },
  fire_lance: {
    power: 1.75,
    penetration: 0.6,
    mp_cost: 25,
    cooldown: 3,
    physical: false,
    name: "Fire Lance",
    onCooldown: 0,
    id: "fire_lance",
    base: 19,
  },
  regeneration: {
    power: 0.15,
    penetration: 0,
    mp_cost: 50,
    cooldown: 8,
    physical: false,
    name: "Greater Heal",
    onCooldown: 0,
    id: "regeneration",
    base: 0,
    heal: true,
  },
  astral_lance: {
    power: 1.5,
    penetration: 0.5,
    mp_cost: 25,
    cooldown: 5,
    physical: false,
    name: "Astral Lance",
    onCooldown: 0,
    id: "astral_lance",
    base: 50,
  },
  immobilizing_shatter: {
    power: 1.25,
    penetration: 0,
    mp_cost: 75,
    cooldown: 12,
    physical: false,
    name: "Immobilizing Shatter",
    onCooldown: 0,
    id: "immobilizing_shatter",
    base: 28,
    status: "speed_down",
  },
  vehicle_throw: {
    power: 1.8,
    penetration: 0,
    mp_cost: 500,
    cooldown: 30,
    physical: false,
    name: "Vehicle Throw",
    onCooldown: 0,
    id: "vehicle_throw",
    base: 51,
    status: "speed_down",
  },
  holy_grace: {
    power: 0,
    mp_cost: 10,
    cooldown: 10,
    name: "Holy Grace",
    physical: false,
    onCooldown: 0,
    base: 0,
    id: "holy_grace",
    status: "holy_recovery",
  },
  blessed_weapon: {
    power: 0,
    mp_cost: 0,
    cooldown: 12,
    name: "Blessed Weapon",
    physical: true,
    onCooldown: 0,
    base: 0,
    id: "blessed_weapon",
    status: "damage_up",
  },
  dispelling_light: {
    power: 0,
    mp_cost: 0,
    cooldown: 10,
    name: "Dispelling Light",
    physical: true,
    onCooldown: 0,
    base: 0,
    id: "dispelling_light",
    status: "holy_resist",
  },
  holy_arrow: {
    power: 1.8,
    mp_cost: 30,
    cooldown: 0,
    name: "Holy Arrow",
    physical: false,
    onCooldown: 0,
    base: 15,
    id: "holy_arrow",
  },
};

const statuses = {
  sundered: {
    power: -0.5,
    target: "physical_resistance",
    lasts: 5,
    name: "Sundered",
    id: "sundered",
  },
  resistance: {
    power: 0.6,
    target: "physical_resistance",
    lasts: 5,
    name: "Resistance",
    id: "resistance",
  },
  holy_resist: {
    power: 0.5,
    target: "magical_resistance",
    lasts: 6,
    name: "Holy Resistance",
    id: "holy_resist",
  },
  speed_down: {
    lower: 0.4,
    target: "speed",
    lasts: 5,
    name: "Slowness",
    id: "speed_down",
  },
  speed_up: {
    increase: 0.3,
    target: "speed",
    lasts: 4,
    name: "Quick Moves",
    id: "speed_up",
  },
  holy_recovery: {
    heal_ot: 0.05,
    heal_limit: 0,
    lasts: 6,
    name: "Holy Recovery",
    id: "holy_recovery",
  },
  damage_up: {
    damage_buff: 0.25,
    lasts: 7,
    name: "Damage Increase",
    id: "damage_up",
  },
  curse: {
    dmg_ot: 0.07,
    dmg_limit: 0,
    lasts: 8,
    name: "Cursed",
    id: "curse",
  },
};
