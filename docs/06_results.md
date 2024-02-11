# Understanding Results in PairDrop

## Introduction

After the voting phase concludes, the PairDrop platform processes and displays the results, showcasing which projects have been selected to receive funding. This guide explains how to access, understand, and interpret the results of a funding round in PairDrop.

## Accessing Results

The display of results on the PairDrop client's homepage can be toggled with the `showResults` setting under `homeConfig` in the **[config.tsx](../client/src/config.tsx)** file located in `client/src/config.tsx`. This allows for real-time visibility of results during or after a funding round:

1. Results can be configured to appear on the homepage, enabling immediate access post-voting.
2. To view, simply visit the PairDrop client homepage where, depending on the showResults configuration, the results table may be directly visible.

## Understanding the Results Page

The results table interface offers a detailed summary of the funding distribution, structured as follows:

- **Projects Overview:** Lists projects in a sorted table manner based on their scores, with funding allocations displayed alongside.
- **Interactive Elements:** Clicking on a project row reveals more details about the project in a modal view, enhancing understanding and engagement.

## Results Table Breakdown

- **Project Information:** Includes names and categories, providing a quick reference to the project's focus.
- **Score and Funding:** Each project's score is listed alongside the calculated funding received, using the formula `(projectScore / totalScore) * totalFundsAmount`, which distributes the total funds proportionally based on scores.
- **Viewing Options:** A toggle allows users to expand or limit the view to the top projects, facilitating a customized overview.

## Interpreting the Results

### Allocation Methodology

- **Score-Based Ranking:** Projects are ranked and funded based on their scores, derived from the voting process. This approach ensures a merit-based distribution, aligning funding with community consensus on project impact.
- **Funding Calculation:** The proportional funding model allocates the total available funds based on each project's score relative to the total score, ensuring a fair distribution.

### Impact on Projects

Funded projects receive allocations that enable further development and contribution to the ecosystem. Detailed insights into project plans and use of funds can be explored through the modal details, fostering transparency and community engagement.

## Feedback and Learning

The PairDrop platform may offer features for providing feedback on the voting process or learning more about the projects. Engaging with these features can enhance the community's understanding and involvement in future funding rounds.

## Conclusion

The results phase is a crucial part of the PairDrop funding cycle, reflecting the collective will of the community in supporting projects that contribute to the ecosystem. By accessing and understanding the results, participants can see the tangible impact of their votes and the importance of their involvement in the decision-making process.
