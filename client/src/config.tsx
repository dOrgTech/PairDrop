// Project Pairs Count (dafault: 5)
export const pairsCap = 5

// Web3Modal context
export const web3ModalConfig = {
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  mainnet: {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com',
  },
  metadata: {
    name: 'PairDrop',
    description: '',
    url: '',
    icons: [''],
  },
}

// SWR API Fetcher Configuration
export const apiConfig = {
  dedupingInterval: 60000, // Deduplicates requests to the same key in this interval (milliseconds)
  focusThrottleInterval: 5000, // Throttles revalidation on window focus to this interval (milliseconds)
  revalidateOnFocus: true, // Automatically revalidate when window gets focused
  revalidateOnReconnect: true, // Automatically revalidate when the browser regains a network connection
}

export const homeConfig = {
  showResults: true, // Set to true to show live results table initially
}

// Header component
export const header = {
  logoSrc: '/assets/logos/logo.svg',
  logoAlt: 'Logo',
  logoWidth: 35,
  logoHeight: 35,
  siteName: 'PAIR',
  siteNameSpanClass: 'text-magenta-500',
  siteNameSuffix: 'DROP',
  navigationLinks: [
    {
      href: '/about',
      label: 'About',
    },
    {
      href: '/explore',
      label: 'Explore',
    },
  ],
  connectWalletButtonText: 'Connect',
  bannerMessage: 'PairDrop demo is for demonstration purposes only.',
  bannerRepoText: 'To fork the codebase, visit the open source repo',
  bannerRepoLink: 'https://github.com/dOrgTech/PairDrop',
  bannerRepoLinkText: 'Here',
}

// Heading component
export const heading = {
  countdownInitialValue: 3,
  countdownGoText: 'GO!',
  homePage: {
    title: 'FUNDING\nREIMAGINED',
    subtitle: 'Connect your wallet to begin\nyour pairwise adventure.',
    learnMoreLink: '/about',
    learnMoreButtonText: 'LEARN MORE',
    exploreProjectsLink: '/explore',
    exploreProjectsButtonText: 'EXPLORE',
  },
  aboutPage: {
    learnPagePath: '/about',
    title: 'PairDrop',
    subtitle: 'BY DAO DROPS',
  },
  pageNotFound: {
    title: '404',
    subtitle: 'PAGE NOT FOUND',
    goHomeLink: '/',
    goHomeText: 'GO TO HOME',
  },
}

// Home -> WhatIs component
export const whatIs = {
  title: 'What is PairDrop?',
  subtitle: 'FUNDING REIMAGINED',
  description: `PairDrop by DAO Drops is a community-driven fund allocation tool using a game-like interface for easy governance. It employs machine learning to translate votes into budget distributions, prioritizing top projects. The new Voter Scoring Algorithm enhances decision-making by weighting votes based on active engagement in the Ethereum ecosystem.`,
  learnMoreLink: '/about',
  learnMoreText: 'Learn More',
}

// Home -> Results component
export const results = {
  title: 'LIVE RESULTS',
  totalFundsAmount: 100000,
  currencySymbol: 'USDC',
  loadingMessage: 'Loading projects...',
  errorMessage: 'Error loading projects',
  noDataMessage: 'No project data available',
  viewAllText: 'View All',
  viewLessText: 'View Less',
}

// FinishModal component
export const finishModal = {
  title: 'YOU’VE DONE IT, ANON',
  description:
    'Thanks for being an Impact Maverick with PairDrop. Your thoughtful choices are now weaving magic into the fabric of public good. Stay tuned to see the ripples of change you’ve helped create!',
}

