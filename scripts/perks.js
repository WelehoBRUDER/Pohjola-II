
let warrior_tree = {
  colors: {
    reg: "#9c271a",
    box: "#701a11"
  },
  warrior_1: {
    first: true,
    name: "Combat Experience",
    cost: 1,
    desc: "Increases strength by 1 and grants skill '§/$Y/Heavy Attack§'. Cost: 1 perk point",
    icon: "weapon_icon",
    effect: [
      {increase_stat: "str", by: 1},
      {grant_skill: copy(moves.heavy_attack)}
    ],
    down: "warrior_2",
    bought: false
  },
  warrior_2: {
    name: "Combat Experience 2: Electric Boogaloo",
    cost: 1,
    desc: "Increases strength by 1 and grants skill '§/$Y/Heavy Attack§'. Cost: 1 perk point",
    icon: "weapon_icon",
    effect: [
      {increase_stat: "str", by: 1},
      {grant_skill: copy(moves.heavy_attack)}
    ],
    down: "warrior_2",
    bought: false
  }
}

var selected_tree = warrior_tree;