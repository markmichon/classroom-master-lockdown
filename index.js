/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on('repository_import', async context => {
    const { repository } = context.payload
    if (context.payload.status !== 'success') {
      return null
    }
    return context.github.request({
      baseUrl: 'https://api.github.com',
      url: `/repos/${repository.owner.login}/${
        repository.name
      }/branches/master/protection`,
      method: 'PUT',
      headers: {
        accept: 'application/vnd.github.luke-cage-preview+json',
      },
      // @ts-ignore
      required_status_checks: null,
      enforce_admins: null,
      restrictions: null,
      required_pull_request_reviews: {
        required_approving_review_count: 1,
      },
    })
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
