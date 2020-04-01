import React from 'react';
import { shallow } from 'enzyme';
import DashboardAllEventsPage from '..';

describe('Test DashboardAllEventsPage component with shallow rendering', () => {
    it('Crash free rendering', () => {
        shallow(<DashboardAllEventsPage />);
    });
});