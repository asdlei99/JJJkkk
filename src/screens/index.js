
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { inject, observer } from 'mobx-react/native';
import DropdownAlert from 'react-native-dropdownalert';
import {
    View,
    StatusBar,
} from 'react-native';

import Loader from 'ui/Loader';
import BestReviews from './BestReviews';
import BestRated from './BestRated';
import LastestVideo from './LastestVideo';
import Menu from './Menu';
import MostWanted from './MostWanted';
import ListByTag from './ListByTag';
import ListByStar from './ListByStar';
import Detail from './Detail';
import User from './User';
import Favorite from './Favorite';
import Stars from './Stars';
import EditProfile from './EditProfile';
import EditProfileNickname from './EditProfile/Nickname';
import EditProfileLocation from './EditProfile/Location';
import EditProfileBio from './EditProfile/Bio';
import EditProfileGender from './EditProfile/Gender';
import EditProfilePassword from './EditProfile/Password';
import Signin from './Signin';
import Signup from './Signup';
import Search from './Search';
import VideoPlayer from './VideoPlayer';
import Comments from './Comments';
import WriteComment from './Comments/Write';

@inject(stores => ({
    loading: stores.me.loading,
    hasError: stores.errorMessage.hasError,
    message: stores.errorMessage.message,
    reset: stores.errorMessage.reset,
}))
@observer
class Layout extends Component {
    componentWillMount() {
        StatusBar.setHidden(true);
    }

    showError(message) {
        this.dropdown.alertWithType('custom', 'Error', message);
    }

    componentWillReceiveProps(nextProps) {
        var { hasError, message } = nextProps;

        if (hasError) {
            this.dropdown.alertWithType('custom', 'Error', message);
        }
    }

    render() {
        var { loading, reset } = this.props;

        if (loading) {
            return <Loader show={true} />;
        }

        return (
            <View style={{ flex: 1 }}>
                {React.cloneElement(this.props.children, { showError: message => this.showError(message) })}

                <DropdownAlert
                    closeInterval={3000}
                    imageStyle={{
                        display: 'none',
                    }}
                    containerStyle={{
                        padding: 0,
                        paddingTop: 0,
                        height: 120,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#000',
                    }}
                    onClose={() => reset()}
                    messageStyle={{
                        color: '#fff',
                        letterSpacing: 1,
                        fontWeight: '100',
                        fontSize: 24,
                        textAlign: 'center',
                    }}
                    titleStyle={{
                        display: 'none',
                    }}
                    ref={ref => (this.dropdown = ref)}
                />
            </View>
        );
    }
}

const Mixin = (Component) => {
    return (props) => {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        );
    };
};

export default (stores, Provider) => {
    Navigation.registerComponent('zzyzx.BestReviews', () => Mixin(BestReviews), stores, Provider);
    Navigation.registerComponent('zzyzx.BestRated', () => Mixin(BestRated), stores, Provider);
    Navigation.registerComponent('zzyzx.LastestVideo', () => Mixin(LastestVideo), stores, Provider);
    Navigation.registerComponent('zzyzx.Menu', () => Mixin(Menu), stores, Provider);
    Navigation.registerComponent('zzyzx.MostWanted', () => Mixin(MostWanted), stores, Provider);
    Navigation.registerComponent('zzyzx.ListByTag', () => Mixin(ListByTag), stores, Provider);
    Navigation.registerComponent('zzyzx.ListByStar', () => Mixin(ListByStar), stores, Provider);
    Navigation.registerComponent('zzyzx.Detail', () => Mixin(Detail), stores, Provider);
    Navigation.registerComponent('zzyzx.User', () => Mixin(User), stores, Provider);
    Navigation.registerComponent('zzyzx.Favorite', () => Mixin(Favorite), stores, Provider);
    Navigation.registerComponent('zzyzx.Stars', () => Mixin(Stars), stores, Provider);
    Navigation.registerComponent('zzyzx.EditProfile', () => Mixin(EditProfile), stores, Provider);
    Navigation.registerComponent('zzyzx.EditProfile.Nickname', () => Mixin(EditProfileNickname), stores, Provider);
    Navigation.registerComponent('zzyzx.EditProfile.Location', () => Mixin(EditProfileLocation), stores, Provider);
    Navigation.registerComponent('zzyzx.EditProfile.Bio', () => Mixin(EditProfileBio), stores, Provider);
    Navigation.registerComponent('zzyzx.EditProfile.Gender', () => Mixin(EditProfileGender), stores, Provider);
    Navigation.registerComponent('zzyzx.EditProfile.Password', () => Mixin(EditProfilePassword), stores, Provider);
    Navigation.registerComponent('zzyzx.Signin', () => Mixin(Signin), stores, Provider);
    Navigation.registerComponent('zzyzx.Signup', () => Mixin(Signup), stores, Provider);
    Navigation.registerComponent('zzyzx.Search', () => Mixin(Search), stores, Provider);
    Navigation.registerComponent('zzyzx.VideoPlayer', () => Mixin(VideoPlayer), stores, Provider);
    Navigation.registerComponent('zzyzx.Comments', () => Mixin(Comments), stores, Provider);
    Navigation.registerComponent('zzyzx.WriteComment', () => Mixin(WriteComment), stores, Provider);
};
