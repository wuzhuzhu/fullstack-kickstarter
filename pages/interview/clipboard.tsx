import { useEffect, useState } from "react";

const ClipboardHistory = () => {
    const [clipboardHistory, setClipboardHistory] = useState([]);
  
    useEffect(() => {
      const watchClipboard = async () => {
        const newText = await navigator.clipboard.readText();
        setClipboardHistory([...clipboardHistory, newText]);
      };
  
      navigator.clipboard.addEventListener('clipboardchange', watchClipboard);
  
      return () => {
        navigator.clipboard.removeEventListener('clipboardchange', watchClipboard);
      };
    }, [clipboardHistory]);
  
    return (
      <div>
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