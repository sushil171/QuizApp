import React , { Component } from 'react'
import ReactDOM from 'react-dom'
import "./assets/style.css";
import quizService from './quizService'
import QuestionBox from './components/QuestionBox';
import Result from './components/Result';

class QuizApp extends Component {

    state = {
        questionBank: [],
        score:0,
        responses:0
    };

    getQuestion = () => {
        quizService().then(question =>{
            this.setState({
                questionBank: question
            });
        });
    };

    componentDidMount()
    {
        this.getQuestion();
    }

    playAgain = () =>{
        this.getQuestion();
        this.setState({
            score:0,
            responses:0
        })

    }

    computeAnswer = (answer , correctAnswer) =>{

        if(answer === correctAnswer )
          {
              this.setState({
                  score:this.state.score+1,
                  responses:this.state.responses+1
              });
          }
         this.setState({
             responses: this.state.responses<5 ? this.state.responses+1 : 5
         });

         

    }
  render() {
    return (
      <div className="container">
       <div className="title">QuizzBEE</div>
          {
              this.state.questionBank.length >0  &&
              this.state.questionBank.map(
                  ({question,answers,correct,questionId}) => 
                  (
                <QuestionBox 

                question = {question}
                options = {answers}
                key={questionId}
                selected={answer => this.computeAnswer(answer,correct)}
                 />
                  )
                  )}     

                {this.state.responses===5 ? (<Result score={this.state.score} playAgain={this.playAgain} />) : null }   
      </div>
    );
  }
}

ReactDOM.render(<QuizApp /> , document.getElementById('root'));
