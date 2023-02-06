import createSpeechServicePolyfill from 'web-speech-cognitive-services'
import SpeechRecognition from "react-speech-recognition"

export default async function applyPolyFill() {
    // client-side-only code
    // comment this line to use native browser speech recognition, remember change the stop btn to stopListening
    // instead of abortListening(microsoft way)
    // const createSpeechServicePolyfill = (await import('web-speech-cognitive-services')).default
    console.log({
        region: process.env.MICROSOFT_REGION,
        subscriptionKey: process.env.MICROSOFT_SUBSCRIPTION_KEY
    })
    const { SpeechRecognition: AzureSpeechRecognition } = createSpeechServicePolyfill({
        credentials: {
            region: process.env.MICROSOFT_REGION,
            subscriptionKey: process.env.MICROSOFT_SUBSCRIPTION_KEY
        }
    });
    SpeechRecognition.applyPolyfill(AzureSpeechRecognition);
}