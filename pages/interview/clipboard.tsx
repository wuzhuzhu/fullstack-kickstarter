import { useEffect, useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";

import Layout from "../../components/Layout";
import styles from './clipboard.module.scss'
import { IQnA } from "../../lib/types/basic";
import { getAnswerByQuestionFetcher } from "../../lib/fetcher/interview";
import useClipboardStore from "../../lib/store/slices/clipboard";

const ClipboardHistory = () => {
  const [textareaValue, setTextareaValue] = useState('定义一个链表，逆转它');
  const isAILoading = useClipboardStore((state) => state.isAILoading);
  const setIsAILoading = useClipboardStore((state) => state.setIsAILoading);
  const conversations = useClipboardStore((state) => state.conversations);
  const addQuestion = useClipboardStore((state) => state.addQuestion);
  const answerQuestion = useClipboardStore((state) => state.answerQuestion);

  async function getQuestionAnswer() {
    if (!textareaValue) return;
    setIsAILoading(true)
    addQuestion(textareaValue)
    try {
      console.log(1)
      const answer = await getAnswerByQuestionFetcher(textareaValue)
      console.log(2, answer)
      answerQuestion(answer)
      setTextareaValue('');
    } catch (e) {
      console.log(3, e)
      answerQuestion(e.message)
    } finally {
      setIsAILoading(false)
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
            <button onClick={getQuestionAnswer} disabled={isAILoading}>提交</button>
          </div>
        </div>
        <div className={styles.right}>
          <h3>Clipboard History:</h3><ul>
            {conversations.map((qna, index) => (
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