import { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import getQuestions from "../api/interview/get-questions";
import styles from './clipboard.module.scss'
import getAnswersOfClipboard from "../api/interview/get-answer-clipboard";
import { IQnA } from "../../lib/types/basic";
import fetcher from "../../lib/fetcher";

const ClipboardHistory = () => {
  const [clipboardHistory, setClipboardHistory] = useState([] as IQnA[]);
  const [textareaValue, setTextareaValue] = useState('');

  const handleKeyDown = async (event) => {
    if (!textareaValue) return;
    if (event.ctrlKey && event.key === 'Enter') {
      const answer = await fetcher(
        "/api/interview/get-answer-clipboard",
        'post',
        {
          question: textareaValue
        }
      )
      setClipboardHistory([...clipboardHistory, { question: textareaValue, answer: answer.answer }]);
      setTextareaValue('');
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.left}>
          <h3>input question here</h3>
          <textarea value={textareaValue} onChange={(e) => setTextareaValue(e.target.value)} onKeyDown={handleKeyDown} cols={40} rows={30} />
        </div>
        <div className={styles.right}>
          <h3>Clipboard History:</h3><ul>
            {clipboardHistory.map((qna, index) => (
              <li key={index}>
                <p>{qna.question}</p>
                <p>{qna.answer}</p>
              </li>
            ))}
          </ul></div>
      </div>
    </Layout >
  );
};

export default ClipboardHistory;