/**
 * Student Grade Calculator
 *
 * Given an array of student records, find the student with the highest average grade.
 * Each student record contains a name and an array of test scores. Calculate each
 * student's average and return the name of the student with the highest average.
 * If there's a tie, return the student whose name appears first in the array.
 *
 * Input: Array of objects with { name: string, scores: number[] }
 * Output: String representing the name of the top student
 *
 * Examples:
 * - [{ name: "Alice", scores: [85, 90, 78] }, { name: "Bob", scores: [92, 88] }] → "Bob"
 * - [{ name: "Charlie", scores: [80] }, { name: "Dana", scores: [80, 80] }] → "Charlie"
 */

interface student {
  name: string;
  scores: number[];
}

export function findTopStudent(students: student[]): string {
  let averageScores = [];

  for (let student = 0; student < students.length; student++) {
    // for each student
    let Totalscores = 0;

    for (let s = 0; s < students[student].scores.length; s++) {
      // for each grade in student
      Totalscores += students[student].scores[s];
    }

    const average = Totalscores / students[student].scores.length;
    const name = students[student].name;

    averageScores.push({ name, average });
  }

  averageScores.sort((a, b) => a.average - b.average);
  console.log("students" + JSON.stringify(averageScores));

  if (averageScores.length === 0) {
    return "No students provided";
  } else {
    return averageScores[averageScores.length - 1].name;
  }
}
