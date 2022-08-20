function calculateDmg(actor, target, move) {
  let damage = actor.weapon.damage + (move.base ? move.base : 0);
  let multiplier = 1;
  let res;
  if (move == "defaultAttack" || move?.physical) {
    res = target.physical_resistance / 100;
    multiplier +=
      (actor.stats.str / 20) *
      (1 + (actor.physical_multiplier ? actor.physical_multiplier : 0)) *
      (move.power ? move.power : 1);
    res = res * (1 + resistance_modifiers(target, "physical_resistance"));
    if (move?.penetration) res = res * move.penetration;
    res = 1 - res;
    if (res > 1) res = 1;
    else if (res < 0) res = 0;
    damage = damage * res * multiplier;
    damage = (damage / getAttackDebuffs(actor)) * getAttackBuffs(actor);
    return damage;
  } else {
    damage =
      (move.base
        ? move.base
        : 0 + actor.wand?.mag_damage
        ? actor.wand.mag_damage
        : 0) * (actor.wand?.magical_power ? actor.wand.magical_power : 1);
    res = target.magical_resistance / 100;
    multiplier +=
      (actor.stats.int / 20) *
      (1 + (actor.magical_multiplier ? actor.magical_multiplier : 0)) *
      (move.power ? move.power : 1);
    res = res * (1 + resistance_modifiers(target, "magical_resistance"));
    if (move?.penetration) res = res * move.penetration;
    res = 1 - res;
    if (res > 1) res = 1;
    else if (res < 0) res = 0;
    damage = damage * res * multiplier;
    damage = (damage / getAttackDebuffs(actor)) * getAttackBuffs(actor);
    return damage;
  }
}

function getAttackBuffs(char) {
  let buff = 1;
  for (let status of char.statuses) {
    if (status.damage_buff) {
      buff += status.damage_buff;
    }
  }
  return buff;
}

function getAttackDebuffs(char) {
  let debuff = 1;
  for (let status of char.statuses) {
    if (status.damage_debuff) {
      debuff += status.damage_debuff;
    }
  }
  return debuff;
}

function enemyCanHeal() {
  for (let item of enemy.items) {
    if (item?.recover == "hp" && item.amount > 0) return true;
  }
  return false;
}

function resistance_modifiers(char, res) {
  let modifier = 0;
  for (let resist of char.statuses) {
    if (!resist.target) continue;
    if (resist.target == res) modifier += resist.power;
  }
  return modifier;
}

function createStatuses() {
  // Enemy statuses
  $("enemyStatusEffects").textContent = "";
  $("playerStatusEffects").textContent = "";
  for (let status of enemy.statuses) {
    let container = create("div");
    container.id = status.id;
    let img = create("img");
    img.src = "images/" + status.id + ".png";
    let last = create("p");
    last.textContent = Math.ceil(status.lasts) + "s";
    if (status.does_not_decay) last.textContent = "∞";
    addHoverBox(container, texts[status.id], texts[status.id] / 3);
    container.appendChild(img);
    container.appendChild(last);
    $("enemyStatusEffects").appendChild(container);
  }
  for (let status of player.statuses) {
    let container = create("div");
    container.id = status.id;
    let img = create("img");
    img.src = "images/" + status.id + ".png";
    let last = create("p");
    last.textContent = Math.ceil(status.lasts) + "s";
    if (status.does_not_decay) last.textContent = "∞";
    addHoverBox(container, texts[status.id], texts[status.id] / 3);
    container.appendChild(img);
    container.appendChild(last);
    $("playerStatusEffects").appendChild(container);
  }
}

function hurtEnemy(move) {
  if (enemy.dodge >= Math.random()) {
    createParticle("DODGE", Y, $("enemySprite"));
    createEventlog(player.name, move.name);
    player.mp -= move.mp_cost;
    return;
  }
  PlayHitSound();
  game.classList.add("shake1");
  $("enemySpriteContainer").classList.add("shake2");
  let damage = Math.floor(calculateDmg(player, enemy, move));
  if (damage < 0) damage = 0;
  damage = Math.floor(damage);
  enemy.hp -= damage;
  if (damage > game_stats.most_damage_dealt)
    game_stats.most_damage_dealt = damage;
  createParticle(damage, "red", $("enemySprite"));
  createEventlog(player.name, move.name);
  if (move.status) {
    enemy.statuses.push(copy(player.move_statuses[move.status]));
    createStatuses();
  }
  player.mp -= move.mp_cost;
  if (enemy.hp < 0) enemy.hp = 0;
}

