import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Notification from './Notification';
import Statistics from './Statistics';
import { useState } from 'react';
import css from './app.module.scss';

export default function App () {

  const [options, setOptions] = useState({good: 0, neutral: 0, bad: 0});

  const handleFeedback = name => {
    setOptions(prevOptions => ({
      ...prevOptions,
      [name]: prevOptions[name] + 1,
    }))
  };

  const calcFeedback  = () => {
    const { good, neutral, bad } = options;
    return good + neutral + bad;
  }


  const calcPercent = () => {
    if (!calcFeedback()) return 0;
    const result = ((options.good / calcFeedback()) * 100).toFixed(2);
    return Number(result);
};

    return (
      <div className={css.div}>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(options)}
            onLeaveFeedback={handleFeedback}
          />
        </Section>
        <Section title="Statistics">
          {!calcFeedback ? (
            <Notification text="There is no feedbacks" />
          ) : (
            <Statistics
              good={options.good}
              neutral={options.neutral}
              bad={options.bad}
              total={calcFeedback()}
              positivePercentage={calcPercent()}
            />
          )}
        </Section>
      </div>
    );
}