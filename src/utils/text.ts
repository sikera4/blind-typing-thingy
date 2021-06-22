
const someTextFetcher = async () => {
  const response = await fetch('https://animechan.vercel.app/api/random');
  const data = await response.json();
  return data;
}


export default someTextFetcher;