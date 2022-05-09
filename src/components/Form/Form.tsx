// * Modules
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// * Styling
import './Form.scss';

export default function Form({
  responses,
  setResponses,
}: {
  responses: { prompt: string; response: string }[];
  setResponses: any;
}) {
  const [prompt, setPrompt] = useState('');
  const [placeHolder, setPlaceholder] = useState({
    action: 'Write',
    thing: 'poem',
    topic: 'dogs',
  });

  // * UseEffect Hook to change the placeholder every 2.5 seconds
  useEffect(() => {
    setInterval(() => {
      setPlaceholder(changePlaceHolder);
    }, 3000);
  }, []);

  // * Functionality that change the Placeholder of the textarea input so the user can get some prompt ideas.
  const changePlaceHolder = () => {
    const action = ['Write', 'Describe', 'Create', 'Compose', 'Tell me'];
    const thing = ['poem', 'song', 'sentence', 'phrase', 'joke'];
    const topic = [
      'love',
      'technology',
      'movies',
      'cooking',
      'dogs',
      'science',
      'spoons',
      'farms',
      'real state',
      'shopify',
      'internet',
      'blockchain',
      'cryptocurrency',
      'soccer',
      'video games',
      'javascript',
      'programming',
    ];

    const randomActionPick = Math.floor(Math.random() * action.length);
    const randomThingPick = Math.floor(Math.random() * thing.length);
    const randomTopicPick = Math.floor(Math.random() * topic.length);

    return {
      action: action[randomActionPick],
      thing: thing[randomThingPick],
      topic: topic[randomTopicPick],
    };
  };

  // * Set the prompt value based on the user input.
  const handleChange = (e: any) => {
    setPrompt(e.target.value);
  };

  // * Send a post request to the OpenAI API
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const requestData = {
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    try {
      const response = await axios({
        method: 'post',
        baseURL: 'https://api.openai.com/v1/engines/text-curie-001/completions',
        data: requestData,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      });

      const data = {
        prompt: prompt,
        response: response.data.choices[0].text,
      };

      setResponses([...responses, data]);

      if (!localStorage.getItem('responses')) {
        // @ts-ignore
        localStorage.setItem('responses', JSON.stringify([data]));
      } else {
        // @ts-ignore
        const localStorageData = JSON.parse(localStorage.getItem('responses'));

        // @ts-ignore
        localStorage.setItem(
          'responses',
          JSON.stringify([...localStorageData, data])
        );
      }

      toast.success('Response added successfully!');
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong. Reload the page and try again`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      {/* Fixing font size on React Toastify so it wont bug with CSS Reset*/}
      <div className='toastfy-fix'>
        <ToastContainer />
      </div>
      <p className='form__paragraph'>Enter a prompt:</p>
      <textarea
        onChange={handleChange}
        className='form__input'
        placeholder={`${placeHolder.action} a ${placeHolder.thing} about ${placeHolder.topic}.`}
      ></textarea>
      <button type='submit' className='form__button'>
        Submit
      </button>
    </form>
  );
}
