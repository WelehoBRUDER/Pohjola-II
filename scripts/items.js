const copy = (e) => {return JSON.parse(JSON.stringify(e));}

function addItems(itm, amnt) {
  let item = copy(itm);
  item.amount = amnt;
  return item;
}

const weapons = {
  fists: {
    name: "Fists",
    damage: 3,
    type: "physical",
    speed_bonus: 5
  },
  broken_sword: {
    name: "Broken Sword",
    damage: 5,
    type: "physical",
    speed_bonus: 0
  }
}

const consumables = {
  inferior_healing_potion: {
    id: "inferior_healing_potion",
    name: "Inferior Healing Potion",
    value: 10,
    recover: "hp"
  },
  inferior_mana_potion: {
    id: "inferior_mana_potion",
    name: "Inferior Mana Potion",
    value: 5,
    recover: "mp"
  }
}