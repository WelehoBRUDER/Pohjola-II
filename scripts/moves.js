const moves = {
  attack: {
    power: 1,
    penetration: 0,
    mp_cost: 0,
    cooldown: 0,
    physical: true,
    name: "Attack",
    onCooldown: 0,
    base: 0
  },
  slice: {
    power: 0.8,
    penetration: 0,
    mp_cost: 0,
    cooldown: 0,
    physical: true,
    name: "Slice",
    onCooldown: 0,
    base: 0
  },
  thrust: {
    power: 1.1,
    penetration: 0.25,
    mp_cost: 0,
    cooldown: 4,
    physical: true,
    name: "Thrust",
    onCooldown: 0,
    base: 0
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
    id: "pierce_through"
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
    id: "heavy_attack"
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
    status: "sundered"
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
    status: "resistance"
  },
  bash: {
    power: 0.9,
    penetration: 0,
    mp_cost: 0,
    cooldown: 0,
    physical: true,
    name: "Bash",
    onCooldown: 0,
    base: 0
  },
  crush: {
    power: 1.0,
    penetration: 0.1,
    mp_cost: 0,
    cooldown: 5,
    physical: true,
    name: "Crush",
    onCooldown: 0,
    base: 0
  },
  fireball: {
    power: 1.25,
    penetration: 0,
    mp_cost: 10,
    cooldown: 0,
    physical: false,
    name: "Fireball",
    onCooldown: 0,
    id: "fireball",
    base: 2
  }
}

const statuses = {
  sundered: {
    power: -0.5,
    target: "physical_resistance",
    lasts: 5,
    name: "Sundered",
    id: "sundered"
  },
  resistance: {
    power: 0.6,
    target: "physical_resistance",
    lasts: 5,
    name: "Resistance",
    id: "resistance"
  }
}