// StartModal component
export const startModal = {
  steps: [
    {
      title: 'SORRY, ANON',
      description: `It appears you didn’t qualify for this round. But don’t distress, keep sowing your seeds in the cybernetic gardens, and soon you’ll be a chosen one.`,
    },
    {
      title: 'THE CHALLENGE:',
      description: `Intelligently distribute the funding to projects who demonstrate the most impact.`,
      subtitle: 'WTHAT’S AT STAKE:',
      additionalInfo: {
        text: `Uncover the lesser known impactooors making Ethereum great.\n\nYou will earn prestige, a POAP, and newfound knowledge of what’s happening in `,
        linkText: 'The Infinite Garden',
        linkUrl: 'https://ethereum.foundation/infinitegarden',
      },
    },
    {
      title: 'HOW TO VOTE:',
      description: `A quick demonstration on how to use PairDrop.`,
      videoURL: 'https://www.youtube.com/embed/YIBy9JfMIlE',
      altText: 'How to Vote Video Placeholder',
    },
    {
      title: 'ESTIMATED TIME TO COMPLETE:',
      description: `15 minutes\n\nYou will be presented with 5 pairs of projects to review side-by-side.\n\nDrop your points to the ones you believe will accelerate diverse innovation in the Ethereum ecosystem.`,
    },
    {
      title: 'EVALUATION GUIDE:',
      description: `We’ve prepared a helpful evaluation guide that should help you determine the amount of impact a particular has had. Please consider the following evaluation criteria:\n\nGiven the project’s funding to date and the scale of the problem they’re addressing, how impactful was their contribution?\n\nIf this project was fully resourced, would they significantly move the needle forward on their focus issue?\n\nHow underserved are they? Geographically? Topically? Visibility in the ecosystem?\n\nIf you are not sure, or are not familiar with the areas the project or person is working in, make your best guess.\n\nLastly, you will have an opportunity to leave feedback for each project to support their mission effectiveness!`,
    },
    {
      title: 'ANON, THE CHOSEN ONE:',
      description: `Your on-chain wisdom is legendary. Will you take on this mission to skillfully distribute the funding pool?`,
    },
  ],
}

// Main Layout File
export const rootLayout = {
  siteTitle: 'PairDrop',
}

// Page Not Found
export const notFoundPage = {
  pageTitle: 'PairDrop - Page Not Found',
}

// Explore Page
export const explorePage = {
  pageTitle: 'PairDrop - Explore',
  title: 'EXPLORE',
  searchPlaceholder: 'Search projects...',
  loadingMessage: 'Loading projects...',
  errorMessage: 'Error loading projects',
  noDataMessage: 'No project data available',
  noResultsMessage: 'No Results Found',
}

// My Votes Page
export const myVotesPage = {
  pageTitle: 'PairDrop - My Votes',
  title: 'MY VOTES',
  description:
    'We’ve made your job simpler, anon. Review the next pair and simply vote for the project you perceive as having the most impact on public good!',
  connectWalletMessage: 'Please connect your wallet',
  loadingMessage: 'Loading votes data...',
  errorMessage: 'Error loading votes',
  noDataMessage: 'No votes data available',
}

// Vote Page
export const votePage = {
  pageTitle: 'PairDrop - Vote',
  connectWalletMessage: 'Please connect your wallet',
  loadingMessage: 'Loading projects pairs...',
  errorMessage: 'Error loading projects pairs',
  noDataMessage: 'No projects pairs data available',
  backToMyVotesText: 'View All Pairs',
  instructionsTitle: 'WHICH ONE DO YOU CHOOSE?',
  instructionsDescription: (
    <>
      <a
        href='https://github.com/dOrgTech/PairDrop/blob/main/docs/05_voting.md'
        target='_blank'
        rel='noopener noreferrer'
        className='break-words underline'
      >
        Review our guide
      </a>{' '}
      on how to vote to ensure you’re reviewing each in consideration of public impact.
    </>
  ),
}

// About Page
export const aboutPage = {
  pageTitle: 'PairDrop - About',
  firstTitle: 'PairDrop by DAO Drops',
  firstContent: (
    <>
      PairDrop is a reusable primitive that allows communities to intelligently allocate funds. It is designed to avoid
      common pitfalls of funding mechanisms like cognitive overload and favoritism, while making the process fun and
      painless. PairDrop assigns each voter a random sample of the funding targets as sets of pairs (e.g. six sets of
      two). All the voter has to do is select the more deserving option from each of the pairs and the algorithm handles
      the rest! To fork the codebase, visit the open source repo{' '}
      <a
        href='https://github.com/dOrgTech/PairDrop'
        target='_blank'
        rel='noopener noreferrer'
        className='break-words underline'
      >
        Here
      </a>
      .<br />
      <br /> Under the hood, PairDrop uses the{' '}
      <a
        href='/assets/misc/BudgetingBoxes.pdf'
        target='_blank'
        rel='noopener noreferrer'
        className='break-words underline'
      >
        BudgetBox algorithm
      </a>{' '}
      originally developed by Colony. As votes are submitted, the algorithm computes a “preference graph” over the full
      set of funding targets, which it transforms to a normalized distribution across the set. At the end of the voting
      period, funds are distributed according to the final snapshot of the distribution. This approach is highly
      scalable, both in terms of the number of funding targets and the number of voters. It can also produce intelligent
      allocations even with relatively low voter turnout. We believe that this mechanism is an underutilized way for
      communities to harness their collective intelligence in an efficient and unbiased manner. <br />
      <br /> PairDrop also comes with a Voter Scoring Script that we developed to help communities configure voting
      weights across their participants. The script can pull from different on and off-chain data sources to assign
      weights to individual addresses. The example datasets we provided are one example that focuses on addresses that
      have performed different on-chain actions in the Ethereum ecosystem such as donating to public goods, voting in
      DAOs, holding identity credentials, deploying smart contracts, claiming relevant POAPs and more! Check it out for
      inspiration and get in touch if you need help developing your own tailored dataset.
    </>
  ),
  secondTitle: 'ABOUT DAO DROPS',
  secondContent: (
    <>
      DAO Drops is the public goods arm of dOrg, an OG services DAO that builds dapps and other web3 infrastructure. The
      aim of DAO Drops is to Drop open source tools for decentralized communities. In 2023 we launched DAO Drops with a
      pilot supported by the Ethereum Foundation to empower Ethereum users to allocate ecosystem funds to underfunded
      projects. We received a tremendous amount of positive feedback from the community, especially from groups that
      were interested in running their own rounds. As a result, we are releasing PairDrop and all future Drops as
      forkable primitives that can be used by anyone. <br />
      <br /> So enjoy PairDrop and stay tuned for future Drops! <br />
      <br />
      If you need support adapting PairDrop or the{' '}
      <a href='https://github.com/dorgTech/dao-drops' target='_blank' rel='noopener noreferrer' className='underline'>
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
    </>
  ),
}

