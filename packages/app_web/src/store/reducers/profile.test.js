import reducer from './profile';
import * as actionTypes from '../actions/action-types';

describe('profile reducer', () => {
    let state;

    beforeEach(() => {
        state = {
            firstName: null,
            lastName: null,
            profilePic: null,
            preferences: null,
            itineraries: null
        }
    });

    it('should return initial state for invalid action', () => {
        expect(reducer(undefined, {}))
            .toEqual(state);
    });

    it('should update the profile information', () => {
        expect(reducer(state, {
            type: actionTypes.UPDATE_PROFILE,
            firstName: 'some-firstName',
            lastName: 'some-lastName',
            preferences: 'some-preferences'
        }))
            .toEqual({
                ...state,
                firstName: 'some-firstName',
                lastName: 'some-lastName',
                preferences: 'some-preferences'
            });
    });

    it('should add user information upon login', () => {
        expect(reducer(state, {
            type: actionTypes.INITIALIZE_PROFILE,
            firstName: 'some-firstName',
            lastName: 'some-lastName',
            profilePic: 'some-profilePic',
            preferences: 'some-preferences',
            itineraries: 'some-itineraries'
        }))
            .toEqual({
                ...state,
                firstName: 'some-firstName',
                lastName: 'some-lastName',
                profilePic: 'some-profilePic',
                preferences: 'some-preferences',
                itineraries: 'some-itineraries'
            });
    });

    it('should remove all the user information upon sign out', () => {
        expect(reducer(state, {
            type: actionTypes.CLEAR_PROFILE
        }))
            .toEqual({
                ...state,
                firstName: null,
                lastName: null,
                profilePic: null,
                preferences: null,
                itineraries: null
            });
    });

    it('should update the state of a given itinerary', () => {
        const itineraries = {}
        itineraries['some-id'] = {
            state: 1
        }
        state = {...state, itineraries}

        expect(reducer(state, {
            type: actionTypes.UPDATE_STATE,
            state: 2,
            id: 'some-id'
        }).itineraries['some-id'].state)
            .toEqual(2);
    });

    it('should add itinerary to the given itinerary list', () => {
        const itinerary = {
            state: 1,
            location: 'some-location'
        }

        expect(reducer({...state, itineraries: {}}, {
            type: actionTypes.ADD_ITINERARY,
            object: itinerary,
            id: 'some-id'
        }).itineraries['some-id'])
            .toEqual(itinerary);
    });

    it('should remove an itinerary from the given itinerary list', () => {
        const itinerary = {
            state: 1,
            location: 'some-location'
        }
        const itineraries = {}
        itineraries['some-id'] = itinerary

        expect(reducer({...state, itineraries}, {
            type: actionTypes.REMOVE_ITINERARY,
            id: 'some-id'
        }).itineraries)
            .toEqual({});
    });

    it('should update the date of a given itinerary', () => {
        const itinerary = {
            state: 1,
            location: 'some-location',
            startDate: 'startDate1',
            endDate: 'endDate1'
        }
        const itineraries = {}
        itineraries['some-id'] = itinerary

        expect(reducer({...state, itineraries}, {
            type: actionTypes.UPDATE_DATES,
            startDate: 'startDate2',
            endDate: 'endDate2',
            id: 'some-id'
        }).itineraries['some-id'])
            .toEqual({...itinerary, startDate: 'startDate2', endDate: 'endDate2'});
    });
})
