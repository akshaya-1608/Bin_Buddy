import React, { useState, useEffect } from 'react'
import questions from './questions'
import Confetti from 'react-confetti'
import { useWindowSize } from '@react-hook/window-size'
import confetti from 'canvas-confetti'
import './Quiz.css'

const Quiz = ({ onBack }) => {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [width, height] = useWindowSize()

  useEffect(() => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random())
    setQuizQuestions(shuffled.slice(0, 5))
  }, [])

  const handleAnswer = (option) => {
    setSelectedOption(option)
    const isCorrect = option === quizQuestions[current].answer
    if (isCorrect) {
      setScore(score + 1)
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      })
    }

    setTimeout(() => {
      const next = current + 1
      if (next < 5) {
        setCurrent(next)
        setSelectedOption(null)
      } else {
        setShowScore(true)
      }
    }, 500)
  }

  const handlePlayAgain = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random())
    setQuizQuestions(shuffled.slice(0, 5))
    setCurrent(0)
    setScore(0)
    setShowScore(false)
    setSelectedOption(null)
  }

  const getResultMessage = (score) => {
    const messages = {
      5: "🌍 You're an Eco Expert!",
      4: "🌱 Great Job! You're an Eco Enthusiast!",
      3: "🍃 You're Learning! Keep Going!",
      2: "🌾 Not Bad, Brush Up a Bit!",
      1: "🧹 Just Starting Out. Let's Learn Together!",
      0: "🙃 Try Again! You got this!"
    }
    return messages[score] || "🤔 Try the quiz to find out your eco-level!"
  }

  return (
    <div className="quiz-container">
      {showScore && score > 3 && (
  <Confetti width={width} height={height} numberOfPieces={300} recycle={false} />
)}

      {showScore ? (
        <div className="score-section fade-in">
          <h2>🎉 You scored {score} out of 5!</h2>
          <h3 className="result-message">{getResultMessage(score)}</h3>
          <div className="score-buttons">
            <button onClick={onBack}>Back to Result</button>
            <button onClick={handlePlayAgain}>Play Again</button>
          </div>
        </div>
      ) : (
        quizQuestions.length > 0 && (
          <div className="question-section slide-in">
            <h3>{quizQuestions[current].question}</h3>
            <div className="options-container">
              {quizQuestions[current].options.map((option, index) => {
                const isCorrect = selectedOption === option && option === quizQuestions[current].answer
                const isWrong = selectedOption === option && option !== quizQuestions[current].answer
                return (
                  <button
                    key={index}
                    className={`option-button ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                    onClick={() => handleAnswer(option)}
                    disabled={selectedOption !== null}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
            
          </div>
        )
      )}
    </div>
  )
}

export default Quiz
