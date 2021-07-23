const express = require('express');
const app = new express();
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

const analyzeEmotionUrl = (toBeAnalyzed, res) => {
    let nluInst = getNLUInstance();

    const emotionParams={
        'html': toBeAnalyzed,
        'features': {
            'keywords':{
                'sentiment':false,
                'emotion': true,
                'limit':10
            }
        }
    }

    nluInst.analyze(emotionParams).then(analysisResults => {
        res.send(JSON.stringify(analysisResults, null, 2));
    }).catch(err => {
        res.send(err.toString())
    });
}

const analyzeEmotionText = (toBeAnalyzed, res) => {
    let nluInst = getNLUInstance();

    const emotionParams={
        'text': toBeAnalyzed,
        'features': {
            'keywords': {
                'sentiment': false,
                'emotion': true,
                'limit':10
            }
        }
    }

    nluInst.analyze(emotionParams).then(analysisResults => {
        res.send(JSON.stringify(analysisResults, null, 2));
    }).catch(err => {
        res.send(err.toString())
    });
}

const analyzeSentimentUrl = (toBeAnalyzed, res) => {
    let nluInst = getNLUInstance();

    const sentimentParams={
        'html': toBeAnalyzed,
        'features': {
            'keywords': {
                'sentiment': false,
                'emotion': true,
                'limit':10
            }
        }
    }

    nluInst.analyze(sentimentParams).then(analysisResults => {
        res.send(JSON.stringify(analysisResults, null, 2));
    }).catch(err => {
        res.send(err.toString())
    });
}

const analyzeSentimentText = (toBeAnalyzed, res) => {
    let nluInst = getNLUInstance();

    const sentimentParams={
        'text': toBeAnalyzed,
        'features': {
            'keywords': {
                'sentiment': false,
                'emotion': true,
                'limit':10
            }
        }
    }

    nluInst.analyze(sentimentParams).then(analysisResults => {
        res.send(JSON.stringify(analysisResults, null, 2));
    }).catch(err => {
        res.send(err.toString())
    });
}

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    let urlToAnalyze = req.query.url;
    analyzeEmotionUrl(urlToAnalyze, res)
});

app.get("/url/sentiment", (req,res) => {
    let urlToAnalyze = req.query.url;
    analyzeSentimentUrl(urlToAnalyze, res)
});

app.get("/text/emotion", (req,res) => {
    let textToAnalyze = req.query.text;
    analyzeEmotionText(textToAnalyze, res)
});

app.get("/text/sentiment", (req,res) => {
    let textToAnalyze = req.query.text;
    analyzeSentimentText(textToAnalyze, res)
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

