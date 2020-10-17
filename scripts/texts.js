const texts = {
  gold: "Your current §/$Y/gold§, a currency valued highly by merchants and bankers alike. §/$Y/Gold§ can be gained by beating enemies and completing §/$Y/quests§.",
  xp: "Your current §/$Y/XP§, experience points. §/$Y/XP§ is gained by defeating enemies, and allows you to level up when reaching the required amount (§$player.xpCap§).",
  you: "This is you, §/$player.color/$player.name§. You are currently level §$player.level§",
  character: "View your current stats and improve them by leveling up.",
  perks: "Advance your perk tree with perk points gained from leveling up.",
  store: "Buy gear, items and knowledge from the merchant of this floor.",
  bank: "Take a loan of gold or store your experience points.",
  floors_stages: "Fight enemies and complete quests by clearing stages and floors of the dungeon.",
  skill: "Your current stat points, used for upgrading your stats (STR, VIT, AGI, INT).",
  perk: "Your current perk points, used for purchasing perks from your perk tree.",
  str: "Your current strength stat. Strength increases weapon damage by 5% per level.",
  vit: "Your current vitality stat. Vitality increases hit points by 10 per level.",
  agi: "Your current agility. Agility increases your speed in combat by roughly 0.6% per level.",
  int: "Your current intelligence stat. Intelligence increases magic damage by 5% and mana by 5 per level.",
  weapon_info: "Currently equipped weapon: §/$Y/$player.weapon.name§",
  damage_info: "Your average damage, calculated from your weapon and stats",
  dodge_info: "Your chance of avoiding enemy attacks during combat.",
  speed_info: "How often, in seconds, you can get your turn in combat. Lower time is better.",
  health_info: "Your maximum hit points in combat.",
  mana_info: "Your maximum mana points in combat.",
  atkbutton: "Attack your opponent with your weapon. Damage is based on your weapon, enemy resistances and your stats.",
  skibutton: "Open container for all of your skills.",
  magbutton: "Open container for all of your spells and other magical powers.",
  itmbutton: "Use an item from your inventory.",
  actionPoints: "Your §/$Y/action bar§. When it is filled, it is your turn to attack. §/$Y/Fillrate§ depends on modifiers, items and stats. Current §/$Y/fillrate§: §$playerActionrate§ per second.",
  healthPoints: "Your hit points. §/$R/HP§ goes down when attacked. When §/$R/HP§ reaches 0, you are §/$Y/defeated§.",
  manaPoints: "Your mana points. §/$B/MP§ is used for certain §/$Y/skills§ and most §/$Y/spells§. §/$B/MP§ can be recovered by drinking §/$Y/potions§.",
  enemyActionPoints: "§$enemy.name§'s §/$Y/action bar§. When it is filled, it's the §$enemy.name§'s turn to attack. §/$Y/Fillrate§ varies by enemy. §$enemy.name§'s §/$Y/fillrate§: §$enemyActionrate§ per second.",
  enemyHealthPoints: "§$enemy.name§'s health points. Enemy §/$R/HP§ goes down when you attack them. When the §$enemy.name§'s §/$R/HP§ reaches 0, you win the battle.",
  enemyManaPoints: "§$enemy.name§'s mana points. §/$B/MP§ goes down whenever the §$enemy.name§ uses special §/$Y/skills§ or §/$Y/spells§. Enemy can only recover §/$B/MP§ with potions.",
  player: "This is your sprite. Your sprite represents you in battle, and will attack, heal and be attacked in your place.",
  enemy: "This is the §$enemy.name§'s sprite. It represents the §$enemy.name§ in battle, and will attack you.",
  pierce_through: "Deals §$getPower(player, pierce_through) * 100§% damage and ignores §$getPenetration(player, pierce_through) * 100§% of armor. Cooldown: §$getCooldown(player, pierce_through)§s",
  fireball: "Deals §$getPower(player, fireball) * 100§% damage. §/$B/MP§ cost: §$getManacost(player, fireball)§",
  inferior_healing_potion: "Recover 10 §/$R/HP§. Consumes your turn.",
  sundering_slash: "Deals §$getPower(player, sundering_slash) * 100§% damage and inflicts status 'Sundered', that halves enemy physical resistance for 5 seconds. Cooldown: §$getCooldown(player, sundering_slash)§s",
  sundered: "§FS0.75FS/white/This character is sundered, reducing their physical resistance by 50%.§",
  shields_up: "Gives you the status 'Resistance', that increases your current physical resistance by 60%. Cooldown: §$getCooldown(player, shields_up)§s",
  resistance: "§FS0.75FS/white/This character is on guard, and thus their physical resistance is increased by 60% of its original value.§"
}