function attackEnemy() {
  if (enemy.dodge >= Math.random()) {
    createParticle("DODGE", Y, $("enemySprite"));
    createEventlog(player.name, "attack");
    return;
  }
  PlayHitSound();
  game.classList.add("shake1");
  $("enemySpriteContainer").classList.add("shake2");
  let damage = 0;
  damage = Math.floor(calculateDmg(player, enemy, "defaultAttack"));
  if (damage < 0) damage = 0;
  damage = Math.floor(damage);
  enemy.hp -= damage;
  if (damage > game_stats.most_damage_dealt)
    game_stats.most_damage_dealt = damage;
  createParticle(damage, "red", $("enemySprite"));
  createEventlog(player.name, "attack");
  if (enemy.hp < 0) enemy.hp = 0;
}

function enemyAttacks(attack) {
  if (player.dodge >= Math.random()) {
    createParticle("DODGE", Y, $("playerSprite"));
    createEventlog(enemy.name, attack.name);
    enemy.mp -= attack.mp_cost;
    return;
  }
  if (attack.status) player.statuses.push(copy(statuses[attack.status]));
  PlayHitSound();
  game.classList.add("shake1");
  $("playerSpriteContainer").classList.add("shake2");
  let damage = 0;
  damage = Math.floor(calculateDmg(enemy, player, attack));
  if (damage < 0) damage = 0;
  damage = Math.floor(damage);
  player.hp -= damage;
  if (damage > game_stats.most_damage_taken)
    game_stats.most_damage_taken = damage;
  enemy.mp -= attack.mp_cost;
  attack.onCooldown = attack.cooldown;
  createParticle(damage, "red", $("playerSprite"));
  createEventlog(enemy.name, attack.name);
  if (player.hp < 0) player.hp = 0;
}

function EnemyAttack() {
  enemy.action_points = 0;
  enemy_turns++;
  state.action = true;
  enemy.statuses[0].damage_buff += 0.003;
  if (enemy.hp / enemy.maxhp <= 0.4) {
    if (enemyCanHeal() && enemy.items.length > 0) {
      for (let item of enemy.items) {
        if (item.recover == "hp" && item.amount > 0) {
          $("enemySprite").classList.add("heal");
          item.amount--;
          enemy.hp += item.value;
          if (enemy.hp > enemy.maxhp) enemy.hp = enemy.maxhp;
          createParticle(item.value, "green", $("enemySprite"));
          createEventlog(enemy.name, item.name);
          break;
        }
      }
      setTimeout(reset, 1000);
      return;
    }
  }
  let attack = enemy.moves[Random(enemy.moves.length)];
  while (attack.onCooldown > 0 || attack.mp_cost > enemy.mp) {
    attack = enemy.moves[Random(enemy.moves.length)];
  }
  if (!attack.physical) {
    $("enemySpriteContainer").classList.add("enemy-attack--magical");
    setTimeout(() => createProjectile(attack.id, $("enemySprite"), false), 400);
    setTimeout(() => enemyAttacks(attack), 1000);
    setTimeout(resetProjectile, 950);
    setTimeout(reset, 1400);
  } else {
    $("enemySpriteContainer").classList.add("enemy-attack");
    setTimeout(() => enemyAttacks(attack), 1050);
    setTimeout(reset, 2000);
  }
}

function PlayerAttack() {
  if (state.action || state.turn != "player") return;
  player.action_points = 0;
  player_turns++;
  state.action = true;
  $("playerSpriteContainer").classList.add("player-attack");
  setTimeout(attackEnemy, 1050);
  setTimeout(reset, 2000);
}

