/**
 * Vote Counter
 * 
 * You are running a simple election. Given a list of votes (where each vote is 
 * a string representing a candidate's name), determine the winner of the election.
 * The winner is the candidate with the most votes. In case of a tie, return the 
 * candidate whose name comes first alphabetically.
 * 
 * Input: An array of strings (votes), possibly empty
 * Output: The name of the winning candidate, or null if there are no votes
 * 
 * Examples:
 *   findWinner(["Alice", "Bob", "Alice"]) => "Alice"
 *   findWinner(["Alice", "Bob", "Charlie", "Bob"]) => "Bob"
 *   findWinner(["Alice", "Bob"]) => "Alice" (tie, alphabetical order)
 *   findWinner([]) => null
 */


// problem

/* finding the winner

input is array with name votes
need to count the frequency of names occuring

winner is the one with most votes, return alphabetically if tie

*/

type ElectionWinner = string | null



export function findWinner(votes: string[]): string | null {

  let distinctCandidates: string[] = []
  let finalCounts: any = []
  let electionWinner = null

  // get all the unique names in the votes array
  if (votes.length === 0) {
    electionWinner = null
  } else {
    for (let i = 0; i < votes.length; i++) {
      let name = votes[i]
      
      if (!distinctCandidates.includes(name)) {
        distinctCandidates.push(name)
        console.log('Candidate added to distinct candidates:', distinctCandidates)
      }
    }
    
    // from the unique names, count the votes
    for (let j = 0; j < distinctCandidates.length; j++) {
      const candidate = distinctCandidates[j]
      const candidateVotes = votes.filter(vote => vote === candidate).length
      console.log(`candidate count for ${candidate} is ${candidateVotes}`)
      let finalCount = {
        candidate: candidate,
        votes: candidateVotes
      }
      finalCounts.push(finalCount)
    }
    
    // sort the final votes by count and then alphabetical
    finalCounts.sort((a, b) => b.votes - a.votes || a.candidate.localeCompare(b.candidate))
    console.log('final counts:', finalCounts)
  
    electionWinner = finalCounts[0].candidate
  }

  return electionWinner
    
}
  
  


