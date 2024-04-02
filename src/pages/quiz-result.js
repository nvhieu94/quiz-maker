import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
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
const ButtonWrapper = styled.button`
    border-radius: 4px;
    width: 100%;
    padding: 10px;
    cursor: pointer;
    margin-top: 15px;
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
    &.correct {
        background-color: #198754;
        color: #fff;
        border: 1px solid #198754;
    }
    &.answer-incorrect {
        background-color: red;
        color: #fff;
        border: 1px solid red;
    }

`
const BoxResult = styled.div`
    padding: 5px;
    background-color: ${props => (props.scored >= 4 ? 'green' : props.scored <= 1 ? 'red' : 'yellow')};
`

const renderClass = (currentAnswer, userAnswer, correctAnswer) => {
    if (currentAnswer === correctAnswer && userAnswer === correctAnswer) {
        return "correct";
    } else if (currentAnswer === correctAnswer) {
        return "correct";
    } else if (currentAnswer === userAnswer) {
        return "answer-incorrect";
    } else {
        return "default";
    }
}

const QuizResult = () => {
    const { questions, userAnswers, setQuestions, setFilter} = useContext(QuizMakerContext);
    const navigate = useNavigate();

    const renderAnswerItem = (answersList, idQuestion, correctAnswer) => {
        return answersList?.map((item, idx) => {
            return <AnswerItem className={renderClass(item, userAnswers?.[idQuestion], correctAnswer)} key={idx} dangerouslySetInnerHTML={{ __html: item }}></AnswerItem>
        })
    }

    const handleNewQuestion = () => {
        setFilter({});
        setQuestions([]);
        navigate("/quiz-maker");
    }

    const countCorrectAnswer = useMemo(() => {
        let count = 0;
        count = questions?.filter(item => item.correct_answer === userAnswers[item?.id])?.length;
        return count;
    }, [questions, userAnswers]);



    return (<QuizMakerPageWrapper>
        <QuizMakerContainer>
            <QuizMakerpageTitle>RESULTS</QuizMakerpageTitle>
            <QuestionWrapper>
                {questions?.length > 0 && questions?.map((item, idx) => {
                    return (
                        <QuestionItem key={idx}>
                            
                            <Question dangerouslySetInnerHTML={{ __html: item?.question }}/>
                            <AnswerWrapper>
                                {renderAnswerItem(item?.amswers || [], item?.id, item?.correct_answer)}
                            </AnswerWrapper>
                        </QuestionItem>
                    )
                })}
            </QuestionWrapper>
            <BoxResult scored={countCorrectAnswer}>{`You scored ${countCorrectAnswer} out of ${questions?.length}`}</BoxResult>
            <ButtonWrapper id="submitBtn" onClick={handleNewQuestion} >Create a new quiz</ButtonWrapper>

        </QuizMakerContainer>
    </QuizMakerPageWrapper>)
}

export default QuizResult;
