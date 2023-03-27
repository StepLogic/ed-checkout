import { useEffect, useState } from "react";

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [audio, setAudio] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [blob, setBlob] = useState(false);
  const [permissions, setPermissions] = useState(false);

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then((data) => {
          if (data?.error) {
            setPermissions(false);
            return;
          }

          setPermissions(true);
          setRecorder(data);
        });
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder?.start();
    } else {
      recorder?.stream.getTracks().forEach((track) => track.stop());
      recorder?.stop();
    }

    // Obtain the audio when ready.
    const handleData = (e) => {
      const dataBlob = new Blob([e.data], { type: "audio/mp3" });

      setBlob(dataBlob);
      setAudioURL(URL.createObjectURL(dataBlob));
    };

    recorder?.addEventListener("dataavailable", handleData);
    return () => recorder?.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  useEffect(() => {
    if (blob) {
      setAudio(new Audio(audioURL));
    }
  }, [blob]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (audio) {
      playing ? audio.play() : audio.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("ended", () => setPlaying(false));
      return () => {
        audio.removeEventListener("ended", () => setPlaying(false));
      };
    }
  }, [audio]);

  return { audioURL, isRecording, startRecording, stopRecording, playing, toggle, audio, blob, recorder, permissions };
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const recorder = new MediaRecorder(stream);

  return recorder;
}

export default useRecorder;
