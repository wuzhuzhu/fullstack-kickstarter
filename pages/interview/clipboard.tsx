import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

const ClipboardHistory = () => {
  const [clipboardHistory, setClipboardHistory] = useState([]);

  useEffect(() => {
    document.addEventListener("copy", (event) => {
      /* the session has shut down */
      watchClipboard()
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
    <Layout>
      <h3>Clipboard History:</h3>
      <ul>
        {clipboardHistory.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default ClipboardHistory;