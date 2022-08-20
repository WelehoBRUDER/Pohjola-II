let dungeon = {
  floor1: {
    name: "Floor 1",
    stages: {
      stage0: {
        name: "Stage 0",
        gauntlet: [copy(enemies.skeleton), copy(enemies.skeleton)],
      },
      stage1: {
        name: "Stage 1",
        gauntlet: [copy(enemies.goblin)],
      },
      stage2: {
        name: "Stage 2",
        gauntlet: [copy(enemies.skeleton), copy(enemies.goblin)],
      },
      stage3: {
        name: "Stage 3",
        gauntlet: [
          copy(enemies.skeleton),
          copy(enemies.goblin),
          copy(enemies.skeleton),
        ],
      },
      stage4: {
        name: "Stage 4",
        gauntlet: [copy(enemies.goblin), copy(enemies.goblin)],
      },
      stage5: {
        name: "Stage 5",
        gauntlet: [copy(enemies.orc)],
      },
      stage6: {
        name: "Stage 6",
        gauntlet: [copy(enemies.goblin), copy(enemies.orc)],
      },
      stage7: {
        name: "Stage 7",

        gauntlet: [copy(enemies.orc), copy(enemies.orc)],
      },
      stage8: {
        name: "Stage 8",

        gauntlet: [copy(enemies.skeleton_knight)],
      },
      stage9: {
        name: "Stage 9",

        gauntlet: [
          copy(enemies.orc),
          copy(enemies.orc),
          copy(enemies.skeleton_knight),
        ],
      },
      stage10: {
        name: "Stage 10",

        gauntlet: [copy(enemies.orc_berserker)],
      },
      stage11: {
        name: "Stage 11",

        gauntlet: [copy(enemies.skeleton_knight), copy(enemies.orc_berserker)],
      },
      stage12: {
        name: "Stage 12",

        gauntlet: [
          copy(enemies.skeleton_knight),
          copy(enemies.orc_berserker),
          copy(enemies.skeleton_knight),
        ],
      },
      stage13: {
        name: "Stage 13",

        gauntlet: [copy(enemies.orc_berserker), copy(enemies.orc_berserker)],
      },
      stage14: {
        name: "Stage 14",

        gauntlet: [
          copy(enemies.orc),
          copy(enemies.orc),
          copy(enemies.skeleton_knight),
          copy(enemies.orc_berserker),
          copy(enemies.orc_berserker),
        ],
      },
      finalstage: {
        name: "Final Stage",

        gauntlet: [copy(enemies.death_knight)],
      },
    },
  },
  floor2: {
    name: "Floor 2",
    stages: {
      stage15: {
        name: "Stage 15",
        gauntlet: [copy(enemies.ogre), copy(enemies.ogre)],
      },
      stage16: {
        name: "Stage 16",
        gauntlet: [
          copy(enemies.ogre),
          copy(enemies.ogre),
          copy(enemies.orc_berserker),
        ],
      },
      stage17: {
        name: "Stage 17",
        gauntlet: [copy(enemies.ogre), copy(enemies.minotaur)],
      },
      stage18: {
        name: "Stage 18",
        gauntlet: [copy(enemies.minotaur), copy(enemies.minotaur)],
      },
      stage19: {
        name: "Stage 19",
        gauntlet: [
          copy(enemies.minotaur),
          copy(enemies.ogre),
          copy(enemies.minotaur),
        ],
      },
      stage20: {
        name: "Stage 20",
        gauntlet: [copy(enemies.spectral_knight)],
      },
      stage21: {
        name: "Stage 21",
        gauntlet: [
          copy(enemies.ogre),
          copy(enemies.minotaur),
          copy(enemies.spectral_knight),
        ],
      },
      stage22: {
        name: "Stage 22",
        gauntlet: [
          copy(enemies.spectral_knight),
          copy(enemies.spectral_knight),
        ],
      },
      stage23: {
        name: "Stage 23",
        gauntlet: [copy(enemies.grave_floater), copy(enemies.spectral_knight)],
      },
      stage24: {
        name: "Stage 24",
        gauntlet: [
          copy(enemies.minotaur),
          copy(enemies.grave_floater),
          copy(enemies.minotaur),
          copy(enemies.spectral_knight),
        ],
      },
      stage25: {
        name: "Stage 25",
        gauntlet: [copy(enemies.gronk)],
      },
      stage26: {
        name: "Stage 26",
        gauntlet: [copy(enemies.lich)],
      },
      stage27: {
        name: "Stage 27",
        gauntlet: [copy(enemies.spectral_knight), copy(enemies.lich)],
      },
      stage28: {
        name: "Stage 28",
        gauntlet: [
          copy(enemies.grave_floater),
          copy(enemies.lich),
          copy(enemies.grave_floater),
        ],
      },
      stage29: {
        name: "Stage 29",
        gauntlet: [
          copy(enemies.lich),
          copy(enemies.lich),
          copy(enemies.spectral_knight),
        ],
      },
      floor2end: {
        name: "Floor 2 End",
        gauntlet: [copy(enemies.wyvern)],
      },
    },
  },
  floor3: {
    name: "Floor 3",
    stages: {
      stage30: {
        name: "Stage 30",
        gauntlet: [copy(enemies.dwarf_warrior)],
      },
      stage31: {
        name: "Stage 31",
        gauntlet: [copy(enemies.dwarf_hero)],
      },
      stage32: {
        name: "Stage 32",
        gauntlet: [copy(enemies.dwarf_warrior), copy(enemies.dwarf_hero)],
      },
      stage33: {
        name: "Stage 33",
        gauntlet: [
          copy(enemies.dwarf_warrior),
          copy(enemies.dwarf_hero),
          copy(enemies.dwarf_warrior),
        ],
      },
      stage34: {
        name: "Stage 34",
        gauntlet: [copy(enemies.dwarf_hero), copy(enemies.dwarf_hero)],
      },
      stage35: {
        name: "Stage 35",
        gauntlet: [copy(enemies.wyvern_rider)],
      },
      stage36: {
        name: "Stage 36",
        gauntlet: [copy(enemies.elven_warrior)],
      },
      stage37: {
        name: "Stage 37",
        gauntlet: [copy(enemies.elven_archer)],
      },
      stage38: {
        name: "Stage 38",
        gauntlet: [copy(enemies.elven_hero)],
      },
      stage39: {
        name: "Stage 39",
        gauntlet: [
          copy(enemies.elven_warrior),
          copy(enemies.elven_archer),
          copy(enemies.elven_hero),
        ],
      },
      stage40: {
        name: "Stage 40",
        gauntlet: [copy(enemies.elven_king)],
      },
      stage41: {
        name: "Stage 41",
        gauntlet: [copy(enemies.dark_elf_warrior)],
      },
      stage42: {
        name: "Stage 42",
        gauntlet: [
          copy(enemies.elven_hero),
          copy(enemies.elven_warrior),
          copy(enemies.dark_elf_warrior),
        ],
      },
      stage43: {
        name: "Stage 43",
        gauntlet: [copy(enemies.corrupted_elf)],
      },
      stage44: {
        name: "Stage 44",
        gauntlet: [copy(enemies.excelsus)],
      },
      college_ball: {
        name: "COLLEGE BALL",
        gauntlet: [copy(enemies.senator_armstrong)],
      },
      _god_: {
        name: "_God_",
        gauntlet: [copy(enemies.blacksmith_andre)],
      },
    },
  },
};
Object.entries(dungeon).forEach(([floor, { stages }]) => {
  Object.entries(stages).map(([key, stage]) => {
    return (stage.id = key);
  });
});
