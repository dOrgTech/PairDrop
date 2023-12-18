import Heading from '@/components/reusable/Heading'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pair2Pair - About',
}

export default function About() {
  return (
    <main className='pb-32'>
      <Heading />

      <div className='side-padding mt-32 flex flex-col items-center'>
        <h2 className='mb-10 text-center'>
          WHAT IS PAIR<span className='text-magenta-600'>2</span>PAIR?
        </h2>
        <div className='card-with-dots subtitle2 p-[46px]'>
          Pair2Pair is a decentralized capital allocation mechanism. It allows a community to do cobudgeting of a set of
          funds, to distribute money to projects that best meet the community’s goals. It can also be used to set policy
          - instead of voting yes or no on intimidating governance proposals, voters can compare proposals to surface
          which ones rise to the top as most important. Pair2Pair feels more like a game than a chore. DAO Drops’
          interface is designed to look like a cute video game to enhance the fun and increase participation, while
          meaningfully gathering financial priorities.
          <br />
          <br />
          How it works: Under the hood, DAO Drops’ Pair2Pair uses the BudgetBox algorithm by Colony. Pair2Pair votes are
          combined to a “preference graph”. Using machine learning techniques common in sports rankings and web search,
          Pair2Pair turns the collection of Pair2Pair votes into a probability distribution. Lastly, these are expressed
          as percentages of budget, to display the top voted projects or proposals. Each community will need to
          communicate their own goals or “decision rubric” to voters. Pair2Pair is a tool for communities to be involved
          in decision making, in a way that sources their collective intelligence.
          <br />
          <br />
          The additional feature DAO Drops is releasing with this drop is our Voter Scoring Algorithm. This pulls
          on-chain data of which addresses participated in diverse areas of the Ethereum ecosystem, and weights their
          voting power accordingly. It’s intended to give decision-making power to people who are likely to have the
          most context and exposure in a variety of aspects of the Ethereum ecosystem. You can use the data set we
          provide, or create your own using DAO Drops’ formula.
        </div>
      </div>

      <div className='side-padding mt-32 flex flex-col items-center'>
        <h2 className='mb-10 text-center'>ABOUT DAO DROPS</h2>
        <div className='card-with-dots subtitle2 p-[46px]'>
          DAO Drops is a project of dOrg, a Web3 developer agency that is a DAO. The goal of DAO Drops is to drop open
          source tools for decentralized communities. The first iteration of DAO Drops in 2023 was a public goods
          funding round organized by members of dOrg. We were most often approached by teams with existing budgets to
          run their own rounds, and we concluded that DAO Drops would benefit the most people when used as part of an
          existing community or protocol’s treasury. The most impactful and efficient way we can get decentralized power
          to people, is to release different mechanisms as open source tools.
          <br />
          <br />
          So stay tuned for future Drops! To hire the DAO Drops team to implement this in your protocol or community,
          get in touch.
        </div>
      </div>
    </main>
  )
}