// FAQ component and QA list
export const faq = {
  title: 'FAQ',
  qaList: [
    {
      question: 'Is this a real round?',
      answer:
        'No, this is a demo site so you can see what a round looks like. PairDrop is a forkable primitive for public goods funding - copy the codebase to run your own community grants round! PairDrop uses pair-to-pair comparisons to help voters evaluate the most deserving projects. This helps minimize the “popularity voting” dynamic common in retroactive funding rounds.',
    },
    {
      question: 'How can I run a round?',
      answer: (
        <>
          Go to{' '}
          <a
            href='https://github.com/dOrgTech/PairDrop'
            target='_blank'
            rel='noopener noreferrer'
            className='font-medium underline'
            onClick={(e) => e.stopPropagation()}
          >
            https://github.com/dOrgTech/PairDrop
          </a>{' '}
          - You’ll find everything you need there to fork the codebase and run your own round. From there, you just need
          to choose what the focus or scope of your round will be, and prepare how you will handle nominations and
          communications for the round. You’ll find general guidance for running rounds here - Gitcoin’s modules for
          EasyRetroPGF - the PairDrop team co-created that training.
        </>
      ),
    },
    {
      question: 'How does PairDrop work?',
      answer:
        'Once you’ve loaded in the nominated projects and voters’ points, voters who have points can log in to the app and check if they have points. When they do, they will see a step-by-step guide for how to vote. To vote, they will review 5 pairs of projects, comparing them side-by-side and selecting the one they believe is most deserving of funding. Under the hood, a machine learning algorithm calculates the highest ranking projects and gives them a number. Your funding pool can then be distributed proportionally to each project.',
    },
    {
      question: 'How does the voting algorithm work?',
      answer: (
        <>
          Thousands of addresses have been assigned voting power based on on-chain activity (maximum 100 points per
          address per category -{' '}
          <a
            href='https://github.com/dOrgTech/PairDrop/blob/main/docs/data.md'
            target='_blank'
            rel='noopener noreferrer'
            className='font-medium underline'
            onClick={(e) => e.stopPropagation()}
          >
            assignment script here
          </a>
          ).
        </>
      ),
    },
    {
      question: 'How does the scoring algorithm work?',
      answer:
        'Each voter has a set number of points proportional to their qualifying on-chain activity. Their points are distributed evenly to each project they select from their pairs. For example, if an address has a total of 100 points, each project they select will receive 20 points. If an address has a total of 10 points, each project they select will receive 2 points.',
    },
    {
      question: 'What happens if a user logs in and they don’t have points?',
      answer:
        'A cute message will pop up for them to try again the next round. It’s important to let voters know they should check multiple addresses to see if they have points. Only addresses that participated in activities included in the PairDrop data sources will have points. You are free to generate your own custom set of addresses.',
    },
    {
      question: 'Who is behind this?',
      answer: (
        <>
          PairDrop is part of DAO Drops. The aim of DAO Drops is to Drop open source tools for decentralized
          communities. DAO Drops is the public goods arm of dOrg, a web3 development services provider operating as a
          DAO since 2019.{' '}
          <a
            href='https://www.dorg.tech'
            target='_blank'
            rel='noopener noreferrer'
            className='font-medium underline'
            onClick={(e) => e.stopPropagation()}
          >
            https://www.dorg.tech
          </a>
        </>
      ),
    },
  ],
}
