import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Dashboard from '@/components/Dashboard'
import repos from '@/components/repos'
import issues from '@/components/issues'
import gists from '@/components/gists'
import knownRepo from '@/components/knownRepo'
import singleGist from '@/components/singleGist'
import singleIssue from '@/components/singleIssue'
import User from '@/components/User'
import Search from '@/components/Search'
import visitedRepo from '@/components/visitedRepo'
import CreateRepo from '@/components/CreateRepo'
import PullRequest from '@/components/PullRequest'
import CreateIssue from '@/components/CreateIssue'
import CreatePullRequest from '@/components/CreatePullRequest'
import File from '@/components/File'
import Commit from '@/components/Commit'
import CreateFile from '@/components/CreateFile'
import UpdateFile from '@/components/UpdateFile'
import StorageManagement from '@/components/StorageManagement'
import Feed from '@/components/Feed'
import Notifications from '@/components/Notifications'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      meta: { auth: false }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { auth: true }
    },
    {
      path: '/repos',
      name: 'repos',
      component: repos,
      meta: { auth: true }
    },
    {
      path: '/issues',
      name: 'issues',
      component: issues,
      meta: { auth: true }
    },
    {
      path: '/gists',
      name: 'gists',
      component: gists,
      meta: { auth: true }
    },
    {
      path: '/repo/:owner/:name',
      name: 'knownRepo',
      component: knownRepo,
      meta: { auth: true }
    },
    {
      path: '/gist/:name',
      name: 'singleGist',
      component: singleGist,
      meta: { auth: true }
    },
    {
      path: '/repo/:owner/:repo/issues/:number',
      name: 'singleIssue',
      component: singleIssue,
      meta: { auth: true }
    },
    {
      path: '/user/:login',
      name: 'User',
      component: User,
      meta: { auth: true }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: { auth: true }
    },
    {
      path: '/vrepo/:owner/:name',
      name: 'visitedRepo',
      component: visitedRepo,
      meta: { auth: true }
    },
    {
      path: '/create/',
      name: 'CreateRepo',
      component: CreateRepo,
      meta: { auth: true }
    },
    {
      path: '/repo/:owner/:name/pull/:number',
      name: 'PullRequest',
      component: PullRequest,
      meta: { auth: true }
    },
    {
      path: '/repo/:owner/:name/create/issue',
      name: 'CreateIssue',
      component: CreateIssue,
      meta: { auth: true }
    },
    {
      path: '/repo/:owner/:name/create/pull',
      name: 'CreatePullRequest',
      component: CreatePullRequest,
      meta: { auth: true }
    },
    {
      path: '/repos/:owner/:repo/contents/:path',
      name: 'File',
      component: File,
      meta: { auth: true }
    },
    {
      path: '/repos/:owner/:repo/commits/:sha',
      name: 'Commit',
      component: Commit,
      meta: { auth: true }
    },
    {
      path: '/repos/:owner/:repo/create/file',
      name: 'CreateFile',
      component: CreateFile,
      meta: { auth: true }
    },
    {
      path: '/repos/:owner/:repo/update/:path',
      name: 'UpdateFile',
      component: UpdateFile,
      meta: { auth: true }
    },
    {
      path: '/storage',
      name: 'StorageManagement',
      component: StorageManagement,
      meta: { auth: true }
    },
    {
      path: '/feed',
      name: 'Feed',
      component: Feed,
      meta: { auth: true }
    },
    {
      path: '/notifications',
      name: 'Notifications',
      component: Notifications,
      meta: { auth: true }
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
      meta: { auth: true }
    }
  ],
  saveScrollPosition: true,
  history: true
})
