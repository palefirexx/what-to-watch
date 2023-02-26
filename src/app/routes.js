import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { routes } from './const'

const Main = lazy(() => import('../pages/Main/Main'))
const Film = lazy(() => import('../pages/Film/Film'))
const Player = lazy(() => import('../pages/Player/Player'))
const SignIn = lazy(() => import('../pages/Sign-in/Sign-in'))
const MyList = lazy(() => import('../pages/My-list/My-list'))
const Review = lazy(() => import('../pages/Review/Review'))
const ErrorPage = lazy(() => import('../pages/Error-page/Error-page'))


const navigateTo = (path) => () => (
	<Navigate to={path} replace />
)

export const routesList = [
	{ path: routes.Main, component: Main },
	{ path: routes.Film, component: Film },
	{ path: routes.Player, component: Player },
	{ path: routes.SignIn, component: SignIn, redirect: navigateTo(routes.Main) },
	{ path: routes.MyList, component: MyList, redirect: navigateTo(routes.SignIn), private: true },
	{ path: routes.Review, component: Review, redirect: navigateTo(routes.SignIn), private: true },
	{ path: routes.Error, component: ErrorPage },
]
