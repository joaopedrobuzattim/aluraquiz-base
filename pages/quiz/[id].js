import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';


export default function QuizDaGaleraPage({dbExternoJson }) {
  return (
    <ThemeProvider theme={dbExternoJson.theme}>
        <QuizScreen externalQuestions={dbExternoJson} externalBg={dbExternoJson.bg}   />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  
  const[projectName, githubUser] = context.query.id.split('___');
  let dbExternoJson;
  
  try {

    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`);
    dbExternoJson = await dbExterno.json();

  } catch (err) {
    console.error(err);
  }
  return {
    props: {
      dbExternoJson,
    },
  };
}
