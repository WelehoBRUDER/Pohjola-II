let dungeon = {
  floor1: {
    name: "Floor 1",
    beaten: false,
    stages: {
      stage0: {
        name: "Stage 0",
        beaten: false,
        gauntlet: [
          copy(enemies.skeleton),
          copy(enemies.skeleton)
        ]
      },
      stage1: {
        name: "Stage 1",
        beaten: false,
        gauntlet: [
          copy(enemies.goblin)
        ]
      },
      stage2: {
        name: "Stage 2",
        beaten: false,
        gauntlet: [
          copy(enemies.skeleton),
          copy(enemies.goblin)
        ]
      },
      stage3: {
        name: "Stage 3",
        beaten: false,
        gauntlet: [
          copy(enemies.skeleton),
          copy(enemies.goblin),
          copy(enemies.skeleton)
        ]
      },
      stage4: {
        name: "Stage 4",
        beaten: false,
        gauntlet: [
          copy(enemies.goblin),
          copy(enemies.goblin),
        ]
      },
      stage5: {
        name: "Stage 5",
        beaten: false,
        gauntlet: [
          copy(enemies.orc),
        ]
      },
      stage6: {
        name: "Stage 6",
        beaten: false,
        gauntlet: [
          copy(enemies.goblin),
          copy(enemies.orc),
        ]
      },
      stage7: {
        name: "Stage 7",
        beaten: false,
        gauntlet: [
          copy(enemies.orc),
          copy(enemies.orc),
        ]
      },
      stage8: {
        name: "Stage 8",
        beaten: false,
        gauntlet: [
          copy(enemies.skeleton_knight),
        ]
      },
      stage9: {
        name: "Stage 9",
        beaten: false,
        gauntlet: [
          copy(enemies.orc),
          copy(enemies.orc),
          copy(enemies.skeleton_knight),
        ]
      },
      stage10: {
        name: "Stage 10",
        beaten: false,
        gauntlet: [
          copy(enemies.orc_berserker),
        ]
      },
      stage11: {
        name: "Stage 11",
        beaten: false,
        gauntlet: [
          copy(enemies.skeleton_knight),
          copy(enemies.orc_berserker),
        ]
      },
      stage12: {
        name: "Stage 12",
        beaten: false,
        gauntlet: [
          copy(enemies.skeleton_knight),
          copy(enemies.orc_berserker),
          copy(enemies.skeleton_knight),
        ]
      },
      stage13: {
        name: "Stage 13",
        beaten: false,
        gauntlet: [
          copy(enemies.orc_berserker),
          copy(enemies.orc_berserker),
        ]
      },
      stage14: {
        name: "Stage 14",
        beaten: false,
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
        beaten: false,
        gauntlet: [
          copy(enemies.death_knight),
        ]
      },
    }
  }
}