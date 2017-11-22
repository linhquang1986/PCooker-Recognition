var appConfig = require('../config');
var interVal;
var record = require('node-record-lpcm16');
exports.streamingMicRecognize = (ws) => {
    streamStartTime = Date.now();
    // [START speech_streaming_mic_recognize]

    // Imports the Google Cloud client library
    const speech = require('@google-cloud/speech');

    // Creates a client
    const client = new speech.SpeechClient({
        projectId: 'recognitionvietnamese',
        keyFilename: appConfig.google_api.speech.key_url
    });

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // const encoding = 'Encoding of the audio file, e.g. LINEAR16';
    // const sampleRateHertz = 16000;
    // const languageCode = 'BCP-47 language code, e.g. en-US';

    const request = {
        config: {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'vi-VN',
        },
        interimResults: false, // If you want interim results, set this to true
    };

    // Create a recognize stream
    const recognizeStream = client
        .streamingRecognize(request)
        .on('error', () => {
            console.log(123)
        })
        .on('data', data => {
            if (data.results[0] && data.results[0].alternatives[0])
                ws.emit('message', data.results[0].alternatives[0].transcript)
            else
                ws.emit('error', { error: 'Reached transcription time limit' })
        }
        );

    // Start recording and send the microphone input to the Speech API
    record
        .start({
            sampleRateHertz: 16000,
            threshold: 0.5,
            // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
            verbose: false,
            recordProgram: 'arecord', // Try also "arecord" or "sox"
            silence: 1.0
        })
        .on('error', console.error)
        .pipe(recognizeStream);

    console.log('Listening, press Ctrl+C to stop.');
    interVal = setInterval(() => {
        record.stop();
        record.start();
    }, 45000)
    // [END speech_streaming_mic_recognize]
}
exports.closeStream = () => {
    clearInterval(interVal);
    record.stop();
}