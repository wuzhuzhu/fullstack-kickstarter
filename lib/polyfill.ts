import createSpeechServicePolyfill from 'web-speech-cognitive-services'

const { SpeechRecognition: AzureSpeechRecognition } = createSpeechServicePolyfill({
    credentials: {
        region: process.env.MICROSOFT_REGION,
        subscriptionKey: process.env.MICROSOFT_SUBSCRIPTION_KEY
    }
});

export default AzureSpeechRecognition
