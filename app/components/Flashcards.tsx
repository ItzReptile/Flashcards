"use client";
import React, { useState, useEffect } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
interface Flashcard {
  question: string;
  answer: string;
}

const Flashcards: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    const savedFlashcards = localStorage.getItem("flashcards");
    return savedFlashcards ? JSON.parse(savedFlashcards) : [];
  });
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [customQuestion, setCustomQuestion] = useState<string>("");
  const [customAnswer, setCustomAnswer] = useState<string>("");
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  useEffect(() => {
    displayCurrentCard();
  }, [currentCard, flashcards]);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const backCard = () => {
    const newCardIndex =
      (currentCard - 1 + flashcards.length) % flashcards.length;
    setCurrentCard(newCardIndex);
  };

  const nextCard = () => {
    const newCardIndex = (currentCard + 1) % flashcards.length;
    setCurrentCard(newCardIndex);
  };

  const deleteCard = () => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards.splice(currentCard, 1);
    setFlashcards(updatedFlashcards);
    if (currentCard >= updatedFlashcards.length) {
      setCurrentCard(updatedFlashcards.length - 1);
    }
    localStorage.setItem("flashcards", JSON.stringify(updatedFlashcards));
  };

  const addCustomCard = (event: React.FormEvent) => {
    event.preventDefault();
    const newCard: Flashcard = {
      question: customQuestion,
      answer: customAnswer,
    };
    const updatedFlashcards = [...flashcards, newCard];
    setFlashcards(updatedFlashcards);
    setCustomQuestion("");
    setCustomAnswer("");
    setCurrentCard(updatedFlashcards.length - 1);
    localStorage.setItem("flashcards", JSON.stringify(updatedFlashcards));
  };

  const displayCurrentCard = () => {
    if (flashcards.length === 0) {
      return { question: "", answer: "" };
    }
    return flashcards[currentCard];
  };

  const currentFlashcard = displayCurrentCard();

  return (
    <div
      className={`text-center my-12 max-w-[1000px] ${
        isFlipped ? "flipped" : ""
      }`}
    >
      <div
        id="flashcard"
        className="max-w-full w-[1000px] mx-auto border border-gray-300 p-5 cursor-pointer text-sm shadow-md rounded-md"
        onClick={toggleFlip}
      >
        <div className={`card  mx-auto ${isFlipped ? "flipped" : ""}`}>
          <div className="front">
            <h2 id="question" className="text-lg">
              {currentFlashcard.question}
            </h2>
          </div>
          <div className="back">
            <h3 id="answer" className="text-lg">
              {currentFlashcard.answer}
            </h3>
          </div>
        </div>
      </div>

      {flashcards.length >= 1 && (
        <div className="my-1">
          <h1 className="text-xl">
            {currentCard + 1} / {flashcards.length}
          </h1>
        </div>
      )}
      <div className="flex items-center justify-center ">
        <button
          className="m-2 border p-1 rounded-md shadow-md"
          onClick={() => setShowAnswer(true)}
        >
          Show Answer
        </button>
        <button className="m-2  p-1  text-3xl" onClick={backCard}>
          <FaArrowAltCircleLeft />
        </button>
        <button className="m-2 p-1  text-3xl" onClick={nextCard}>
          <FaArrowAltCircleRight />
        </button>
        <button
          className="m-2 border p-1 rounded-md shadow-md"
          onClick={deleteCard}
        >
          Delete Card
        </button>
      </div>

      <form
        id="flashcardForm"
        className="mt-4 flex flex-col items-center justify-center"
        onSubmit={addCustomCard}
      >
        <label
          htmlFor="customQuestion"
          className="block text-sm font-medium text-gray-700"
        >
          Custom Question:
        </label>
        <input
          type="text"
          id="customQuestion"
          className="mt-1 block w-[350px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
          value={customQuestion}
          onChange={(e) => setCustomQuestion(e.target.value)}
        />

        <label
          htmlFor="customAnswer"
          className="block text-sm font-medium text-gray-700"
        >
          Custom Answer:
        </label>
        <input
          type="text"
          id="customAnswer"
          className="mt-1 block w-[350px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
          value={customAnswer}
          onChange={(e) => setCustomAnswer(e.target.value)}
        />

        <button type="submit" className="m-2 p-1 border rounded-md shadow-md">
          Add Custom Flashcard
        </button>
      </form>
    </div>
  );
};

export default Flashcards;
