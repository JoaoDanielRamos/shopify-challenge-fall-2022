// * Modules
import { useState, useEffect } from 'react';

// * Components
import Form from '../../components/Form/Form';
import ResponseBox from '../../components/Response/ResponseBox';

// * Styling
import './Home.scss';

export default function Home() {
  const [responses, setResponses] = useState<any[]>([]);

  useEffect(() => {
    if (localStorage.getItem('responses')) {
      // @ts-ignore
      setResponses(JSON.parse(localStorage.getItem('responses')));
    }
  }, []);
  return (
    <div className='home'>
      <div className='home__container'>
        <h1 className='home__heading'>Fun With AI</h1>
        <Form setResponses={setResponses} responses={responses} />
        <h2 className='home__heading-2'>Responses</h2>
        <div className='home__responses'>
          {responses.map(response => (
            <ResponseBox
              prompt={response.prompt}
              response={response.response}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
