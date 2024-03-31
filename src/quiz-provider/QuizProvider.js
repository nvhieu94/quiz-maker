
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
export const QuizMakerContext = React.createContext();
export const QuizMakerProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState({})
  const [questions, setQuestions] = useState({})

  useEffect(() => {
    getCategories((res) => {
        setCategories(res)
    })
  }, []);

  const handleGetQuestion = () => {
    getQuestionList({
        amount: 5,
        ...filter,
        type: 'multiple'
    }, (res) => {
        setQuestions(res?.results)
    })
}

  return(
    <QuizMakerContext.Provider value={{categories, filter, setFilter, questions, handleGetQuestion}}>
       {props.children}
    </QuizMakerContext.Provider>
  )
}

const getCategories = (callback) => {
    axios({
        url: 'https://opentdb.com/api_category.php',
        method: 'GET'
    }).then(res => {
        if (res.status === 200 && res?.data) {
            if (callback) {
                callback(res?.data?.trivia_categories);
            }
        }
    }).catch(err => {
        console.log(err)
    })
}

const getQuestionList = (payload, callback) => {
    // ?amount=5&category=11&difficulty=easy&type=multiple
    axios({
        url: 'https://opentdb.com/api.php',
        method: 'GET',
        params: payload
    }).then((res) => {
        if (res.status === 200) {
            if (callback) {
                callback(res?.data)
            }
        }

    }).catch(err => {
        console.log(err)
    })
}