var appConfig = require('../config');
var recognizeStream;
var record = require('node-record-lpcm16');
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
        sampleRateHertz: 48000,
        languageCode: 'vi-VN',
    },
    interimResults: false, // If you want interim results, set this to true
};
var startStream = (ws) => {
    return client
        .streamingRecognize(request)
        .on('error', () => {
            recognizeStream.end();
            recognizeStream = startStream(ws);
        })
        .on('data', data => {
            if (data.results[0] && data.results[0].alternatives[0])
                ws.emit('message', data.results[0].alternatives[0].transcript)
            else
                ws.emit('error', { error: 'Reached transcription time limit' })
        }
        );
}
exports.streamingMicRecognize = (ws) => {
    // [START speech_streaming_mic_recognize]

    // Create a recognize stream
    recognizeStream = startStream(ws)
    // Start recording and send the microphone input to the Speech API
    record
        .start({
            sampleRateHertz: 48000,
            threshold: 0.5,
            // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
            verbose: false,
            recordProgram: 'sox', // Try also "arecord" or "sox"
            silence: 1.0
        })
        .on('error', console.error)
        .pipe(recognizeStream);

    console.log('Listening, press Ctrl+C to stop.');
    // [END speech_streaming_mic_recognize]
}
exports.closeStream = () => {
    record.stop();
}