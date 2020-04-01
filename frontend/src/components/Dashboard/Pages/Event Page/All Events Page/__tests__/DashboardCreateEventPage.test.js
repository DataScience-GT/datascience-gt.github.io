import React from 'react';
import { shallow } from 'enzyme';
import DashboardCreateEventPage from '..';

describe('Test DashboardCreateEventPage component with shallow rendering', () => {
    it('Crash free rendering', () => {
        shallow(<DashboardCreateEventPage />);
    });
});