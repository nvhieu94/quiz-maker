import React, { useEffect, useContext, useState, useMemo } from "react";
import styled from "styled-components";
import axios from "axios";
import { QuizMakerContext } from "../quiz-provider/QuizProvider";
const QuizMakerPageWrapper = styled.div`
    display: flex;
    justify-content: center;
`
const QuizMakerpageTitle = styled.div`
    margin-bottom: 15px;
    font-size: 24px;
    font-weight: 700;
`

const QuizMakerContainer = styled.div`
    width: 800px;
    padding: 50px;
`
const CategoryWrapper = styled.div`
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-bottom: 15px;
`

const SelectWrapper = styled.select`
    padding: 8px;
    border-radius: 4px;
`

const SelectOption = styled.option`

`
const ButtonWrapper = styled.button`
    border-radius: 4px;
`

const QuestionWrapper = styled.div`
    gap: 16px;

`
const QuestionItem = styled.div`
    text-align: start;
    margin-bottom: 20px;

`
const Question = styled.div`

`
const AnswerWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
`

const AnswerItem = styled.button`
   
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    &.default {
        background-color: #fff;
        color: green;
        border: 1px solid green;
    }
    &.selected {
        background-color: #198754;
        color: #fff;
        border: 1px solid #198754;
    }

    &:hover {
        background-color: #198754;
        color: #fff;
        border: 1px solid #198754;
    }
    
`

const QuizMaker = () => {
    const { categories, filter, setFilter, questions, handleGetQuestion } = useContext(QuizMakerContext);
    const [answers, setAnswers] = useState({})

    const handleSelect = (event) => {
        setFilter((prev) => ({
            ...prev,
            [event?.target?.name]: event?.target?.value
        }))
    }

    const disableBtn = useMemo(() => {
        return !filter?.category || !filter?.difficulty
    }, [filter])

    const renderAnswerItem = (answersList, idxQuestion) => {
        return answersList.map((item, idx) => {
            return <AnswerItem className={answers?.[idxQuestion] === item ? "selected" : "default"} onClick={() => {
                setAnswers((prev) => ({
                    ...prev,
                    [idxQuestion]: item
                }))
            }} key={idx}>{item}</AnswerItem>
        })
    }

    return (<QuizMakerPageWrapper>
        <QuizMakerContainer>
            <QuizMakerpageTitle>Quiz Maker</QuizMakerpageTitle>
            <CategoryWrapper>
                <SelectWrapper name="category" id="categorySelect" onChange={handleSelect} value={filter?.category}>
                    <SelectOption value=""  >Select a category</SelectOption>
                    {categories && categories?.map((item, idx) => (
                        <SelectOption value={item.id} key={idx}>{item?.name}</SelectOption>
                    ))}

                </SelectWrapper>
                <SelectWrapper name="difficulty" id="difficultySelect" onChange={handleSelect} value={filter?.difficulty}>
                    <SelectOption value="" >Select difficulty </SelectOption>
                    <SelectOption value="easy"  >Easy </SelectOption>
                    <SelectOption value="medium" >Medium</SelectOption>
                    <SelectOption value="hard" >Hard</SelectOption>
                </SelectWrapper>
                <ButtonWrapper id="createBtn" disabled={disableBtn} onClick={handleGetQuestion} >Create</ButtonWrapper>
            </CategoryWrapper>
            <QuestionWrapper>
                {questions?.length > 0 && questions?.map((item, idx) => {
                    return (
                        <QuestionItem key={idx}>
                            <Question>{item?.question}</Question>
                            <AnswerWrapper>
                                {renderAnswerItem([...item?.incorrect_answers, item?.correct_answer], idx)}
                            </AnswerWrapper>
                        </QuestionItem>
                    )
                })}

            </QuestionWrapper>
        </QuizMakerContainer>
    </QuizMakerPageWrapper>)
}

export default QuizMaker;

const getQuestionList = (payload, callback) => {

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