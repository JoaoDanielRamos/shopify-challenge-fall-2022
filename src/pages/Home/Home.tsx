// * Modules
import axios from 'axios';
import { useState, useEffect } from 'react';

// * Components
import Form from '../../components/Form/Form';
import ResponseBox from '../../components/Response/ResponseBox';

// * Styling
import './Home.scss';

export default function Home() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const getRequest = async () => {
      const data = {
        prompt: 'Write a poem about a dog wearing skis',
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      };

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/engines/text-curie-001/completions',
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
          }
        );
        console.log(response.data.choices[0].text);
      } catch (error) {
        console.log(error);
      }
    };

    // getRequest();
  }, []);

  return (
    <div className='home'>
      <div className='home__container'>
        <h1 className='home__heading'>Fun With AI</h1>
        <Form responses={setResponses} />
        <h2 className='home__heading-2'>Responses</h2>
        <div className='home__responses'>
          {/*
           responses.map(response => 
            <ResponseBox prompt={response.prompt} response={response.response}/>
            )
           */}
        </div>
      </div>
    </div>
  );
}
