import Head from 'next/head';

import { GetServerSideProps } from 'next'

import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';

import styles from '../styles/pages/Home.module.css'
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number
}

export default function Home(props) {
  return (
    <div className={styles.container}>
      <ChallengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience} 
      challengesCompleted={props.challengesCompleted}>
        <Head>
          <title>Início | Move.it</title>
        </Head>

        <ExperienceBar></ExperienceBar>

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </ChallengesProvider>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}