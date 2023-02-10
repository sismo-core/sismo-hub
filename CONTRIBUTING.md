# Contributing to Sismo Hub

Thank you for your interest in improving the Sismo Hub! Your contributions, big or small, are valued and appreciated. This document serves as a guide to help you navigate the contribution process. If you need assistance, feel free to reach out to our #dev-support channel on our [Discord](https://discord.gg/sismo) community.


## Ways to contribute

There are several ways you can contribute to the Sismo Hub:

- **Create new Groups Generators**: Creating new Groups Generators is always welcomed! The possibilities for new Groups are endless, as they can be generated from a vast array of open data.

- **Create new Data Providers**: By creating new Data Providers, you are supporting developers in effortlessly accessing the data necessary for their own Group Generator creation.

- **Report a bug**: If you have discovered a bug in the system, you can open an issue and provide a detailed report. A template for submitting a bug report is available for your convenience.

- **Provide additional context**: If you have come across an issue, you can provide additional context, such as screenshots, logs, or code snippets, to help resolve it.

- **Resolve issues**: If you have the skills and expertise to resolve an issue, you can demonstrate that the issue is not a problem or open a pull request that implements a fix.

## Creating a new Group Generator

Sismo resolves around the concept of [Groups of accounts](https://docs.sismo.io/sismo-docs/sismo-protocol/groups). These Groups are generated through the use of a [Group Generator](https://docs.sismo.io/sismo-docs/technical-documentation/sismo-hub/group-generator).  
  
Check out the [existing Group Generators](./group-generators/generators/) for inspiration!


## Creating a new Data Provider

[Data Providers](https://docs.sismo.io/sismo-docs/technical-documentation/sismo-hub/group-generator/data-providers) allow for the querying of data from a range of sources, including APIs, Subgraphs, and on-chain data.

The creation of new Data Providers expands the potential to gather more data for Group generation.


## Asking for help

If you need assistance or have any questions, please reach out to our #dev-support channel on our [Discord](https://discord.gg/sismo) community.

## Creating a new issue
### Requesting a new Data Provider

If you have a concept for a new Data Provider, please use the following template to submit your request.

```markdown
## Problem Statement
A brief explanation of the problem or issue you are addressing. What data do you need for your Group Generators that is currently not available?

## Proposed Solution
A detailed explanation of the new Data Provider you're proposing, including any relevant specifications or details.

## Benefits
How your proposed Data Provider will improve the Sismo platform and help solve the problem you've identified.

## Implementation Plan
A high-level plan for how you plan to implement the new Data Provider, including any relevant technologies or tools you'll be using.

## Requested Help
Any additional support or resources you need to make your proposed Data Provider a reality.
```

### Submitting a bug report

When submitting a bug report, please provide a detailed description of the issue and the steps to reproduce it. If possible, include any relevant logs, screenshots, or code snippets to help us understand and resolve the issue.

```markdown
## Description
A clear and concise description of the bug.

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Screenshots (if applicable)
Attach any relevant screenshots here.

## Additional Information
Node version: [e.g. v18.13.0]
Browser and version: [e.g. Chrome 88.0.4324.96]
Operating system: [e.g. MacOS Monterey ]

Any additional information that may be useful in troubleshooting the issue.
```

## Resolving an issue

If you have the skills and expertise to resolve an issue, you can demonstrate that the issue is not a problem or open a pull request that implements a fix. When submitting a pull request, please include a clear explanation of the problem and your proposed solution.

### Submitting a pull request

To help us understand and review your changes, please include the following information in your Pull Request description:

```markdown
## Context
A brief explanation of the problem or issue you are addressing. This should include any relevant references to related issues or discussions. 

## Changes Made
A detailed explanation of the changes you have made, including any relevant code snippets or screenshots.

## Benefits
How your changes will improve the Sismo platform and solve the problem you're addressing.

## Test Results
The results of any tests you've run to confirm that your changes work as expected.

## Future Considerations
Any additional changes or features you think should be added in the future to enhance the functionality of the Sismo platform.

## Checklist
[] I have tested my changes and confirmed that they work as expected
[] I have updated the relevant documentation, including the Contributor Guide and the README
[] I have added any necessary tests to ensure that my changes are protected from future regressions
```

Please make sure that you've completed all items in the checklist before submitting your Pull Request.

## Code of Conduct

We have a [code of conduct](https://sismo.notion.site/Code-of-Conduct-4ee1e3567b514474baf489bd58b56c2d) in place to ensure a respectful and inclusive environment for all contributors. Please take the time to read and understand the Code of Conduct before making a contribution. Any behavior that violates this code will not be tolerated.