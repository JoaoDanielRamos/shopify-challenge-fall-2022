// * Styling
import './ResponseBox.scss';

export default function ResponseBox({
  prompt,
  response,
}: {
  prompt: string;
  response: string;
}) {
  return (
    <div className='responseBox'>
      <p className='responseBox__prompt'>
        <span>Prompt:</span> {prompt}
      </p>
      <p className='responseBox__response'>
        <span>Response: </span>
        {response}
      </p>
    </div>
  );
}
