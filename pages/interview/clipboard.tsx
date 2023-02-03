import { useEffect, useState } from "react";

const ClipboardHistory = () => {
  const [clipboardHistory, setClipboardHistory] = useState([]);

  useEffect(() => {
    document.addEventListener("copy", (event) => {
      /* the session has shut down */
      console.log("copy event", event)
    });


    const watchClipboard = async () => {
      const newText = await navigator.clipboard.readText();
      setClipboardHistory([...clipboardHistory, newText]);
    };

    navigator.clipboard.addEventListener('copy', watchClipboard);

    return () => {
      navigator.clipboard.removeEventListener('copy', watchClipboard);
      document.removeEventListener("copy", (event) => {
        /* the session has shut down */
      });

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