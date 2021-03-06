// google speech to text api 사용, 음성인식 테스트

module.exports = {
    stt : async function syncRecognize(
    filename,
    encoding,
    sampleRateHertz,
    languageCode
  ){
    // import
    const speech = require('@google-cloud/speech');
    const fs = require('fs');

    // create client
    const client = new speech.SpeechClient();

    const config = {
      encoding: encoding,
      sampleRateHertz: sampleRateHertz,
      languageCode: languageCode
    };

    // 로컬파일은 1분 제한
    const audio = {
      content: fs.readFileSync(filename).toString('base64')
    };

    const request = {
      config: config,
      audio: audio
    };

    const [operation] = await client.longRunningRecognize(request);

    const [response] = await operation.promise();
    const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');
    console.log(`Transcription: ${transcription}`); 

  }
}
// syncRecognize('./files/youtubedl/vPorpg7Xdh8.wav', 'LINEAR16', 44100, 'ko-KR');