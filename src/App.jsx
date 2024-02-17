import { useEffect, useState } from 'react'
import React from 'react'
import Question from '/src/Question.jsx'
import {nanoid} from "nanoid"

export default function App() {

    // Starting Quiz
    const [quizStatus, changeStatus] = React.useState(false)

    function startQuiz() {
      changeStatus(oldStatus => !oldStatus)
    }

    // Changing Category
    const [category, setCategory] = React.useState(11)

    function changeCategory(event) {
      setCategory(event.target.value)
    }

    // Getting Questions
    const [questions, setQuestions] = React.useState([])

    React.useEffect(() => {
      console.log(questions);
    }, [questions]);

    async function getQuestions() {
      const res = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}`)
      const data = await res.json()
      
      setQuestions(data.results.map((question) => {
        const answers = [{answer: question.correct_answer, isSelected: false}, ...question.incorrect_answers.map((incorrectAnswer) => ({answer: incorrectAnswer, isSelected: false}))]
   
        return {
          question: question.question, 
          answers: answers.sort(() => Math.random() - 0.5), 
          correctAnswer: question.correct_answer,
          key: nanoid(),
        }
      }))
    } 

    const questionElements = questions.map((question) => {
      return(
        <Question 
          question = {question.question}
          answers = {question.answers}
          correctAnswer = {question.correctAnswer}
          key = {question.key}
          selectAnswer = {selectAnswer}
          questionkey = {question.key}
        />
      )
    })

    // Selecting Answers
    function selectAnswer(event, answers) {

      const selectedAnswer = (JSON.parse(event.target.dataset.answer))
      console.log(selectedAnswer)

      const selAnswerIndex = answers.findIndex((answerInArray) => {
        return answerInArray.answer === selectedAnswer.answer
      })

      const newAnswers = answers.map((answer) => {
        if(answers.indexOf(answer) === selAnswerIndex) {
          return {...answer, isSelected : !answer.isSelected}
        } else {
          return {...answer, isSelected : false}
        }
      })

      setQuestions(oldQuestions => {
        return oldQuestions.map((question) => {
          if(question.answers.some(answer => answer.answer === selectedAnswer.answer)) {
            return {...question, answers: newAnswers}
          } else {
            return question
          }
        })
      })
    }

    // End of Quiz
    const [quizEndStatus, setEndStatus] = React.useState(false)

    const [questionsCorrect, addCorrectQuestions] = React.useState(0)

    React.useEffect(() => {
      console.log(questionsCorrect);
    }, [questionsCorrect]);

    function displayFinalResult() {
      setEndStatus(true)
      questions.forEach(question => {
        question.answers.forEach((answer) => {
          if (answer.answer === question.correctAnswer && answer.isSelected) {
            addCorrectQuestions(old => old + 1)
          }
        })
      })
    }

    return ( 
      quizStatus ?

      // Quiz Page
      <main className='quizPage'>
        <div className='questionList'>{questionElements}</div>
        {quizEndStatus ?

        <div className='final--result'>
          <h1>You scored {questionsCorrect}/5 correct answers</h1>
          <button className='finalbtn'>Play Again</button> 
        </div> 

        : 
        
        <button className='finalbtn' onClick={() => displayFinalResult()}>Check answers</button>}
        <img src='src\assets\blobs-yellow.png' className='topBlob'/>
        <img src='src\assets\blobs-blue.png' className='botBlob'/>
      </main>
       
      :

      // Start Page
      <main className='openingPage'>
        <h1>Entertainment Trivia</h1>

        <h2>Choose a category!</h2>

        {/* The API uses numbers to denote different categories. */}
        <select onChange={changeCategory}>
          <option value={11}>Film</option>
          <option value={14}>Television</option>
          <option value={12}>Music</option>
          <option value={15}>Videogames</option>
        </select>

        <button className='start--quiz' onClick={() => {startQuiz(); getQuestions();}}>Start Quiz</button>

        {/* Background Elements */}
        <img src='src\assets\blobs-yellow.png' className='topBlob'/>
        <img src='src\assets\blobs-blue.png' className='botBlob'/>
      </main>
      
    )
}