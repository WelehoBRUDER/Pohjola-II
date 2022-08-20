function Update() {
  // Execute all code under this line 60 times per second.

  // Some stuff
  if (player.maxmp < 0) player.maxmp = 0;
  if (player.maxhp < 0) player.maxhp = 0;
  if (player.mp < 0) player.mp = 0;
  if (player.maxmp < 0) player.mp = 0;

  // Keeping the game window's size updated.
  // This makes sure that everything scales accordingly if screen is resized.
  clientWidth = game.offsetWidth;
  clientHeight = game.offsetHeight;

  // Player action bar fill sequence
  player.speed =
    player.weapon.speed_bonus / 100 +
    player.armor.speed_bonus / 100 +
    player.stats.agi / 100;

  // Cancel update if battle has ended
  if (state.end) return;
  if (!state.paused)
    player.action_points +=
      (0.5 + player.speed / speedDebuffs(player)) * speedBuffs(player);

  // Enemy action bar fill sequence
  enemy.speed = enemy.weapon.speed_bonus / 100 + enemy.stats.agi / 100;
  if (!state.paused)
    enemy.action_points +=
      ((0.5 + enemy.speed) / speedDebuffs(enemy)) * speedBuffs(enemy);

  // Reset action points when they reach their goal
  if (player.action_points >= 100) {
    player.action_points = 100;
    state.paused = true;
    state.turn = "player";
  }
  if (enemy.action_points >= 100) {
    enemy.action_points = 100;
    state.paused = true;
    state.turn = "enemy";
  }

  if (!state.action && state.turn == "enemy") EnemyAttack();

  // Action bar (player)
  $("playerActionbar-fill").style.width = player.action_points + "%";
  $("playerActionbar-percentage").textContent =
    Math.ceil(player.action_points) + "%";

  // Action bar (enemy)
  $("enemyActionbar-fill").style.width = enemy.action_points + "%";
  $("enemyActionbar-percentage").textContent =
    Math.ceil(enemy.action_points) + "%";

  actionBar();

  // Health bar (player)
  $("playerHealthbar-number").textContent =
    player.hp + " / " + player.maxhp + " HP";
  $("playerHealthbar-fill").style.width =
    (player.hp / player.maxhp) * 100 + "%";
  $("playerHealthbar-taken").style.width =
    (player.hp / player.maxhp) * 100 + "%";
  if (player.hp == 0 || player.maxhp == 0)
    $("playerHealthbar-fill").style.boxShadow =
      "0px 0px 0vw 0vw rgb(107, 18, 11)";
  else
    $("playerHealthbar-fill").style.boxShadow =
      "0px 0px 0.25vw 0.2vw rgb(107, 18, 11)";

  // Health bar (enemy)
  $("enemyHealthbar-number").textContent =
    enemy.hp + " / " + enemy.maxhp + " HP";
  $("enemyHealthbar-fill").style.width = (enemy.hp / enemy.maxhp) * 100 + "%";
  $("enemyHealthbar-taken").style.width = (enemy.hp / enemy.maxhp) * 100 + "%";
  if (enemy.hp == 0 || enemy.maxhp == 0)
    $("enemyHealthbar-fill").style.boxShadow =
      "0px 0px 0vw 0vw rgb(107, 18, 11)";
  else
    $("enemyHealthbar-fill").style.boxShadow =
      "0px 0px 0.25vw 0.2vw rgb(107, 18, 11)";

  // Mana bar (player)
  $("playerManabar-number").textContent =
    player.mp + " / " + player.maxmp + " MP";
  $("playerManabar-fill").style.width = (player.mp / player.maxmp) * 100 + "%";
  if (player.maxmp == 0 && player.mp == 0)
    $("playerManabar-fill").style.width = "0%";
  if (player.mp == 0 || player.maxmp == 0)
    $("playerManabar-fill").style.boxShadow = "0px 0px 0vw 0 rgb(12, 58, 110)";
  else
    $("playerManabar-fill").style.boxShadow =
      "0px 0px 0.25vw 0.2vw rgb(12, 58, 110)";

  // Mana bar (enemy)
  $("enemyManabar-number").textContent = enemy.mp + " / " + enemy.maxmp + " MP";
  $("enemyManabar-fill").style.width = (enemy.mp / enemy.maxmp) * 100 + "%";
  if (enemy.maxmp == 0 && enemy.mp == 0)
    $("enemyManabar-fill").style.width = "0%";
  if (enemy.mp == 0 || enemy.maxmp == 0)
    $("enemyManabar-fill").style.boxShadow = "0px 0px 0vw 0 rgb(12, 58, 110)";
  else
    $("enemyManabar-fill").style.boxShadow =
      "0px 0px 0.25vw 0.2vw rgb(12, 58, 110)";

  // Lower cooldowns
  if (!state.paused && !state.action) {
    // moves
    for (let move of player.moves) {
      if (move.onCooldown > 0) {
        move.onCooldown -= 1 / 60;
        if (move.onCooldown <= 0) {
          createEventlog("", "", move.name);
        }
      } else move.onCooldown = 0;
    }
    for (let move of enemy.moves) {
      if (move.onCooldown > 0) move.onCooldown -= 1 / 60;
      else move.onCooldown = 0;
    }
    // statuses
    for (let i = enemy.statuses.length - 1; i >= 0; i--) {
      const status = enemy.statuses[i];
      if (status.does_not_decay) continue;
      if (status.lasts > 0) status.lasts -= 1 / 60;
      else status.lasts = 0;
      if (status.lasts == 0) enemy.statuses.splice(i, 1);
    }
    for (let i = player.statuses.length - 1; i >= 0; i--) {
      const status = player.statuses[i];
      if (status.does_not_decay) continue;
      if (status.lasts > 0) status.lasts -= 1 / 60;
      else status.lasts = 0;
      if (status.lasts == 0) player.statuses.splice(i, 1);
    }
  }

  // Lower temp effects
  if (!state.paused && !state.action) {
    for (let i = 0; i < player.temporary_effects.length; i++) {
      if (player.temporary_effects[i].timed > 0)
        player.temporary_effects[i].timed -= 1 / 60;
      if (player.temporary_effects[i].timed <= 0) {
        player.temporary_effects[i].timed = 0;
        if (player.temporary_effects[i].increase)
          player[player.temporary_effects[i].increase] -=
            player.temporary_effects[i].by;
        else if (player.temporary_effects[i].increase_stat)
          player.stats[player.temporary_effects[i].increase_stat] -=
            player.temporary_effects[i].by;
        player.temporary_effects.splice(i, 1);
      }
    }
  }

  // for effects
  if (player.hp > player.maxhp) player.hp = player.maxhp;
  if (player.mp > player.maxmp) player.mp = player.maxmp;

  // Check heal overtime
  healOT(player);
  healOT(enemy);

  // Check damage overtime
  dmgOT(player);
  dmgOT(enemy);

  // Stop animations when paused
  if (state.paused && !state.action) {
    $("playerActionbar-fill").style.animationPlayState = "paused";
    $("playerHealthbar-fill").style.animationPlayState = "paused";
    $("playerManabar-fill").style.animationPlayState = "paused";
    $("enemyActionbar-fill").style.animationPlayState = "paused";
    $("enemyHealthbar-fill").style.animationPlayState = "paused";
    $("enemyManabar-fill").style.animationPlayState = "paused";
  } else {
    $("playerActionbar-fill").style.animationPlayState = "running";
    $("playerHealthbar-fill").style.animationPlayState = "running";
    $("playerManabar-fill").style.animationPlayState = "running";
    $("enemyActionbar-fill").style.animationPlayState = "running";
    $("enemyHealthbar-fill").style.animationPlayState = "running";
    $("enemyManabar-fill").style.animationPlayState = "running";
  }

  // Random
  playerActionrate =
    (
      ((0.5 + player.speed) / speedDebuffs(player)) *
      speedBuffs(player) *
      60
    ).toFixed(1) + "%";
  enemyActionrate =
    (
      ((0.5 + enemy.speed) / speedDebuffs(enemy)) *
      speedBuffs(enemy) *
      60
    ).toFixed(1) + "%";

  // Check deaths
  if (player.hp <= 0) battleEnd("defeat");
  else if (enemy.hp <= 0) battleEnd("victory");
}
