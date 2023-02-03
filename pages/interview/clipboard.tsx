import { useEffect, useState } from "react";
import clipboardListener from 'clipboard-event'

const ClipboardHistory = () => {
  const [clipboardHistory, setClipboardHistory] = useState([]);

  useEffect(() => {
    const watchClipboard = async () => {
      const newText = await navigator.clipboard.readText();
      setClipboardHistory([...clipboardHistory, newText]);
    };

    clipboardListener.startListening();


    clipboardListener.on('change', () => {
      console.log('Clipboard changed');
      watchClipboard();
    });

    return () => {
      clipboardListener.stopListening();
    };
  }, [clipboardHistory]);

  return (
    <div>
      <button onClick={async () => {
        const text = await navigator.clipboard.readText();
        console.log(text);
      }}>读取复制的内容</button>
      <h3>Clipboard History:</h3>
      <ul>
        {clipboardHistory.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClipboardHistory;