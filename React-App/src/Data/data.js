const data = [
  {
    projectID: "sadf32idde",
    projectName: "project1",
    accessCode: "dsjhn323wsdc3lj",
    progresslevels: [
      { levelTag: "initialize", color: "blue" },
      { levelTag: "Working", color: "green" },

      { levelTag: "Testing", color: "red" },
      { levelTag: "Finished", color: "gray" },

    ],
    tasks: [
      {
        taskID: "T1",
        taskname: "task 1",
        progress: 2,
      },
      {
        taskID: "T2",
        taskname: "task 2",
        progress: 2,
      },
      {
        taskID: "T3",
        taskname: "task 3",
        progress: 3,
      },
      {
        taskID: "T4",
        taskname: "task 4",
        progress: 0,
      },
    ],
  },
  {
    projectID: "asfqwdaxc",
    projectName: "project2",
    accessCode: "asuoh229j2",
    progresslevels: [
      { levelTag: "initialize", color: "yellow" },
      { levelTag: "Working", color: "red" },

      { levelTag: "Testing", color: "purple" },
      { levelTag: "Finished", color: "pink" },

    ],
    tasks: [
      {
        taskID: "T1",
        taskname: "Go Home",
        progress: 2,
      },
      {
        taskID: "T2",
        taskname: "Work From Home",
        progress: 3,
      },
      {
        taskID: "T3",
        taskname: "Dancing Box",
        progress: 1,
      },
      {
        taskID: "T4",
        taskname: "Random Task 4",
        progress: 2,
      },
    ],
  },
];
export default data;
