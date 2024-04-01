
import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const QuizMakerContext = React.createContext();

export const QuizMakerProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState({})
  const [questions, setQuestions] = useState({});
  const [userAnswers, setUserAnswers] = useState({})

  useEffect(() => {
    getCategories((res) => {
        setCategories(res)
    })
  }, []);

  const handleGetQuestion = (callback) => {
    getQuestionList({
        amount: 5,
        ...filter,
        type: 'multiple'
    }, (res) => {
        let dataSource = [];
        if(res?.results) {
            dataSource = res?.results.map(item => {
                item.id = uuidv4();
                let newArray = [...item?.incorrect_answers, item?.correct_answer].sort(function() {return 0.5 - Math.random()});
                item.amswers = newArray;
                return item
            })
        }
        setQuestions(dataSource)
        if(callback) {
            callback();
        }
    })
}

  return(
    <QuizMakerContext.Provider value={{categories, filter, setFilter, questions,setQuestions, handleGetQuestion, userAnswers, setUserAnswers}}>
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