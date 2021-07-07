type ApiChangerFunction = (apiUrl: string) => void;

const ApiChangers = ({handleApiChangerClick}:{handleApiChangerClick: ApiChangerFunction}) => {
  return (
    <p className='api-changers'>
      <span className="api-changer" onClick={() => {
        handleApiChangerClick('https://api.quotable.io/random');
        }}>Some deep thoughts...</span>
      <span className="api-changer" onClick={() => {
        handleApiChangerClick('https://animechan.vercel.app/api/random');
        }}>Anime quotes!</span>
      <span className="api-changer" onClick={() => {
        handleApiChangerClick('https://api.kanye.rest');
        }}>Maybe... Kanye West quotes?..</span>
      </p>
  );
}

export default ApiChangers;