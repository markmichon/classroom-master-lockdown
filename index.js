/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on('issues.opened', async context => {
    const issueComment = context.issue({
      body: 'Thanks for opening this issue!',
    })
    return context.github.issues.createComment(issueComment)
  })

  app.on('pull_request.opened', async context => {})

  app.on('repository.created', async context => {
    const { repository } = context.payload
    let branches = context.github.repos.listBranches({
      owner: repository.owner.login,
      repo: repository.id,
    })
    app.log(branches)
    // return context.github.request(`PUT /repos/:owner/:branches/:branch/protection`, {
    //   headers: {
    //     accept: 'application/vnd.github.luke-cage-preview+json'
    //   },

    // })
    app.log('Repo created!')
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
