import Heading from '@/components/reusable/Heading'
import FAQ from './FAQ'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PairDrop - About',
}

export default function About() {
  return (
    <main className='pb-32'>
      <Heading />

      <div className='side-padding mt-32 flex flex-col items-center'>
        <h2 className='mb-10 text-center uppercase'>PairDrop by DAO Drops</h2>
        <p className='card card-blue-dots p-8 md:p-[46px]'>
          PairDrop is a reusable primitive that allows communities to intelligently allocate funds. It is designed to
          avoid common pitfalls of funding mechanisms like cognitive overload and favoritism, while making the process
          fun and painless. PairDrop assigns each voter a random sample of the funding targets as sets of pairs (e.g.
          six sets of two). All the voter has to do is select the more deserving option from each of the pairs and the
          algorithm handles the rest!
          <br />
          <br />
          Under the hood, PairDrop uses the{' '}
          <a
            href='/assets/misc/BudgetingBoxes.pdf'
            target='_blank'
            rel='noopener noreferrer'
            className='break-words underline'
          >
            BudgetBox algorithm
          </a>{' '}
          originally developed by Colony. As votes are submitted, the algorithm computes a “preference graph” over the
          full set of funding targets, which it transforms to a normalized distribution across the set. At the end of
          the voting period, funds are distributed according to the final snapshot of the distribution. This approach is
          highly scalable, both in terms of the number of funding targets and the number of voters. It can also produce
          intelligent allocations even with relatively low voter turnout. We believe that this mechanism is an
          underutilized way for communities to harness their collective intelligence in an efficient and unbiased
          manner.
          <br />
          <br />
          PairDrop also comes with a Voter Scoring Script that we developed to help communities configure voting weights
          across their participants. The script can pull from different on and off-chain data sources to assign weights
          to individual addresses. The example datasets we provided are one example that focuses on addresses that have
          performed different on-chain actions in the Ethereum ecosystem such as donating to public goods, voting in
          DAOs, holding identity credentials, deploying smart contracts, claiming relevant POAPs and more! Check it out
          for inspiration and get in touch if you need help developing your own tailored dataset.
        </p>
      </div>

      <div className='side-padding mt-32 flex flex-col items-center'>
        <h2 className='mb-10 text-center'>ABOUT DAO DROPS</h2>
        <p className='card card-blue-dots p-8 md:p-[46px]'>
          DAO Drops is the public goods arm of dOrg, an OG services DAO that builds dapps and other web3 infrastructure.
          The aim of DAO Drops is to Drop open source tools for decentralized communities. In 2023 we launched DAO Drops
          with a pilot supported by the Ethereum Foundation to empower Ethereum users to allocate ecosystem funds to
          underfunded projects. We received a tremendous amount of positive feedback from the community, especially from
          groups that were interested in running their own rounds. As a result, we are releasing PairDrop and all future
          Drops as forkable primitives that can be used by anyone.
          <br />
          <br />
          So enjoy PairDrop and stay tuned for future Drops!
          <br />
          <br />
          If you need support adapting PairDrop or the{' '}
          <a
            href='https://github.com/dorgTech/dao-drops'
            target='_blank'
            rel='noopener noreferrer'
            className='underline'
          >
            DAO Drops V1
          </a>{' '}
          to your needs, fill out{' '}
          <a href='https://www.dorg.tech/#/hire' target='_blank' rel='noopener noreferrer' className='underline'>
            dOrg’s contact form
          </a>{' '}
          or reach out at{' '}
          <a href='mailto:daodrops@dorg.tech' className='underline'>
            daodrops@dorg.tech
          </a>
          .
        </p>
      </div>

      <FAQ />
    </main>
  )
}
