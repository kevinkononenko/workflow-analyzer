export const workflowStages = [
  {
    id: "define",
    number: "01",
    name: "Define",
    description: "Determine goals and plan resources.",
  },
  {
    id: "locate",
    number: "02",
    name: "Locate",
    description: "Gather items and information needed to do the job.",
  },
  {
    id: "prepare",
    number: "03",
    name: "Prepare",
    description: "Set up the environment to do the job.",
  },
  {
    id: "confirm",
    number: "04",
    name: "Confirm",
    description: "Verify that they are ready to perform the job.",
  },
  {
    id: "execute",
    number: "05",
    name: "Execute",
    description: "Carry out the job.",
  },
  {
    id: "monitor",
    number: "06",
    name: "Monitor",
    description: "Assess whether the job is being successfully executed.",
  },
  {
    id: "modify",
    number: "07",
    name: "Modify",
    description: "Make alterations to improve execution.",
  },
  {
    id: "conclude",
    number: "08",
    name: "Conclude",
    description: "Finish the job or prepare to repeat it.",
  },
];

export const workflowStageIds = new Set(workflowStages.map((stage) => stage.id));
