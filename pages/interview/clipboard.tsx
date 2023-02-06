import { useEffect, useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";

import Layout from "../../components/Layout";
import getQuestions from "../api/interview/get-questions";
import styles from './clipboard.module.scss'
import getAnswersOfClipboard from "../api/interview/get-answer-clipboard";
import { IQnA } from "../../lib/types/basic";
import { getAnswerByQuestionFetcher } from "../../lib/fetcher/interview";

interface IQnAWithCountId extends IQnA {
  countId: number;
}


const ClipboardHistory = () => {
  const [clipboardHistory, setClipboardHistory] = useState([] as IQnAWithCountId[]);
  const [textareaValue, setTextareaValue] = useState('定义一个链表，逆转它');
  const [isLoading, setIsLoading] = useState(false);
  const [countId, setCountId] = useState(1);

  async function getQuestionAnswer() {
    if (!textareaValue) return;
    setIsLoading(true)
    setClipboardHistory([...clipboardHistory, { countId, question: textareaValue, answer: 'loading...' }]);
    try {
      console.log(1)
      const answer = await getAnswerByQuestionFetcher(textareaValue)
      console.log(2, answer)
      setClipboardHistory(clipboardHistory.map((qna) => {
        if (qna.countId === countId) {
          return { ...qna, answer }
        }
        return qna;
      }))
      setTextareaValue('');
      setCountId(countId + 1);
    } catch (e) {
      console.log(3, e)
      setClipboardHistory(clipboardHistory.map((qna) => {
        if (qna.countId === countId) {
          return { ...qna, answer: e.message }
        }
        return qna;
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = async (event) => {
    if (event.ctrlKey && event.key === 'Enter') {
      getQuestionAnswer()
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.left}>
          <h3>input question here</h3>
          <div className={styles.form}>
            <textarea placeholder="input and hit ctrl+enter to submit" value={textareaValue} onChange={(e) => setTextareaValue(e.target.value)} onKeyDown={handleKeyDown} cols={40} rows={30} />
            <button onClick={getQuestionAnswer} disabled={isLoading}>提交</button>
          </div>
        </div>
        <div className={styles.right}>
          <h3>Clipboard History:</h3><ul>
            <div>{JSON.stringify(clipboardHistory)}</div>
            {clipboardHistory.map((qna, index) => (
              <li key={index}>
                <p>{qna.question}</p>
                <CopyBlock
                  text={qna.answer}
                  language={'javascript'}
                  wrapLines
                  theme={dracula}
                />
              </li>
            ))}
          </ul></div>
      </div>
    </Layout >
  );
};

export default ClipboardHistory;