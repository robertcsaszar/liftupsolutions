/// <reference types="cypress" />
import { onAccountPage } from "../support/page_objects/account"
import { onArticlePage } from "../support/page_objects/article"
import { onProfilePage } from "../support/page_objects/profile"

describe('Test Application', () => {

    beforeEach('Open Homepage', () => {
        cy.openHomePage()
        cy.loginToApplication()
    })

    it('Sign Up', () => {
        onAccountPage.createNewAccount('Test4', 'test4@test.com', 'Testing')
    })

    it('Sign In', () => {
        onAccountPage.logIn('test5@test.com', 'Testing')
    })

    it('Add new Article', () => {
        onArticlePage.publishNewArticle('Test', 'Something Useless', 'Nothing good here, move on!', 'test')
    })

    it('Delete Article from Global Feed', () => {
        onArticlePage.deleteArticleGlobalFeed('test@test28.com', 'Testing')
    })

    it('Detele Article from Profile', () => {
        onArticlePage.deleteArticleFromProfile('test@test28.com', 'Testing', 0)
    })

    it('Like Article', () => {
        onArticlePage.likeArticle(0)
    })

    it.only('Edit Article', () => {
        onArticlePage.editArticle('test@test.com', 'Testing', 'Test20', 'Something Useless', 'Nothing good here, move on!', 'welcome')
    })

    it('Update Profile Settings', () => {
        onProfilePage.changeSettings('https://via.placeholder.com/150','Robert QA','Something Good','test@test28.com')
    })

})