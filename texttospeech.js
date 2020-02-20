const fs = require('fs');
const { exec } = require('child_process')
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: 'EPaO2dVSey2Ea-coAleVky2-IBgnKOiyqxpeN5kNn249',
  }),
  url: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/7e47070c-8ae2-4a70-9f42-2c6a82f70b48',
});

const args = process.argv.slice(2)

const synthesizeParams = {
  text: args[0],
  voice: args[1],
  accept: 'audio/wav',
};

const audioFile = 'audio.wav'

textToSpeech.synthesize(synthesizeParams)
.then(audio => {
  const file = audio.result.pipe(fs.createWriteStream(audioFile))
  file.on('close', () => { 
    const play = exec(`play ${audioFile}`) 
    play.on('error', error => console.error(`stderr: ${error}`))
  })
})
.catch(err => {
  console.log(`error: ${err}`)
});