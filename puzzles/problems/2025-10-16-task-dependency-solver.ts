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
 *   and B, then C starts at time 5 (when B completes, which is later than A)
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

export function calculateCompletionTime(tasks: any): any {
  const taskNames = Object.keys(tasks);
  
  if (taskNames.length === 0) {
    return 0;
  }

  // Validate all dependencies exist
  for (const taskName of taskNames) {
    for (const dep of tasks[taskName].dependencies) {
      if (!tasks[dep]) {
        return -1;
      }
    }
  }

  // Detect cycles using DFS
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  
  function hasCycle(taskName: string): boolean {
    visited.add(taskName);
    recursionStack.add(taskName);
    
    for (const dep of tasks[taskName].dependencies) {
      if (!visited.has(dep)) {
        if (hasCycle(dep)) {
          return true;
        }
      } else if (recursionStack.has(dep)) {
        return true;
      }
    }
    
    recursionStack.delete(taskName);
    return false;
  }
  
  for (const taskName of taskNames) {
    if (!visited.has(taskName)) {
      if (hasCycle(taskName)) {
        return -1;
      }
    }
  }

  // Calculate earliest completion time for each task
  const completionTimes = new Map<string, number>();
  
  function calculateTime(taskName: string): number {
    if (completionTimes.has(taskName)) {
      return completionTimes.get(taskName)!;
    }
    
    const task = tasks[taskName];
    let earliestStart = 0;
    
    for (const dep of task.dependencies) {
      const depCompletionTime = calculateTime(dep);
      earliestStart = Math.max(earliestStart, depCompletionTime);
    }
    
    const completionTime = earliestStart + task.duration;
    completionTimes.set(taskName, completionTime);
    return completionTime;
  }
  
  let maxCompletionTime = 0;
  for (const taskName of taskNames) {
    const time = calculateTime(taskName);
    maxCompletionTime = Math.max(maxCompletionTime, time);
  }
  
  return maxCompletionTime;
}

