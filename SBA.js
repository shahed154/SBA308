// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
////////             main            //////////
//////                         ////////////////
  function getLearnerData(Course, assignmentGroup, Submissions) {
   
    //let result;
    const groupedSubmissions = seperateLearnersSubmissionsByID(Submissions)
    if(doesAssignmentGroupMatch(Course,assignmentGroup))
    { 
      return processSpecificLearnerGrades(assignmentGroup, groupedSubmissions)
    }
    else
    {
      console.log(`assignment group does not match`)
    }
  }
  
/// test assignment group matching course ID /////
  function doesAssignmentGroupMatch (Courseinfo, AssignmentGroup){
    try {
      if (Courseinfo.id === AssignmentGroup.course_id) {
        return true;
      }
      return false;
    } catch (error) {
      throw new Error('Assignment Group ID doesnt match Course ID');
    }
  }

    // figured out how to turn the date into a date object to compare
    function isAssignmentDue(assignment, learnerSubmission) {
      let dueDate = new Date(assignment.due_at)

      let submittedDate = new Date()
      return dueDate <= submittedDate;
    }
    function isSubmissionLate(assignment, learnerSubmission) {
      let dueDate = new Date(assignment.due_at)

      let submittedDate = new Date(learnerSubmission.submission.submitted_at);
      return submittedDate > dueDate;
    }


function isAssignmentValid(assignmentGroup, submissionId) {

  const assignment = assignmentGroup.assignments.find(array => array.id === submissionId);

  if (!assignment) {
    
    throw new Error("Assignment not found");
    return null;
  }

  return assignment;
}

////////////// make invidual data of students by their id ///////////////
   // tbh idk whati m doing here that well i just copied what this guy did https://www.youtube.com/watch?v=s1XVfm5mIuU
    // my goal is to create an array seperated by the unique learner id while still retaining all the submission info.
    // I REAZLIZED I DONT EVEN NEED THIS 

function seperateLearnersSubmissionsByID(LearnerSubmissions)
{
     const result = LearnerSubmissions.reduce((groupedLearners, learner) => {
      const learnerID = learner.learner_id;
      if (groupedLearners[learnerID] == null) groupedLearners[learnerID] = [];
      groupedLearners[learnerID].push(learner);
      return groupedLearners;
    }, {});
                  const learnerSubmissionsArray = Object.keys(result).map(learnerID => {
                    return result[learnerID];
                  });
      //console.log(learnersubmissions)
                  // returns that output without the '125 and '132' idk if this is the right way but we will press on!!! 
    return learnerSubmissionsArray;
}


//grade the speicfic learners grades  /////////////


  function processSpecificLearnerGrades(assignmentGroup, groupedSubmissions)
  {
    const results = []
    // array.foreach(function name) // (element, index ,array)
    groupedSubmissions.forEach(learnerGroup => {
      const learnerId = learnerGroup[0].learner_id;
     // console.log(`current learner id: ${learnerId}`); // seperates the ids 

      const learnerResult =
      {
        id: learnerId,
      
      };
      let totalWeightedScore = 0;
      let totalPointsPossible = 0;

      // nested for loop  using the seperated ids
      learnerGroup.forEach(learnerSubmission => {
        
        const currentAssignment = isAssignmentValid(assignmentGroup, learnerSubmission.assignment_id);
        if (!isAssignmentDue(currentAssignment,learnerSubmission)) {
         // console.log (`Assignment: ${currentAssignment.id} not due yet`)
          return; // 
        }
     
        let score = learnerSubmission.submission.score;
        
        // Apply late penalty if submitted after due date
        if (isSubmissionLate(currentAssignment, learnerSubmission)) {
          const lateDeduction = currentAssignment.points_possible * 0.1;
          score = Math.max(0, score - lateDeduction);
          console.log(`"${currentAssignment.name}",ID: ${currentAssignment.id}, is late`);
        }
        
     
        const percentage = score / currentAssignment.points_possible;
        learnerResult[currentAssignment.id] = percentage
        totalWeightedScore += score
        totalPointsPossible += currentAssignment.points_possible
  
       learnerResult.avg = totalWeightedScore / totalPointsPossible;
      
        
      });
      
      results.push(learnerResult);

      console.log(`Learner ${learnerId} results:`, learnerResult);
      

    });

    return results;
  }

  // satisfying different loop and continue/break requirements LOL 
// helped me realize i actually did a less efficient way/ did extra steps but i doont want to redo the work tbh 

  function showSubmittedAssignments(assignmentGroup, submissions) {
    console.log("SUBMITTED ASSIGNMENTS:");

    for (let i = 0; i < submissions.length; i++) {

      let submission = submissions[i];
      let learnerId = submission.learner_id;
      let assignmentId = submission.assignment_id;
      
      let assignment = assignmentGroup.assignments.find(array => array.id === assignmentId);
      
      if (!isAssignmentDue(assignment)) {
        console.log( `Learner ${learnerId} assignment "${assignment.name}"  is not due yet`);
        continue; 
      }
      
      console.log(`Learner ${learnerId} completed  "${assignment.name}"`);
    }
  }



 showSubmittedAssignments(AssignmentGroup,LearnerSubmissions)



getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)  ////////****** */

