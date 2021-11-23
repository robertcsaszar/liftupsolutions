
function confirmArticle(title, desc, body) {
    cy.intercept('POST', '**/articles').as('postArticles')

    cy.wait('@postArticles')
    cy.get('@postArticles').then(xhr => {
        console.log(xhr)
        expect(xhr.request.body.article.title).to.equal(title)
        expect(xhr.request.body.article.body).to.equal(body)
        expect(xhr.request.body.article.description).to.equal(desc)
    })
}

function confirmLike(index, likes){
    cy.get('app-article-list button').then(listOfButtons => {
        expect(listOfButtons[index]).to.contain(likes)
    })
}


export class ArticlePage {

    publishNewArticle(title, description, body, tags) {

        cy.contains('New Article').click()
        cy.get('form').then(form => {
            cy.wrap(form).find('[placeholder="Article Title"]').type(title)
            cy.wrap(form).find('[placeholder="What\'s this article about?"]').type(description)
            cy.wrap(form).find('[placeholder="Write your article (in markdown)"]').type(body)
            cy.wrap(form).find('[placeholder="Enter tags"]').type(tags)
            cy.wrap(form).find('fieldset button').click()

            confirmArticle(title, description, body)
        })

    }

    deleteArticleGlobalFeed(email, password) {

        cy.request('POST', 'https://api.realworld.io/api/users/login',
        {
            user:
            {
                email: email,
                password: password
            }
        })
        .then(response => {
            const myUser = response.body.user.username
            const token = response.body.user.token

            cy.request({
                url: Cypress.env('apiUrl') + '/api/articles?limit=10&offset=0',
                headers: { 'Authorization': 'Token ' + token },
                mehthod: 'GET'
            }).its('body').then(body => {
                const articleAuthor = body.articles[0].author.username

                cy.contains('Global Feed').click()

                if (myUser == articleAuthor) {
                    cy.contains('.article-preview', articleAuthor).then(deleteArticle => {
                        cy.wrap(deleteArticle).click()
                        cy.get('.article-actions').contains('Delete Article').click()
                    })

                } else {
                    cy.log("Article not found for user " + myUser)
                }

            })

        })

    }

    deleteArticleFromProfile(email, password, index) {

        cy.request('POST', 'https://api.realworld.io/api/users/login',
        {
            user:
            {
                email: email,
                password: password
            }
        })
        .then(response => {
            console.log(response)
            const myUser = response.body.user.username

            cy.contains('.nav li', myUser).click()

            if(index >= 0) {
                cy.get('.article-preview').eq(index).click()
                cy.get('.article-actions').contains('Delete Article').click()
            }else {
                cy.log("Article not found")
            }
        })
    }

    likeArticle(index){
        cy.intercept('GET', '**/articles/feed*', { "articles": [], "articlesCount": 0 })
        cy.intercept('GET', Cypress.env('apiUrl')+'/api/articles?limit=10&offset=0').as('articleList')

        cy.contains('Global Feed').click()

        cy.wait("@articleList")
        cy.get('@articleList').then(xhr => {

            const likes = xhr.response.body.articles[index].favoritesCount
            const articleId = xhr.response.body.articles[index].slug

            cy.get('app-article-list button').then(listOfButtons => {
                cy.wrap(listOfButtons[index]).click({ articleId })
            })

            confirmLike(index, likes)

        })

    }
}

export const onArticlePage = new ArticlePage()