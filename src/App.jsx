import { useEffect, useState } from 'react'
import React from 'react'
import Question from '/src/Question.jsx'
// import './App.css'

export default function App() {

    //Starting Quiz
    const [quizStatus, changeStatus] = React.useState(false)

    function startQuiz() {
      changeStatus(oldStatus => !oldStatus)
    }

    //Changing Category
    const [category, setCategory] = React.useState(11)

    function changeCategory(event) {
      setCategory(event.target.value)
    }

    //Getting Questions
    const [questions, setQuestions] = React.useState([])

    async function getQuestions() {
      const res = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}`)
      const data = await res.json()
      console.log(data)
      
      setQuestions(data.results.map((question) => {
        const answers = [question.correct_answer, ...question.incorrect_answers]
        console.log(answers)
        return {
          question: question.question, 
          answers: answers.sort(() => Math.random() - 0.5), 
          correctAnswer: question.correct_answer}
      }))
    } 

    const questionElements = questions.map((question) => {
      return(
        <Question 
          question = {question.question}
          answers = {question.answers}
          correctAnswer = {question.correctAnswer}
        />
      )
    })

    useEffect(()=> {
      console.log(questions)
      console.log(questionElements)
    }, [questions, questionElements])

    return ( 
      quizStatus ?

      // Quiz Page
      <main className='quizPage'>
        {questionElements}
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