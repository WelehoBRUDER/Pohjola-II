function createPerkTree() {
  $("mainWindowContainer").textContent = "";
  let hackywacky = create("div");
  hackywacky.id = "perkBG";
  $("mainWindowContainer").appendChild(hackywacky);
  let title = create("p");
  title.id = "perkTree--title";
  title.textContent = selected_tree.colors.name;
  $("mainWindowContainer").appendChild(title);
  let treeButtons = create("div");
  treeButtons.id = "perkTree--buttons";
  for (let tree in trees) {
    let treeButton = create("div");
    treeButton.id = tree + "_tree";
    treeButton.textContent = tree.toUpperCase();
    if (selected_tree.colors.id == tree)
      treeButton.classList.add("perkTree--buttons-selected");
    treeButton.addEventListener("click", changeTree);
    treeButtons.appendChild(treeButton);
  }
  $("mainWindowContainer").appendChild(treeButtons);
  for (let perk in selected_tree) {
    if (perk == "colors") continue;
    let Perk = selected_tree[perk];
    let div = create("div");
    div.id = perk;
    div.classList.add("perkTree--perk");
    div.style.background = selected_tree.colors.reg;
    div.style.boxShadow = `inset 0vw 0vw 0.2vw 0.2vw ${selected_tree.colors.box}`;
    let ico = create("img");
    ico.src = "images/" + selected_tree[perk].icon + ".png";
    ico.classList.add("perkTree--img");
    if (player.bought_perks[perk]) {
      div.classList.add("perkTree--perk-bought");
    }
    if (Perk.left_of) {
      let origin = $(Perk.left_of);
      div.style.top = pxtovw(origin.offsetTop) + "vw";
      div.style.left = pxtovw(origin.offsetLeft) - 6 + "vw";
      let connecter = create("div");
      connecter.classList.add("perkConnecterSide");
      connecter.style.top = pxtovw(origin.offsetTop) + 2 + "vw";
      connecter.style.left = pxtovw(origin.offsetLeft) - 4 + "vw";
      hackywacky.appendChild(connecter);
      if (
        !player.bought_perks[Perk.left_of] &&
        !Perk.left_of.startsWith("path")
      ) {
        div.classList.add("perkTree--perk-unavailable");
      } else if (Perk.requires) {
        if (!player.bought_perks[Perk.requires]) {
          div.classList.add("perkTree--perk-unavailable");
        }
      }
    } else if (Perk.right_of) {
      let origin = $(Perk.right_of);
      div.style.top = pxtovw(origin.offsetTop) + "vw";
      div.style.left = pxtovw(origin.offsetLeft) + 6 + "vw";
      let connecter = create("div");
      connecter.classList.add("perkConnecterSide");
      connecter.style.top = pxtovw(origin.offsetTop) + 2 + "vw";
      connecter.style.left = pxtovw(origin.offsetLeft) + 4 + "vw";
      hackywacky.appendChild(connecter);
      if (
        !player.bought_perks[Perk.right_of] &&
        !Perk.right_of.startsWith("path")
      ) {
        div.classList.add("perkTree--perk-unavailable");
      } else if (Perk.requires) {
        if (!player.bought_perks[Perk.requires]) {
          div.classList.add("perkTree--perk-unavailable");
        }
      }
    } else if (Perk.down_of) {
      let origin = $(Perk.down_of);
      div.style.top = pxtovw(origin.offsetTop) + 6 + "vw";
      div.style.left = pxtovw(origin.offsetLeft) + "vw";
      let connecter = create("div");
      connecter.classList.add("perkConnecterDown");
      connecter.style.top = pxtovw(origin.offsetTop) + 2 + "vw";
      connecter.style.left =
        pxtovw(origin.offsetLeft + origin.offsetWidth / 2.25) + "vw";
      hackywacky.appendChild(connecter);
      if (
        !player.bought_perks[Perk.down_of] &&
        !Perk.down_of.startsWith("path")
      ) {
        div.classList.add("perkTree--perk-unavailable");
      } else if (Perk.requires) {
        if (!player.bought_perks[Perk.requires]) {
          div.classList.add("perkTree--perk-unavailable");
        }
      }
    } else div.classList.add("perkTree--perk-first");
    if (Perk.name === "PATH") {
      div.classList.add("PERKPATH");
    } else {
      addHoverBox(
        div,
        `§FS1.25FS/$Y/${Perk.name}§` + "§:br§" + Perk.desc,
        Perk.name.length / 1.5
      );
      div.addEventListener("click", buyPerk);
      div.appendChild(ico);
    }
    hackywacky.appendChild(div);
    $("mainWindowContainer").scrollTo(scroll.left, scroll.top);
  }
}

function buyPerk(e) {
  let perk = e.target.id;
  if (
    player.bought_perks[perk] ||
    e.target.classList.contains("perkTree--perk-unavailable")
  )
    return;
  playSound("click");
  if (player.perkpoints >= selected_tree[perk].cost) {
    player.perkpoints -= selected_tree[perk].cost;
    player.bought_perks[perk] = true;
    for (let effect of selected_tree[perk].effect) {
      if (effect.increase_stat) player.stats[effect.increase_stat] += effect.by;
      else if (effect.increase) player[effect.increase] += effect.by;
      else if (effect.grant_skill) {
        player.moves.push(copy(effect.grant_skill));
        if (effect.grant_skill.status)
          player.move_statuses[effect.grant_skill.status] = copy(
            statuses[effect.grant_skill.status]
          );
      } else if (effect.modify_skill) {
        for (let skill of player.moves) {
          if (skill.id == effect.modify_skill) {
            skill[effect.target] += effect.by;
          }
        }
      } else if (effect.modify_status) {
        player.move_statuses[effect.modify_status][effect.target] += effect.by;
      }
    }
    scroll.top = $("mainWindowContainer").scrollTop;
    scroll.left = $("mainWindowContainer").scrollLeft;
    player.hp = getPlayerHP();
    player.mp = player.maxmp;
    updateLeftValues();
    createPerkTree();
  }
}

function changeTree(e) {
  let tree = e.target.id;
  selected_tree = eval(tree);
  createPerkTree();
}
