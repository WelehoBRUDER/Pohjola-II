const texts = {
  gold: "Your current §/$Y/gold§, a currency valued highly by merchants and bankers alike. §/$Y/Gold§ can be gained by beating enemies and completing §/$Y/quests§. §:br§ Current gold: §/$Y/$spacesToNumber(player.gold)§",
  xp: "Your current §/$Y/XP§, experience points. §/$Y/XP§ is gained by defeating enemies, and allows you to level up when reaching the required amount (§$spacesToNumber(player.xpCap)§).",
  you: "This is you, §/$player.color/$player.name§. §:br§ §FS0.75FS/white/You are currently level§ §/$Y/$player.level§",
  character: "View your current stats and improve them by leveling up.",
  perks: "Advance your perk tree with perk points gained from leveling up.",
  inventory: "Change your equipment and manage your consumables",
  store: "Buy gear, items and knowledge from the merchant of this floor.",
  smithy: "Craft new items or upgrade existing ones.",
  floors_stages:
    "Fight enemies and complete quests by clearing stages and floors of the dungeon.",
  codex: "Find out more about mechanics, items and enemies you've beaten.",
  total_price:
    "The total cost of all your current purchases. Make sure you have enough coin!",
  checkout:
    "Confirm all your selected purchases and add them to your inventory. §:br§ §/orange/Can't be done if you lack the coin!§",
  clear_store: "Clear your current shopping list.",
  saves: "Save your progress and then load it later.",
  skill:
    "Your current stat points, used for upgrading your stats (STR, VIT, AGI, INT).",
  perk: "Your current perk points, used for purchasing perks from your perk tree.",
  str: "Your current strength stat. Strength increases weapon damage by 5% per level. §:br§ §$player.skillpoints > 0 ? 'Click to increase!' : ''§",
  vit: "Your current vitality stat. Vitality increases hit points by 25 per level. §:br§ §$player.skillpoints > 0 ? 'Click to increase!' : ''§",
  agi: "Your current agility. Agility increases your speed in combat by roughly 0.6% per level. §:br§ §$player.skillpoints > 0 ? 'Click to increase!' : ''§",
  int: "Your current intelligence stat. Intelligence increases magic damage by 5% and mana by 5 per level. §:br§ §$player.skillpoints > 0 ? 'Click to increase!' : ''§",
  save_button: "Create new save file or replace old one.",
  load_button: "Load selected save file.",
  delete_button: "Delete selected save file.",
  resetID:
    "Click this button to fix bugs related to selecting a slot (eg. selecting 2 slots when clicking 1).",
  weapon_info: "Currently equipped weapon: §/$Y/$player.weapon.name§",
  damage_info: "Your average damage, calculated from your weapon and stats",
  dodge_info: "Your chance of avoiding enemy attacks during combat.",
  speed_info:
    "How often, in seconds, you can get your turn in combat. Lower time is better.",
  health_info: "Your maximum hit points in combat.",
  mana_info: "Your maximum mana points in combat.",
  physres_info:
    "Your current physical resistance. Physical damage you take is reduced by the indicated number.",
  magires_info:
    "Your current magical resistance. Magical damage is reduced by the indicated number.",
  atkbutton:
    "Attack your opponent with your weapon for §$Math.floor(calculateDmg(player, enemy, 'defaultAttack'))§ damage",
  skibutton: "Open container for all of your skills.",
  magbutton: "Open container for all of your spells and other magical powers.",
  itmbutton: "Use an item from your inventory.",
  actionPoints:
    "Your §/$Y/action bar§. When it is filled, it is your turn to attack. §/$Y/Fillrate§ depends on modifiers, items and stats. Current §/$Y/fillrate§: §$playerActionrate§ per second.",
  healthPoints:
    "Your hit points. §/$R/HP§ goes down when attacked. When §/$R/HP§ reaches 0, you are §/$Y/defeated§.",
  manaPoints:
    "Your mana points. §/$B/MP§ is used for certain §/$Y/skills§ and most §/$Y/spells§. §/$B/MP§ can be recovered by drinking §/$Y/potions§.",
  enemyActionPoints:
    "§$enemy.name§'s §/$Y/action bar§. When it is filled, it's the §$enemy.name§'s turn to attack. §/$Y/Fillrate§ varies by enemy. §$enemy.name§'s §/$Y/fillrate§: §$enemyActionrate§ per second.",
  enemyHealthPoints:
    "§$enemy.name§'s health points. Enemy §/$R/HP§ goes down when you attack them. When the §$enemy.name§'s §/$R/HP§ reaches 0, you win the battle.",
  enemyManaPoints:
    "§$enemy.name§'s mana points. §/$B/MP§ goes down whenever the §$enemy.name§ uses special §/$Y/skills§ or §/$Y/spells§. Enemy can only recover §/$B/MP§ with potions.",
  player:
    "This is your sprite. Your sprite represents you in battle, and will attack, heal and be attacked in your place.",
  enemy:
    "This is the §$enemy.name§'s sprite. It represents the §$enemy.name§ in battle, and will attack, heal and be attacked in §$enemy.name§'s place.",
  pierce_through:
    "Deals §$Math.floor(calculateDmg(player, enemy, getMove(player, 'pierce_through')))§ damage. §:br§ Cooldown: §$getCooldown(player, pierce_through)§s",
  fireball:
    "Deals §$Math.floor(calculateDmg(player, enemy, getMove(player, 'fireball')))§ damage. §:br§ §/$B/MP§ cost: §$getManacost(player, fireball)§ §:br§ §$(getCooldown(player, fireball) > 0 ? 'Cooldown: ' + getCooldown(player, fireball) + 's' : '')§",
  inferior_healing_potion: "Recover 10 §/$R/HP§. Consumes your turn.",
  lesser_healing_potion: "Recover 25 §/$R/HP§. Consumes your turn.",
  healing_potion: "Recover 100 §/$R/HP§. Consumes your turn.",
  medium_healing_potion: "Recover 250 §/$R/HP§. Consumes your turn.",
  greater_healing_potion: "Recover 700 §/$R/HP§. Consumes your turn.",
  vitality_recovery_concoction: "Recover 1500 §/$R/HP§. Consumes your turn.",
  inferior_mana_potion: "Recover 10 §/$B/MP§. Consumes your turn.",
  lesser_mana_potion: "Recover 25 §/$B/MP§. Consumes your turn.",
  mana_potion: "Recover 100 §/$B/MP§. Consumes your turn.",
  medium_mana_potion: "Recover 250 §/$B/MP§. Consumes your turn.",
  agility_potion: "Increases agility by 10 for 15 seconds. Consumes your turn.",
  strength_potion:
    "Increases strength by 10 for 15 seconds. Consumes your turn.",
  sundering_slash:
    "Deals §$Math.floor(calculateDmg(player, enemy, getMove(player, 'sundering_slash')))§ damage and inflicts status 'Sundered', that halves enemy physical resistance for 5 seconds. Cooldown: §$getCooldown(player, sundering_slash)§s",
  heavy_attack:
    "Deals §$Math.floor(calculateDmg(player, enemy, getMove(player, 'heavy_attack')))§ damage. §:br§ §$(getCooldown(player, heavy_attack) > 0 ? 'Cooldown: ' + getCooldown(player, heavy_attack) + 's' : '')§",
  sundered:
    "§FS0.75FS/white/This character is sundered, reducing their physical resistance by 50%.§",
  shields_up:
    "Gives you the status 'Resistance', that increases your current physical resistance by 60%. Cooldown: §$getCooldown(player, shields_up)§s",
  resistance:
    "§FS0.75FS/white/This character is on guard, and thus their physical resistance is increased by 60% of its original value.§",
  mana_blast:
    "Deals §$Math.floor(calculateDmg(player, enemy, getMove(player, 'mana_blast')))§ damage. §:br§ §/$B/MP§ cost: §$getManacost(player, mana_blast)§ §:br§ §$(getCooldown(player, mana_blast) > 0 ? 'Cooldown: ' + getCooldown(player, mana_blast) + 's' : '')§",
  fire_lance:
    "Deals §$Math.floor(calculateDmg(player, enemy, getMove(player, 'fire_lance')))§ damage. §:br§ §/$B/MP§ cost: §$getManacost(player, fire_lance)§ §:br§ §$(getCooldown(player, fire_lance) > 0 ? 'Cooldown: ' + getCooldown(player, fire_lance) + 's' : '')§",
  regeneration:
    "Recovers §$Math.floor(getPower(player, regeneration)*100)§% of max §/$R/HP§. §:br§ Cooldown: §$getCooldown(player, regeneration)§s",
  immobilizing_shatter:
    "Deals §$Math.floor(calculateDmg(player, enemy, getMove(player, 'immobilizing_shatter')))§ damage and causes effect '§/$Y/Slowness§', that lowers enemy speed by §$player.move_statuses.speed_down.lower*100§% for §$player.move_statuses.speed_down.lasts§s. §:br§ §/$B/MP§ cost: §$getManacost(player, immobilizing_shatter)§ §:br§ Cooldown: §$getCooldown(player, immobilizing_shatter)§s",
  speed_down:
    "This character's speed has been lowered by §$player.move_statuses.speed_down.lower*100§%",
  speed_up: "This character's speed has been increased by 30%",
  holy_grace:
    "Recovers §$player.move_statuses.holy_recovery.heal_ot*100§% of max §/$R/HP§ every second for §$player.move_statuses.holy_recovery.lasts§ seconds. §:br§ §/$B/MP§ cost: §$getManacost(player, holy_grace)§ §:br§ Cooldown: §$getCooldown(player, holy_grace)§s",
  holy_recovery:
    "This character will recover §$player.move_statuses.holy_recovery.heal_ot*100§% of max §/$R/HP§ every second.",
  blessed_weapon:
    "Increases damage by §$player.move_statuses.damage_up.damage_buff*100§% for §$player.move_statuses.damage_up.lasts§ seconds. Cooldown: §$getCooldown(player, blessed_weapon)§s",
  damage_up:
    "This character's damage has been increased by §$player.move_statuses.damage_up.damage_buff*100§%.",
  dispelling_light:
    "Increases magical resistance by §$player.move_statuses.holy_resist.power*100§% for §$player.move_statuses.holy_resist.lasts§s. Cooldown: §$getCooldown(player, dispelling_light)§s",
  holy_resist:
    "This character's magical resistance has been increased by §$player.move_statuses.holy_resist.power*100§%.",
  holy_arrow:
    "Deals §$Math.floor(calculateDmg(player, enemy, getMove(player, 'holy_arrow')))§ damage. §:br§ §/$B/MP§ cost: §$getManacost(player, holy_arrow)§",
  _menu_itemuse:
    "Whether or not you will be prompted about using a consumable item from your inventory outside of combat.",
  _menu_sound: "Whether or not you want to hear sound effects while ingame.",
  Soldier: "Gain 10 HP and 2 str. Start with broken sword and leather armor.",
  Barbarian: "Gain 5 HP and 5 str.",
  Scholar: "Gain 10 MP and 2 int. Start with broomstick and rags.",
  holy_smite:
    "Deals §$Math.floor(calculateDmg(player, enemy, getMove(player, 'holy_smite')))§ damage. §:br§ Cooldown: §$getCooldown(player, holy_smite)§s",
  curse: "Deals 7% damage per second.",
};

const settings = {
  dont_ask_when_using_item: false,
  sound_effects: true,
};
