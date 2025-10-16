/**
 * Task Dependency Solver
 * 
 * You are building a build system that executes tasks in the correct order.
 * Given a list of tasks where each task has a name, a list of dependencies
 * (other task names that must complete first), and an execution time in seconds,
 * determine the earliest possible completion time for all tasks, assuming
 * tasks can run in parallel when their dependencies are met.
 * 
 * Input: An object where keys are task names and values are objects containing:
 *   - dependencies: string[] (names of tasks that must complete first)
 *   - duration: number (execution time in seconds)
 * 
 * Output: A number representing the earliest time (in seconds) when all tasks
 *         are complete, or -1 if there's a circular dependency.
 * 
 * Rules:
 * - Tasks with no unmet dependencies start at time 0
 * - Tasks can run in parallel
 * - A task starts as soon as ALL its dependencies complete
 * - If task A depends on task B with duration 5, and task C depends on both A (duration 3)
 *   and B, then C starts at time 8 (when A completes, which is later than B at time 5)
 * - Circular dependencies are invalid and should return -1
 * - Empty task lists complete at time 0
 * - All durations are non-negative integers
 * 
 * Examples:
 * 
 * Input: { compile: { dependencies: [], duration: 10 }, test: { dependencies: ["compile"], duration: 5 } }
 * Output: 15 (compile finishes at 10, test starts at 10 and finishes at 15)
 * 
 * Input: { A: { dependencies: ["B"], duration: 1 }, B: { dependencies: ["A"], duration: 1 } }
 * Output: -1 (circular dependency)
 * 
 * Input: { 
 *   download: { dependencies: [], duration: 8 },
 *   parse: { dependencies: ["download"], duration: 3 },
 *   validate: { dependencies: ["download"], duration: 2 },
 *   process: { dependencies: ["parse", "validate"], duration: 5 }
 * }
 * Output: 16 (download at 0-8, parse at 8-11, validate at 8-10, process at 11-16)
 */


/*

problem intuition

- have tasks
- tasks have dependencies
- tasks have execution time

tasks with no unmmet dependencies can have start time is 0
tasks can run in parallel
a task starts as soon as all dependencies have finished


Problem components
- input is key pair value with keys and dependencies and durations


Solution components
- calculate earliest possible completion
- tasks can run in parallel


output is earliest time in seconds when all tasks are complete
or -1 if there is circular dependency


variables



*/


type CalculationCompletionTime = number | undefined

type TaskObject = {
  dependencies: string[]
  duration: number
}

type Task = string

type Tasks = {
  [key: string]: TaskObject
}

type TaskOrder = {
  task: string
  duration: number
}

type DependencyChain = [{
  task: Task
  duration: number
}]

type FinalDependencyChains = DependencyChain[]

export function calculateCompletionTime(tasks: any): any {

  let calculationCompletionTime: CalculationCompletionTime = 0
  let dependencyArray = []
  let duration = 0
  let dependencyChain = []

  // if there is no dependency chain add to the completion time
  // if there are dependencies, find the the duration of the dependencies and
  // if there are 

  const taskArray = Object.keys(tasks)
  const numTasks = taskArray.length
  console.log('task length:', numTasks)

  // to keep track of dependency chains. array of objects and duration
  let finalDependencyChains:FinalDependencyChains = []

  
  // for each task (key value pair), in the tasksObject
  for (const [taskKey, taskObject] of Object.entries(tasks)) {
    console.log('taskKey:', taskKey)
    console.log('object:', taskObject)
    let taskDependencies = taskObject.dependencies
    console.log(`task dependencies for ${taskKey}: ${taskDependencies}`)

    // if the task has no dependencies, it may be pushed into the finalDependencyChain
    if (taskDependencies.length ===  0) {
      duration += taskObject.duration
      console.log(`Duration: ${duration}`)
      finalDependencyChains.push({task: taskKey, duration: duration})
      console.log('final dependency chain:', finalDependencyChains)
    }
    // if there are dependencies, determine the task run order
  }


  // after determining the dependency chains, sum up anything that can run
  for (dependencyChain of finalDependencyChains) {
    calculationCompletionTime += dependencyChain.duration
    console.log(dependencyChain.duration)
    console.log('final completion times:', calculationCompletionTime)
  }
  

  // if no tasks
  if (numTasks === 0) {
    calculationCompletionTime = 0
    console.log('No tasks, final completion time:', calculationCompletionTime)
  }

  
  
  // if (tasks.length === 0) {
  //   let calculationCompletionTime = -1
  // }

  return calculationCompletionTime
  
}

