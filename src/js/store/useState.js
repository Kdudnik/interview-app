const localState = {
    questions: {
        allQuestions: [],
        activeQuestion: [],
    },
    activeTopic: '',
    score: {
        all: 0,
        user: 0
    }
}

// TODO: make better, with loops
if(window.localStorage.length) {
    if(window.localStorage.getItem('activeTopic')) {
        localState.activeTopic = window.localStorage.getItem('activeTopic');
    }
    if(localStorage.getItem('allQuestions')) {
        localState.questions.allQuestions = JSON.parse(localStorage.getItem('allQuestions'));
    }
    if(localStorage.getItem('score')) {
        localState.score = JSON.parse(localStorage.getItem('score'))
    }
    console.dir(localState)
}

function useState() {
    //Active topic
    const setActiveTopic = (newActiveTopic) => {
        localState.activeTopic = newActiveTopic;
        window.localStorage.setItem('activeTopic', localState.activeTopic);
    };

    const getActiveTopic = () => {
        return localState.activeTopic;
    };

    //All qs
    const setAllQuestions = (newAllQuestions) => {
        if (!Array.isArray(newAllQuestions)) return
        localState.questions.allQuestions = newAllQuestions.map(item => { //map -> creates an arr of returned values
            const entries = Object.entries(item).flat(); //entries -> creates an arr of obj, and adds an iterator for each value [{0: value}, {1: value}] 
            //flat -> makes a single arr of sub-arrs
            const key = entries[0]
            const value = entries[1].filter(el => el !== '') //filter -> if el is not "" => add it

            return {
                [key]: value //returns an obj for newAllQuestions (40)
            }
        })
        window.localStorage.setItem('allQuestions', JSON.stringify(localState.questions.allQuestions))
    }

    const getAllQuestions = () => {
        return localState.questions.allQuestions;
    }

    const updateAllQuestions = () => {
        let topicQs = null
        localState.questions.allQuestions.forEach((element) => {
            if (localState.activeTopic === Object.keys(element)[0].toLowerCase()) {
                topicQs = Object.values(element)[0]
            }
        });
        let newAllQuestions = []
        const answeredQuestion = (topicQs.splice(
            topicQs.findIndex((el) => el == localState.questions.activeQuestion),
            1))[0]
        topicQs.forEach((element) => {
            if(element != answeredQuestion) {
                newAllQuestions.push(element)
            }
        })
        localState.questions.allQuestions.forEach((element) => {
            if (localState.activeTopic === Object.keys(element)[0].toLowerCase()) {
                Object.values(element)[0] = newAllQuestions
            }
        });

        window.localStorage.setItem('allQuestions', JSON.stringify(localState.questions.allQuestions))
    }

    //Active qs
    const setActiveQuestion = (newActiveQuestion) => {
        localState.questions.activeQuestion = newActiveQuestion
    }

    const getActiveQuestion = () => {
        return localState.questions.activeQuestion;
    }

    //Score

    const updateScore = (price, answered) => {
        localState.score.all = localState.score.all + price
        if (answered) {
            localState.score.user = localState.score.user + price
        }
        window.localStorage.setItem('score', JSON.stringify(localState.score))
    }

    const getScore = () => {
        return localState.score
    }

    return {
        setAllQuestions,
        getAllQuestions,
        updateAllQuestions,
        setActiveQuestion,
        getActiveQuestion,
        setActiveTopic,
        getActiveTopic,
        updateScore,
        getScore
    }
}

export { useState }