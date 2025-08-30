import ConfigNotFoundError from '@/errors/types/config-not-found';
import mobileApi from './mobile-api/api';
import webApi from './web-api/api';
import { config } from '@/config';

const enableThirdPartyApi = config.twitter.thirdPartyApi && config.twitter.thirdPartyApi.includes('api.apidance.pro');
if (enableThirdPartyApi && !config.twitter.thirdPartyApiKey) {
    throw new ConfigNotFoundError('TWITTER_THIRD_PARTY_API_KEY is required when TWITTER_THIRD_PARTY_API contains api.apidance.pro');
}
const enableMobileApi = config.twitter.username && config.twitter.password;
const enableWebApi = config.twitter.authToken;

type ApiItem = (id: string, params?: Record<string, any>) => Promise<Record<string, any>> | Record<string, any> | null;
let api: {
    init: () => void;
    getUser: ApiItem;
    getUserTweets: ApiItem;
    getUserTweetsAndReplies: ApiItem;
    getUserMedia: ApiItem;
    getUserLikes: ApiItem;
    getUserTweet: ApiItem;
    getSearch: ApiItem;
    getList: ApiItem;
    getHomeTimeline: ApiItem;
    getHomeLatestTimeline: ApiItem;
} = {
    init: () => {
        throw new ConfigNotFoundError('Twitter API is not configured');
    },
    getUser: () => null,
    getUserTweets: () => null,
    getUserTweetsAndReplies: () => null,
    getUserMedia: () => null,
    getUserLikes: () => null,
    getUserTweet: () => null,
    getSearch: () => null,
    getList: () => null,
    getHomeTimeline: () => null,
    getHomeLatestTimeline: () => null,
};

if (enableThirdPartyApi) {
    api = webApi;
} else if (enableWebApi) {
    api = webApi;
} else if (enableMobileApi) {
    api = mobileApi;
}

export default api;
