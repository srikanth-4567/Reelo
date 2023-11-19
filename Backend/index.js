const express = require('express');
const bodyParser = require('body-parser');
const questionStore=require('./QuestionList.json')
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.post('/generate-paper', (req, res) => {
    const { totalMarks, Easypercentage,ModeratePercentage,DifficultPercentage } = req.body
    const questionPaper = generateQuestionPaper(totalMarks, Easypercentage,ModeratePercentage,DifficultPercentage);
    res.json({ questionPaper });
});


function generateQuestionPaper(totalMarks, Easypercentage,ModeratePercentage,DifficultPercentage){
  const easy_marks=totalMarks*Easypercentage/100
  const moderate_marks=totalMarks*ModeratePercentage/100
  const difficult_marks=totalMarks*DifficultPercentage/100



  let marks=0
  const easy_questions = questionStore.questions.map((e) => {
    if (e.difficulty === "Easy" ) {
      marks += e.marks;
      if( marks <= easy_marks){
        return e.question;
    }
    }
    return null;
  })
  .filter((question) => question !== null);
 



  let marks1=0
  const moderate_questions = questionStore.questions
  .map((e) => {
    if (e.difficulty === "Moderate") {
      marks1 += e.marks;
      if( marks1 <= moderate_marks){
          return e.question;
      }
    }
    return null;
  })
  .filter((question) => question !== null);


  let marks2=0
  const difficult_questions = questionStore.questions
  .map((e) => {
    if (e.difficulty === "Difficult") {
      marks2 += e.marks;
      if( marks2 <= difficult_marks){
        return e.question;
    } 
    }
    return null;
  })
  .filter((question) => question !== null);

  return [...easy_questions,...moderate_questions,...difficult_questions]
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