function Ability(move) {
  if (
    state.action ||
    state.turn != "player" ||
    move.onCooldown > 0 ||
    (move.mp_cost > player.mp && move.mp_cost != 0)
  )
    return;
  player.action_points = 0;
  player_turns++;
  state.action = true;
  move.onCooldown = move.cooldown;
  smallUpdate();
  if (move.heal) {
    player.hp += Math.floor(player.maxhp * move.power);
    if (player.hp > player.maxhp) player.hp = player.maxhp;
    let particleColor = "green";
    createParticle(
      Math.floor(player.maxhp * move.power),
      particleColor,
      $("playerSprite")
    );
    createEventlog(player.name, move.name);
    $("playerSprite").classList.add("heal");
    generateMagicalMoves();
    setTimeout(reset, 1000);
  } else if (move.power <= 0) {
    if (move.mp_cost) player.mp -= move.mp_cost;
    $("playerSprite").classList.add("heal");
    player.statuses.push(copy(player.move_statuses[move.status]));
    createParticle(move.name, B, $("playerSprite"));
    createEventlog(player.name, move.name);
    setTimeout(reset, 1000);
  } else if (move.physical) {
    $("playerSpriteContainer").classList.add("player-attack");
    setTimeout(() => hurtEnemy(move), 1050);
    setTimeout(reset, 2000);
  } else {
    $("playerSpriteContainer").classList.add("player-attack--magical");
    setTimeout(() => createProjectile(move.id, $("playerSprite"), true), 400);
    setTimeout(() => hurtEnemy(move), 1000);
    setTimeout(resetProjectile, 950);
    setTimeout(reset, 1400);
  }
}

function UseItem(item) {
  if (state.action || state.turn != "player" || item.amount < 1) return;
  player.action_points = 0;
  player_turns++;
  game_stats.items_used++;
  state.action = true;
  if (item.effects) {
    for (let effect of item.effects) {
      if (effect.timed) {
        if (player.temporary_effects.length === 0) {
          if (effect.increase) {
            player[effect.increase] += effect.by;
            player.temporary_effects.push({
              increase: effect.increase,
              by: effect.by,
              timed: effect.timed,
            });
          } else if (effect.increase_stat) {
            player.stats[effect.increase_stat] += effect.by;
            player.temporary_effects.push({
              increase_stat: effect.increase_stat,
              by: effect.by,
              timed: effect.timed,
            });
          }
        } else
          for (let ef of player.temporary_effects) {
            if (ef.increase == effect.increase) {
              player[ef.increase] -= ef.by;
              player[effect.increase] += effect.by;
              ef.increase = effect.increase;
              ef.timed = effect.timed;
            } else if (ef.increase_stat == ef.increase_stat) {
              player.stats[ef.increase_stat] -= ef.by;
              player.stats[effect.increase_stat] += effect.by;
              ef.increase_stat = effect.increase_stat;
              ef.timed = effect.timed;
            } else if (ef.increase != effect.increase) {
              player[effect.increase] += effect.by;
              player.temporary_effects.push({
                increase: effect.increase,
                by: effect.by,
                timed: effect.timed,
              });
            } else if (ef.increase_stat != effect.increase_stat) {
              player.stats[effect.increase_stat] += effect.by;
              player.temporary_effects.push({
                increase_stat: effect.increase_stat,
                by: effect.by,
                timed: effect.timed,
              });
            }
          }
      } else {
        if (effect.increase_stat)
          player.stats[effect.increase_stat] += effect.by;
        else if (effect.increase)
          player[effect.increase] += effect.increase_stat;
      }
    }
  }
  if (item.recover) {
    item.amount--;
    player[item.recover] += item.value;
    if (player[item.recover] > player["max" + item.recover])
      player[item.recover] = player["max" + item.recover];
    let particleColor = "green";
    if (item.recover == "mp") particleColor = B;
    createParticle(item.value, particleColor, $("playerSprite"));
    createEventlog(player.name, item.name);
    $("playerSprite").classList.add("heal");
    generateInventoryItems();
    setTimeout(reset, 1000);
  }
  if (item.amount < 1)
    for (let i = 0; i < player.items.length; i++) {
      if (player.items[i].id == item.id) player.items.splice(i, 1);
    }
}
