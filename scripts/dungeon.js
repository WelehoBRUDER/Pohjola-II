let dungeon = {
  floor1: {
    name: "Floor 1",
    stages: {
      stage0: {
        name: "Stage 0",
        gauntlet: [
          copy(enemies.skeleton),
          copy(enemies.skeleton)
        ]
      },
      stage1: {
        name: "Stage 1",
        gauntlet: [
          copy(enemies.goblin)
        ]
      },
      stage2: {
        name: "Stage 2",
        gauntlet: [
          copy(enemies.skeleton),
          copy(enemies.goblin)
        ]
      },
      stage3: {
        name: "Stage 3",
        gauntlet: [
          copy(enemies.skeleton),
          copy(enemies.goblin),
          copy(enemies.skeleton)
        ]
      },
      stage4: {
        name: "Stage 4",
        gauntlet: [
          copy(enemies.goblin),
          copy(enemies.goblin),
        ]
      },
      stage5: {
        name: "Stage 5",
        gauntlet: [
          copy(enemies.orc),
        ]
      },
      stage6: {
        name: "Stage 6",
        gauntlet: [
          copy(enemies.goblin),
          copy(enemies.orc),
        ]
      },
      stage7: {
        name: "Stage 7",

        gauntlet: [
          copy(enemies.orc),
          copy(enemies.orc),
        ]
      },
      stage8: {
        name: "Stage 8",

        gauntlet: [
          copy(enemies.skeleton_knight),
        ]
      },
      stage9: {
        name: "Stage 9",

        gauntlet: [
          copy(enemies.orc),
          copy(enemies.orc),
          copy(enemies.skeleton_knight),
        ]
      },
      stage10: {
        name: "Stage 10",

        gauntlet: [
          copy(enemies.orc_berserker),
        ]
      },
      stage11: {
        name: "Stage 11",

        gauntlet: [
          copy(enemies.skeleton_knight),
          copy(enemies.orc_berserker),
        ]
      },
      stage12: {
        name: "Stage 12",

        gauntlet: [
          copy(enemies.skeleton_knight),
          copy(enemies.orc_berserker),
          copy(enemies.skeleton_knight),
        ]
      },
      stage13: {
        name: "Stage 13",

        gauntlet: [
          copy(enemies.orc_berserker),
          copy(enemies.orc_berserker),
        ]
      },
      stage14: {
        name: "Stage 14",

        gauntlet: [
          copy(enemies.orc),
          copy(enemies.orc),
          copy(enemies.skeleton_knight),
          copy(enemies.orc_berserker),
          copy(enemies.orc_berserker),
        ]
      },
      finalstage: {
        name: "Final Stage",

        gauntlet: [
          copy(enemies.death_knight),
        ]
      },
    }
  },
  floor2: {
    name: "Floor 2",
    stages: {
      f2stage1: {
        name: "Stage 1",
        gauntlet: [
          copy(enemies.ogre),
          copy(enemies.ogre)
        ]
      },
      f2stage2: {
        name: "Stage 2",
        gauntlet: [
          copy(enemies.ogre),
          copy(enemies.ogre),
          copy(enemies.orc_berserker)
        ]
      }
    }
  }
}