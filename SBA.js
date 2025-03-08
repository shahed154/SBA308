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
  
  function getLearnerData(Course, Group, LearnerSubmission) {
    // here, we would process this data to achieve the desired result.
    let result;

    if(doesAssignmentGroupMatch(Course,Group))
    { 
   

    }
  

    return result;
  }
  
  function doesAssignmentGroupMatch (Courseinfo, AssignmentGroup){
    let result = false;
  try {
     if(Courseinfo.id === AssignmentGroup.course_id){
       result = true;
      console.log('true')
     }
  
   } 
   catch (error) {
    if(Courseinfo.id !== AssignmentGroup.course_id){
       result = false;
      console.log('false')

    throw new error('Assignment Group ID does not match Course ID');
    
    }
  
    } 
  finally {
    //sss
  }

  return result;
  }


// seperatre them by their learner id and make a new array of their grades
  function seperateLearnersSubmissionsByID(LearnerSubmissions)
  {

    // tbh idk whati m doing here that well i just copied what this guy did https://www.youtube.com/watch?v=s1XVfm5mIuU
    // my goal is to create an array seperated by the unique learner id while still retaining all the submission info.

    const result = LearnerSubmissions.reduce((groupedLearners, learner) => {
      const learnerID = learner.learner_id
      if (groupedLearners[learnerID] == null) groupedLearners[learnerID] = [] // creates a new array if this learner id is not already created
      groupedLearners[learnerID].push(learner) /// makes the new array 
      return groupedLearners
    }, {})
    console.log(result)
    // OUT PUT OF THIS 
  // { 
//   '125': [
//     { learner_id: 125, assignment_id: 1, submission: [Object] },
//     { learner_id: 125, assignment_id: 2, submission: [Object] },
//     { learner_id: 125, assignment_id: 3, submission: [Object] }
//   ],
//   '132': [
//     { learner_id: 132, assignment_id: 1, submission: [Object] },
//     { learner_id: 132, assignment_id: 2, submission: [Object] }
//   ]
// }
console.log(result["125"][0].submission)
//  output { submitted_at: '2023-01-25', score: 47 }
  }


//grade the speicfic learners grades 
  function processSpecificLearnerGrades(AssignmentGroup, SeperateLearnerSubmission)
  {
    
  }


  
 // getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)

 seperateLearnersSubmissionsByID(LearnerSubmissions)