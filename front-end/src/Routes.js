import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import { LogInPage } from './pages/LogInPage';
import { SignUpPage } from './pages/SignUpPage';
import { PleaseVerifyEmailPage } from './pages/PleaseVerifyEmailPage';
import { EmailVerificationLandingPage } from './pages/EmailVerificationLandingPage';
import { PrivateRoute } from './auth/PrivateRoute';

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute path="/" exact>
                    <UserInfoPage />
                </PrivateRoute>
                <Route path="/login" >
                    <LogInPage />
                </Route>
                <Route path="/please-verify" >
                    <PleaseVerifyEmailPage />
                </Route>
                <Route path="/verify-email/:verificationString">
                    <EmailVerificationLandingPage/>
                </Route>
                <Route path="/signup" exact>
                    <SignUpPage />
                </Route>
            </Switch>
        </Router>
    );
}